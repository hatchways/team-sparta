import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Chip, Button } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { useAuth } from '../../context/useAuthContext';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { getContestById } from '../../helpers/APICalls/contest';
import { useParams } from 'react-router-dom';
import { Contest } from '../../interface/Contest';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';

interface RouteParams {
  id: string;
}

interface sub {
  files: string[];
  _id: string;
  creator: string;
}

export default function Contestt(): JSX.Element {
  const classes = useStyles();
  const [contestCard, setContestCard] = useState<Contest>(Object);
  const [submissions, setSubmissions] = useState<[sub]>();
  const [winnerIndex, setWinnerIndex] = useState(-1);
  const [tempIndex, setTempIndex] = useState(0);
  const [contestEnded, setContestEnded] = useState(false);
  const [openModal, setModal] = useState(false);

  const { loggedInUser } = useAuth();

  const params = useParams<RouteParams>();

  const handleModalClose = () => {
    setModal(false);
  };

  useEffect(() => {
    async function fetchContestById() {
      const response = await getContestById(params.id);

      if (response) {
        const contest = response.contest;
        console.log('response', contest);
        if (contest) {
          setContestCard(contest);
          if (moment.utc(contest.end_date).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')) {
            setContestEnded(true);
          }
          if (contest.submissions) {
            console.log('contest submissions', contest.submissions);
            setSubmissions(contest.submissions);
          }
        }
      }
    }
    fetchContestById();
  }, [params]);

  if (loggedInUser === undefined) return <CircularProgress />;
  const handleWinnerIndex = (index: number) => {
    setTempIndex(index);
    setModal(true);
    console.log('card', contestCard);
    console.log('choose winner', contestEnded);
  };

  //This is a work in progress will be changed in next PR
  const selectWinner = async () => {
    console.log(tempIndex);

    const response = await fetch('/contest/winner');
    console.log('response', response);
  };

  const renderImageList = (): JSX.Element[] | JSX.Element => {
    return submissions && submissions.length > 0 ? (
      submissions.map((tile, index) => (
        <GridListTile key={index}>
          <img src={tile.files[0]} />
          <GridListTileBar
            actionIcon={
              index >= 0 && index === winnerIndex ? (
                <IconButton key={index} onClick={() => handleWinnerIndex(index)} className={classes.icon}>
                  <Chip className={classes.winnerTag} label="Winner"></Chip>
                </IconButton>
              ) : (
                <IconButton
                  disabled={!contestEnded}
                  key={index}
                  onClick={() => handleWinnerIndex(index)}
                  className={classes.icon}
                >
                  <EmojiEventsIcon />
                </IconButton>
              )
            }
          />
        </GridListTile>
      ))
    ) : (
      <div>No Submissions</div>
    );
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
              {contestCard.description}
            </Typography>
          </Grid>

          {contestCard.creator !== loggedInUser?.id ? (
            <Grid item>
              <Button
                component={Link}
                to={{
                  pathname: '/submission',
                  state: {
                    contest: contestCard,
                    user: loggedInUser ? loggedInUser : null,
                  },
                }}
                className={classes.accBtn}
                color="inherit"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Box>
      {contestCard.creator === loggedInUser?.id ? (
        <React.Fragment>
          {contestEnded && (
            <Typography style={{ marginTop: '30px' }}>Winner can be selected by clicking submission</Typography>
          )}
          <Grid container justify="center" className={classes.contestImages}>
            <GridList cellHeight={300} cols={4} spacing={30} className={classes.imageGridList}>
              {renderImageList()}
            </GridList>
          </Grid>
          <Modal open={openModal} onBackdropClick={handleModalClose}>
            <Grid container className={classes.modalContainer}>
              <Typography>Confirm Winning Submission</Typography>
              <Grid item>
                <Button
                  type="button"
                  onClick={selectWinner}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  onClick={handleModalClose}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  No
                </Button>
              </Grid>
            </Grid>
          </Modal>
        </React.Fragment>
      ) : null}
    </Grid>
  );
}
