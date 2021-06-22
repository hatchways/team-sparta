import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useStyles from './useStyles';

import { Grid, Button, Typography, Paper, Snackbar, IconButton, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { addCustomerInfo, removeCustomerInfo } from '../../helpers/APICalls/customer';
import { Customer } from '../../interface/User';
interface IProps {
  closeModel?: () => void;
  customer?: Customer;
}
export const AddCreditCard = (Props: IProps): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { customer } = Props;

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Summary.
   *Checks to see if stripe and elements are loaded before continuing,
   *If they are loaded we call stripe to create a token(payment method)
   * Using the card properties that were set by stripe with the useElements
   * This token is then sent to the backend which is used to create a customer
   * That stripe will recognize as a valid user with a valid credit card
   * @returns responseObject
   */
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
      setLoading(true);
      const response = await addCustomerInfo(paymentMethod);
      if (response.success) {
        setLoading(false);
        setOpen(true);
        setMessage(response.success.message);
      } else {
        console.log('error', error);
        setLoading(false);
        setOpen(true);
      }
    } else {
      console.log(error.message);
    }
  }

  async function handleRemove(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const response = await removeCustomerInfo();
    if (response) {
      setLoading(false);
      setOpen(true);
      setMessage('Credit Card Information Deleted');
    }
  }

  return (
    <React.Fragment>
      <form className={classes.formContainer} onSubmit={customer ? handleRemove : handleSubmit}>
        <Grid container className={classes.billingDetailsContainer}>
          <Grid className={classes.cardElementContainer} item xs={12} sm={12} md={12} elevation={6} component={Paper}>
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
              {isLoading ? <CircularProgress /> : customer ? 'Delete' : 'Save'}
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
