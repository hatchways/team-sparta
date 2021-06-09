import { Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { contest } from '../../interface/tempContestData';
import React, { memo } from 'react';
import useStyles from './useStyles';

interface Props {
  data: contest[];
  route: string;
  message: string;
}

const ListView = memo(function ListView({ data, message, route }: Props): JSX.Element {
  const classes = useStyles();
  //Displays all objects within data array and provides additional message in case no objects within array
  //enables a link to specific details page. <--- Requires Update when integrating Contest/Submissions
  return (
    <div>
      {data.length > 0 ? (
        <List>
          {data.map((item) => {
            return (
              <Link className={classes.link} to={route} key={item.id}>
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar className={classes.img} alt="Profile Image" src={item.images} variant="square" />
                  </ListItemAvatar>
                  <Grid
                    className={classes.listItems}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <ListItemText
                      primary={
                        <Typography color={'textPrimary'} className={classes.name} variant="h4" component="h2">
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography>{item.description}</Typography>
                          <Box className={classes.priceContainer} color="text.primary">
                            <Typography className={classes.price} color={'textPrimary'}>
                              ${item.price}
                            </Typography>
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </Grid>
                </ListItem>
              </Link>
            );
          })}
        </List>
      ) : (
        <Typography>{message}</Typography>
      )}
    </div>
  );
});

export default ListView;
