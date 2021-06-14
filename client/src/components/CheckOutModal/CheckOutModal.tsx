import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useStyles from './useStyles';

import { getCustomerInfo } from '../../helpers/APICalls/customer';
import { chargeCard } from '../../helpers/APICalls/contest';

import { Customer } from '../../interface/User';

import { Grid, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  title: string;
  description: string;
  price: number;
  closeModel: () => void;
}

export const CheckOutModal = (Props: IProps): JSX.Element => {
  const { title, description, price, closeModel } = Props;
  const [isLoading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<Customer>();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>('');

  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Summary.
   * This is function is formatted similarly to the handleSubmit on the AddCreditCard component
   * Except here we check to see if the user has his credit card infor already added
   * In that case we would not need them to enter their information again we would just make
   * a call to the server to handle the rest of the process of charging the saved card
   * Otherwise the user will have to follow the same process as adding a card except this time
   * the card will not be added to the user it will just be charged
   * @returns responseObject
   */

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements) {
      setLoading(true);
      return;
    }

    if (customer) {
      const paymentData = { customer, price };
      const response = await chargeCard(paymentData);
      console.log('response', response);
      if (response.success) {
        setMessage(response.success.message);
        setOpen(true);
        setLoading(false);
      } else {
        setOpen(true);
        setMessage(response.error?.message);
        setLoading(false);
      }
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      setLoading(true);
      return;
    }
    const result = await stripe.createToken(card);

    if (result.token) {
      setLoading(true);
      const paymentData = { token: result.token.id, price };
      const response = await chargeCard(paymentData);

      if (response.success) {
        setMessage(response.success.message);
        setOpen(true);
        setLoading(false);
      } else {
        setOpen(true);
        setMessage(response.error?.message);
        setLoading(false);
      }
    } else {
      console.log('err', 'Could not create token right now');
    }
  }

  useEffect(() => {
    async function fetchCustomerInfo() {
      const response = await getCustomerInfo();

      if (response) {
        const tempCustomer = response.customer;
        setCustomer(tempCustomer);
      }
    }

    fetchCustomerInfo();
  }, []);

  return (
    <React.Fragment>
      <Grid container className={classes.checkoutContainer}>
        <Typography className={classes.contestFormLabel}>Contest Name: {title}</Typography>
        <Typography className={classes.contestFormLabel}>Contest Description: {description}</Typography>
        <Grid item>
          <Typography className={classes.contestFormLabel}>Price: ${price}</Typography>
          <Typography className={classes.spanLabel}>contains $5 fee</Typography>
        </Grid>
        <Grid item className={classes.cardContainer}>
          <form className={classes.formContainer} onSubmit={handleSubmit}>
            {!customer ? (
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
            ) : (
              <Typography className={classes.contestFormLabel} style={{ padding: '0px' }}>
                Credict Card Information Saved
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={isLoading}>
              {isLoading ? <CircularProgress /> : 'Pay'}
            </Button>
          </form>
        </Grid>
      </Grid>
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
