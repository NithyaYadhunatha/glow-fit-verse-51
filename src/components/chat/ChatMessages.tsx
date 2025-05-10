
import { Message } from "../../pages/Chat";
import { useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Robot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
}

export const ChatMessages = ({ messages, loading }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === "user"
                  ? "bg-glow-green/20 border border-glow-green/40"
                  : "bg-black/30 border border-gray-700"
              }`}
            >
              {message.sender === "bot" && (
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center mr-2">
                    <Robot className="text-glow-green" size={12} />
                  </div>
                  <span className="text-xs text-gray-400">AI Assistant</span>
                </div>
              )}
              
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              
              <div className="text-xs text-gray-500 mt-1 text-right">
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl p-3 bg-black/30 border border-gray-700">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center mr-2">
                  <Robot className="text-glow-green" size={12} />
                </div>
                <span className="text-xs text-gray-400">AI Assistant</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-glow-green animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-glow-green animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-glow-green animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
