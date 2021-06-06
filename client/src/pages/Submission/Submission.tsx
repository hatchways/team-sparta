import React, { useState } from 'react';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import useStyles from './useStyles';

export default function Submission(): JSX.Element {
  const classes = useStyles();

  // front end element styled. Need to look into typescript state updating to understand how to send the file to back end

  return (
    <Grid container spacing={5} direction="column" className={classes.root}>
      <Box boxShadow={1} className={classes.outerBox}>
        <Grid item>
          <Typography variant="h4" color="textPrimary" className={classes.header}>
            Submit design
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ textAlign: 'center' }}>
            <Button variant="contained" component="label" className={classes.button}>
              <input type="file" hidden />
              <CloudUploadIcon className={classes.uploadIcon} />
            </Button>
          </Typography>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography color="textPrimary" className={classes.subHeader}>
              Click to choose a file
            </Typography>
            <Typography className={classes.description}>High resolution images</Typography>
            <Typography className={classes.descriptionFile}>PNG, JPG, GIF</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Button
          type="submit"
          onClick={() => {
            console.log('hello');
          }}
          size="large"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </Box>
    </Grid>
  );
}
