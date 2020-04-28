import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import StorageIcon from '@material-ui/icons/Storage'

import Color from '../constants/color.js';

const useStyles = makeStyles({
  root: {
    display:'flex',
    justifyContent:'center',
    width: '100%',
    position:'fixed',
    bottom:'0px',
    borderTop:'solid 1px grey',
    backgroundColor:Color.veryLightGrey
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
        <BottomNavigationAction label="EXPERTISER" icon={<AddBoxIcon />} />
        <BottomNavigationAction label="INSPEKT" icon={<InsertCommentIcon />} />
        <BottomNavigationAction label="QOT" icon={<StorageIcon />} />
        <BottomNavigationAction label="STOCK" icon={<HomeWorkIcon />} />
    </BottomNavigation>
  );
}