import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { Button, Input, InputAdornment, TextField, GridList, GridListTile } from '@material-ui/core';
import moment from 'moment';
import React, { useState, useEffect, useReducer } from 'react';
import Modal from '@material-ui/core/Modal';
import { ContestFormState } from '../../../interface/Contest';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckOutModal } from '../../../components/CheckOutModal/CheckOutModal';
import formReducer from '../../../reducers/ContestForm/formReducer';

const initialState: ContestFormState = {
  title: {
    value: '',
    error: false,
  },
  description: {
    value: '',
    error: false,
  },
  prize: {
    value: 0,
    error: false,
  },
  deadline: {
    value: moment().add(1, 'day').format('YYYY-MM-DD'),
    error: false,
  },
};

const stripeTest = loadStripe(process.env.REACT_APP_KEY || '');

const ContestForm: React.FC = () => {
  const handleClick = () => {
    setopen(false);
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const { title, description, prize, deadline } = state;
  const [imageArray, setImageArray] = useState<File[]>();
  const [imagePreivew, setPreview] = useState<string[]>();

  const checkErrors = () => {
    let formValid = true;
    if (!title.value) {
      dispatch({
        type: 'error',
        fieldName: 'title',
        payload: { value: '', error: true },
      });
      formValid = false;
    }

    if (description.value.length < 5) {
      dispatch({
        type: 'error',
        fieldName: 'description',
        payload: { value: '', error: true },
      });
      formValid = false;
    }

    if (prize.value <= 0) {
      dispatch({
        type: 'error',
        fieldName: 'prize',
        payload: { value: 0, error: true },
      });
      formValid = false;
    }

    if (moment(deadline.value).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')) {
      dispatch({
        type: 'error',
        fieldName: 'deadline',
        payload: { value: '', error: true },
      });
      formValid = false;
    }

    return formValid;
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (checkErrors()) {
      setopen(true);
    }
  };

  const selectFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    let tempArray: File[] | null = [];

    if (imageArray) {
      tempArray = imageArray;
    }
    if (e.target.files) {
      tempArray.push(e.target.files[0]);
      console.log(URL.createObjectURL(e.target.files[0]));
    }

    setImageArray(tempArray);
    let imagePreview;
    if (imageArray) {
      imagePreview = imageArray.map((i) => URL.createObjectURL(i));
    }
    setPreview(imagePreview);
  };

  /**
   * This function removes images from the array
   */
  const toggleImageList = (imageUrl: File): void => {
    let tempImages = imageArray;
    if (imageArray && imageArray.includes(imageUrl)) {
      console.log('its here');
      const filterImages = imageArray.filter((image) => image.name !== imageUrl.name);
      tempImages = filterImages;
    }
    setImageArray(tempImages);
  };

  /**
   * This useEffect is just being used as a cleanup function
   * to make sure all the values in the reducer are reset
   * Without this function here everytime you would leave the
   * contest form page and come back to it the images would stay
   * selected this just makes sure the image array is empty after
   *
   */
  useEffect(() => {
    return () => {
      dispatch({
        type: 'reset',
      });
    };
  }, []);

  const classes = useStyles();

  const [open, setopen] = useState(false);

  return (
    <React.Fragment>
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
                    onChange={(e) =>
                      dispatch({
                        type: 'field',
                        fieldName: 'title',
                        payload: { value: e.target.value, error: false },
                      })
                    }
                    helperText={title.error ? 'Title must be longer then 1 ' : ''}
                    error={title.error}
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
                    onChange={(e) =>
                      dispatch({
                        type: 'field',
                        fieldName: 'description',
                        payload: { value: e.target.value, error: false },
                      })
                    }
                    helperText={description.error ? 'Description must be longer then 5 ' : ''}
                    error={description.error}
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
                      onChange={(e) =>
                        dispatch({
                          type: 'field',
                          fieldName: 'prize',
                          payload: { value: e.target.value, error: false },
                        })
                      }
                      error={prize.error}
                    />

                    <TextField
                      name="deadline"
                      type="date"
                      defaultValue={moment().add(2, 'day').format('YYYY-MM-DD')}
                      className={classes.contestDateInput}
                      variant="outlined"
                      onChange={(e) =>
                        dispatch({
                          type: 'field',
                          fieldName: 'deadline',
                          payload: { value: e.target.value, error: false },
                        })
                      }
                      helperText={deadline.error ? 'Date must come after current date ' : ''}
                      error={deadline.error}
                    />
                  </Grid>
                  {prize.error && (
                    <Typography className={classes.contestPrizeError}>Prize must be greater then 0</Typography>
                  )}

                  <Grid container justify="center" className={classes.contestImages}>
                    <GridList cellHeight={100} spacing={10} cols={3} className={classes.imageGridList}>
                      {imageArray &&
                        imageArray.map((tile, index) => (
                          <GridListTile key={index} cols={1}>
                            <img
                              src={URL.createObjectURL(tile)}
                              alt={'image'}
                              className={classes.image}
                              onClick={() => toggleImageList(tile)}
                            />
                          </GridListTile>
                        ))}
                    </GridList>
                    <input
                      className={classes.uploadButton}
                      type="file"
                      accept="image/*"
                      onChange={(e) => selectFiles(e)}
                    />
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
      <Modal open={open} onBackdropClick={handleClick}>
        <React.Fragment>
          <Elements stripe={stripeTest}>
            <CheckOutModal
              price={parseInt(prize.value.toString()) + 5}
              title={title.value}
              description={description.value}
              deadline={deadline.value}
              imageArray={imageArray}
              closeModel={handleClick}
            />
          </Elements>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};

export default ContestForm;
