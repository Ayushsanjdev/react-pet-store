import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    fontFamily: 'sans-serif'
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <h1 className={classes.root}>
      My Pet Store
    </h1>
  )
}

export default Header;