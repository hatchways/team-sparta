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
      <Button component={Link} to={to} className={classes.navButton} color="inherit" variant="contained">
        {primary}
      </Button>
    </div>
  );
};

export default DashboardNav;
