import {
  AppBar,
  Avatar,
  Button,
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import ListView from '../../components/ListView/ListView';
import { getContestsByUser } from '../../helpers/APICalls/contest';
import { Contest } from '../../interface/Contest';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';

export default function Profile(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [userContests, setUserContests] = useState<[Contest]>();
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined) return <CircularProgress />;

  const MyTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#3d3d3d',
      },
    },
  });

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
  };

  const handleInProg = () => {
    return userContests ? userContests.filter((e) => new Date(e.end_date) > new Date()) : [];
  };

  const handleComp = () => {
    return userContests ? userContests.filter((e) => new Date(e.end_date) < new Date()) : [];
  };

  useEffect(() => {
    async function fetchContestsForUser() {
      const response = await getContestsByUser();

      if (response) {
        const contests = response.contests;
        setUserContests(contests);
      }
    }

    fetchContestsForUser();
  }, []);

  return (
    <Grid className={classes.profileContent} container direction="column" alignItems="center">
      <Avatar
        className={classes.userImage}
        alt="Profile Image"
        src={`https://robohash.org/${!loggedInUser ? 'loading' : loggedInUser.email}.png`}
      />
      <Typography className={classes.userName}>{!loggedInUser ? 'loading' : loggedInUser.username}</Typography>
      <Link to={'/dashboard/EditProfile'} className={classes.link}>
        <Button className={classes.button} color="inherit" variant="contained" disableElevation>
          Edit Profile
        </Button>
      </Link>
      <Box className={classes.tabContainer}>
        <AppBar className={classes.tabBar} position="static" elevation={0}>
          <ThemeProvider theme={MyTheme}>
            <Tabs
              className={classes.tabs}
              value={value}
              onChange={handleChange}
              textColor="primary"
              variant="fullWidth"
              aria-label="User Content tabs"
            >
              <Tab className={classes.tab} label="IN PROGRESS" />
              <Tab className={classes.tab} label="COMPLETED" />
              <Tab className={classes.tab} label="SUBMISSIONS" />
            </Tabs>
          </ThemeProvider>
        </AppBar>
        <Paper elevation={2} square>
          <TabPanel value={value} index={0}>
            <ListView data={handleInProg()} message={'No Contest In Progress'} route={'/dashboard/contest'} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ListView data={handleComp()} message={'No Contest Completed'} route={'/dashboard/contest'} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Submission stuff
          </TabPanel>
        </Paper>
      </Box>
    </Grid>
  );
}
