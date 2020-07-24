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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    paddingBottom:'20px'
  },
  landscapeXS: {
    width:'100%',
    height:'auto'
  },
  portraitXS: {
    height:window.innerHeight,
    width:'auto'
  },
  landscapeLG: {
    height:window.innerHeight - 50,
    width:'auto'
  },
  portraitLG: {
    height:window.innerHeight - 50,
    width:'auto'
  },
  widget:{
    width:'30px',
    height:'30px',
    borderRadius:'30px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color:'white',
    backgroundColor:Color.secondary,
    opacity:'0.8',
    fontSize: 15,
    marginLeft:'5px',
    marginTop:'5px',
    cursor:'pointer'
  }
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

    const imageClasses = (landscape === true && gridScreenWidth.lg === 6)
    ? classes.landscapeXS 
    : (landscape === true && gridScreenWidth.lg === 12)
      ? classes.landscapeLG
      : (landscape === false && gridScreenWidth.lg === 12)
        ? classes.portraitLG
        : classes.portraitXS

    return(
      <div key={step.value} style={{width:'100%',display:'flex',justifyContent:'center'}}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img 
                className={imageClasses}
                onLoad={getOrientation}
                src={step.value}
                style={{transform: `rotate(${rotation}deg)`}}
              />
            ) : null}
      </div>
    )
  }

  const displayFullWidth = () => {
    setGridScreenWidth({xs:12,sm:12,md:12,lg:12,scrollToTop:document.getElementById('swipeableViews').offsetTop})
  }
  const displayHalfWidth = () => {
    setGridScreenWidth({xs:6,sm:6,md:6,lg:6,scrollToTop:0})
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

  
  const swipeableViewsInformations = async()=>{
    await Promise.resolve(document.getElementById('swipeableViews'));
  }

    useEffect(()=>{
      const screen = document.getElementById('imageSlider');
      (gridScreenWidth.scrollToTop != 0 && screen) && screen.scrollIntoView({
        block:'start',
        behavior: 'smooth'
    });
    })

  return (
    <div id='imageSlider' className={classes.root}>
      
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        style={{fontSize : '0.9em'}}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} style={{color:Color.secondary,fontSize:'2em'}}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} style={{color:Color.secondary,fontSize:'2em'}}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
          </Button>
        }
      />
      <div style={{position:'absolute',top:swipeableViewsInformations && (swipeableViewsInformations.offsetTop),zIndex:'20'}}>
        <div className={classes.widget}>
          {
            gridScreenWidth.lg == 6
            ?
            <Tooltip title='Plein écran'>
              <FullscreenIcon onClick={displayFullWidth}/>
            </Tooltip>
            :
            <Tooltip title='Réduire'>
              <FullscreenExitIcon onClick={displayHalfWidth}/>
            </Tooltip>
          }
        </div>
        <div className={classes.widget}>
          <Tooltip title='Rotation à gauche'>
            <RotateLeftIcon onClick={() => setRotation(rotation-90)}/>
          </Tooltip>
        </div>
        <div className={classes.widget}>
          <Tooltip title='Rotation à droite'>
          <RotateRightIcon onClick={() => setRotation(rotation+90)}/>
          </Tooltip>
        </div>
      </div>
      
      
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        id='swipeableViews'
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
