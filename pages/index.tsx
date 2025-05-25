import { useState } from 'react';
import VideoUpload from '../components/upload/VideoUpload';
import { useUpload } from '../hooks/useUpload';
import ProgressIndicator from '../components/progress/ProgressIndicator';
import TranscriptSegment from '../components/transcript/TranscriptSegment';
import MCQCard from '../components/mcq/MCQCard';

export default function Home() {
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [transcriptSegments, setTranscriptSegments] = useState<string[]>([]);
  const [mcqs, setMcqs] = useState<any[]>([]);
  

  const uploadMutation = useUpload();
  
  const handleUpload = (file: File) => {
    setUploadedFile(file);
    uploadMutation.mutate(file, {
      onSuccess(data) {
        // Assume backend returns these
        setTranscriptSegments(data.transcriptSegments);
        setMcqs(data.mcqs);
      },
      onError(error) {
        alert(`Upload failed: ${error.message}`);
      },
    });
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lecture Video MCQ Generator</h1>

      <VideoUpload onUpload={handleUpload} />
      {uploadedFile && (
      <p className="mt-2 text-sm text-gray-600">
        Uploaded file: <strong>{uploadedFile.name}</strong>
      </p>
    )}

        <ProgressIndicator
        status={uploadMutation.status} // status: 'idle' | 'pending' | 'error' | 'success'
        progressPercent={uploadMutation.status === 'pending' ? 50 : 100}
        errorMessage={uploadMutation.error?.message}
      />

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Transcript Segments</h2>
        {transcriptSegments.map((segment, i) => (
          <TranscriptSegment key={i} segment={segment} />
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Generated MCQs</h2>
        {mcqs.map((mcq, i) => (
          <MCQCard key={i} mcq={mcq} />
        ))}
      </div>
    </div>
  );

  
}
