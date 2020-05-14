import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator,faEye,faUserShield,faTimesCircle,faMoneyBillAlt,faCheck,faComments } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';

import Color from '../constants/color.js';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
   
    snackBarError:{
      backgroundColor:Color.error
    },
    snackbarSuccess:{
      backgroundColor:Color.success
    },
    snackbarWarning:{
      backgroundColor:Color.warning
    },
    subLabel:{
      fontSize:'0.8em'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

  export default function SnackBar(props){
    const classes = useStyles();
    const {handleClose,message,type,isOpen} = props

    return(
        <div>
            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleClose}
                open={isOpen}
            >
                <SnackbarContent className={classes[type]} message={message}/>
            </Snackbar>
        </div>
    )
  }