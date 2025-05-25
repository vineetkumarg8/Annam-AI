interface TranscriptSegmentProps {
  segment: string;
}

export default function TranscriptSegment({ segment }: TranscriptSegmentProps) {
  return (
    <div className="mb-4 p-3 border rounded bg-gray-50">
      <p>{segment}</p>
    </div>
  );
}
