import { Client } from "@stomp/stompjs";
import { useCallback, useState } from "react";

type ResData = {
  id: number;
  nickname: string;
  content: string;
};

export type MessageType = {
  id: number;
  isSent: boolean;
  content: string;
};

export const useStomp = (onMessage: (message: MessageType) => void) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const connectWS = useCallback(
    (chatRoomId: number) => {
      console.log("connecting to WS");
      return new Promise<void>((resolve) => {
        const client = new Client({
          brokerURL: `ws://localhost:8080/chats/${chatRoomId}`,
          onConnect: () => {
            client.subscribe(`/sub/chatrooms/${chatRoomId}`, (message) => {
              const data: ResData = JSON.parse(message.body);
              onMessage({
                id: data.id,
                content: data.content,
                isSent: true,
              });
            });
            resolve();
          },
        });

        client.activate();
        setStompClient(client);
      });
    },
    [onMessage]
  );

  const closeWS = useCallback(() => {
    if (stompClient) {
      stompClient.deactivate();
    }
  }, [stompClient]);

  const sendMessage = useCallback(
    (message: string, chatroomId: number) => {
      if (stompClient) {
        stompClient.publish({
          destination: `/pub/chatrooms/${chatroomId}`,
          body: JSON.stringify({ nickname: "bakka", content: message }),
        });
      }
    },
    [stompClient]
  );

  return { connectWS, closeWS, sendMessage, stompClient };
};
