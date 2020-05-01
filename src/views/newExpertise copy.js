import React, { Component } from 'react';
import Color from '../constants/color.js';
import formsCatalog from '../constants/FormsCatalog.js';
import natures from '../constants/Natures.js';
import steps from '../constants/Steps.js';
//import ImageUploader from "react-images-upload";


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import Axios from 'axios';
import { Typography } from '@material-ui/core';
const API_URL = 'https://inspekt-open-backend.herokuapp.com' // 'http://localhost:3001'

class NewExpertise extends Component {

  constructor(props){
    super(props);
    this.state = {customer:{},machine:{}};
  }

  setCustomer = (target) => {
    let customer = this.state.customer;
    customer[target.id] = target.value;
  }

  setNature = (target) => {
    let machine = this.state.machine;
    machine.nature = target.value;
    this.setState(machine);
  }

  async componentDidMount(){
    this.state.natureList = await Promise.resolve(natures.Natures);
    this.state.steps = await Promise.resolve(steps);
    this.state.machineFormList = await Promise.resolve(formsCatalog.formSteps({step:2}));
    this.state.machineFeaturesFormList = await Promise.resolve(formsCatalog.formSteps({step:3}));
    this.state.picturerequiredlist = await Promise.resolve(formsCatalog.formSteps({step:4}));
    this.setState({loading:false});
    
  }

  async componentDidUpdate(){
     console.log('newExpertiseState updated : ',this.state); 
  }

  render() {

    const colorSecondary = Color.secondary;
    /**COLLECTING STEP 1 INPUTS */
    const customerInputs = this.state.steps && this.state.steps[1].fields;
    const natureList = this.state.natureList && this.state.natureList;
    

    return (
      <div>

      <Typography
        style={{color:colorSecondary,margin:'30px'}}
        variant='subtitle1'>1. Qui est le propriétaire :
      </Typography>

      <form className='customerForm' noValidate autoComplete="off">
        {
          customerInputs && customerInputs.map((input) => (
            <TextField
              className='input'
              id={input.property}
              label={input.title}
              variant="outlined"
              onChange={(e) => (this.setCustomer(e.target))}
            />
          ))
        }
      </form>

      <Typography
        style={{color:colorSecondary,margin:'30px'}}
        variant='subtitle1'>2. Sélectionnez la machine :
      </Typography>

      <form className='machineForm' noValidate autoComplete="off">
        <Select
            className='inputLarge'
            id="nature_select"
            variant='outlined'
            placeholder="Nature"
            value={this.state.nature && this.state.nature}
            onChange={(e) => this.setNature(e.target)}
        >
          {
            natureList && natureList.map((nature) => (
              <MenuItem value={nature.value}>{nature.text}</MenuItem>
            ))
          }
        </Select>
        
      </form>

      </div>
    )
  }
}

export default NewExpertise
