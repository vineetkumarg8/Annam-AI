from pymongo import MongoClient
from datetime import datetime
import uuid

client = MongoClient("mongodb://localhost:27017")
db = client["annam"]
collection = db["transcripts"]

def save_transcript(video_id, duration, chunks):
    doc = {
        "video_id": video_id,
        "created_at": datetime.utcnow(),
        "duration": duration,
        "chunks": chunks
    }
    collection.insert_one(doc)
