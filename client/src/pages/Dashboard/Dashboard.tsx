import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import Discover from '../Discover/Discover';
import Message from '../Message/Message';
import Profile from '../Profile/Profile';
import Submission from '../Submission/Submission';
import Contest from '../Contest/Contest';
import EditProfile from '../Profile/EditProfile/EditProfile';
import ViewContestSubmissions from '../ViewContestSubmissions/ViewContestSubmissions';
import ContestForm from '../Contest/ContestForm/ContestForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { io, Socket } from 'socket.io-client';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const { socket } = useSocket();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser && socket) {
    socket.auth = { loggedInUser };
    socket.connect();
    console.log('Connected');
  }

  useEffect(() => {
    const sessionID = localStorage.getItem('sessionID');
    if (socket && loggedInUser) {
      if (sessionID) {
        socket.auth = { sessionID };
        socket.connect();
      }
      console.log('its connecting again');

      socket.on('session', ({ sessionID, userID }) => {
        socket.auth = { sessionID };
        localStorage.setItem('sessionID', sessionID);
        socket.userID = userID;
      });
    }
  }, [socket, loggedInUser]);

  if (loggedInUser === undefined) return <CircularProgress />;

  return (
    <Grid container item xs={12} sm={12} md={12} component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper}>
        {!loggedInUser ? (
          <AuthHeader linkTo="/login" btnText="SIGN IN" />
        ) : (
          <ChatSideBanner loggedInUser={loggedInUser} />
        )}
        <Switch>
          <Route exact path="/">
            <Discover />
          </Route>
          <ProtectedRoute exact path="/message" loggedInUser={loggedInUser} component={Message} />
          <ProtectedRoute exact path="/profile" loggedInUser={loggedInUser} component={Profile} />
          <ProtectedRoute exact path="/editProfile" loggedInUser={loggedInUser} component={EditProfile} />
          <ProtectedRoute exact path="/contest" loggedInUser={loggedInUser} component={Contest} />
          <ProtectedRoute exact path="/contestForm" loggedInUser={loggedInUser} component={ContestForm} />
          <ProtectedRoute exact path="/submission" loggedInUser={loggedInUser} component={Submission} />
          <ProtectedRoute
            exact
            path="/viewcontestsubmissions"
            loggedInUser={loggedInUser}
            component={ViewContestSubmissions}
          />
          {loggedInUser ? (
            <Route path="*">
              <Redirect to="/" />
            </Route>
          ) : (
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          )}
        </Switch>
      </Grid>
    </Grid>
  );
}
