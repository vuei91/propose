"use client";

import { useEffect, useState } from "react";

type Content = {
  id: number;
  date: string;
  type: "text" | "image";
  width: number;
  height: number;
  rotate: number;
  page: number;
  x: number;
  y: number;
};

export default function ContentsPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [newContent, setNewContent] = useState<Omit<Content, "id">>({
    date: new Date().toISOString(),
    type: "text",
    width: 100,
    height: 100,
    rotate: 0,
    page: 1,
    x: 0,
    y: 0,
  });

  // ✅ 초기 데이터 불러오기
  useEffect(() => {
    fetch("/api/contents")
      .then((res) => res.json())
      .then(setContents);
  }, []);

  // ✅ 생성
  async function createContent() {
    const res = await fetch("/api/contents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContent),
    });
    const created = await res.json();
    setContents((prev) => [...prev, created]);
  }

  // ✅ 업데이트
  async function updateContent(id: number) {
    const res = await fetch(`/api/contents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x: Math.random() * 500, y: Math.random() * 500 }),
    });
    const updated = await res.json();
    setContents((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }

  // ✅ 삭제
  async function deleteContent(id: number) {
    await fetch(`/api/contents/${id}`, { method: "DELETE" });
    setContents((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">📦 Content Manager</h1>

      {/* 생성 버튼 */}
      <button
        onClick={createContent}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        ➕ Add Content
      </button>

      {/* 리스트 */}
      <ul className="space-y-2">
        {contents.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <span>
              #{c.id} | {c.type} ({c.x}, {c.y})
            </span>
            <div className="space-x-2">
              <button
                onClick={() => updateContent(c.id)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                ✏️ Update
              </button>
              <button
                onClick={() => deleteContent(c.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
