def split_transcript_by_interval(segments, interval_seconds=300):
    chunks = []
    current_chunk = []
    current_start = 0

    for segment in segments:
        if segment["start"] >= current_start + interval_seconds:
            chunks.append({
                "start_time": current_start,
                "end_time": segment["start"],
                "text": " ".join([s["text"] for s in current_chunk])
            })
            current_chunk = []
            current_start = segment["start"]

        current_chunk.append(segment)

    if current_chunk:
        chunks.append({
            "start_time": current_start,
            "end_time": current_chunk[-1]["end"],
            "text": " ".join([s["text"] for s in current_chunk])
        })

    return chunks
