import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';

import Color from '../constants/color.js';
import { Tooltip } from '@material-ui/core';

//const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    paddingBottom:'20px'
  },
  landscape: {
    width:'100%',
    height:'auto'
  },
  portrait: {
    height:window.innerHeight,
    width:'auto'
  },
}));

function SwipeableTextMobileStepper({imageList,gridScreenWidth,setGridScreenWidth}) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [imageSize,setImageSize] = React.useState({getSize : true});
  const [rotation, setRotation] = React.useState(0);
  const maxSteps = imageList.length;

  const displayImage = (step,index) => {

    let imageToDisplay = new Image();
    imageToDisplay.src = step.value;
    let landscape = true;
    const getOrientation = () => {
      landscape = imageToDisplay.width > imageToDisplay.height;
    }
    getOrientation();

    return(
      <div key={step.value} style={{width:'100%',display:'flex',justifyContent:'center'}}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img 
                className={landscape === true ? classes.landscape : classes.portrait}
                onLoad={getOrientation}
                src={step.value}
                style={{transform: `rotate(${rotation}deg)`}}
              />
            ) : null}
      </div>
    )
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <div style={{display:'flex',justifyContent:'flex-end',color:Color.secondary}}>
        {
          gridScreenWidth.lg == 6
          ?
          <Tooltip title='Plein écran'>
            <FullscreenIcon style={{ fontSize: 20,marginLeft:'5px',cursor:'pointer'}} onClick={() => setGridScreenWidth({xs:12,sm:12,md:12,lg:12})}/>
          </Tooltip>
          
          :
          <Tooltip title='Réduire'>
            <FullscreenExitIcon style={{ fontSize: 20,marginLeft:'5px',cursor:'pointer'}} onClick={() => setGridScreenWidth({xs:12,sm:6,md:6,lg:6})}/>
          </Tooltip>
        }
        <Tooltip title='Rotation à gauche'>
          <RotateLeftIcon style={{ fontSize: 20,marginLeft:'5px',cursor:'pointer'}} onClick={() => setRotation(rotation-90)}/>
        </Tooltip>
        <Tooltip title='Rotation à droite'>
          <RotateRightIcon style={{ fontSize: 20,marginLeft:'5px',cursor:'pointer'}} onClick={() => setRotation(rotation+90)}/>
        </Tooltip>
      </div>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Suiv.
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Préc.
          </Button>
        }
      />
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {imageList.map((step, index) => (
          displayImage(step,index)
        ))}
      </SwipeableViews>
      <Typography style={{width:'100%',textAlign:'center',fontStyle:'italic'}}>{imageList.length && imageList[activeStep].title}</Typography>
    </div>
  );
}

export default SwipeableTextMobileStepper;
