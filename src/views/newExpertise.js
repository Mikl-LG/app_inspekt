import React, { Component, useEffect } from 'react';
import Color from '../constants/color';
import DatePicker from '../components/datePicker';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormsCatalog from '../constants/FormsCatalog';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Natures from '../constants/Natures';
import Snackbar from '@material-ui/core/Snackbar';
import Steps from '../constants/Steps';
//import ImageUploader from "react-images-upload";


import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Select from '@material-ui/core/Select';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import Axios from 'axios';
import { Typography, Button, SnackbarContent } from '@material-ui/core';
import { set } from 'date-fns';
const API_URL = 'https://inspekt-open-backend.herokuapp.com' // 'http://localhost:3001'

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

  formControl: {
    margin: theme.spacing(1),
    minWidth: '99%',
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
  return ['','Client', 'Machine', 'Options','Images','Commentaires'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return '';
    case 1:
      return 'A qui appartient le matériel:';
    case 2:
      return 'De quel matériel s\'agit-il :';
    case 3:
      return 'Comment le matériel est-il équipé :';
    case 4:
      return 'Une photo vaut mieux qu\'un long discours :';
    case 5:
        return 'Les derniers détails...';
    default:
      return 'Cette étape est indisponible...';
  }
}

export default function NewExpertise({setStateFromChild,logInfo,getInspekts}){

  /**DATA SUBSCRIBTION : CUSTOMER INPUTS, NATURELIST, MACHINEFORMLIST, MACHINEFEATURELIST, PICTURESREQUIRED*/
  const [customerInputs,setCustomerInputs] = React.useState(Steps[1].fields);
  const [formsCatalog,setFormsCatalog] = React.useState(FormsCatalog);
  const [machineFormList,setMachineFormList] = React.useState(() => {
    FormsCatalog.formSteps({step:2}).then((value) => {
      setMachineFormList(value);
    })
  });
  const [natureList,setNatureList] = React.useState(Natures.Natures);
  const [brands,setBrands] = React.useState([]);
  const [machineFeaturesFormList,setMachineFeaturesFormList] = React.useState(() => {
    FormsCatalog.formSteps({step:3}).then((value) => {
      setMachineFeaturesFormList(value);
    })
  });
  const [picturerequiredlist,setpicturerequiredlist] = React.useState(() => {
    FormsCatalog.formSteps({step:4}).then((value) => {
      setpicturerequiredlist(value);
    })
  });
  const [pictureList,setPictureList] = React.useState([]);

  /**HOOK HANDLE */
  const [nature,setNature] = React.useState();
  const [customer,setCustomer] = React.useState({});
  const [image, setImage] = React.useState({});
  const [loader,setLoader] = React.useState({isOpen:false,title:'',content:''})
  const [machine,setMachine] = React.useState({});
  const [machineFeatures,setMachineFeatures] = React.useState({});
  const [particularities,setParticularities] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const customerHandleChange = (target) => {
      customer[target.id] = target.value;
      setCustomer(customer);
  }
  
  const imageHandleChange = (e,property) => {
    if (e.target.files.length) {
      setImage({...image,[property]:{
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      }});
    }
  }
  const machineHandleChange = (target,inputName) => {
    machine[inputName] = target.value;
    setMachine(machine);
  }

  const machineFeaturesHandleChange = (target,inputName) => {
    machineFeatures[inputName] = target.value;
    setMachineFeatures(machineFeatures);
  }

  const machineFeaturesToggleChange = (property,value) => {
    if(machineFeatures[property]){
      const index = machineFeatures[property].indexOf(value);
        if(index == -1){
          setMachineFeatures({...machineFeatures,[property] : [...machineFeatures[property],value]})
        }else{
          machineFeatures[property].splice(index,1);
          setMachineFeatures(machineFeatures);
        }
    }else{
      let arrayValue = [value];
      setMachineFeatures({...machineFeatures,[property] : arrayValue})
    }
  }

  const natureMachineHandleChange = async(target) => {
    const natureInput = JSON.parse(target.value);

    let pictureToSet = [];

    if(natureInput && natureInput.formStepsTypes[4].type == 'trailed'){
      pictureToSet = [...picturerequiredlist.trailed];

    }else if (natureInput && natureInput.formStepsTypes[4].type == 'regular'){
      pictureToSet = [...picturerequiredlist.regular];
    }

    if (natureInput && natureInput.formStepsTypes[4].addOns){
      natureInput.formStepsTypes[4].addOns.map((element) => {
        pictureToSet.push(picturerequiredlist.addOns[element]);
      })
    }

    setPictureList(pictureToSet);

    setMachine({nature:{name:natureInput.name,key:natureInput.key}}); //remplacer text et value par name et key

    setNature(natureInput);
    
    formsCatalog[natureInput.key] && setBrands(formsCatalog[natureInput.key].brands);

    setStateFromChild({nature:natureInput});

  }

  const snackbarHandleClose = () => {
    setSnackbar({isOpen:false})
  }

  const stepperHandleNext = async() => {

    if(activeStep === steps.length -1){

      setLoader({isOpen:true,title:'Sauvegarde en cours...',content:'Bien joué : on vérifie que tout va bien et on sauvegarde ton expertise.'})

      const token = logInfo.token;
      let pictures = {};
      
      if(JSON.stringify(image) != "{}"){
        let picturesArray =[];
        for (let[key,value] of Object.entries(image)){
          if(value.raw){
            picturesArray.push({[key]:value.raw});
          }
        }

        const data = await new Promise((resolve,reject)=>{
          let formdata = new FormData();
          
          picturesArray.forEach((picture,index)=>{
            for (let [key,value] of Object.entries(picture)){
              formdata.append('filedata',value);
              if(index == picturesArray.length-1){
                resolve(formdata);
              }
            }
          })
        })

        ///////// ADD PICTURES TO S3 \\\\\\\\\\
        const axiosParams = await Promise.resolve({
          method: "post",
          url: `https://inspekt.herokuapp.com/webapi/create_inspekt?token=${token}`,
          // FormData object containing all images in 'filedata'
          data:data,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })

        const {data: urls, status} = await Axios(axiosParams);

        if(status === 200){
          picturesArray.forEach((element,index) => {
            for (let [key,value] of Object.entries(element)){
              
              pictures[key] = urls[index];
              
            }
          }  
          )
        }
      }

      const body = await Promise.resolve({
        customer:customer, 
        machine: machine, 
        machineFeatures: machineFeatures, 
        pictures:pictures, 
        particularities: particularities, 
        status: 'inspekt',
        
    })
    ////////// ADD INSPEKT TO S3 \\\\\\\\\\

      const url = `https://inspekt.herokuapp.com/api?request=CREATE_INSPEKT&token=${token}`
      let fetchOptions = await Promise.resolve(
          {
              method: 'POST',
              mode: 'cors',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(body)
          }
      )
      let fetching = await fetch(url, fetchOptions)
      let error = await Promise.resolve(!fetching.ok)
      let response = !error && await Promise.resolve(fetching.json());

      setLoader({isOpen:false,title:'',content:''})

      //UPDATE STATE WITH THE NEW INSPEKTLIST
      setStateFromChild({inspektList : response});

      setActiveStep(0);

      setSnackbar({message : 'Et une expertise de plus !',type:'snackbarSuccess',isOpen:true});
      getInspekts();

    }else if(activeStep === 2 && !nature){
      
      setSnackbar({message : 'Tu es très rapide! Mais tu dois sélectionner une nature pour continuer.',type:'snackbarWarning',isOpen:true});

    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      //FOCUS USER ON THE FORM AND HIDE APPBAR AND HEADER IF THE DOCUMENT.HEIGHT IS HIGHER THAN THE SCREEN
      activeStep !==0 && window.scrollTo({
        top: document.getElementById('stepper').offsetTop,
        left: 0,
        behavior: 'smooth'
      });
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
    console.log('machineFormList : ',machineFormList);
  })

    const classes = useStyles();

    return (
      
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
                <Button onClick={stepperHandleReset}>Ajouter une nouvelle expertise</Button>
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
          <Typography variant='h6' style={{width:'100%',textAlign:'center',padding:'30px',color:Color.secondary}}>Créer une nouvelle expertise.</Typography>
        }

        {
          activeStep === 1 &&
          <form className={classes.rootForm} noValidate autoComplete="off">
          {
            customerInputs && customerInputs.map((input) => (
              <TextField
                key={input.property}
                className='input'
                id={input.property}
                label={input.title}
                variant="outlined"
                onChange={(e) => (customerHandleChange(e.target))}
              />
            ))
          }
        </form>
        }
        {
          activeStep === 2 &&
          <div>
            <FormControl className={classes.formControl}>
              <Select
                  native
                  className={classes.optionsInput}
                  id="nature_select"
                  placeholder="Nature"
                  variant="outlined"
                  value={nature && JSON.stringify(nature)}
                  onChange={(e) => natureMachineHandleChange(e.target)}
              >
                {
                  natureList && natureList.map((nature) => (
                    <option key={nature.key} value={JSON.stringify(nature)}>{nature.name}</option>
                  ))
                }
              </Select>
            </FormControl>

            <form className={classes.rootForm} noValidate autoComplete="off">
            {
              (nature && machineFormList)
              ?machineFormList.regular.map((input) => (
                input.property == 'brand'
                ?
                  brands.length
                  ?
                  <div key={input.property}>
                    <InputLabel>Marque</InputLabel>
                    <Select
                      className={classes.optionsInput}
                      id='brand'
                      variant="outlined"
                      value={machine.brand && machine.brand}
                      onChange={(e) => machineHandleChange(e.target,'brand')}
                    >
                    {
                      brands.map((data) => (
                        <MenuItem key={data} value={data}>{data}</MenuItem>
                      ))
                    }
                    </Select>
                  </div>
                  :
                  <div key={input.property}>
                    <TextField
                      key={input.property}
                      className={classes.optionsInput}
                      id='brand'
                      label='Marque'
                      variant="outlined"
                      value={machine.brand && machine.brand}
                      onChange={(e) => machineHandleChange(e.target,'brand')}
                    />
                  </div>
                :
                input.data
                ?
                  <div key={input.property}>
                    <InputLabel>{input.title}</InputLabel>
                    <Select
                      key={input.property}
                      className={classes.optionsInput}
                      id={input.property}
                      variant="outlined"
                      value={machine[input.property] && machine[input.property]}
                      onChange={(e) => machineHandleChange(e.target,input.property)}
                    >
                    {
                      input.data.map((data) => (
                        <MenuItem key={data} value={data}>{data}</MenuItem>
                      ))
                    }
                    </Select>
                  </div>
                :
                  <TextField
                    key={input.property}
                    className={classes.optionsInput}
                    id={input.property}
                    label={input.title}
                    variant="outlined"
                    onChange={(e) => machineHandleChange(e.target,input.property)}
                  />
              ))
              :null
            }
            {
              (nature && nature.formStepsTypes[2].addOns && machineFormList.addOns)
              ?nature.formStepsTypes[2].addOns.map((input) => (
                <TextField
                    key={machineFormList.addOns[input].property}
                    className={classes.optionsInput}
                    id={machineFormList.addOns[input].property}
                    label={machineFormList.addOns[input].title}
                    variant="outlined"
                    onChange={(e) => machineHandleChange(e.target,machineFormList.addOns[input].property)}
                  />
              ))
              :null
            }
            </form>
          </div>
        }
        {
          activeStep === 3 &&
            <div>
              <form className={classes.rootForm} noValidate autoComplete="off">
                {
                  nature
                  ?nature.formStepsTypes[3].addOns.map((input) => (

                      machineFeaturesFormList.addOns[input].data
                      ?
                        (
                          <div>
                            <InputLabel>{machineFeaturesFormList.addOns[input].title}</InputLabel>
                            <Select
                              select
                              key={machineFeaturesFormList.addOns[input].property}
                              className={classes.optionsInput}
                              id={machineFeaturesFormList.addOns[input].property}
                              variant="outlined"
                              //defaultValue={machineFeaturesFormList.addOns[input].data[2]}
                              onChange={(e) => machineFeaturesHandleChange(e.target,machineFeaturesFormList.addOns[input].property)}
                            >
                            {
                              machineFeaturesFormList.addOns[input].data.map((data) => (
                                <MenuItem key={data} value={data}>{data}</MenuItem>
                              ))
                            }
                            </Select>
                          </div>
                        )
                      :
                        /**NON DISPLAYING THE TOGGLE BUTTONS */
                        machineFeaturesFormList.addOns[input].toggle
                        ?
                        null
                        :
                          <div>
                            <InputLabel>{machineFeaturesFormList.addOns[input].title}</InputLabel>
                            <TextField
                              key={machineFeaturesFormList.addOns[input].property}
                              className={classes.optionsInput}
                              id={machineFeaturesFormList.addOns[input].property}
                              variant="outlined"
                              onChange={(e) => machineFeaturesHandleChange(e.target,machineFeaturesFormList.addOns[input].property)}
                            />
                          </div>

                  ))
                  :null
                }
                </form>
                <form className={classes.toggleForm} noValidate autoComplete="off">
                {
                  /**DISPLAY TOGGLE AT THE END OF THE FORM */
                  nature
                  ?nature.formStepsTypes[3].addOns.map((input) => (
                    machineFeaturesFormList.addOns[input].toggle
                    ?
                      (
                        <div className={classes.toggle}>
                          <InputLabel>{machineFeaturesFormList.addOns[input].title}</InputLabel>
                          {
                            machineFeaturesFormList.addOns[input].toggle.map((data) => (
                              <FormControlLabel
                                key={machineFeaturesFormList.addOns[input].property}
                                label={data}
                                control={
                                  <Switch
                                    //checked={state.jason}
                                    onChange={() => machineFeaturesToggleChange(machineFeaturesFormList.addOns[input].property,data)}
                                    color="primary"
                                    name={data}
                                />}
                              > 
                              </FormControlLabel>
                            ))
                          }
                        </div>
                      )
                    :
                      null
                  ))
                  :null
                }
                </form>
            </div>
        }
        {
          activeStep === 4 &&
            <div>
              <div className={classes.rootPicture}>
                {
                  pictureList && 
                    pictureList.map((picture) => (
                      <div style={{display:'flex',alignItems:'center'}}>
                        <Divider/>
                        <div style={(image[picture.property] && image[picture.property].preview) ? {justifySelf:'flex-end',width:'80px',marginRight:'10vw'} : {display:'none'}}>
                          <img
                            src={image[picture.property] && image[picture.property].preview && image[picture.property].preview}
                            style={{width:'80px'}}
                          />
                        </div>
                        <label htmlFor={`image ${picture.property}`}>
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                          </IconButton>
                        </label>
                        <Typography>{picture.title}</Typography>
                        <input
                          accept="image/*"
                          className={classes.hideInput}
                          id={`image ${picture.property}`}
                          type="file"
                          onChange={(e) => imageHandleChange(e,picture.property)}
                        />
                        
                      </div>
                    ))
                }
              </div>
            </div>
        }
        {
          activeStep === 5 &&
            <div>
                {
                  <div className={classes.rootForm}>
                    <DatePicker
                      setAvalaibleDate={(date) => setParticularities({...particularities,availableDate:date})}
                    />
                    <TextField
                      id="comment"
                      label="Commentaires"
                      multiline
                      rowsMin={4}
                      value={particularities.comment}
                      onChange={(event) => setParticularities({...particularities,comments:event.target.value})}
                    />
                  </div>
                }
              
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
    )
}