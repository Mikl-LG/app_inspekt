import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

//const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
  },
  img: {
    height: '100%',
    display: 'block',
    //maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}));

function SwipeableTextMobileStepper({imageList}) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imageList.length;

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
          //step => {leftFront: "https://s3.eu-west-3.amazonaws.com/inspekt-prod/MEDIASLANDER%2F1591879323680"}
          <div key={step.value} style={{width:'100%',display:'flex',justifyContent:'center'}}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.value} style={{maxHeight:window.innerHeight,width:'auto',maxWidth:'100%',height:'auto'}}/>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <Typography style={{width:'100%',textAlign:'center',fontStyle:'italic'}}>{imageList.length && imageList[activeStep].title}</Typography>
    </div>
  );
}

export default SwipeableTextMobileStepper;
