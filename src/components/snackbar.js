import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({message}) {
    //TYPE EQUAL TO : error, warning, info, success
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //const [snackbarType,setSnackbarType] = React.useState(type);

  const snackBarHandleClick = () => {
    setOpen(true);
  };

  const snackbarHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
      //console.log('type : ',type);
  })

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={snackbarHandleClose} message={message}>

      </Snackbar>
    </div>
  );
}