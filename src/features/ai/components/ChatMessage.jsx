/**
 * ChatMessage.jsx
 * Renders one message bubble, styled differently for the user vs the
 * "AI". This is UI ONLY — there is no real model behind this response;
 * see AIAnalystPage.jsx for where the canned response text lives and
 * the TODO for real backend/AI integration.
 */
export default function ChatMessage({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
          ${isUser ? "bg-ink-900 text-white" : "bg-white border border-ink-900/8 text-ink-900"}`}
      >
        {content}
      </div>
    </div>
  );
}
