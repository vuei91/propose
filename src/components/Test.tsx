"use client";
import { useState } from "react";

export default function MultiUpload() {
  const [urls, setUrls] = useState<string[]>([]);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // multiple file 자동 포함

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    // API에서 리턴한 파일 URL 배열
    setUrls(data.files.map((f: any) => f.url));
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" name="files" multiple />
        <button type="submit">Upload</button>
      </form>

      <div>
        {urls.map((url, idx) => (
          <img key={idx} src={url} alt="uploaded" width={200} />
        ))}
      </div>
    </div>
  );
}
