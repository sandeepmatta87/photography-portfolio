import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import getDb from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const quotes = db.prepare('SELECT * FROM quotes ORDER BY createdAt DESC').all();
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('GET /api/quotes error:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, eventDate, venue, guests, message } = body;

    if (!name || !email || !eventType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDb();
    const id = uuidv4();

    db.prepare(`
      INSERT INTO quotes (id, name, email, phone, eventType, eventDate, venue, guests, message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, email, phone || null, eventType, eventDate || null, venue || null, guests || null, message);

    return NextResponse.json({ id, message: 'Quote request submitted' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/quotes error:', error);
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const db = getDb();
    db.prepare('UPDATE quotes SET status = ? WHERE id = ?').run(status, id);

    return NextResponse.json({ message: 'Quote updated' });
  } catch (error) {
    console.error('PATCH /api/quotes error:', error);
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
  }
}
