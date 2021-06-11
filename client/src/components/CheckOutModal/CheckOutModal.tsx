import React from 'react';
import { AddCreditCard } from '../AddCreditCard/AddCreditCard';

interface IProps {
  price: number;
  closeModel: () => void;
}

export const CheckOutModal = (Props: IProps): JSX.Element => {
  const { price, closeModel } = Props;
  return (
    <React.Fragment>
      <AddCreditCard saveCard={false} price={price} closeModel={closeModel} />
    </React.Fragment>
  );
};
