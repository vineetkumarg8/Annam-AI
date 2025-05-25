# from fastapi import APIRouter

# router = APIRouter()

# @router.post("/generate-mcq")
# def generate_mcq():
#     return {"message": "MCQ generated"}


from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
from app.services.mcq_generator import generate_mcqs_from_transcript

router = APIRouter()

class MCQRequest(BaseModel):
    transcript: List[str]

@router.post("/generate-mcq")
def generate_mcq(req: MCQRequest):
    mcqs = generate_mcqs_from_transcript(req.transcript)
    return {"mcqs": mcqs}

