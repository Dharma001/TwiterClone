// src/hooks/useWebSocket.ts
import { useEffect, useState } from 'react';
import { WebSocketMessage, ConnectionStatus } from '../types/websocket';

const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('Connecting...');
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      setConnectionStatus('Connected');
    };

    socket.onmessage = (event) => {
      const response: WebSocketMessage = JSON.parse(event.data);
      console.log('Received from server:', response);
      setMessages((prevMessages) => [...prevMessages, response]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Connection failed. Please try again later.');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionStatus('Disconnected. Attempting to reconnect...');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (message: WebSocketMessage) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected. Please try again later.');
    }
  };

  return { ws, connectionStatus, messages, sendMessage };
};

export default useWebSocket;
