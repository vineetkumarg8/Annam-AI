interface ProgressIndicatorProps {
  // status: 'idle' | 'loading' | 'success' | 'error' | 'paused' ;
  status: 'idle' | 'pending' | 'success' | 'error'

  progressPercent?: number;
  errorMessage?: string;
}

export default function ProgressIndicator({
  status,
  progressPercent = 0,
  errorMessage,
}: ProgressIndicatorProps) {
  return (
    <div className="p-4 border rounded-xl mt-4">
      {status === 'idle' && <p>Waiting for video upload...</p>}

      {status === 'loading' && (
        <>
          <p>Processing... {progressPercent}%</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </>
      )}

      {status === 'success' && <p className="text-green-600 font-semibold">Done!</p>}

      {status === 'error' && <p className="text-red-600">Error: {errorMessage}</p>}

      {status === 'paused' && <p>Paused</p>}
    </div>
  );
}
