import React from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { makeStyles } from '@material-ui/core/styles';
import StorageIcon from '@material-ui/icons/Storage';
import Typography from '@material-ui/core/Typography';

import Color from '../constants/color.js';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'start',
      alignItems:'center',
      color:Color.greyWebTitle,
      padding:'20px'
    },
    gridList: {
      width: '80%',
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

export default function Header(navigation){

    let title = '';
    let icon = '';

    const classes = useStyles();
    
    switch(navigation.navigation){
        case 0:
            icon = <AddBoxIcon/>
            title = 'Nouvelle expertise';
        break;

        case 1:
            icon = <InsertCommentIcon/>
            title = 'INSPEKT';
        break;

        case 2:
            icon = <StorageIcon/>
            title = 'QOT';
        break;

        case 3:
            icon = <HomeWorkIcon/>
            title = 'STOCKS';
        break;

        default:
            title = 'Accueil';
    }
    
    return(
        <div className={classes.root}>
            {icon}
            <Typography variant='h6' style={{marginLeft:'10px'}}>
                {title}
            </Typography>
        </div>
    )
}