import React, { useEffect } from 'react';
import Moment from 'moment';
import Axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
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
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SaveIcon from '@material-ui/icons/Save';
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
import getPdf from '../components/expertisePdf';
import Natures from '../constants/Natures';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator,faEye,faTimesCircle,faMoneyBillAlt,faCheck,faComments } from '@fortawesome/free-solid-svg-icons';
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawer,setDrawer] = React.useState({isOpen:false});
    const [focusMachine,setFocusMachine] = React.useState({});
    const [inputQuotations, setInputQuotations] = React.useState({});
    const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});
    const [openMachineDetail, setOpenMachineDetail] = React.useState(false);
    const [isOpenDeleteValidation, setIsOpenDeleteValidation] = React.useState(false);
    const [quotations, setQuotations] = React.useState(false);

    ///////// FUNCTIONS \\\\\\\\\\

    const checkDetailsToPrint = (detail) => {
      const detailToSet = focusMachine.orderedDetailsToPrint.find((element) => element === detail);
      const index = focusMachine.orderedDetailsToPrint.findIndex((element) => element === detail)
      console.log('detailToSet : ',detailToSet);
      if(detailToSet.visibleOnPdf === true){
        detailToSet.visibleOnPdf = false
      }else{
        detailToSet.visibleOnPdf = true
      }

      focusMachine.orderedDetailsToPrint.splice(index,1,detailToSet);
      console.log('focusMachine from checkDetails : ',focusMachine);
      setFocusMachine({...focusMachine});
    }

    const editPdf = (type) => {
      //type = ficheExpertise || bonReprise || contreExpertise
      setAnchorEl(null);
      getPdf(focusMachine.orderedDetailsToPrint,type)
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

      console.log('start downloading');

      const dataUrl = 'https://inspekt-prod.s3.eu-west-3.amazonaws.com/a00adfa7-cd1d-434f-ae28-ed9a9868b2c6';

      const axiosResponse = Axios({
        url: 'https://inspekt-prod.s3.eu-west-3.amazonaws.com/a00adfa7-cd1d-434f-ae28-ed9a9868b2c6',
        method: 'GET',
        headers: {"Access-Control-Allow-Origin": "*"},
        crossDomain: true,
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.jpeg');
        document.body.appendChild(link);
        link.click();
      });
    };

    const inspektDelete = async(expertise) => {
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

      if(error == false){
        setSnackbar({message : 'Votre INSPEKT est supprimé.',type:'snackbarSuccess',isOpen:true});
        setStateFromChild({inspektList:response});
        setOpenMachineDetail(false);
        setIsOpenDeleteValidation(false);
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
        )).join(' '),
        visibleOnPdf:true}
      
        machineToArray.push(
          {
            title:'Id',
            property:'id',
            value:expertise.id,
            visibleOnPdf:true
          },
          customer,{
            title:'Commercial',
            property:'salesman',
            value:logInfo.cieMembers[expertise.openedBy].name,
            visibleOnPdf:true
          },
          {
            title:'Date de création',
            property:'date',
            value:Moment(expertise.openedOn).format('DD MMMM YYYY'),
            visibleOnPdf:true
          },
        'divider',
        {
          title:'Nature',
          property:'nature',
          value:expertise.machine.nature.name,
          visibleOnPdf:true
        });
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

      ////////// QUOTATIONS ARRAY BUILD \\\\\\\\\\

      setUserToQuotations(expertise.quotations) //ADD USER DETAIL TO THE QUOTATIONS ARRAY
      
      ////////// MACHINE PICTURES ARRAY BUILD \\\\\\\\\\
      let pictureArrayList = [];
      if(expertise.pictures){
        for (let [key,value] of Object.entries(expertise.pictures)){
          pictureArrayList.push(value);
        }
      }
      
      expertise.imageList = pictureArrayList;
      expertise.orderedDetailsToPrint = machineToArray;
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
    })


  return (
    <div className={classes.root}>
      
      <GridList cellHeight={200} className={classes.listGrid}>
        {
            inspektList
            ?inspektList.sort((a,b) => b.id - a.id).map((expertise) => (
                <GridListTile key={expertise.id}>
                    {
                        expertise.pictures
                        ?<img src={Object.values(expertise.pictures)[0]}/>
                        :null
                    }
                    <GridListTileBar
                    title={expertise.machine.brand + ' ' + expertise.machine.model}
                    subtitle={expertise.customer ? <span>Client: {expertise.customer.title && expertise.customer.title + ' ' +expertise.customer.name}</span> : null}
                    actionIcon={
                        <IconButton className={classes.icon} onClick={() => machineClicked(expertise)}>
                          <FontAwesomeIcon icon={faEye} style={{fontSize:'1em',color:'white'}}/>
                        </IconButton>
                    }
                    />
                </GridListTile>
            )):
              <div style={{width:'100%',textAlign:'center',marginTop:'40px',color:Color.lightGrey}}>Aucun INSPEKT à évaluer pour le moment.</div>
        }
      </GridList>

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
              <Button autoFocus color="inherit" onClick={() => setIsOpenDeleteValidation(true)}>
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
                                  color:focusMachine.orderedDetailsToPrint[index].visibleOnPdf && focusMachine.orderedDetailsToPrint[index].visibleOnPdf ? Color.softGrey : Color.warning,
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
                                  <div 
                                    className={classes.listItemText}
                                    style={{color:value.key === 'estimatedBuyingPrice' && Color.secondary}}
                                    >
                                      {value.key === 'estimatedBuyingPrice'
                                      && <FontAwesomeIcon
                                            icon={faMoneyBillAlt}
                                            style={{
                                              fontSize:'1em',
                                              color:Color.secondary,
                                              marginRight:'5px'}}
                                          />
                                      }
                                      {element[value.key] && value.title + ' : ' + element[value.key] + '€'}
                                </div>
                                ))
                              }
                              <div className={classes.listItemText} style={{fontStyle:'italic'}}>
                                <FontAwesomeIcon
                                  icon={faComments}
                                  style={{
                                    fontSize:'1em',
                                    marginRight:'5px'}}
                                />
                                {element.comment && 'Commentaires : ' + element.comment}</div>
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