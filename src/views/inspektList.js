import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '80%',
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList(inspektList) {
    const classes = useStyles();


  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {
            inspektList.inspektList
            ?inspektList.inspektList.map((inspekt) => (
                <GridListTile key={inspekt.id}>
                    {
                        inspekt.pictures
                        ?<img src={inspekt.pictures.rightFront}/>
                        :null
                    }
                    <GridListTileBar
                    title={inspekt.machine.brand + ' ' + inspekt.machine.model}
                    subtitle={inspekt.customer ? <span>Client: {inspekt.customer.title && inspekt.customer.title + ' ' +inspekt.customer.name}</span> : null}
                    actionIcon={
                        <IconButton className={classes.icon}>
                        <InfoIcon />
                        </IconButton>
                    }
                    />
                </GridListTile>
            )):
            null
        }
      </GridList>
      
    </div>
  );
}