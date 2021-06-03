import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory, Switch, Route } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect } from 'react';
import Discover from '../Discover/Discover';
import Message from '../Message/Message';
import Profile from '../Profile/Profile';
import Submission from '../Submission/Submission';
import Contest from '../Contest/Contest';
import EditProfile from '../Profile/EditProfile/EditProfile';
import ContestForm from '../Contest/ContestForm/ContestForm';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container item xs={12} sm={12} md={12} component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper}>
        <ChatSideBanner loggedInUser={loggedInUser} />
        <Switch>
          <Route exact path="/dashboard/discover">
            <Discover />
          </Route>
          <Route exact path="/dashboard/message">
            <Message />
          </Route>
          <Route exact path="/dashboard/profile">
            <Profile />
          </Route>
          <Route exact path="/dashboard/editProfile">
            <EditProfile />
          </Route>
          <Route exact path="/dashboard/contest">
            <Contest />
          </Route>
          <Route exact path="/dashboard/contestForm">
            <ContestForm />
          </Route>
          <Route exact path="/dashboard/submission">
            <Submission />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}
