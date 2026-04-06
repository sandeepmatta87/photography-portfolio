import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const db = getDb();
    const invoice = db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const payments = db.prepare('SELECT * FROM payments WHERE invoiceId = ? ORDER BY paidAt DESC').all(id);

    return NextResponse.json({ ...invoice as Record<string, unknown>, payments });
  } catch (error) {
    console.error('GET /api/invoices/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const db = getDb();

    const updates: string[] = [];
    const values: unknown[] = [];

    if (body.status !== undefined) { updates.push('status = ?'); values.push(body.status); }
    if (body.items !== undefined) {
      const items = body.items;
      const subtotal = items.reduce((sum: number, item: { amount: number; qty: number }) =>
        sum + (item.amount * item.qty), 0);
      const taxRate = body.taxRate || 10;
      const tax = subtotal * (taxRate / 100);
      const total = subtotal + tax;

      updates.push('items = ?', 'subtotal = ?', 'tax = ?', 'total = ?');
      values.push(JSON.stringify(items), subtotal, tax, total);
    }
    if (body.notes !== undefined) { updates.push('notes = ?'); values.push(body.notes); }
    if (body.dueDate !== undefined) { updates.push('dueDate = ?'); values.push(body.dueDate); }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    db.prepare(`UPDATE invoices SET ${updates.join(', ')} WHERE id = ?`).run(...values);

    return NextResponse.json({ message: 'Invoice updated' });
  } catch (error) {
    console.error('PATCH /api/invoices/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const db = getDb();
    db.prepare('DELETE FROM invoices WHERE id = ?').run(id);
    return NextResponse.json({ message: 'Invoice deleted' });
  } catch (error) {
    console.error('DELETE /api/invoices/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
  }
}
