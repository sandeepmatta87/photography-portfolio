import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import getDb, { getNextInvoiceNumber } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const invoices = db.prepare('SELECT * FROM invoices ORDER BY createdAt DESC').all();
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('GET /api/invoices error:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      quoteId, clientName, clientEmail, clientPhone,
      type, items, notes, dueDate,
    } = body;

    if (!clientName || !clientEmail || !type || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDb();
    const id = uuidv4();
    const invoiceNumber = getNextInvoiceNumber();

    const subtotal = items.reduce((sum: number, item: { amount: number; qty: number }) =>
      sum + (item.amount * item.qty), 0);
    const taxRate = 10;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    db.prepare(`
      INSERT INTO invoices (id, invoiceNumber, quoteId, clientName, clientEmail, clientPhone,
        type, items, subtotal, taxRate, tax, total, status, dueDate, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?)
    `).run(
      id, invoiceNumber, quoteId || null, clientName, clientEmail, clientPhone || null,
      type, JSON.stringify(items), subtotal, taxRate, tax, total,
      dueDate || null, notes || null
    );

    return NextResponse.json({ id, invoiceNumber, message: 'Invoice created' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/invoices error:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
