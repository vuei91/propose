// lib/db.ts
import { JSONFilePreset } from "lowdb/node";

// DB에 저장될 데이터 타입 정의
type User = {
  id: number;
  name: string;
};

type Data = {
  users: User[];
};

// JSON 파일과 초기 데이터 설정
const defaultData: Data = { users: [] };

// data.json 파일에 연결된 DB 객체 생성
export const db = await JSONFilePreset<Data>("data.json", defaultData);
