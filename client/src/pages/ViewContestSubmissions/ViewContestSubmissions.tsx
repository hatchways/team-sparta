import react, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Chip, Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { useAuth } from '../../context/useAuthContext';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';

import { Submissions } from '../../interface/tempSubmissionData';
import { getContestById } from '../../helpers/APICalls/contest';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Contest } from '../../interface/Contest';

interface RouteParams {
  id: string;
}

export default function ViewContestSubmissions(): JSX.Element {
  const classes = useStyles();
  const [contestCard, setContestCard] = useState<Contest>(Object);
  const [winnerIndex, setWinnerIndex] = useState(-1);
  const { loggedInUser } = useAuth();

  const params = useParams<RouteParams>();

  useEffect(() => {
    async function fetchContestById() {
      const response = await getContestById(params.id);

      if (response) {
        const contest = response.contest;
        if (contest) {
          setContestCard(contest);
        }
      }
    }
    fetchContestById();
  }, [params]);
  if (contestCard && loggedInUser) {
  }
  if (loggedInUser === undefined) return <CircularProgress />;
  const handleWinnerIndex = (index: number) => {
    setWinnerIndex(index);
  };

  const renderImageList = (): JSX.Element[] => {
    return Submissions.map((tile, index) => {
      return (
        <GridListTile key={index}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
            actionIcon={
              index >= 0 && index === winnerIndex ? (
                <IconButton
                  key={index}
                  aria-label={`info about ${tile.title}`}
                  onClick={() => handleWinnerIndex(index)}
                  className={classes.icon}
                >
                  <Chip className={classes.winnerTag} label="Winner"></Chip>
                </IconButton>
              ) : (
                <IconButton
                  key={index}
                  aria-label={`info about ${tile.title}`}
                  onClick={() => handleWinnerIndex(index)}
                  className={classes.icon}
                >
                  <EmojiEventsIcon />
                </IconButton>
              )
            }
          />
        </GridListTile>
      );
    });
  };

  return (
    <Grid container spacing={5} direction="column" className={classes.root}>
      <Box className={classes.contestBox}>
        <Grid item>
          <Typography variant="h4" color="textPrimary">
            {contestCard.title}
            <Chip label={`$${contestCard.price}`} className={classes.prizeTag}></Chip>
          </Typography>
        </Grid>
        <Grid container className={classes.submitButton}>
          <Grid className={classes.authorInfo} item>
            <Typography className={classes.creatorName} variant="h6" color="textPrimary">
              By {contestCard.creator}
            </Typography>
          </Grid>
          {contestCard.creator !== loggedInUser?.id ? (
            <Grid item>
              <Button component={Link} to="/submission" className={classes.accBtn}>
                Submit
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Box>
      {contestCard.creator === loggedInUser?.id ? (
        <Box boxShadow={1} className={classes.submissionsBox}>
          <Grid container justify="center" className={classes.contestImages}>
            <GridList cellHeight={300} cols={4} spacing={30} className={classes.imageGridList}>
              {renderImageList()}
            </GridList>
          </Grid>
        </Box>
      ) : null}
    </Grid>
  );
}
