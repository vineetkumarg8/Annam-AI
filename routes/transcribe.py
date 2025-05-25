from fastapi import APIRouter, UploadFile, File
from app.services.whisper_transcriber import transcribe_audio_file
from app.services.split_transcript import split_transcript_by_interval
from app.services.transcript_saver import save_transcript
import uuid, os

router = APIRouter()

@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    filename = f"temp_{uuid.uuid4()}.mp3"
    with open(filename, "wb") as f:
        f.write(await file.read())

    result = transcribe_audio_file(filename)  # returns {segments: [...], duration: float}
    os.remove(filename)

    video_id = str(uuid.uuid4())
    chunks = split_transcript_by_interval(result["segments"], interval_seconds=300)
    save_transcript(video_id, file.filename, chunks, result["duration"])

    return {"video_id": video_id, "message": "Transcript saved successfully"}
