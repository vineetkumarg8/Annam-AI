import { useState } from 'react';

interface VideoUploadProps {
  onUpload: (file: File) => void;
}

export default function VideoUpload({ onUpload }: VideoUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) onUpload(file);
  };

  return (
    <div className="p-4 border rounded-xl">
      <input type="file" accept="video/mp4" onChange={handleChange} />
      <button onClick={handleUpload} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Upload
      </button>
    </div>
  );
}


