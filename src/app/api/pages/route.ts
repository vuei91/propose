// app/api/contents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { IPage } from "@/types";

// GET: 모든 pages 조회
export async function GET() {
  await db.read();
  return NextResponse.json(db.data.pages);
}

// POST: pages 전체 업데이트
export async function POST(req: NextRequest) {
  await db.read();
  const pages: IPage[] = await req.json();

  db.data.pages = pages;
  await db.write();

  return NextResponse.json(pages, { status: 201 });
}
