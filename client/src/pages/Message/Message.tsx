import { useSocket } from '../../context/useSocketContext';
import { useEffect, ChangeEvent, useState } from 'react';
import Search from '../../components/Search/Search';
import { User } from '../../interface/User';
import { useAuth } from '../../context/useAuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { io, Socket } from 'socket.io-client';

interface Props {
  self: boolean;
  userID: string;
  hasNewMessages: boolean;
  username: string;
  userOB: User;
  email: string;
}

export default function Message(): JSX.Element {
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<Record<string, unknown>[]>(Object);
  const [userOnline, setUserOnline] = useState<Record<string, unknown>[]>(Object);

  const { loggedInUser } = useAuth();
  const { socket } = useSocket();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (socket === undefined) return <CircularProgress />;

  if (socket && loggedInUser) {
    socket.on('connect_error', (err) => {
      if (err.message === 'invalid user') {
        console.log('failed to connect');
      }
    });

    socket.on('users', (users) => {
      users.forEach((user: Props) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
      });
      setNewChatUser(users);
      console.log(newChatUser);

      const sortedUsers = users.sort((a: Props, b: Props) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setUserOnline(sortedUsers);
      console.log('Withing socket.on Users', userOnline);
    });

    // socket.on('user connected', (user: Props) => {
    //   initReactiveProperties(user);
    //   const newUser = userOnline;
    //   newUser.push(user);
    //   setUserOnline(newUser);
    // });

    socket.on('disconnect', () => {
      console.log(`disconnect`);
    });
  }

  useEffect(() => {
    console.log('users right here', userOnline);
  }, [userOnline]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      console.log(newChatUser);
    }
  };
  const initReactiveProperties = (user: Props) => {
    user.hasNewMessages = false;
  };

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <Grid>
      <Box>
        <Typography variant="h5">{!loggedInUser ? 'No user found' : loggedInUser.username}</Typography>
      </Box>
      <Box>
        <Typography variant="h5">Users</Typography>
        <Search search={search} handleChange={handleChange} />
      </Box>
    </Grid>
  );
}
