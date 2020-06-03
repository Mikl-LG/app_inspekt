import React from 'react';
import {hasher} from '../components/crypto';
import logo from '../logo_inspekt.png';

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Typography } from '@material-ui/core';

import SnackBar from '../components/snackBar';

const useStyles = makeStyles((theme) => ({
    root:{
        height:window.innerHeight,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around'
    },
    button:{
        marginLeft:'20px'
    },
    form:{
        height:'100%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center'
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));

export default function Login({setStateFromChild,getInspekts,getQots}){
    const [user,setUser] = React.useState();
    const [token,setToken] = React.useState();
    const [company,setCompany] = React.useState();
    const [cieMembers,setCieMembers] = React.useState();
    const [email,setEmail] = React.useState();
    const [passwrd,setPasswrd] = React.useState();
    const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});

    const classes = useStyles();
    
    const userConnect = async() => {
        setStateFromChild({loading:true})
        const hash = await hasher(passwrd)   
        // le 2e argument true renvoie une string iso un object {data: string}
    
        const fetchOptions = {
            headers: {Accept:'application/json','Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify({email, hash})                     
         }
         const fetchResponse = await fetch(
            'https://inspekt.herokuapp.com/api?request=LOGIN', 
            fetchOptions
         )
         console.log('statut : ',fetchResponse.status);
         if(fetchResponse.status === 200){
            setStateFromChild({logInfo:await fetchResponse.json()});
            getInspekts();
            getQots();
            //setStateFromChild({loading:false});
         }else if(fetchResponse.status === 401){
            alert('Utilisateur inconnu')
            setSnackbar({message : 'Utilisateur inconnu',type:'snackbarWarning',isOpen:true});
            setStateFromChild({loading:false});
         }
         
    }
    

    return(
        <div className={classes.root}>
            <div>
                <img src={logo} height='100vh'></img>
            </div>
            <div style={{height:'15vi'}}>
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
                <Typography style={{fontSize:'0.7em'}}>
                    Vous n'êtes pas encore membre? 
                    <a href='https://inspekt.fr/user.php' target='_blank'>Inscrivez-vous maintenant</a>
                </Typography>
            </div>
            <SnackBar
                    handleClose={() => setSnackbar({isopen : false})}
                    message={snackbar.message}
                    type={snackbar.type}
                    isOpen={snackbar.isOpen}
                />        
    </div>
    )

}