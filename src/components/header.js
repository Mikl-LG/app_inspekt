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
      borderBottom:'solid 0.5px grey',
      //backgroundColor:Color.veryLightGrey,
      padding:'20px'
    },
    title:{
        display:'flex',
        flexDirection:'column',
        alignItems:'start'
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
    let subtitle = '';
    let icon = '';

    const classes = useStyles();
    
    switch(navigation.navigation){
        case 0:
            icon = <AddBoxIcon style={{color:Color.secondary}}/>
            title = 'EXPERTISER';
            subtitle = 'Créer une nouvelle expertise';
        break;

        case 1:
            icon = <InsertCommentIcon style={{color:Color.secondary}}/>
            title = 'INSPEKT';
            subtitle = 'Expertises en cours d\'évaluation';
        break;

        case 2:
            icon = <StorageIcon style={{color:Color.secondary}}/>
            title = 'QOT';
            subtitle = 'Expertises clôturées';
        break;

        case 3:
            icon = <HomeWorkIcon style={{color:Color.secondary}}/>
            title = 'STOCKS';
            subtitle = 'Machines en stock';
        break;

        default:
            title = 'Accueil';
    }

    return(
        <div className={classes.root}>
            {icon}
            <div className={classes.title}>
                <Typography variant='h6' style={{color:Color.secondary,marginLeft:'20px'}}>
                    {title}
                </Typography>
                <Typography variant='subtitle1' style={{color:Color.lightGrey,marginLeft:'20px'}}>
                    {subtitle}
                </Typography>
            </div>
            
        </div>
    )
}