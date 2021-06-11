import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AddCreditCard } from '../../../components/AddCreditCard/AddCreditCard';

const stripeTest = loadStripe(process.env.REACT_APP_KEY || '');
export default function EditProfile(): JSX.Element {
  return (
    <div>
      <Elements stripe={stripeTest}>
        <AddCreditCard saveCard={true} />
      </Elements>
    </div>
  );
}
