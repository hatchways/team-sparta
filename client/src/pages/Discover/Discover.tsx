import { Button, Grid, Typography, GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Contest } from '../../interface/Contest';
import { useAuth } from '../../context/useAuthContext';
import { getAllContests } from '../../helpers/APICalls/contest';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import useStyles from './useStyles';

export default function Discovery(): JSX.Element {
  const [allContests, setAllContests] = useState<[Contest]>();
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    async function fetchAllContests() {
      const response = await getAllContests();

      if (response) {
        const contests = response.contests;
        setAllContests(contests);
        if (allContests) {
          console.log(allContests);
        }
      }
    }
    fetchAllContests();
  }, []);

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item>
        <Typography className={classes.title}>Current Contests</Typography>
      </Grid>
      <Grid container item className={classes.listContainer}>
        <GridList cellHeight={300} className={classes.contestGrid}>
          {allContests ? (
            allContests.map((contest) => (
              <GridListTile key={contest._id} cols={contest.price >= 300 ? 2 : 1} rows={contest.price >= 300 ? 2 : 1}>
                {loggedInUser ? (
                  <Button
                    component={Link}
                    to={`/contest/${contest._id}`}
                    fullWidth={true}
                    disableElevation={true}
                    className={classes.link}
                  >
                    <img src={contest.images[0]} alt={contest.title} className={classes.contestImage} />
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to={'/login'}
                    fullWidth={true}
                    disableElevation={true}
                    className={classes.link}
                  >
                    <img src={contest.images[0]} alt={contest.title} className={classes.contestImage} />
                  </Button>
                )}
                <GridListTileBar
                  title={`$${contest.price}`}
                  titlePosition="bottom"
                  subtitle={contest.title}
                  actionIcon={
                    <IconButton aria-label={`star ${contest.title}`}>
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </GridListTile>
            ))
          ) : (
            <CircularProgress />
          )}
        </GridList>
      </Grid>
    </Grid>
  );
}
