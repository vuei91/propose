export interface IPage {
  id: number;
  date: string;
  page: number;
  contents: IContent[];
}

export interface IContent {
  type: "image" | "text" | "video";
  id: number;
  width: number;
  height: number;
  rotate: number;
  x: number;
  y: number;
  // image
  imageSrc?: string;
  imageFile?: File;
  // text
  text?: string;
  color?: string;
  fontSize?: string | number;
  fontFamily?: string;
  fontWeight?: string | number;
  // video
  videoSrc?: string;
  videoFile?: File;
}
