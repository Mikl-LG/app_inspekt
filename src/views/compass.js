import React, { Component, useEffect } from 'react';
import Color from '../constants/color';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import CotationCatalog from '../constants/CotationCatalog';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
//import ImageUploader from "react-images-upload";


import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import {Button,Grid,FormLabel,FormGroup,Paper,RadioGroup,Radio,Select,SnackbarContent,Typography,FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
  fileInput:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding:'5%'
  },
  formControl:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  formSelect:{
    width:'50%',
    marginTop:'10px'
  },
  hideInput:{
    display:'none'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color:Color.secondary
  },
  optionsInput:{
    minWidth:'25vw',
    marginBottom:'20px'
  },
  paper:{
    height:'80%',
    textAlign:'center',
    marginTop:'10px'
  },
  root:{
    overflow:'scroll',
    marginBottom:'200px',
    padding:'5vw'
  },
  rootForm:{
    display: 'flex',
    justifyContent:'space-around',
    alignItems:'flex-end',
    margin: '30px',
    flexWrap:'wrap'
  },
  rootPicture:{
    display: 'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center'
  },
  rootStepper:{
    width:'100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  snackBarError:{
    backgroundColor:'#6A8D10'
  },
  snackbarSuccess:{
    backgroundColor:'#6A8D10'
  },
  snackbarWarning:{
    backgroundColor:'#E03616'
  },
  stepButton:{
    display:'flex',
    justifyContent:'center',
    paddingTop:'30px'
  },
  toggle:{
    display:'flex',
    flexDirection:'column'
  },
  toggleForm:{
    display: 'flex',
    justifyContent:'space-around',
    alignItems:'flex-start',
    margin: '30px',
    flexWrap:'wrap'
},
}));

function getSteps() {
  return ['','Nature', 'Gamme', 'Options','Remise en état'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return '';
    case 1:
      return 'Identification de votre machine :';
    case 2:
      return 'Gamme et modèle :';
    case 3:
      return 'Votre machine est-elle équipée d\'options :';
    case 4:
      return 'Y-a-t-il des remplacements à prévoir :';
    default:
      return 'Cette étape est indisponible...';
  }
}

export default function Predict({logInfo}){

  const [allBrands,setAllBrands] = React.useState();
  const [allModels,setAllModels] = React.useState();
  const [allNatures,setAllNatures] = React.useState(()=>{
    CotationCatalog.getAllNatures().then(data => setAllNatures(data))});//[{key: "reachMower", name: "Epareuse"},...]
  const [allRanges,setAllRanges] = React.useState();
  const [loader,setLoader] = React.useState({isOpen:false,title:'',content:''})
  const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [cotation,setCotation] = React.useState({});

  const getAllBrands = (nature) => {
    CotationCatalog.getAllBrands(nature).then(data => setAllBrands(data))
  }

  const getAllModels = (nature,catalogSupplier,brand,range) => {
    CotationCatalog.getAllModels(nature,catalogSupplier,brand,range).then(data => setAllModels(data))
  }

  const getAllRanges = (nature,catalogSupplier,brand) => {
    CotationCatalog.getAllRanges(nature,catalogSupplier,brand).then(data => setAllRanges(data))
  }

  const getMachine = (nature,catalogSupplier,brand,model) => {
    CotationCatalog.getMachine(nature,catalogSupplier,brand,model).then(data => setCotation({...cotation,machine : data}))
  }
  
  const optionsChecked = (option) => {
    let options = cotation.options || [];
    options.indexOf(option) < 0 ? options.push(option) : options.splice(options.indexOf(option),1);
    setCotation({...cotation,options : options});
    console.log('options : ',options);
  }
  
  const snackbarHandleClose = () => {
    setSnackbar({isOpen:false})
  }

  const setMarque = (brand) => {
    setCotation({...cotation,brand:brand});
    getAllRanges(cotation.nature.key,'NOREMAT',brand);
  }

  const setModel = (model) => {
    setCotation({...cotation,model : model});
    getMachine(cotation.nature.key,'NOREMAT',cotation.brand,model);
  }

  const setNature = (e) => {
    setCotation({...cotation,nature:e.target.value})
    getAllBrands(e.target.value.key)
  }

  const setRange = (range) => {
    setCotation({...cotation,range:range})
    getAllModels(cotation.nature.key,'NOREMAT',cotation.brand,range)
  }

  const stepperHandleNext = async() => {

    if(activeStep === steps.length -1){

      setLoader({isOpen:true,title:'Sauvegarde en cours...',content:'Bien joué : on vérifie que tout va bien et on sauvegarde ton expertise.'})

    }else if(activeStep === 1 && !cotation.nature){
      
      setSnackbar({message : 'Tu es très rapide! Mais tu dois sélectionner une nature pour continuer.',type:'snackbarWarning',isOpen:true});

    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    }
  };

  const stepperHandleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepperHandleReset = () => {
    setActiveStep(0);
  };

  /**USEEFFECT ONLY USED ON CONSOLE */
  useEffect(() => {
    console.log('cotation : ',cotation);
    console.log('allBrands : ',allBrands);
    console.log('allRanges : ',allRanges);
    console.log('allModels : ',allModels);
  })

    const classes = useStyles();

    return (
      <Grid container>
        <Grid item xs={12} sm={8} lg={8}>
          <div className={classes.root}>

            {
              activeStep !== 0 &&
              <div className={classes.rootStepper}>
              <Stepper activeStep={activeStep} alternativeLabel id='stepper'>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>Bravo</Typography>
                    <Button onClick={stepperHandleReset}>Ajouter une nouvelle cotation</Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  </div>
                )}
              </div>
            </div>
            }
            {
              activeStep === 0 &&
              <Typography variant='h6' style={{width:'100%',textAlign:'center',padding:'30px',color:Color.secondary}}>Créer une nouvelle cotation assistée.</Typography>
            }

            {
              activeStep === 1 &&
              <div>
                  <FormControl variant="outlined" fullWidth className={classes.formControl}>
                    <Select
                      className={classes.formSelect}
                      id='natureSelect'
                      label='Nature'
                      value={cotation.nature}
                      inputProps={{id:'natureSelect'}}
                      onChange = {(e) => setNature(e)}
                    >
                        {
                            allNatures && allNatures.map((nature) => <MenuItem id={nature.key} value={nature}>{nature.name}</MenuItem>)
                          
                        }
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <Select
                      className={classes.formSelect}
                      id='brandSelect'
                      label='Marque'
                      disabled={!cotation.nature}
                      className={classes.formSelect}
                      value={cotation.brand}
                      onChange = {(e) => setMarque(e.target.value)}
                      inputProps={{id:'brandSelect'}}
                    >
                        {
                            allBrands && allBrands.length && allBrands.map((range) => <MenuItem id={range} value={range}>{range}</MenuItem>)
                          
                            
                        }
                    </Select>
                  </FormControl>
              </div>
            }
            {
              activeStep === 2 &&
              <Grid container>
                <Grid item xs={6} md={6} lg={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gamme</FormLabel>
                    <RadioGroup aria-label="range" name="range" value={cotation.range} onChange={(e) => setRange(e.target.value)}>
                      {
                        allRanges && allRanges.map((range) => <FormControlLabel value={range} control={<Radio />} label={range} />)
                      }
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  {
                    allModels
                    && <FormControl component="fieldset">
                        <FormLabel component="legend">Modèle</FormLabel>
                        <RadioGroup aria-label="range" name="range" value={cotation.model} onChange={(e) => setModel(e.target.value)}>
                          {
                            allModels && allModels.map((model) => <FormControlLabel value={model} control={<Radio />} label={model} />)
                          }
                        </RadioGroup>
                      </FormControl>
                  }
                </Grid>
              </Grid>
            }
            {
              activeStep === 3 &&
                <div>
                  <FormGroup>
                    {
                      cotation.machine && cotation.machine.optionsAvailable
                      && cotation.machine.optionsAvailable.map(option => 
                        <FormControlLabel
                          control={<Switch size="small" checked={cotation.options && cotation.options.indexOf(option) > -1} onChange={() => optionsChecked(option)} />}
                          label={option}
                        />
                        )
                    }
                  </FormGroup>
                </div>
            }
            {
              activeStep === 4 &&
                <div>
                  <div className={classes.rootPicture}>
                    Here is step 4
                  </div>
                </div>
            }
            <div className={classes.stepButton}>
              <Button
                disabled={activeStep === 0}
                onClick={stepperHandleBack}
                className={classes.backButton}
              >
              Retour
              </Button>
              <Button variant="contained" color="primary" onClick={stepperHandleNext}>
                {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
              </Button>
            </div>
            <div>
              <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={snackbarHandleClose}
                open={snackbar.isOpen}>
                  <SnackbarContent className={classes[snackbar.type]} message={snackbar.message}/>
              </Snackbar>
            </div>
            <div>
              <Dialog
                open={loader.isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{loader.title}</DialogTitle>
              <DialogContent>
                <LinearProgress style={{width:'100%'}} />
                <LinearProgress style={{width:'100%'}} color="secondary" />
                <DialogContentText id="alert-dialog-description">
                  {loader.content}
                </DialogContentText>
              </DialogContent>
              </Dialog>
            </div>
          </div>
        </Grid>
        <Grid xs={12} lg={4}>
          <Paper elevation1 className={classes.paper}>
          <Typography variant='subtitle1'>
            COTATION
          </Typography>
          <Divider/>
            <div style={{textAlign:'left'}}>
              {
              cotation.nature
              && <Typography>Nature : {cotation.nature.name}</Typography>
              }
              {
              cotation.brand
              && <Typography>Marque : {cotation.brand}</Typography>
              }
              {
              cotation.range
              && <Typography>Gamme : {cotation.range}</Typography>
              }
              {
              cotation.model
              && <Typography>Modèle : {cotation.model}</Typography>
              }
            </div>
          </Paper>
        </Grid>
        
              
            
      </Grid>
    )
}