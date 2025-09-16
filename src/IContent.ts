export interface IContent {
  id: number;
  date: string;
  type: "text" | "image";
  width: number;
  height: number;
  rotate: number;
  page: number;
  x: number;
  y: number;
}
