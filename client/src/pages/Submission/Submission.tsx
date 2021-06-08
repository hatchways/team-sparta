import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Box, Snackbar, IconButton } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import useStyles from './useStyles';
import axios from 'axios';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloseIcon from '@material-ui/icons/Close';

export default function Submission(): JSX.Element {
  const classes = useStyles();
  // For loading file to state and allowing preview
  const [inputFiles, setInputFiles] = useState<File>();
  // For generating the preview img string
  const [preview, setPreview] = useState<string>();
  // For snackbar notifications opening/closing
  const [open, setOpen] = useState(false);
  //for the snackbar message
  const [message, setMessage] = useState<string>();

  const handleClose = () => {
    setOpen(false);
  };

  //   for generating image preview
  useEffect(() => {
    if (inputFiles) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(inputFiles);
    } else {
      setPreview('');
    }
  }, [inputFiles]);

  // For getting our image list into state
  const handleImageChange = ({ currentTarget: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      setInputFiles(files[0]);
    }
  };
  // For deleting the previewed image if the user decides to upload something different
  const handleImageDelete = () => {
    setPreview('');
    setInputFiles(undefined);
  };

  const handleUpload = () => {
    const data = new FormData();
    // if file selected
    if (inputFiles) {
      data.append(
        //this is gonna be the name of the response object. needs to match what's in the function(routes/api/profile.js line 38)
        'multiImage',
        inputFiles,
        inputFiles.name,
      );
      // our post route. Might need to change depending on the final location in the app
      //also i have questions about the boundary property. In plain react you can set it to data._boundary but here that's not allwoed
      axios
        .post('upload/images-upload', data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary='xxx'`,
          },
        })
        // basic controller stuff that we can use for error handling as i refine this
        .then((response) => {
          console.log('res', response);
          if (200 === response.status) {
            // If File is too big
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                setOpen(true);
                setMessage('File is larger than 2 MB');
                console.log('size too big');
              } else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
                console.log('too many pix');
              } else {
                setOpen(true);
                setMessage('No file selected');

                console.log('no file bro');
              }
            } else {
              //SUCCESS
              setOpen(true);
              setMessage('File Submitted!!');
              const fileName = response.data;
              console.log('fileName', fileName);
            }
          }
        })
        .catch((error) => {
          //if some other error
          console.log('error', error);
        });
    } else {
      setOpen(true);
      setMessage('Please Upload a file');
    }
  };

  //now displays file names and allows post to AWS

  return (
    <Grid container spacing={5} direction="column" className={classes.root}>
      <Box boxShadow={1} className={classes.outerBox}>
        <Grid item>
          <Typography variant="h4" color="textPrimary" className={classes.header}>
            Submit design
          </Typography>
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center">
            {preview ? (
              <Button variant="contained" component="label" className={classes.button}>
                <DeleteOutlineIcon type="submit" className={classes.deleteIcon} onClick={handleImageDelete} />
                <img className={classes.preview} src={preview} />
              </Button>
            ) : (
              <Typography style={{ textAlign: 'center' }}>
                <Button variant="contained" component="label" className={classes.button}>
                  <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                  <CloudUploadIcon className={classes.uploadIcon} />
                </Button>
              </Typography>
            )}
          </Grid>
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
          onClick={handleUpload}
          size="large"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Box>
    </Grid>
  );
}
