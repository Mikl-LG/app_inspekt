import React, { Component } from 'react';
import formsCatalog from '../constants/FormsCatalog.js';
import steps from '../constants/Steps.js';
//import ImageUploader from "react-images-upload";
import Axios from 'axios';
const API_URL = 'https://inspekt-open-backend.herokuapp.com' // 'http://localhost:3001'

class NewExpertise extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  async componentDidMount(){
    this.state.identificationformlist = await Promise.resolve(formsCatalog.formSteps({step:2}));
    this.state.configurationformlist = await Promise.resolve(formsCatalog.formSteps({step:3}));
    this.state.picturerequiredlist = await Promise.resolve(formsCatalog.formSteps({step:4}));
    this.setState({loading:false});
    
  }

  async componentDidUpdate(){
     console.log('newExpertiseState updated : ',this.state); 
  }

  render() {

    return (
        <p>Hello world !</p>
    )
  }
}

export default NewExpertise
