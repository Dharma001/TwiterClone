import WebSocket from 'ws';
import { UserAuthController } from '../controllers/user-auth-controller';

export const setupWebSocket = (wss: WebSocket.Server) => {
    const userAuthController = new UserAuthController();

    wss.on('connection', (ws: WebSocket) => {
        console.log('New WebSocket connection established');

        ws.on('message', async (message: string) => {
            try {
                const data = JSON.parse(message);

                switch (data.action) {
                case 'registerValidate':
                    userAuthController.validateRegister(data.payload , ws);
                    break;
                case 'validateOtp':
                    userAuthController.validateOtp(data.payload , ws);
                    break;
                default:
                    ws.send(JSON.stringify({ success: false, message: 'Unknown action' }));
                }
            } catch (error) {
                console.error('Error handling message:', error);
                ws.send(JSON.stringify({ success: false, message: 'Invalid message format or internal error' }));
            }
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });
};
