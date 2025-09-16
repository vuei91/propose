// app/api/contents/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db, Content } from "@/lib/db";

// GET: 특정 Content 조회
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.read();
  const content = db.data.contents.find((c) => c.id === Number(params.id));

  if (!content) {
    return NextResponse.json({ message: "Content not found" }, { status: 404 });
  }

  return NextResponse.json(content);
}

// PUT: 특정 Content 업데이트
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.read();
  const id = Number(params.id);
  const body: Partial<Content> = await req.json();

  const index = db.data.contents.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Content not found" }, { status: 404 });
  }

  db.data.contents[index] = { ...db.data.contents[index], ...body };
  await db.write();

  return NextResponse.json(db.data.contents[index]);
}

// DELETE: 특정 Content 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.read();
  const id = Number(params.id);

  const index = db.data.contents.findIndex((c) => c.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Content not found" }, { status: 404 });
  }

  const deleted = db.data.contents.splice(index, 1)[0];
  await db.write();

  return NextResponse.json(deleted);
}
