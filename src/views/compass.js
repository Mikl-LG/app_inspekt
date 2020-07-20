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
  cotationEdition : {
    marginLeft:'10px',
    color : Color.lightgrey,
    marginTop:'20px',
    border:'1px solid grey',
    borderRadius:'5px',
    width:'80%',
    padding:'5%'
  },
  formContainer:{
    display:'flex',
    flexDirection : 'column',
    alignItems:'flex-start',
    justifyContent:'center'
  },
  formControl:{
    width:'50%',
    marginTop:'20px'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color:Color.secondary
  },
  paper:{
    height:'80%',
    marginTop:'10px'
  },
  root:{
    overflow:'scroll',
    marginBottom:'200px',
    padding:'5vw'
  },
  rootStepper:{
    width:'100%'
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
}));

function getSteps() {
  return ['','Nature', 'Gamme', 'Modèle', 'Année', 'Remise en état'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return '';
    case 1:
      return 'Identification de votre machine :';
    case 2:
      return 'Sélectionner une gamme :';
    case 3:
      return 'Sélectionner un modèle :';
    case 4:
      return 'Année de construction :';
    case 5:
      return 'Sélectionner les élements à remplacer :';
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

  const damagesChecked = (damage) => {
    let damages = cotation.damages || [];
    damages.indexOf(damage) < 0 ? damages.push(damage) : damages.splice(damages.indexOf(damage),1);
    setCotation({...cotation,damages : damages});
  }

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
  
  const getMachineGrossPrice = () => {
    const age = new Date().getFullYear() - cotation.year;
    let devaluationFactor = 0;
    switch(age){
      case '0' : devaluationFactor = 0;
      break;
      case 1 : devaluationFactor = 1 - cotation.machine.firstYearDevaluation / 100;
      break;
      case 2 : devaluationFactor = (1 - cotation.machine.firstYearDevaluation / 100) * (1 - cotation.machine.secondYearDevaluation / 100)
      break;
      default : devaluationFactor = (1 - cotation.machine.firstYearDevaluation / 100) * (1 - cotation.machine.secondYearDevaluation / 100) * Math.pow(1 - parseInt(cotation.machine.standardYearDevaluation)/100,parseInt(age-2))
    }

    const grossPrice = cotation.machine && cotation.machine.purchasePriceList[cotation.year] * devaluationFactor;
    return(grossPrice);
  }

  const getMachinePreparationCost = () => {
    let preparationCost= cotation.damages && cotation.damages.length && cotation.damages.map((damage) => parseInt(damage.price)).reduce((a,b) => a + b,0) || 0;

    return(preparationCost);
  }
  
  const snackbarHandleClose = () => {
    setSnackbar({isOpen:false})
  }

  const setMarque = (brand) => {
    setCotation({...cotation,brand:brand});
    getAllRanges(cotation.nature.key,'NOREMAT',brand);
  }

  const setModel = (model) => {
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

      setCotation({...cotation,displayCotation : true})

    }else if(activeStep === 1 && (!cotation.nature || !cotation.brand)){
      
      setSnackbar({message : 'Tu es très rapide! Mais tu dois sélectionner une nature et une marque pour continuer.',type:'snackbarWarning',isOpen:true});

    }else if(activeStep === 2 && !cotation.range){
      
      setSnackbar({message : 'Tu es très rapide! Mais tu dois sélectionner une gamme pour continuer.',type:'snackbarWarning',isOpen:true});

    }else if(activeStep === 3 && (!cotation.machine || !cotation.machine.model)){
      
      setSnackbar({message : 'Tu es très rapide! Mais tu dois sélectionner un modèle pour continuer.',type:'snackbarWarning',isOpen:true});

    }else if(activeStep === 4 && !cotation.year){
      
      setSnackbar({message : 'Tu es très rapide! Mais tu dois sélectionner une année pour continuer.',type:'snackbarWarning',isOpen:true});

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
              <div className={classes.formContainer}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id='natureSelectLabel' className={classes.formSelect}>Nature</InputLabel>
                    <Select
                      className={classes.formSelect}
                      id='natureSelect'
                      label='Nature'
                      labelId='natureSelectLabel'
                      value={cotation.nature}
                      inputProps={{id:'natureSelect'}}
                      onChange = {(e) => setNature(e)}
                    >
                        {
                            allNatures && allNatures.map((nature) => <MenuItem id={nature.key} value={nature}>{nature.name}</MenuItem>)
                          
                        }
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id='brandSelectLabel' className={classes.formSelect}>Marque</InputLabel>
                    <Select
                      className={classes.formSelect}
                      id='brandSelect'
                      label='Marque'
                      labelId='brandSelectLabel'
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
              <div className={classes.formContainer}>
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="range" name="range" value={cotation.range} onChange={(e) => setRange(e.target.value)}>
                      {
                        allRanges && allRanges.map((range) => <FormControlLabel value={range} control={<Radio color='primary' />} label={range} />)
                      }
                    </RadioGroup>
                  </FormControl>
                </div>
            }
            {
              activeStep === 3 &&
              <div className={classes.formContainer}>
                {
                allModels
                && <FormControl component="fieldset">
                  <RadioGroup aria-label="range" name="range" value={cotation.machine && cotation.machine.model} onChange={(e) => setModel(e.target.value)}>
                  {
                    allModels && allModels.map((model) => <FormControlLabel value={model} control={<Radio color='primary' />} label={model} />)
                  }
                  </RadioGroup>
                  </FormControl>
                }
                </div>
            }
            {
              activeStep === 4 &&
                <div className={classes.formContainer}>
                  <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id='brandSelectLabel' className={classes.formSelect}>Année</InputLabel>
                    <Select
                      className={classes.formSelect}
                      id='yearsSelect'
                      label='Année'
                      labelId='brandSelectLabel'
                      placeholder='Année de construction'
                      disabled={!cotation.nature}
                      className={classes.formSelect}
                      value={cotation.year}
                      onChange = {(e) => setCotation({...cotation,year : e.target.value})}
                      inputProps={{id:'yearsSelect'}}
                    >
                      {
                        Object.keys(cotation.machine.purchasePriceList).map((year) => <MenuItem id={year} value={year}>{year}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                </div>
            }
            {
              activeStep === 5 &&
                <div className={classes.formContainer}>
                  <FormGroup>
                  {
                    cotation.machine && cotation.machine.damages
                    && cotation.machine.damages.map(damage => 
                      <FormControlLabel
                        control={<Switch color='primary' size="small" checked={cotation.damages && cotation.damages.indexOf(damage) > -1} onChange={() => damagesChecked(damage)} />}
                        label={damage.name}
                      />
                    )
                  }
                  </FormGroup>
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
                {activeStep === steps.length - 1 ? 'Evaluer' : 'Suivant'}
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
          <Paper elevation1 = {true} className={classes.paper}>
              {
              cotation.nature
              ? 
                <div style={{width:'100%',display : 'flex', justifyContent:'center',flexDirection:'column'}}>
                  <div className={classes.cotationEdition}>
                    <Typography style={{width:'100%',textAlign:'center',fontWeight:'bold',color:Color.secondary,marginTop:'20px'}}>MACHINE</Typography>
                    <Divider/>
                    <Typography>Nature : {cotation.nature.name}</Typography>
                    {
                    cotation.brand
                    && <Typography>Marque : {cotation.brand}</Typography>
                    }
                    {
                    cotation.range
                    && <Typography>Gamme : {cotation.range}</Typography>
                    }
                    {
                    cotation.machine && cotation.machine.model
                    && <Typography>Modèle : {cotation.machine.model}</Typography>
                    }
                    {
                    cotation.year
                    && <Typography>Année : {cotation.year}</Typography>
                    }
                    {
                    cotation.damages && cotation.damages.length
                    && 
                        <div style={{marginTop:'20px'}}>
                        <Typography style={{width:'100%',textAlign:'center',fontWeight:'bold',color:Color.secondary,marginTop  :'20px'}}>REMISE EN ETAT</Typography>
                        <Divider/>
                        {
                        cotation.damages.map(damage => <Typography>{damage.name + ' : ' + new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(parseInt(damage.price))}</Typography>)
                        }
                        </div>
                    }
                    </div>
                    {
                    cotation.displayCotation === true
                    && 
                      <div className={classes.cotationEdition}>
                        <Typography style={{width:'100%',textAlign:'center',fontWeight:'bold',color:Color.secondary}}>COTATION</Typography> 
                        <Divider/>
                        <Typography style={{marginTop:'5px'}}>
                          <div style={{fontWeight : 'bold'}}>
                            Prix catalogue en {cotation.year} : 
                          </div>
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cotation.machine.purchasePriceList[cotation.year])}
                        </Typography>
                        <Typography style={{marginTop:'5px'}}>
                          <div style={{fontWeight : 'bold'}}>
                            Règle de dépréciation : 
                          </div>
                          {cotation.machine.firstYearDevaluation + '%, ' + cotation.machine.secondYearDevaluation + '%, puis ' + cotation.machine.standardYearDevaluation + '%'}
                        </Typography>
                        <Typography style={{marginTop:'5px'}}>
                          <div style={{fontWeight : 'bold'}}>
                            Valeur brute actuelle : 
                          </div>
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(getMachineGrossPrice())}
                        </Typography>
                        {
                          cotation.damages && cotation.damages.length
                          &&
                          <Typography style={{marginTop:'5px'}}>
                          <div style={{fontWeight : 'bold'}}>
                            Remise en état : 
                          </div>
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(getMachinePreparationCost())}
                        </Typography>
                        }
                        {
                          <Typography style={{color:Color.secondary,marginTop:'10px'}}>
                          <Divider/>
                          <div style={{fontWeight : 'bold'}}>
                            Prix net : 
                          </div>
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(getMachineGrossPrice() - getMachinePreparationCost())}
                        </Typography>
                        }
                      </div>
                    }
                </div>
              :
                  <div style={{display:'flex',flexDirection : 'column',width:'100%',height:'100%',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                    <img src='https://inspekt-prod.s3.eu-west-3.amazonaws.com/COMPANIES/HEADERS/logoNoremat.jpg' width='200px'/>
                    <Typography>Service développé par et pour les équipes NOREMAT. Seuls les utilisateurs NOREMAT ont accès à ce calculateur.</Typography>
                  </div>
                  
              }
          </Paper>
        </Grid>
        
              
            
      </Grid>
    )
}