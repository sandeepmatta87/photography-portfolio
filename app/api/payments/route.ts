import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import getDb from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const payments = db.prepare(`
      SELECT p.*, i.invoiceNumber, i.clientName
      FROM payments p
      JOIN invoices i ON p.invoiceId = i.id
      ORDER BY p.paidAt DESC
    `).all();
    return NextResponse.json(payments);
  } catch (error) {
    console.error('GET /api/payments error:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceId, amount, method, reference, notes } = body;

    if (!invoiceId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDb();
    const id = uuidv4();

    db.prepare(`
      INSERT INTO payments (id, invoiceId, amount, method, reference, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, invoiceId, amount, method || 'bank_transfer', reference || null, notes || null);

    // Check if invoice is fully paid
    const invoice = db.prepare('SELECT total FROM invoices WHERE id = ?').get(invoiceId) as { total: number } | undefined;
    const totalPaid = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE invoiceId = ?').get(invoiceId) as { total: number };

    if (invoice && totalPaid.total >= invoice.total) {
      db.prepare('UPDATE invoices SET status = ? WHERE id = ?').run('paid', invoiceId);
    }

    return NextResponse.json({ id, message: 'Payment recorded' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/payments error:', error);
    return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 });
  }
}
