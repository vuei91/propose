// app/api/contents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db, Content } from "@/lib/db";

// GET: 모든 Content 조회
export async function GET() {
  await db.read();
  return NextResponse.json(db.data.contents);
}

// POST: 새로운 Content 추가
export async function POST(req: NextRequest) {
  await db.read();
  const body: Omit<Content, "id"> = await req.json();

  const newContent: Content = {
    id: Date.now(), // 간단히 timestamp로 id 생성
    ...body,
  };

  db.data.contents.push(newContent);
  await db.write();

  return NextResponse.json(newContent, { status: 201 });
}
