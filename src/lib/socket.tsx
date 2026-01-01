// lib/socket.ts
import { io, Socket } from 'socket.io-client';

// This only runs ONCE when the app starts
export const socket: Socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000', {
  transports: ['websocket'],
  autoConnect: false, // Don't connect until we have a userId
});