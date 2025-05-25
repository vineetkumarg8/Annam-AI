import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import fs from 'fs';
// Use native fetch in Node 18+, or install node-fetch for older versions
import fetch from 'node-fetch'; // or skip this if you're using native fetch

const router = Router();

router.post('/', async (req: any, res: any) => {
  if (!req.files || !req.files.video) {
    return res.status(400).json({ error: 'No video file uploaded' });
  }

  const video = req.files.video as UploadedFile;
  const uploadPath = path.join('uploads', video.name);

  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }

  try {
    await video.mv(uploadPath);
    console.log(`✅ Uploaded: ${video.name}`);

    // 1. Transcribe the audio using AI service
    const transcribeRes = await fetch('http://localhost:8000/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_path: uploadPath }),
    });

    // const { segments } = await transcribeRes.json();
    // const transcribeData: { segments: string[] } = await transcribeRes.json();
      const transcribeData = await transcribeRes.json() as { segments: string[] };

    // 2. Generate MCQs from transcript
    const mcqRes = await fetch('http://localhost:8000/generate-mcq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ transcript_segments: segments }),
      body: JSON.stringify({ transcript : transcribeData.segments }),
    });

    // const { mcqs } = await mcqRes.json();
    // const mcqData: { mcqs: { question: string; options: string[]; answer: string }[] } = await mcqRes.json();
    const mcqData = await mcqRes.json() as {
    mcqs: { question: string; options: string[]; answer: string }[];
    };
    // res.json({
    //   transcriptSegments: segments,
    //   mcqs,
    // });
    res.json({
  transcriptSegments: transcribeData.segments,
  mcqs: mcqData.mcqs,
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed or AI service error' });
  }
});

export default router;


