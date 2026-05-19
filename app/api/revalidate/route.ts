import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const expected = process.env.REVALIDATION_TOKEN;

    if (!expected) {
      return NextResponse.json({ error: 'REVALIDATION_TOKEN non configurato' }, { status: 503 });
    }
    if (token !== expected) {
      return NextResponse.json({ error: 'Token non valido' }, { status: 401 });
    }

    revalidatePath('/', 'layout');

    return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}
