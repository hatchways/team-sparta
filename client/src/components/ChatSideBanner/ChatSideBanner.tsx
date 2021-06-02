import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import AuthMenu from '../AuthMenu/AuthMenu';
import { AppBar, Toolbar, ThemeProvider } from '@material-ui/core';
import DashboardNav from '../DashboardNav/DashboardNav';
import Notification from '../Notification/Notification';

interface Props {
  loggedInUser: User;
}
interface MyTheme {
  border: string;
}

const ChatSideBanner = ({ loggedInUser }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.chatSideBanner}>
      <AppBar className={classes.toolBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            T A T T O O &nbsp; A R T
          </Typography>
          <ThemeProvider<MyTheme>
            theme={(outerTheme) => ({
              ...outerTheme,
              border: '',
            })}
          >
            <DashboardNav to="/dashboard/discover" primary="Discover" />
            <DashboardNav to="/dashboard/message" primary="Message" />
          </ThemeProvider>

          <Notification />
          <ThemeProvider<MyTheme>
            theme={(outerTheme) => ({
              ...outerTheme,
              border: '1px solid white',
            })}
          >
            <DashboardNav to="/dashboard/contest" primary="Create Contest" />
          </ThemeProvider>
          <div className={classes.account}>
            <AvatarDisplay loggedIn user={loggedInUser} />
            <Typography className={classes.userText} variant="h5">
              {loggedInUser.username}
            </Typography>
            <AuthMenu to="/dashboard/profile" />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChatSideBanner;
