import { IContent } from "./IContent";

// ✅ 초기 데이터 불러오기
export async function getContents() {
  const res = await fetch("/api/contents");
  const data = await res.json();
  return data as IContent[];
}

// ✅ 생성
export async function createContent(newContent: Omit<IContent, "id">) {
  const res = await fetch("/api/contents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContent),
  });
  return await res.json();
}

// ✅ 업데이트
export async function updateContent(id: number, data: Partial<IContent>) {
  const res = await fetch(`/api/contents/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
  return await res.json();
}

// ✅ 삭제
export async function deleteContent(id: number) {
  return await fetch(`/api/contents/${id}`, { method: "DELETE" });
}
