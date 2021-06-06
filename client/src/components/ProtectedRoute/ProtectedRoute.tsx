import { Route, Redirect, RouteProps } from 'react-router-dom';
import { User } from '../../interface/User';

export type ProtectedRouteProps = {
  loggedInUser: User | null;
} & RouteProps;

const ProtectedRoute = ({ loggedInUser, ...routeProps }: ProtectedRouteProps): JSX.Element => {
  if (loggedInUser) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
};

export default ProtectedRoute;
