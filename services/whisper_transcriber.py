from faster_whisper import WhisperModel

model = WhisperModel("base", compute_type="float32",device="cpu")

def transcribe_audio_file(file_path: str):
    segments, info = model.transcribe(file_path, beam_size=5, word_timestamps=False)
    
    transcript_data = []
    for segment in segments:
        transcript_data.append({
            "start": segment.start,
            "end": segment.end,
            "text": segment.text.strip()
        })
    
    return {
        "duration": info.duration,
        "segments": transcript_data
    }

