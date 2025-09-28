"use client";
import { useCurrentContentState, usePageState } from "@/store";
import { IContent } from "@/types";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

export default function FileController() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { addContent } = usePageState();

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      const page = prompt("페이지 번호를 입력하세요");
      if (!page) return;
      if (isNaN(Number(page))) return alert("숫자만 입력 가능합니다");
      const newContent: IContent = {
        id: Date.now(),
        videoSrc: url,
        width: 100,
        height: 100,
        rotate: 0,
        x: 0,
        y: 0,
      };
      addContent(newContent, Number(page));
      return () => URL.revokeObjectURL(url);
    }
    setVideoURL("");
  }, [videoFile]);

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file?.type.includes("image")) {
      const page = prompt("페이지 번호를 입력하세요");
      if (!page) return;
      if (isNaN(Number(page))) return alert("숫자만 입력 가능합니다");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const newContent: IContent = {
          id: Date.now(),
          imageSrc: reader.result as string,
          width: 100,
          height: 100,
          rotate: 0,
          x: 0,
          y: 0,
        };
        addContent(newContent, Number(page));
      };
    } else if (file?.type?.includes("video")) {
      setVideoFile(file);
    }
  };

  return (
    <div>
      <label className="btn btn-secondary" htmlFor="upload">
        이미지 추가
      </label>
      <input type="file" id="upload" className="hidden" accept="image/*, video/*" onChange={onChangeFile} />
    </div>
  );
}
