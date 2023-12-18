import { useNavigate } from "react-router-dom";

export default function MyChatsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>MyChatsPage</h1>
      <button onClick={() => navigate("/chats/5")}>Chatroom 5</button>
    </div>
  );
}
