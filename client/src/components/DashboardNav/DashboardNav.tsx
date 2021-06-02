import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  to: string;
  primary: string;
}

const DashboardNav = ({ to, primary }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Link to={to} className={classes.link}>
        <Button className={classes.navButton} color="inherit" variant="contained">
          {primary}
        </Button>
      </Link>
    </div>
  );
};

export default DashboardNav;
