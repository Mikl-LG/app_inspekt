import React, { useEffect } from 'react';
import Moment from 'moment';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SaveIcon from '@material-ui/icons/Save';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import Color from '../constants/color.js';
import ImageSlider from '../components/imageslider';
import FormsCatalog from '../constants/FormsCatalog';
import Natures from '../constants/Natures';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator,faTimesCircle,faSquareFull,faCheck,faCheckSquare } from '@fortawesome/free-solid-svg-icons';
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
  gridList: {
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

export default function TitlebarGridList({inspektList,cieMembers,logInfo,setStateFromChild}) {
    const classes = useStyles();

    ///////// CATALOGS \\\\\\\\\\

    const [machineFeatureCatalog,setMachineFeatureCatalog] = React.useState(() => {
      FormsCatalog.formSteps({step:3}).then((value) => {
        setMachineFeatureCatalog(value);
      })
    });
    const [machineCatalog,setMachineCatalog] = React.useState(() => {
      FormsCatalog.formSteps({step:2}).then((value) => {
        setMachineCatalog(value);
      })
    });
    const [natureList,setNatureList] = React.useState(Natures.Natures);

    ///////// VARIABLES \\\\\\\\\\

    const [drawer,setDrawer] = React.useState({isOpen:false});
    const [focusMachine,setFocusMachine] = React.useState({});
    const [inputQuotations, setInputQuotations] = React.useState({});
    const [machine,setMachine] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});
    const [openMachineDetail, setOpenMachineDetail] = React.useState(false);
    const [quotations, setQuotations] = React.useState(false);

    ///////// FUNCTIONS \\\\\\\\\\

    const checkDetailsToPrint = (detail) => {
      const detailToSet = machine.find((element) => element === detail);
      const index = machine.findIndex((element) => element === detail)
      if(detailToSet.visibleOnPdf === true){
        detailToSet.visibleOnPdf = false
      }else{
        detailToSet.visibleOnPdf = true
      }

      machine.splice(index,1,detailToSet);
      setMachine([...machine]);
    }

    const handleClickOpenMachineDetail = () => {
      setOpenMachineDetail(true);
    };
  
    const handleClickCloseMachineDetail = () => {
      setOpenMachineDetail(false);
    };

    const handleChangeQuotations = (event,key) => {
      setInputQuotations({...inputQuotations,[key]:event.target.value});
    };

    const imageDownload = () => {
      const dataUrl = 'https://inspekt-prod.s3.eu-west-3.amazonaws.com/a00adfa7-cd1d-434f-ae28-ed9a9868b2c6';
      const blobToFile = (blobData, fileName) => {
        const fd = new FormData();
        fd.set('a', blobData, fileName);
        return fd.get('a');
      }
      const toFile = (dataUrl, fileName) => {
         return new Promise(async(resolve) => {
            console.log('Utils.toFile called')
             let blob = await new Promise(function(res, rej) {
                 try {
                     var xhr = new XMLHttpRequest();
                     xhr.open("GET", dataUrl);
                     xhr.setRequestHeader('Accept', '*')
                     xhr.setRequestHeader('Origin', '*')
                     xhr.responseType = "blob";
                     xhr.onerror = function() {rej("Network error.")};
                     xhr.onload = function() {
                         if (xhr.status === 200) {res(xhr.response)}
                         else {rej("Loading error:" + xhr.statusText)}
                     };
                     xhr.send();
                 }
                 catch(err) {rej(err.message)}
             });
             console.log('blob'+ blob)
             let file = await Promise.resolve(blobToFile(blob, fileName))
             console.log('toFile file', file)
             resolve(file)
         })
     }
    };

    const inspektDelete = async(expertise) => {
      console.log('expertise : ',expertise);
      const body = await Promise.resolve({ expId : expertise.id })
      const url = `https://inspekt.herokuapp.com/api?request=REMOVE_INSPEKT&token=${logInfo.token}`
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

      console.log('response : ',{error,response});

      if(error == false){
        setSnackbar({message : 'Votre INSPEKT est supprimé.',type:'snackbarSuccess',isOpen:true});
        setStateFromChild({inspektList:response});
      }
      
    }

    const setUserToQuotations = (quotationList) => {
      let quotationsToArray = [];
      if(quotationList){
        quotationList.map((element) => {
          element.userDetail = cieMembers[element.userId];
          quotationsToArray.push(element);
        });
      }

      setQuotations(quotationsToArray);
    }

    const machineClicked = (expertise) => {

      ////////// MACHINE ARRAY BUILD \\\\\\\\\\
        
      let machineToArray = [];

      let customer = {
        title:'Client',
        property:'customer',
        value:['title','name','city'].map((element) => (
        expertise.customer && expertise.customer[element] && ' ' + expertise.customer[element]
      )),
        visibleOnPdf:true}

      machineToArray.push(customer,'divider');

      /**ARRAY OF ALL THE ADDONS AVAILABLE AT STEP 3, ORDERED AS ON THE APPLICATION FORM */
      const machineAddonsAvailable = natureList.filter(
        (element) => element.value === expertise.machine.nature.key)
        [0].formStepsTypes[2].addOns.map(
          (element) => (machineCatalog.addOns[element]));

        machineCatalog.regular.map((element) => {
          for (let [key,value] of Object.entries(expertise.machine)){
            if(key === element.property){
              element.value = value;
              element.visibleOnPdf = true;
              machineToArray.push(element);
            }
          }
        })

          machineAddonsAvailable.map((element) => {
        for (let [key,value] of Object.entries(expertise.machine)){
          console.log(key,value);
          if(key === element.property){
            element.value = value;
            element.visibleOnPdf = true;
            machineToArray.push(element);
          }
        }
      })
      machineToArray.push('divider');

      /**ARRAY OF ALL THE ADDONS AVAILABLE AT STEP 3, ORDERED AS ON THE APPLICATION FORM */
      const machineFeatureAddonsAvailable = natureList.filter(
        (element) => element.value === expertise.machine.nature.key)
        [0].formStepsTypes[3].addOns.map(
          (element) => (machineFeatureCatalog.addOns[element]));
        
      /**SETTING MACHINEFEATURE_HOOK WITH THE COMPLETE ADDONS : TITLE - PROPERTY - VALUE */
      machineFeatureAddonsAvailable.map((element) => {
        if(expertise.machineFeatures){
          for (let [key,value] of Object.entries(expertise.machineFeatures)){
            if(key === element.property){
              element.value = value;
              element.visibleOnPdf = true;
              machineToArray.push(element);
            }
          }
        }
        
      })

      setMachine(machineToArray)

      ////////// QUOTATIONS ARRAY BUILD \\\\\\\\\\

      setUserToQuotations(expertise.quotations)
      

      ////////// MACHINE PICTURES ARRAY BUILD \\\\\\\\\\
      let pictureArrayList = [];
      for (let [key,value] of Object.entries(expertise.pictures)){
        pictureArrayList.push(value);
      }
      expertise.imageList = pictureArrayList;
      setFocusMachine(expertise);
      setOpenMachineDetail(true);
    }

    const saveNewQuotation = async() => {
      

      inputQuotations.userId = logInfo.user.id;
      inputQuotations.timestamp = Date.now();

      const quotations = await Promise.resolve([
        ...(focusMachine.quotations || []),     // array
        inputQuotations                         // quotation object*
      ]);
       const body = await Promise.resolve({
        expId : focusMachine.id,
        status: 'inspekt',
        merge: {            // {object} list des quotations à jour
          quotations
        }
      })

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

      console.log('response after cotation saving : ',response);

      if(error == false){
        setSnackbar({message : 'Votre cotation est enregistrée.',type:'snackbarSuccess',isOpen:true});
        setStateFromChild({inspektList:response});
        setUserToQuotations(response.find((element) => element.id === focusMachine.id).quotations);
        setDrawer({isOpen:false});
      }
    }

    const snackbarHandleClose = () => {
      setSnackbar({isOpen:false})
    }

    useEffect(() => {
      console.log('focusMachine : ',focusMachine);
      console.log('quotations : ',quotations);
    })


  return (
    <div className={classes.root}>
      
      <GridList cellHeight={200} className={classes.gridList}>
        {
            inspektList
            ?inspektList.map((expertise) => (
                <GridListTile key={expertise.id}>
                    {
                        expertise.pictures
                        ?<img src={expertise.pictures.rightFront}/>
                        :null
                    }
                    <GridListTileBar
                    title={expertise.machine.brand + ' ' + expertise.machine.model}
                    subtitle={expertise.customer ? <span>Client: {expertise.customer.title && expertise.customer.title + ' ' +expertise.customer.name}</span> : null}
                    actionIcon={
                        <IconButton className={classes.icon}>
                          <InfoIcon onClick={() => machineClicked(expertise)}/>
                        </IconButton>
                    }
                    />
                </GridListTile>
            )):
            null
        }
      </GridList>
      
      <Dialog fullScreen open={openMachineDetail} onClose={handleClickCloseMachineDetail} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} id='machineDetailAppBar'>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClickCloseMachineDetail} aria-label="close">
            <Tooltip title="Fermer">
              <CloseIcon />
            </Tooltip>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {
                focusMachine && focusMachine.machine && focusMachine.machine.nature.name + ' ' + focusMachine.machine.brand + ' ' + focusMachine.machine.model}
            </Typography>
            <Tooltip title="Supprimer">
              <Button Button autoFocus color="inherit"  onClick={() => inspektDelete(focusMachine)}>
                <DeleteIcon/>
              </Button>
            </Tooltip>
            <Tooltip title="Ajouter une cotation">
              <Button autoFocus color="inherit" onClick={() => setDrawer({isOpen:true})}>
                <Badge badgeContent={quotations.length} color="secondary">
                <FontAwesomeIcon icon={faCalculator} style={{fontSize:'1.5em'}}/>
                </Badge>
              </Button>
            </Tooltip>
            <Tooltip title="Télécharger les photos">
              <Button autoFocus color="inherit" onClick={() => imageDownload()}>
                <FontAwesomeIcon icon={faImages} style={{fontSize:'1.5em'}}/>
              </Button>
            </Tooltip>
            <Tooltip title="Editer au format PDF">
              <Button autoFocus color="inherit" onClick={() => console.log('machine to print : ',machine)}>
                <PictureAsPdfIcon/>
              </Button>
            </Tooltip>
            
          </Toolbar>
        </AppBar>
        <Divider />
        <Grid container>
          <Grid item xs={12} sm={6} lg={6}>
            <ImageSlider imageList={focusMachine.imageList}/>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
                <div className={classes.detailMachineContainer}>
                  {
                    machine.map((element,index) => (
                      element == 'divider' 
                      ? <Divider/>
                      :
                        <ListItemText key={element.property} classes={{primary:classes.listItemText}}>
                          <div style={{display:'flex', alignItems:'center'}}>
                              <FontAwesomeIcon
                                icon={machine[index].visibleOnPdf && machine[index].visibleOnPdf == true ? faCheckSquare : faTimesCircle}
                                style={{
                                  fontSize:'1em',
                                  color:machine[index].visibleOnPdf && machine[index].visibleOnPdf ? Color.success : Color.warning,
                                  marginRight:'15px'}}
                                onClick={(event) => checkDetailsToPrint(element)}
                              />

                            {element &&
                                <div style={{display:'flex'}}>
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
                  <Divider/>
                </div>
              </Grid>
            </Grid>
          </Dialog>
            <Snackbar
              autoHideDuration={3000}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={snackbarHandleClose}
              open={snackbar.isOpen}>
                <SnackbarContent className={classes[snackbar.type]} message={snackbar.message}/>
            </Snackbar>
            <Drawer anchor='right' open={drawer.isOpen} onClose={() => setDrawer({isOpen:false})}>
              <div
                className={clsx(classes.list, {
                  [classes.fullList]: false,
                })}
                role="presentation"
                //onClick={() => setDrawer({isOpen:false})}
              >
                <List>
                  {[
                    {title : 'Prix de vente',key:'customerEstimatedSalePrice'},
                    {title : 'Prix marchand',key:'marketerEstimatedSalePrice'},
                    {title : 'Préparation estimée',key:'estimatedRepairCost'},
                    {title : 'Prix d\'achat',key:'estimatedBuyingPrice'},
                    ].map((value, index) => (
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
                  <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'20px',marginBottom:'20px'}}>
                    <Button
                      disabled={inputQuotations.estimatedBuyingPrice ? false : true}
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      style={{width:'auto'}}
                      onClick={() => (saveNewQuotation())}
                    >
                      Coter
                    </Button>
                  </div>
                </List>
                <div className={classes.detailMachineContainer}>
                  <Typography variant='h6' style={{textAlign:'center',color:Color.secondary}}>Cotations</Typography><Divider />
                  {
                    quotations && quotations.map((element) => (
                        <ListItemText key={element.timestamp} className={'small'}>
                          
                          {element && 
                            <div className={classes.detailMachineContainer}>
                              <div className={classes.listItemText} style={{fontWeight:'bold'}}>{element.userDetail.name}</div>
                              {[
                                {title : 'Prix de vente',key:'customerEstimatedSalePrice'},
                                {title : 'Prix marchand',key:'marketerEstimatedSalePrice'},
                                {title : 'Préparation estimée',key:'estimatedRepairCost'},
                                {title : 'Prix d\'achat',key:'estimatedBuyingPrice'},
                                ].map((value) => (
                                  <div className={classes.listItemText}>{element[value.key] && value.title + ' : ' + element[value.key] + '€'}
                                </div>
                                ))
                              }
                              <div className={classes.listItemText} style={{fontStyle:'italic'}}>{element.comment && 'Commentaires : ' + element.comment}</div>
                            </div>
                          }
                        </ListItemText>
                    ))
                  
                  }
                </div>
                
              </div>
            </Drawer>
    </div>
  );
}