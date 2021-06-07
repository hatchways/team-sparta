import React, { useState } from 'react';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import useStyles from './useStyles';
import axios from 'axios';

export default function Submission(): JSX.Element {
  const classes = useStyles();
  const [inputFiles, setInputFiles] = useState<File[]>([]);

  // For getting our image list into state
  const handleImageChange = ({ currentTarget: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      setInputFiles((existing) => existing.concat(Array.from(files)));
    }
  };
  // our post request
  const handleUpload = () => {
    const data = new FormData();
    const files = inputFiles;
    if (files) {
      // iterate through the list of files and get the file and its name
      for (let i = 0; i < files.length; i++) {
        data.append('multiImage', files[i], files[i].name);
      }
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
                // this.ocShowAlert('Max Size: 2mb', 'red')
                console.log('size too big');
              } else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
                // this.ocShowAlert('Max 10 images allowed', 'red')
                console.log('too many pix');
              } else {
                // if not given file type
                // this.ocShowAlert(response.data.error,'red')
                console.log('no file bro');
              }
            } else {
              //SUCCESS
              const fileName = response.data;
              console.log('fileName', fileName);
            }
          }
        })
        .catch((error) => {
          //if some other error
          // this.ocShowAlert(error, 'red')
          console.log('error', error);
        });
    } else {
      console.log('please upload a file');
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
          <Typography style={{ textAlign: 'center' }}>
            <Button variant="contained" component="label" className={classes.button}>
              <input type="file" hidden multiple onChange={handleImageChange} />
              <CloudUploadIcon className={classes.uploadIcon} />
            </Button>
          </Typography>
        </Grid>
        <Grid item>
          {inputFiles.length > 0 ? (
            <form className={classes.description}>
              Selected Images: ({inputFiles.length}):
              <ul>
                {inputFiles.map((file, index) => (
                  <li style={{ listStyle: 'none' }} key={index}>
                    {file.name}
                  </li>
                ))}
              </ul>
            </form>
          ) : (
            ''
          )}
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
    </Grid>
  );
}
