import React, { useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import { borders } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SaveIcon from '@material-ui/icons/Save';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import Color from '../constants/color.js';
import getPdf from '../components/expertisePdf';
import ImageSlider from '../components/imageslider';
import SnackBar from '../components/snackBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator,faEye,faUserShield,faTimesCircle,faMoneyBillAlt,faCheck,faComments } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  detailMachineContainer:{
    height:window.clientHeight,
    overflow:'scroll',
    padding:'10px',
  },
  expansionPanel:{
    backgroundColor:Color.secondary,
  },
  fullList: {
    width: 'auto',
  },
  listGrid: {
    width: '100%',
    paddingBottom:'50px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  list: {
    width: 250,
  },
  listItemText:{
    fontSize:'0.8em',//Insert your required size
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  smallIcon: {
    width: 16,
    height: 16,
  },
  snackBarError:{
    backgroundColor:Color.error
  },
  snackbarSuccess:{
    backgroundColor:Color.success
  },
  snackbarWarning:{
    backgroundColor:Color.warning
  },
  subLabel:{
    fontSize:'0.8em'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExpertiseDetails(props) {
  const classes = useStyles();
  const {open,setOpen,focusMachine,setFocusMachine,logInfo,setStateFromChild,getQots,getInspekts} = props;
  const [drawer,setDrawer] = React.useState({isOpen:false});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inputQuotations, setInputQuotations] = React.useState({});
  const [qoterMode,setQoterMode] = React.useState()
  const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});
  const [isOpenDeleteValidation,setIsOpenDeleteValidation] = React.useState(false);

  const checkDetailsToPrint = (detail) => {

      const detailToSet = focusMachine.orderedDetailsToPrint.find((element) => element === detail);
      const index = focusMachine.orderedDetailsToPrint.findIndex((element) => element === detail)
      if(detailToSet.visibleOnPdf === true){
        detailToSet.visibleOnPdf = false
      }else{
        detailToSet.visibleOnPdf = true
      }
  
      focusMachine.orderedDetailsToPrint.splice(index,1,detailToSet);
      setFocusMachine({...focusMachine});
    
    
  }

  const closeQuotation = async(quotation) => {

    const body = await Promise.resolve({
      expId : focusMachine.id,
      cieId : focusMachine.cieId && focusMachine.cieId,
      quotation
    })

    //**ADD COTATION REQUEST**\\
    const url = `https://inspekt.herokuapp.com/api?request=CLOSE_QUOTATIONS&token=${logInfo.token}`
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
    const {inspekts,qots} = response;

    if(error == false){
      setSnackbar({message : 'Cette machine est désormais évaluée, beau boulot.',type:'snackbarSuccess',isOpen:true});
      setDrawer({isOpen:false});
      setOpen(false);
      getInspekts();
      getQots();
    }
  }

  const editPdf = (type) => {
    //type = ficheExpertise || bonReprise || contreExpertise
    setAnchorEl(null);
    getPdf(focusMachine.orderedDetailsToPrint,type)
  }

  /**
   *  === HANDLE CHANGE GROUP ===
   */
  const handleChangeQuotations = (event,key) => {
    setInputQuotations({...inputQuotations,[key]:event.target.value});
  };


  const handleQoterModeChange = () => {
    if(qoterMode == true){
      setQoterMode(false)
    }else{
      setQoterMode(true);
      setSnackbar({
        message : 'Dans ce mode, ta cotation clôturera définitivement l\’évaluation de cette machine.',type:'snackbarWarning',isOpen:true});
    }
  }

  const inspektDelete = async(expertise) => {

    if(
      logInfo.user.licence === 'admin'
      || logInfo.user.licence === 'manager'
      || logInfo.user.licence === 'qoter'
      ){
        const body = await Promise.resolve(
          { expId : expertise.id, 
            //cieId : logInfo.company.id,
            //status : 'inspekt'
          })
        const url = `https://inspekt.herokuapp.com/api?request=REMOVE_EXPERTISE&token=${logInfo.token}`
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
    
        if(error == false){
          setSnackbar({message : 'INSPEKT supprimé',type:'snackbarSuccess',isOpen:true});
          setOpen(false);
          setIsOpenDeleteValidation(false);
          getInspekts();
        }else{
          setSnackbar({message : 'Essayes à nouveau en vérifiant ta connexion Internet',type:'snackbarWarning',isOpen:true});
        }
      }else{
        setSnackbar({message : 'Là tu essayes de supprimer l\'Inspekt de quelqu\'un d\’autre non?',type:'snackbarWarning',isOpen:true});
      }

  }

  const saveNewQuotation = async() => {
    if(qoterMode === true){
      if(
        logInfo.user.licence === 'admin'
        || logInfo.user.licence === 'manager'
        || logInfo.user.licence === 'qoter'
        ){
          const body = await Promise.resolve({
            expId : focusMachine.id,
            status: 'inspekt',
            merge: {            // {object} list des quotations à jour
              state:'En-cours'
            },
            /**cieId is required if the qot is not from the user company but from a linkage */
            cieId:focusMachine.cieId && focusMachine.cieId
          })
        
          //**ADD COTATION REQUEST**\\
          const url = `https://inspekt.herokuapp.com/api?request=SET_EXP&token=${logInfo.token}`
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

          if(error == false){
            closeQuotation(inputQuotations)
          }
        }
      
    }else{

      inputQuotations.userId = logInfo.user.id;
      inputQuotations.timestamp = Date.now();

      const quotations = await Promise.resolve([
        ...(focusMachine.quotations.map((element) => ({
              estimatedBuyingPrice : element.estimatedBuyingPrice,
              userId : element.userId,
              timestamp : element.timestamp
            })) || []),     // array
        inputQuotations                         // quotation object*
      ]);

      const body = await Promise.resolve({
        expId : focusMachine.id,
        status: 'inspekt',
        merge: {            // {object} list des quotations à jour
          quotations
        },
        /**cieId is required if the inspekt is not from the user company but from a linkage */
        cieId:focusMachine.cieId && focusMachine.cieId
      })

      //**ADD COTATION REQUEST**\\
      const url = `https://inspekt.herokuapp.com/api?request=SET_EXP&token=${logInfo.token}`
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

      if(error == false){
        
          setSnackbar({message : 'Votre cotation est enregistrée.',type:'snackbarSuccess',isOpen:true});
          getInspekts()
          setDrawer({isOpen:false});
          setOpen(false);
      } 
    }
  }

  const startCotation = () => {
    setQoterMode(logInfo.user.config.isDefaultQoter === true ? true : false);
    setDrawer({isOpen:true});

  }

  useEffect(()=>{
    console.log('inputQuotations : ',inputQuotations);
  })

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} id='machineDetailAppBar'>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="close">
              <Tooltip title="Fermer">
                <CloseIcon />
              </Tooltip>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {
                focusMachine 
                && focusMachine.machine 
                && focusMachine.machine.nature.name + ' ' +['brand','model'].map(
                  (e) => (focusMachine.machine[e] && focusMachine.machine[e])
                ).join(' ')
              }
            </Typography>
            {
              focusMachine.status === 'inspekt'
                &&
            <Tooltip title="Supprimer">
              <Button autoFocus color="inherit" onClick={() => setIsOpenDeleteValidation(true)}>
                <DeleteIcon/>
              </Button>
            </Tooltip>
            }
            <Tooltip title="Ajouter une cotation">
              <Button autoFocus color="inherit" onClick={() => startCotation()}>
                <Badge badgeContent={focusMachine.quotations && focusMachine.quotations.length} color="secondary">
                  <FontAwesomeIcon icon={faCalculator} style={{fontSize:'1.5em'}}/>
                </Badge>
              </Button>
            </Tooltip>

            <Tooltip title="Télécharger les photos">
              <Button autoFocus color="inherit"
                onClick={() => setSnackbar({message : 'Be patient : someone is developing this...',type:'snackbarWarning',isOpen:true})}>
                <FontAwesomeIcon icon={faImages} style={{fontSize:'1.5em'}}/>
              </Button>
            </Tooltip>
              <Button 
                aria-controls='pdf-edit'
                autoFocus
                color="inherit" 
                onClick={(event) => {setAnchorEl(event.currentTarget)}}
              >
                <PictureAsPdfIcon/>
              </Button>
            <Menu
              id="pdf-edit"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => {setAnchorEl(null)}}
            >
              <MenuItem onClick={() => editPdf('ficheExpertise')}>Fiche d'expertise</MenuItem>
              <MenuItem onClick={() => editPdf('bonReprise')}>Bon de reprise</MenuItem>
              <MenuItem onClick={() => {setAnchorEl(null)}}>Contre-expertise</MenuItem>
            </Menu>
            
          </Toolbar>
        </AppBar>
        <Divider />
        <Grid container>
          <Grid item xs={12} sm={6} lg={6}>
            <ImageSlider imageList={focusMachine.imageList}/>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <div className={classes.detailMachineContainer}>
              <Typography
                variant="subtitle2"
                style={{width:'100%',textAlign:'center'}}>
                  Informations machine
              </Typography>
              <Divider/>

              {
                focusMachine.orderedDetailsToPrint && focusMachine.orderedDetailsToPrint.map((element,index) => (
                  element == 'divider' 
                  ? <Divider/>
                  :
                    <ListItemText key={element.property} classes={{primary:classes.listItemText}}>
                      <div style={{display:'flex', alignItems:'center'}}>
                        <FontAwesomeIcon
                          icon={focusMachine.orderedDetailsToPrint[index].visibleOnPdf && focusMachine.orderedDetailsToPrint[index].visibleOnPdf == true ? faCheck : faTimesCircle}
                          style={{
                            fontSize:'1em',
                            color:focusMachine.orderedDetailsToPrint[index].visibleOnPdf && focusMachine.orderedDetailsToPrint[index].visibleOnPdf ? Color.success : Color.warning,
                            marginRight:'15px'}}
                          onClick={(event) => checkDetailsToPrint(element)}
                        />

                        {element
                        &&  <div style={{display:'flex'}}>
                              <div style={{fontWeight:'bold'}}>{element.title}
                              </div>
                              <div>{' : ' + element.value}
                              </div>
                            </div>
                        }
                      </div>
                    </ListItemText> 
                ))
              }
            </div>
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        open={isOpenDeleteValidation}
        onClose={() => setIsOpenDeleteValidation(false)}
        aria-labelledby="alert-deleteInspekt-title"
        aria-describedby="alert-deleteInspekt-description"
      >
        <DialogTitle id="alert-deleteInspekt-title">{"Supprimer cet Inspekt?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-deleteInspekt-description">
            Vous êtes sur le point de supprimer un Inspekt : ces données seront effacées et ne pourront pas être récupérées.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpenDeleteValidation(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={() => inspektDelete(focusMachine)} color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>

      </Dialog>
      <Drawer anchor='right' open={drawer.isOpen} onClose={() => setDrawer({isOpen:false})}>
        <div
          className={clsx(classes.list, {[classes.fullList]: false})}
          role="presentation"
          style={
            qoterMode === true
            ? {border : '5px solid', borderColor:Color.inspektBlue}
            :{border : 'none'}
          }
        >
          {
            focusMachine.status === 'inspekt'
            ?<List>
              {[
                {title : 'Prix de vente',key:'customerEstimatedSalePrice'},
                {title : 'Prix marchand',key:'marketerEstimatedSalePrice'},
                {title : 'Préparation estimée',key:'estimatedRepairCost'},
                {title : 'Préparation estimée (marchand)',key:'estimatedMarketerRepairCost'},
                {title : 'Cote SIMO',key:'simoQuotation'},
                {title : 'Prix d\'achat',key:'estimatedBuyingPrice'},
              ].map((value, index) => (
                (logInfo.user.config.hiddenInput || []).indexOf(value.key) == -1
                &&
                <ListItem key={value.key}>
                  <TextField
                    label={value.title}
                    style={{width:'100%'}}
                    variant="outlined"
                    onChange={(event) => handleChangeQuotations(event,value.key)}
                  />
                </ListItem>
              ))}
              <ListItem key={'comment'}>
                <TextField
                  multiline
                  rowsMin={4}
                  label={'Commentaires'}
                  style={{width:'100%'}}
                  variant="outlined"
                  onChange={(event) => handleChangeQuotations(event,'comment')}
                />
              </ListItem>
              <div
                style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20px',marginBottom:'20px'}}>
                {
                  logInfo.user.licence != 'inspekter'
                  && <Switch 
                      checked={qoterMode}
                      disabled={inputQuotations.estimatedBuyingPrice ? false : true}
                      defaultChecked={false}
                      color="primary"
                      onChange={handleQoterModeChange}
                    />
                }
                <Button
                  disabled={inputQuotations.estimatedBuyingPrice ? false : true}
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  style={{width:'auto'}}
                  onClick={() => (saveNewQuotation())}
                >
                  Coter
                </Button>
              </div>
            </List>
            :null
          }
          <div className={classes.detailMachineContainer}>
            <Typography
              variant='h6'
              style={{textAlign:'center',color:Color.secondary}}>
                Cotations
            </Typography>
            <Divider />
            {
              focusMachine.quotations && focusMachine.quotations.length > 0
              ?focusMachine.quotations.map((element) => (
                <ListItemText key={element.timestamp} className={'small'}>     
                  {element && 
                    <div className={classes.detailMachineContainer}>
                      <div
                        className={classes.listItemText}
                        style={{fontWeight:'bold'}}
                      >
                      {logInfo.cieMembers[element.userId] && logInfo.cieMembers[element.userId].name}
                    </div>
                    {[
                      {title : 'Prix de vente',key:'customerEstimatedSalePrice'},
                      {title : 'Prix marchand',key:'marketerEstimatedSalePrice'},
                      {title : 'Préparation estimée',key:'estimatedRepairCost'},
                      {title : 'Préparation estimée (marchand)',key:'estimatedMarketerRepairCost'},
                      {title : 'Cote SIMO',key:'simoQuotation'},
                      {title : 'Prix d\'achat',key:'estimatedBuyingPrice'},
                    ].map((value) => (
                      <div 
                        className={classes.listItemText}
                        style={{color:value.key === 'estimatedBuyingPrice' && Color.secondary}}
                      >
                        {value.key === 'estimatedBuyingPrice' &&
                          <FontAwesomeIcon
                            icon={faMoneyBillAlt}
                            style={{
                            fontSize:'1em',
                            color:Color.secondary,
                            marginRight:'5px'}}
                          />
                        }
                        {element[value.key] && value.title + ' : ' + element[value.key] + '€'}
                      </div>
                    ))}
                      <div className={classes.listItemText} style={{fontStyle:'italic'}}>
                        {element.comment &&
                          <div>
                            <FontAwesomeIcon
                              icon={faComments}
                              style={{
                              fontSize:'1em',
                              marginRight:'5px'}}
                            />
                            {'Commentaires : ' + element.comment}
                          </div>}
                      </div>
                    </div>
                  }
                </ListItemText>
              ))
              :<div className={classes.listItemText} style={{width:'100%',textAlign:'center',padding:'5px'}}>Soyez le premier à évaluer cette machine.</div>
            }
          </div>
        </div>
      </Drawer>
      <SnackBar
        handleClose={() => setSnackbar({isopen : false})}
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.isOpen}
      />
    </div>
  );
}