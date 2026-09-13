/**
 * AIAnalystPage.jsx
 *
 * PURPOSE:
 * UI ONLY. This page looks and feels like a chat with an AI analyst,
 * but every response is a hardcoded string keyed off the question text —
 * there is no model call here. That's intentional per the brief: the
 * frontend shape is ready, the intelligence isn't wired up yet.
 *
 * // TODO: Connect this page to Laravel backend and AI service.
 * When that happens, `getCannedResponse` below is what gets replaced by
 * a real api/ai.js call (e.g. POST /api/ai/ask { question }), and the
 * loading delay becomes a real network request.
 */
import { useState } from "react";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import ChatMessage from "./components/ChatMessage.jsx";
import SuggestedQuestions from "./components/SuggestedQuestions.jsx";

const CANNED_RESPONSES = {
  "Why is my profit decreasing?":
    "Your profit decreased mainly because chicken prices increased by 14%. This affected two menu items: Chicken Burger and Chicken Kabab.",
  "Which menu item needs attention?":
    "Chicken Kabab has the lowest margin at 39%, and it's trending down as chicken and rice prices rise. Consider a small price adjustment.",
  "Which ingredient affects my profit most?":
    "Chicken has the largest impact — it's used in 2 of your 4 menu items and has had the biggest recent price increase.",
};

const DEFAULT_RESPONSE =
  "I don't have a specific answer for that yet — try one of the suggested questions, or ask about profit, margin, or a specific ingredient.";

export default function AIAnalystPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  function sendQuestion(question) {
    if (!question.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setIsThinking(true);

    // Simulated "thinking" delay so the UI feels like a real chat.
    // TODO: replace with an actual await call to the AI service.
    setTimeout(() => {
      const reply = CANNED_RESPONSES[question] || DEFAULT_RESPONSE;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setIsThinking(false);
    }, 600);
  }

  return (
    <div>
      <PageHeader title="AI Food Business Analyst" description="Ask plain-language questions about your food costs." />

      <Card className="flex h-[65vh] flex-col" padded={false}>
        <div className="flex-1 space-y-3 overflow-y-auto p-5 sm:p-6">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="text-sm text-ink-700/60">Ask a question, or try one of these:</p>
              <SuggestedQuestions onSelect={sendQuestion} />
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage key={index} role={message.role} content={message.content} />
          ))}
          {isThinking && <ChatMessage role="assistant" content="Thinking..." />}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendQuestion(input);
          }}
          className="flex items-center gap-2 border-t border-ink-900/8 p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your food costs..."
            className="flex-1 rounded-lg border border-ink-900/15 px-3.5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          />
          <Button type="submit">Send</Button>
        </form>
      </Card>
    </div>
  );
}
