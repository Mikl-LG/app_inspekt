import React, { useEffect } from 'react';
import crypto from '../components/crypto';
import logo from '../logo_inspekt.png';

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop : '20vh'
    },
    button:{
        marginLeft:'20px'
    },
    form:{
        height:'100%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop:'200px'
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));

export default function Login({setUserInState}){
    const [user,setUser] = React.useState();
    const [token,setToken] = React.useState();
    const [company,setCompany] = React.useState();
    const [cieMembers,setCieMembers] = React.useState();
    const [email,setEmail] = React.useState();
    const [passwrd,setPasswrd] = React.useState();

    const classes = useStyles();
    
    const userConnect = async() => {
        const hash = await crypto.encrypt(passwrd, true)    
        // le 2e argument true renvoie une string iso un object {data: string}
    
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify({email, hash})                     
         }
         const fetchResponse = await fetch(
            'https://inspekt.herokuapp.com/api?request=LOGIN', 
            fetchOptions
         )

         console.log('email : ',email);
         console.log('passwrd : ',passwrd);
         console.log('hash : ',hash);
         console.log('fetchResponse : ',fetchResponse);
         setUserInState({user:'mikllg'});
    }
    

    return(
        <div className={classes.root}>

            <img src={logo} height='100vh'></img>
            <form className={classes.form}>
                <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="Email"
                    variant="outlined"
                    onChange={(event) => setEmail(event.target.value)}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <MailIcon />
                        </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="Mot de passe"
                    variant="outlined"
                    type="password"
                    onChange={(event) => setPasswrd(event.target.value)}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <VpnKeyIcon />
                        </InputAdornment>
                        ),
                    }}
                />
                <Button
                    color="primary"
                    variant='contained'
                    className={classes.button}
                    size="small" 
                    onClick={() => userConnect()}
                >Me connecter</Button>
            </form>
            <Typography style={{fontSize:'0.7em'}}>Vous n'êtes pas encore membre? <a href='https://inspekt.fr/' target='_blank'>Inscrivez-vous maintenant</a></Typography>
            


    </div>
    )

}