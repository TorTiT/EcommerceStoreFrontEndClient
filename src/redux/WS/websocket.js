import { toast } from "react-toastify";

const socket = new WebSocket("ws://localhost:8000");

socket.onopen = () => {
  console.log("WebSocket connected");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "notification") {
    toast.info(data.message);
  }
};

socket.onclose = () => {
  console.log("WebSocket disconnected");
};

export default socket;
