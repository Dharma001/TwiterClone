export interface WebSocketMessage {
  action: string;
  payload?: object;
  statusCode?: number;
  success?: boolean;
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}

export type ConnectionStatus = 
  | 'Connecting...'
  | 'Connected'
  | 'Disconnected'
  | 'Connection failed. Please try again later.'
  | 'Disconnected. Attempting to reconnect...';
