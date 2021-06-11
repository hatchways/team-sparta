import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { Button, Input, InputAdornment, TextField, GridList, GridListTile } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { IContestFields, IContestErrors } from '../../../interface/Contest';

//This array is for demo purposes only will be changed later to grab images from AWS server
const list: string[] = [
  'https://picsum.photos/id/1/200/300',
  'https://picsum.photos/id/2/200/300',
  'https://picsum.photos/id/12/200/300',
  'https://picsum.photos/id/22/200/300',
  'https://picsum.photos/id/55/200/300',
  'https://picsum.photos/id/7/200/300',
  'https://picsum.photos/id/4/200/300',
  'https://picsum.photos/id/8/200/300',
  'https://picsum.photos/id/100/200/300',
];

const ContestForm: React.FC = () => {
  //Same thing with the handlesubmit this will be changed somewhat when
  // it comes time for integration frontend to backend
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setErrors({
      title: false,
      description: false,
      prize: false,
      deadline: false,
    });

    const { title, description, prize, deadline } = contestFields;

    const tempArray: IContestErrors = {
      title: false,
      description: false,
      prize: false,
      deadline: false,
    };
    if (title.length < 1) {
      tempArray.title = true;
    }
    if (description.length < 5) {
      tempArray.description = true;
    }
    if (prize <= 0) {
      tempArray.prize = true;
    }

    if (moment(deadline).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
      tempArray.deadline = true;
    }
    setErrors(tempArray);
    console.log('Contest Fields', contestFields);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...contestFields,
      [e.target.name]: e.target.value,
    });
  };

  const toggleImageList = (imageUrl: string): void => {
    const tempImages = contestFields.images;

    if (contestFields.images.includes(imageUrl)) {
      const filterImages = contestFields.images.filter((image) => image !== imageUrl);
      setFields({ ...contestFields, images: filterImages });
    } else {
      tempImages.push(imageUrl);
      setFields({ ...contestFields, images: tempImages });
    }
  };

  const renderImageList = (): JSX.Element[] => {
    return list.map((tile, index) => {
      return (
        <GridListTile key={index} cols={1}>
          <img src={tile} alt={'image'} onClick={() => toggleImageList(tile)} />
        </GridListTile>
      );
    });
  };

  const classes = useStyles();
  const [contestFields, setFields] = useState<IContestFields>({
    title: '',
    description: '',
    prize: 0,
    deadline: moment().add(1, 'day').toDate(),
    images: [],
  });
  const [errors, setErrors] = useState<IContestErrors>({
    title: false,
    description: false,
    prize: false,
    deadline: false,
  });

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12} elevation={6} component={Paper}>
        <Typography className={classes.contestTitle} component="h1" variant="h1">
          Create New Contest
        </Typography>
        <Grid container style={{ height: '100vh' }} direction="column" justify="center" alignItems="center">
          <Box width="100%" boxShadow={3} className={classes.contestFormBox} maxWidth={'60%'}>
            <Grid
              container
              direction="column"
              className={classes.contestFormContainer}
              spacing={5}
              xs={10}
              sm={10}
              md={10}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Typography className={classes.contestFormLabel}>What do you need designed?</Typography>
                <TextField
                  name="title"
                  className={classes.contestTextInput}
                  placeholder="Write a descriptive title"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  helperText={errors.title ? 'Title must be longer then 1 ' : ''}
                  error={errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography className={classes.contestFormLabel}>Description</Typography>
                <TextField
                  name="description"
                  className={classes.contestTextInput}
                  placeholder="Details about what type of tattoo you want"
                  fullWidth
                  variant="outlined"
                  multiline={true}
                  rows={5}
                  onChange={handleChange}
                  helperText={errors.description ? 'Description must be longer then 5 ' : ''}
                  error={errors.description}
                />
              </Grid>

              <Grid item>
                <Grid container>
                  <Typography className={classes.contestFormLabel}>Prize Amount</Typography>
                  <Typography className={classes.contestFormLabel} style={{ marginLeft: '100px' }}>
                    Deadline
                  </Typography>
                </Grid>
                <Grid container>
                  <Input
                    name="prize"
                    type="number"
                    className={classes.prizeInput}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={handleChange}
                    error={errors.prize}
                  />

                  <TextField
                    name="deadline"
                    type="date"
                    defaultValue={moment().add(1, 'day').format('YYYY-MM-DD')}
                    className={classes.contestDateInput}
                    variant="outlined"
                    onChange={handleChange}
                    helperText={errors.deadline ? 'Date must come after current date ' : ''}
                    error={errors.deadline}
                  />
                </Grid>
                {errors.prize && (
                  <Typography className={classes.contestPrizeError}>Prize must be greater then 0</Typography>
                )}

                <Grid container justify="center" className={classes.contestImages}>
                  <GridList cellHeight={100} cols={3} className={classes.imageGridList}>
                    {renderImageList()}
                  </GridList>
                </Grid>
                <Box textAlign="center">
                  <Button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Create Contest
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContestForm;
