import React, { Component, useEffect } from 'react';
import Color from '../constants/color.js';
import FormsCatalog from '../constants/FormsCatalog.js';
import Natures from '../constants/Natures.js';
import Steps from '../constants/Steps.js';
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
import { Typography, Button } from '@material-ui/core';
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
  rootStepper:{
    width:'100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
  return ['Client', 'Machine', 'Options','Images','Commentaires'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return '';
    case 1:
      return 'A qui appartient le matériel?';
    case 2:
      return 'De quel matériel s\'agit-il? :';
    case 3:
      return 'Comment le matériel est-il équipé?';
    case 4:
      return 'Une photo vaut mieux qu\'un long discours, non?';
    case 5:
        return 'Les derniers détails...';
    default:
      return 'Cette étape est indisponible...';
  }
}

export default function NewExpertise({setStateFromChild}){

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

  /**HOOK HANDLE */
  const [nature,setNature] = React.useState();
  const [customer,setCustomer] = React.useState({});
  const [machine,setMachine] = React.useState({});
  const [machineFeatures,setMachineFeatures] = React.useState({});
  const [machinePictures,setMachinePictures] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const customerHandleChange = (target) => {
      customer[target.id] = target.value;
      setCustomer(customer);
  }

  const natureMachineHandleChange = (target) => {
    const natureInput = JSON.parse(target.value);
    //setMachine(machine);
    setNature(natureInput);
    setBrands(formsCatalog[natureInput.value].brands);
    setStateFromChild({nature:natureInput});

  }

  const machineHandleChange = (target,inputName) => {
    machine[inputName] = target.value;
    setMachine(machine);
  }

  const machineFeaturesHandleChange = (target,inputName) => {
    machineFeatures[inputName] = target.value;
    setMachineFeatures(machineFeatures);
  }

  const stepperHandleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    //FOCUS USER ON THE FORM AND HIDE APPBAR AND HEADER IF THE DOCUMENT.HEIGHT IS HIGHER THAN THE SCREEN
    activeStep !==0 && window.scrollTo({
      top: document.getElementById('stepper').offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  };

  const stepperHandleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepperHandleReset = () => {
    setActiveStep(0);
  };

  /**USEEFFECT ONLY USED ON CONSOLE */
  useEffect(() => {
    console.log('picturerequiredlist : ',picturerequiredlist);
    console.log('nature : ',nature);
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
                <Typography className={classes.instructions}>Votre expertise est prête !</Typography>
                <Button onClick={stepperHandleReset}>Recommencer</Button>
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
                  select
                  className={classes.optionsInput}
                  id="nature_select"
                  placeholder="Nature"
                  variant="outlined"
                  value={nature && JSON.stringify(nature)}
                  onChange={(e) => natureMachineHandleChange(e.target)}
              >
                {
                  natureList && natureList.map((nature) => (
                    <option key={nature.value} value={JSON.stringify(nature)}>{nature.text}</option>
                  ))
                }
              </Select>
            </FormControl>

            <form className={classes.rootForm} noValidate autoComplete="off">
            {
              (nature && machineFormList)
              ?machineFormList.regular.map((input) => (
                  input.data
                  ?
                    (
                      input.property == 'brand'
                      ?
                        <div>
                          <InputLabel>Marque</InputLabel>
                          <TextField
                            select
                            className={classes.optionsInput}
                            id='brand'
                            variant="outlined"
                            value={machine && machine.brand}
                            onChange={(e) => machineHandleChange(e.target,'brand')}
                          >
                          {
                            brands.map((data) => (
                              <option key={data} value={data}>{data}</option>
                            ))
                          }
                          </TextField>
                        </div>
                      :
                        <div>
                          <InputLabel>{input.title}</InputLabel>
                          <TextField
                            select
                            key={input.property}
                            className={classes.optionsInput}
                            id={input.property}
                            variant="outlined"
                            value={machine.nature && JSON.stringify(machine.nature)}
                            onChange={(e) => machineHandleChange(e.target,input.property)}
                          >
                          {
                            input.data.map((data) => (
                              <option key={data} value={data}>{data}</option>
                            ))
                          }
                          </TextField>
                        </div>
                      )
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
                            <TextField
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
                                <option key={data} value={data}>{data}</option>
                              ))
                            }
                            </TextField>
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
                              onChange={(e) => machineFeaturesHandleChange(e.target,input.property)}
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
                                    //onChange={handleChange}
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
              <div className={classes.rootForm}>
                {
                  (nature && nature.formStepsTypes)
                  ?
                    nature.formStepsTypes[4].type == 'trailed'
                    ?
                      (
                        picturerequiredlist.trailed.map((picture => (
                          <div className={classes.fileInput}>
                            <label htmlFor={`image ${picture.property}`}>
                              <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                              </IconButton>
                            </label>
                            <Typography>{picture.title}</Typography>
                            <input accept="image/*" className={classes.hideInput} ref={machinePictures} id={`image ${picture.property}`} type="file" />
                          </div>
                        )))
                      )
                    :
                      (
                        picturerequiredlist.regular.map((picture) => (
                          <div className={classes.fileInput}>
                            <label htmlFor={`image ${picture.property}`}>
                              <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                              </IconButton>
                            </label>
                            <Typography>{picture.title}</Typography>
                            <input accept="image/*" className={classes.hideInput} ref={machinePictures} id={`image ${picture.property}`} type="file"/>
                          </div>
                        ))
                      )
                  :null
                }
                {
                  (nature && nature.formStepsTypes[4].addOns) && 
                    nature.formStepsTypes[4].addOns.map((picture) => (
                      <div className={classes.fileInput}>
                        <label htmlFor={`image ${picturerequiredlist.addOns[picture].property}`}>
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                          </IconButton>
                        </label>
                        <Typography>{picturerequiredlist.addOns[picture].title}</Typography>
                        <input accept="image/*" className={classes.hideInput} ref={machinePictures} id={`image ${picturerequiredlist.addOns[picture].property}`} type="file"/>
                      </div>
                    ))
                }
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

      </div>
    )
}
