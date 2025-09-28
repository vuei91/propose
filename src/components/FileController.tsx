"use client";
import { useFileListState, usePageState } from "@/store";
import { IContent } from "@/types";
import { ChangeEvent, useEffect } from "react";

export default function FileController() {
  const { addContent } = usePageState();
  const { files, setFiles, previews, setPreviews } = useFileListState();
  useEffect(() => {
    const urls = [];
    let i = 0;
    for (const file of files ?? []) {
      const url = URL.createObjectURL(file);
      urls.push(url);
      let type = null;
      let imageSrc = null;
      let videoSrc = null;
      if (file.type.includes("image")) {
        type = "image";
        imageSrc = url;
      }
      if (file.type.includes("video")) {
        type = "video";
        videoSrc = url;
      }
      const newContent: IContent = {
        id: Date.now() + i,
        type,
        width: 100,
        height: 100,
        rotate: 0,
        imageSrc,
        videoSrc,
        x: 0,
        y: 0,
      } as IContent;
      addContent(newContent, 2);
      i++;
    }
    setPreviews(urls);
  }, [files]);

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files && files.length > 0) {
      setFiles(files);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file); // 같은 key에 여러 개 추가
    });

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    console.log("files", await res.json());

    alert("업로드 완료!");
  };

  async function deleteFile(filePath: string) {
    const res = await fetch("/api/upload", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath }),
    });

    const data = await res.json();
    if (data.success) {
      alert(`삭제 완료!`);
    } else {
      alert("삭제 실패!");
    }
  }

  return (
    <div>
      <label className="btn btn-secondary" htmlFor="upload">
        이미지 추가
      </label>
      <input type="file" id="upload" className="hidden" multiple accept="image/*, video/*" onChange={onChangeFile} />
    </div>
  );
}
