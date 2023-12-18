import { FormEvent, useEffect, useRef, useState } from "react";

// chats/:chatId
export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const webSocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    webSocket.current = new WebSocket("ws://localhost:8080/chats/5");
    webSocket.current.onopen = () => {
      console.log("WebSocket 연결!");
    };
    webSocket.current.onclose = (error) => {
      console.log(error);
    };
    webSocket.current.onerror = (error) => {
      console.log(error);
    };
    webSocket.current.onmessage = (event: MessageEvent) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      webSocket.current?.close();
    };
  }, []);

  const onSend = (e: FormEvent) => {
    e.preventDefault();

    const input = e.currentTarget.querySelector("input")!;

    if (webSocket.current?.readyState === WebSocket.OPEN) {
      webSocket.current.send(input.value);
    }

    input.value = "";
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <div>
        {messages?.map((message, index) => <div key={index}>{message}</div>)}
      </div>
      <form onSubmit={onSend}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ border: "1px solid black" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
