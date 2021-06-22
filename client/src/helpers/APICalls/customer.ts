import axios from 'axios';
import { AuthApiCustomerData } from '../../interface/AuthApiData';

export const getCustomerInfo = async (): Promise<AuthApiCustomerData> => {
  return await axios
    .get(`/users/customer`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: err,
      };
    });
};

export const addCustomerInfo = async (paymentMethod: unknown): Promise<AuthApiCustomerData> => {
  return await axios
    .post(`/users/customer`, paymentMethod)
    .then((res) => {
      return res.data;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server' },
    }));
};

export const removeCustomerInfo = async (): Promise<AuthApiCustomerData> => {
  return await axios
    .delete(`/users/customer`)
    .then((res) => {
      return res.data;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server' },
    }));
};
