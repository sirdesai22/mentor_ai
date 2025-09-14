import ChatUI from "@/hooks/chat_webllm";
import { MLCEngine } from "@mlc-ai/web-llm";
import { MessageSquare, HelpCircle, Send } from "lucide-react";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  skill: any;
  level: any;
};

export const ChatComponent = ({ skill, level }: Props) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Chat UI
  const [messages, setMessages] = useState<{ kind: string; text: string }[]>(
    [],
  );
  const [prompt, setPrompt] = useState("");
  const [runtimeStats, setRuntimeStats] = useState("");
  const [chat_ui] = useState(new ChatUI(new MLCEngine()));

  const updateMessage = (kind: string, text: string, append: boolean) => {
    if (kind == "init") {
      text = "[System Initialize] " + text;
      console.log("System Initialize", text);
    }
    
    setMessages(prevMessages => {
      const msgCopy = [...prevMessages];
      if (msgCopy.length == 0 || append) {
        return [...msgCopy, { kind, text }];
      } else {
        msgCopy[msgCopy.length - 1] = { kind, text };
        return [...msgCopy];
      }
    });
  };


  const handleSendMessage = () => {
    if (!prompt.trim()) return;
    const userMessage = { kind: "right", text: prompt };
    setMessages(prev => [...prev, userMessage]);
    const contextualPrompt = `Please provide a concise response in exactly 200 words or less. ${prompt}`;
    chat_ui
      .onGenerate(contextualPrompt, updateMessage, setRuntimeStats)
      .catch((error) => console.log(error));
    setPrompt("");
  };

//scroll to bottom
useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [messages]);

  return (
    <aside className="w-full md:w-96 lg:w-[420px] bg-gray-800 border-l border-gray-700 flex flex-col flex-shrink-0 max-h-full">
      {" "}
      <div className="p-4 border-b border-gray-700 flex items-center flex-shrink-0">
        <MessageSquare className="h-6 w-6 text-blue-400 mr-3" />
        <h2 className="text-lg font-semibold">AI Instructor</h2>
      </div>
      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.kind === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.kind === "right"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-200 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isAiTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-xl bg-gray-700 text-gray-200 rounded-bl-none">
              <p className="text-sm flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> AI is
                typing...
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Suggested Questions */}
      {skill.roadMap[parseInt(level as string) - 1].suggestedQuestions &&
        skill.roadMap[0].suggestedQuestions.length > 0 &&
        messages.filter((m) => m.kind === "right").length < 2 && ( // Show initially or if user hasn't asked much
          <div className="p-4 border-t border-gray-700 flex-shrink-0">
            <h4 className="text-xs text-gray-400 mb-2 font-medium">
              Some questions you might have:
            </h4>
            <div className="space-y-1.5">
              {skill.roadMap[0].suggestedQuestions.map((q: any, i: any) => (
                <button
                  key={i}
                  onClick={() => {
                    const contextualPrompt = `Please provide a concise response in exactly 200 words or less. ${q}`;
                    chat_ui
                      .onGenerate(contextualPrompt, updateMessage, setRuntimeStats)
                      .catch((error) => console.log(error));
                  }}
                  className="w-full text-left text-xs p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-blue-300 transition-colors flex items-center"
                  disabled={isAiTyping}
                >
                  <HelpCircle className="h-3.5 w-3.5 mr-2 flex-shrink-0 text-gray-500" />{" "}
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      {/* Chat Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 flex-shrink-0 mb-20">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Ask AI anything about the lesson..."
            className="flex-1 p-2.5 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
            disabled={!prompt.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};