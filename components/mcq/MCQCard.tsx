interface MCQOption {
  id: string;
  text: string;
}

interface MCQ {
  question: string;
  options: MCQOption[];
  correctOptionId: string;
}

interface MCQCardProps {
  mcq: MCQ;
}

export default function MCQCard({ mcq }: MCQCardProps) {
  return (
    <div className="mb-6 p-4 border rounded shadow-sm">
      <h3 className="font-semibold mb-2">{mcq.question}</h3>
      <ul className="list-disc list-inside">
        {mcq.options.map(option => (
          <li
            key={option.id}
            className={option.id === mcq.correctOptionId ? 'font-bold text-green-600' : ''}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
