import { IContent, IPage } from "./types";

// ✅ 초기 데이터 불러오기
export async function getPages() {
  const res = await fetch("/api/pages");
  const data = await res.json();
  return data as IPage[];
}
// ✅ 변경된 데이터 저장하기
export async function savePages(pages: IPage[]) {
  const res = await fetch("/api/pages", {
    method: "POST",
    body: JSON.stringify(pages),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data as IPage[];
}
