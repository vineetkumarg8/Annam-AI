from fastapi import APIRouter
from app.services.transcript_fetcher import get_transcript_by_video_id

router = APIRouter()

@router.get("/transcript/{video_id}")
def fetch_transcript(video_id: str):
    transcript = get_transcript_by_video_id(video_id)
    if not transcript:
        return {"message": "Transcript not found", "segments": []}
    return {"video_id": video_id, "segments": transcript}
