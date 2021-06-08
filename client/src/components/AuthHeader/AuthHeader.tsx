import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Container } from '@material-ui/core';
import Logo from '../../Images/logo.png';

interface Props {
  linkTo: string;
  btnText: string;
}

const AuthHeader = ({ linkTo, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.authHeader}>
      <Container className={classes.container}>
        <Link to={'/'} className={classes.link}>
          <Button className={classes.navButton} color="inherit" variant="contained">
            <img className={classes.logo} src={Logo} alt={'Logo'} />
          </Button>
        </Link>
      </Container>
      <Link to={linkTo} className={classes.link}>
        <Button color="inherit" className={classes.accBtn} variant="contained">
          {btnText}
        </Button>
      </Link>
    </Box>
  );
};

export default AuthHeader;
