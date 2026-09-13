/**
 * SuggestedQuestions.jsx
 * Quick-start chips shown before the user has typed anything, so the
 * empty chat state suggests useful next actions instead of a blank box.
 */
const QUESTIONS = [
  "Why is my profit decreasing?",
  "Which menu item needs attention?",
  "Which ingredient affects my profit most?",
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUESTIONS.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="rounded-full border border-ink-900/15 bg-white px-3.5 py-2 text-sm text-ink-800 hover:border-gold-500 hover:text-gold-600"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
