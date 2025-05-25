from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["transcription_db"]
collection = db["transcripts"]

def get_transcript_by_video_id(video_id: str):
    results = collection.find({"video_id": video_id}).sort("start_time", 1)
    return [
        {
            "start_time": doc["start_time"],
            "end_time": doc["end_time"],
            "text": doc["text"]
        }
        for doc in results
    ]
