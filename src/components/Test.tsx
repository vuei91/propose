"use client";

import { useState } from "react";

export default function UploadOnChange() {
  const [uploading, setUploading] = useState(false);

  const _handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files;

    setUploading(true);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      handleFileChange(file);
    });
  };

  const handleFileChange = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // 같은 key에 여러 개 추가

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    return await res.json();
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
    <div className="p-4 border rounded">
      <input type="file" multiple onChange={_handleFileChange} />
      {uploading && <p className="text-sm text-gray-500 mt-2">업로드 중...</p>}

      <button onClick={() => deleteFile("/uploads/85494d53-8cac-4e64-bd09-9bec65acbd6c.png")}>DELETE</button>
    </div>
  );
}
