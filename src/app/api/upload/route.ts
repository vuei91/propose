import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const uploadDir = path.join(process.cwd(), "public/uploads");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[]; // multi file 처리

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // 폴더 보장
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedFiles: { id: string; filename: string; path: string; mimetype: string; size: number; url: string }[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name);
      const filename = `${uuidv4()}${ext}`;
      const filepath = path.join(uploadDir, filename);

      await fs.writeFile(filepath, buffer);

      const newFile = {
        id: uuidv4(),
        filename,
        path: `/uploads/${filename}`,
        mimetype: file.type,
        size: file.size,
        url: `/uploads/${filename}`,
      };

      uploadedFiles.push(newFile);
    }

    return NextResponse.json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { filePath } = await req.json();

  if (!filePath) {
    return NextResponse.json({ error: "id and filePath are required" }, { status: 400 });
  }

  // 실제 파일 경로
  const absolutePath = path.join(process.cwd(), "public", filePath.replace(/^\//, ""));

  try {
    await fs.unlink(absolutePath); // 물리적 파일 삭제
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("파일 삭제 실패:", err);
    return NextResponse.json({ success: false });
  }
}
