import react, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Chip, Avatar } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import useStyles from './useStyles';

import { contest, contests } from '../../interface/tempContestData';
// mock data for now
const submissions = [
  { img: 'https://source.unsplash.com/random', author: 'freddy', title: 'hello' },
  { img: 'https://source.unsplash.com/1600x900/?nature,water', author: 'Roberta', title: 'Lion Tattoo' },
  { img: 'https://source.unsplash.com/1600x900/?lions,tigers', author: 'Carlos', title: 'My Submission' },
  { img: 'https://source.unsplash.com/1600x900/?tattoo,plants', author: 'Wendy', title: 'Pick Me!' },
  { img: 'https://source.unsplash.com/1600x900/?plane,eyes', author: 'Frank', title: 'Fly away' },
  { img: 'https://source.unsplash.com/1600x900/?comet,hello', author: 'jojoe', title: 'indiana jones' },
  { img: 'https://source.unsplash.com/1600x900/?space,fire', author: 'miranda', title: 'contest time' },
  { img: 'https://source.unsplash.com/1600x900/?grim,reaper', author: 'Sarah', title: 'you are my friend' },
  { img: 'https://source.unsplash.com/1600x900/?brazil,country', author: 'Paul', title: 'what is up' },
  { img: 'https://source.unsplash.com/1600x900/?forest,fight', author: 'Milad', title: 'hello' },
  { img: 'https://source.unsplash.com/1600x900/?tank,fighter', author: 'Carlos', title: 'hello' },
];

export default function ViewContestSubmissions(): JSX.Element {
  const classes = useStyles();
  const [contestCard, setContestCard] = useState<contest>(Object);
  const [winnerIndex, setWinnerIndex] = useState(Number);

  //   pulling dummy data for now
  const handleContest = () => {
    setContestCard(contests[0]);
  };

  useEffect(() => {
    handleContest();
  }, [contestCard]);

  //   this is the grossest thing i've ever coded but it's just there to test functionality
  useEffect(() => {
    setWinnerIndex(999);
  }, []);

  const handleWinnerIndex = (index: number) => {
    setWinnerIndex(index);
    console.log(winnerIndex);
  };

  const renderImageList = (): JSX.Element[] => {
    return submissions.map((tile, index) => {
      return (
        <GridListTile key={index}>
          <img src={tile.img} alt={tile.title} />
          <GridListTileBar
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
            actionIcon={
              index === winnerIndex ? (
                <IconButton
                  key={index}
                  aria-label={`info about ${tile.title}`}
                  onClick={() => handleWinnerIndex(index)}
                  className={classes.icon}
                >
                  <Chip label="Winner"></Chip>
                </IconButton>
              ) : (
                <IconButton
                  key={index}
                  aria-label={`info about ${tile.title}`}
                  onClick={() => handleWinnerIndex(index)}
                  className={classes.icon}
                >
                  <AddCircleOutlineIcon />
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
        <Grid container direction="row" spacing={2}>
          <Grid className={classes.authorInfo} item>
            <Avatar alt={contestCard.creator} src={contestCard.images} />
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.authorInfo} color="textPrimary">
              By {contestCard.creator}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box boxShadow={1} className={classes.submissionsBox}>
        <Grid container justify="center" className={classes.contestImages}>
          <GridList cellHeight={300} cols={4} spacing={30} className={classes.imageGridList}>
            {renderImageList()}
          </GridList>
        </Grid>
      </Box>
    </Grid>
  );
}
