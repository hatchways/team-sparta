import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import AuthMenu from '../AuthMenu/AuthMenu';
import { AppBar, Button, Toolbar, ThemeProvider, Container } from '@material-ui/core';
import DashboardNav from '../DashboardNav/DashboardNav';
import Notification from '../Notification/Notification';
import { Link } from 'react-router-dom';
import Logo from '../../Images/logo.png';

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
          <Container>
            <Link to={'/'} className={classes.link}>
              <Button className={classes.navButton} color="inherit" variant="contained">
                <img className={classes.logo} src={Logo} alt={'Logo'} />
              </Button>
            </Link>
          </Container>
          <ThemeProvider<MyTheme>
            theme={(outerTheme) => ({
              ...outerTheme,
              border: '',
            })}
          >
            <DashboardNav to="/" primary="Discover" />
            <DashboardNav to="/message" primary="Message" />
            <DashboardNav to="/viewcontestsubmissions" primary="View Submissions" />
          </ThemeProvider>

          <Notification />
          <ThemeProvider<MyTheme>
            theme={(outerTheme) => ({
              ...outerTheme,
              border: '1px solid white',
            })}
          >
            <DashboardNav to="/contestForm" primary="Create Contest" />
            <DashboardNav to="/submission" primary="Create Submission" />
          </ThemeProvider>
          <div className={classes.account}>
            <AvatarDisplay loggedIn user={loggedInUser} />
            <Typography className={classes.userText} variant="h5">
              {'Account'}
            </Typography>
            <AuthMenu to="/profile" />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChatSideBanner;
