from fastapi import FastAPI
from app.routes import transcribe, generate_mcq , transcript

# from app.routes.transcribe import router as transcribe_router
# from app.routes.generate_mcq import router as mcq_router

app = FastAPI()
app.include_router(transcribe.router)
app.include_router(generate_mcq.router)
app.include_router(transcript.router)
