import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import { connectToDatabase, disconnectDatabase } from './utils/database';
import http from 'http';
import passport from './config/passport-setup';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { randomBytes } from 'crypto';
<<<<<<< HEAD
import WebSocket from 'ws';
import { setupWebSocket } from './websocket/websocket'; 
=======
>>>>>>> 7ea5e2c15d34d5d795a1b4dbcdfe5a998bdde8a8

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const WS_PORT = process.env.WS_PORT || 5001;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' });
});

const generateSecretKey = () => {
    return randomBytes(32).toString('hex');
};

<<<<<<< HEAD
const wss = new WebSocket.Server({ port: 5001 });
setupWebSocket(wss);

=======
>>>>>>> 7ea5e2c15d34d5d795a1b4dbcdfe5a998bdde8a8
const sessionMiddleware = session({
    secret: generateSecretKey(), // Use a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        httpOnly: true, // Prevents JavaScript access to the cookie
        sameSite: 'lax', // CSRF protection
        maxAge: 1000 * 60 * 60, // Cookie expiration time (1 hour)
    },
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);

const startServer = async (): Promise<void> => {
    try {
        await connectToDatabase();
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });

        const gracefulShutdown = async (): Promise<void> => {
            console.log('🛑 Shutting down the server...');
            await disconnectDatabase();
            server.close(() => {
                console.log('🚪 Server shut down gracefully.');
                process.exit(0);
            });
        };

        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
    } catch (error: unknown) {
        console.error('❌ Error starting server:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

startServer();
