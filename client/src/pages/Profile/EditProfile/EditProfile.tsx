import { Avatar, Button, Grid, Box, Typography } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AddCreditCard } from '../../../components/AddCreditCard/AddCreditCard';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './useStyles';
import React, { useEffect, useState } from 'react';
import { getCustomerInfo } from '../../../helpers/APICalls/customer';
import { Customer } from '../../../interface/User';
import { useAuth } from '../../../context/useAuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const stripeTest = loadStripe(process.env.REACT_APP_KEY || '');
export default function EditProfile(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [customer, setCustomer] = useState<Customer>();
  const { loggedInUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [inputFiles, setInputFiles] = useState<File>();
  useEffect(() => {
    async function fetchCustomerInfo() {
      const response = await getCustomerInfo();

      if (response) {
        const tempCustomer = response.customer;
        setCustomer(tempCustomer);
      }
    }

    fetchCustomerInfo();
  }, [value]);

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        className={classes.mainContainer}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };
  console.log('customer', customer);

  if (loggedInUser) {
    return (
      <Grid container>
        <Box className={classes.tabContainer} boxShadow={4}>
          <Grid className={classes.tabDisplay}>
            <Tabs orientation="vertical" value={value} onChange={handleChange} className={classes.tabs}>
              <Tab label="Profile" />
              <Tab label="Personal Information" />
              <Tab label="Payment details" />
              <Tab label="Notifications" />
              <Tab label="Password" />
            </Tabs>
          </Grid>
        </Box>
        <TabPanel value={value} index={2}>
          <Elements stripe={stripeTest}>
            <AddCreditCard customer={customer} />
          </Elements>
        </TabPanel>
        <TabPanel value={value} index={0}>
          {!loggedInUser.profileImage ? (
            <Avatar
              //className={classes}
              alt="Profile Image"
              src={`https://robohash.org/${loggedInUser.email}.png`}
            />
          ) : (
            <Avatar alt="Profile Image" src={loggedInUser.profileImage} />
          )}
          <Typography>{loggedInUser.username}</Typography>
          <Button>Upload New Profile Image</Button>
        </TabPanel>
      </Grid>
    );
  } else return <CircularProgress />;
}
