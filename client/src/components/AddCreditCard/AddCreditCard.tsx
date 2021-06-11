import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import useStyles from './useStyles';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
interface IProps {
  saveCard?: boolean;
  price?: number;
  closeModel?: () => void;
}
export const AddCreditCard = (Props: IProps): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const { saveCard = false, price, closeModel } = Props;

  const handleClose = () => {
    if (closeModel) {
      closeModel();
    } else {
      setOpen(false);
    }
  };
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe || !elements) {
      setLoading(true);
      return;
    }

    const element = elements.getElement(CardElement);

    if (element === null) {
      setLoading(true);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: element,
    });

    if (!error) {
      console.log('Stripe 23 | token generated!', paymentMethod);
      setLoading(true);

      await axios
        .post('/contest/customer', {
          source: paymentMethod,
          save: saveCard,
          price: price,
        })
        .then((response) => {
          setLoading(false);
          setOpen(true);
          setMessage(response.data.success.message);
          if (closeModel) {
            closeModel();
          }
        })
        .catch((error) => {
          console.log('error', error);
          setLoading(false);
          setOpen(true);
          setMessage('Credit Card already added');
          if (closeModel) {
            closeModel();
          }
        });
    } else {
      console.log(error.message);
    }
  }

  return (
    <React.Fragment>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <Grid container className={classes.billingDetailsContainer}>
          <Grid className={classes.cardElementContainer} item xs={12} sm={12} md={12} elevation={6} component={Paper}>
            {!saveCard && (
              <IconButton
                hidden={true}
                className={classes.closeButton}
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
            {price ? (
              <Typography className={classes.contestFormLabel}>The price to create this contest is ${price}</Typography>
            ) : (
              ''
            )}
            <Typography className={classes.contestFormLabel}>Enter Your Card Details</Typography>

            <CardElement
              options={{
                iconStyle: 'solid',
                style: {
                  base: {
                    color: 'black',
                    fontSize: '16px',
                    iconColor: '#fff',
                  },
                  invalid: {
                    iconColor: '#FFC7EE',
                    color: '#FFC7EE',
                  },
                  complete: {
                    iconColor: '#cbf4c9',
                  },
                },
                hidePostalCode: true,
              }}
            />
            <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={isLoading}>
              {isLoading ? <CircularProgress /> : saveCard ? 'Save' : 'Pay'}
            </Button>
          </Grid>
        </Grid>
      </form>
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
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </React.Fragment>
  );
};
