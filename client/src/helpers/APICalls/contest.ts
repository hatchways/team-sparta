import axios from 'axios';
import { AuthApiCustomerData, AuthApiData, AuthApiDataId } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
export const getContestsByUser = async (): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/users/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getContestById = async (id: string): Promise<AuthApiDataId> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/contest/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const chargeCard = async (paymentData: unknown): Promise<AuthApiCustomerData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
    credentials: 'include',
  };
  return await fetch('contest/charge', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const createContest = async (contestDetails: {
  title: string;
  description: string;
  price: number;
  end_date: Date | string;
  images: string[];
}): Promise<AuthApiCustomerData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contestDetails),
    credentials: 'include',
  };
  return await fetch('contest', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const addImagesToAWS = async (data: FormData): Promise<any> => {
  const config = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary='xxx'`,
    },
  };
  return await axios
    .post('upload/images-upload', data, config)
    .then((res) => {
      return res.data;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server' },
    }));
};

export const getSubmissionsForUser = async (): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/submission/user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
