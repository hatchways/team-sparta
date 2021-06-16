import { useState, useContext, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocket extends Socket {
  userID?: string;
}

interface ISocketContext {
  socket: ISocket | undefined;
  initSocket: () => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  const initSocket = useCallback(() => {
    console.log('trying to connect');
    setSocket(
      io('/', {
        withCredentials: true,
        autoConnect: false,
      }),
    );
    if (socket) {
      socket?.onAny((event, ...args) => {
        console.log(event, args);
      });
    }
  }, []);

  console.log(socket);
  return <SocketContext.Provider value={{ socket, initSocket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
