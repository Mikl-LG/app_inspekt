import React, { useEffect } from 'react';
import Moment from 'moment';

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
import InsertCommentIcon from '@material-ui/icons/InsertComment';
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
import ExpertiseDetails from '../components/expertiseDetails';
import FormsCatalog from '../constants/FormsCatalog';
import getPdf from '../components/expertisePdf';
import ImageSlider from '../components/imageslider';
import Natures from '../constants/Natures';

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
  header: {
    display: 'flex',
    justifyContent: 'start',
    alignItems:'center',
    color:Color.greyWebTitle,
    borderBottom:'solid 0.5px grey',
    //backgroundColor:Color.veryLightGrey,
    padding:'20px'
  },
  headerTitle:{
    display:'flex',
    flexDirection:'column',
    alignItems:'start'
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

export default function TitlebarGridList({inspektList,cieMembers,logInfo,setStateFromChild,getInspekts,getQots}) {
    const classes = useStyles();

    ///////// CATALOGS \\\\\\\\\\
    const [machineCatalog,setMachineCatalog] = React.useState(() => {
      FormsCatalog.formSteps({step:2}).then((value) => {
        setMachineCatalog(value);
      })
    });
    const [machineFeatureCatalog,setMachineFeatureCatalog] = React.useState(() => {
      FormsCatalog.formSteps({step:3}).then((value) => {
        setMachineFeatureCatalog(value);
      })
    });
    
    const [natureList,setNatureList] = React.useState(Natures.Natures);

    ///////// VARIABLES \\\\\\\\\\

    const [focusMachine,setFocusMachine] = React.useState({});
    const [isExpertiseDetailsOpen,setIsExpertiseDetailsOpen] = React.useState(false);
    const [isOpenShareMarketersValidation, setIsOpenShareMarketersValidation] = React.useState(false);

    ///////// FUNCTIONS \\\\\\\\\\

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
            visibleOnPdf:true,
          },
          customer,
          {
            title:'Commercial',
            property:'salesman',
            value:logInfo.cieMembers[expertise.openedBy].name,
            visibleOnPdf:true,
          },
          {
            title:'Date de création',
            property:'date',
            value:Moment(expertise.openedOn).format('DD MMMM YYYY'),
            visibleOnPdf:true,
          },
        'divider',
        {
          title:'Nature',
          property:'nature',
          value:expertise.machine.nature.name,
          visibleOnPdf:true
        });

      /**ARRAY OF ALL THE ADDONS AVAILABLE AT STEP 2, ORDERED AS ON THE APPLICATION FORM */

        machineCatalog.regular.map((element) => {
          for (let [key,value] of Object.entries(expertise.machine)){
            if(key === element.property){
              element.value = value;
              element.visibleOnPdf = true;
              element.step = 'machine';
              machineToArray.push(element);
            }
          }
        })

        const machineAddonsAvailable = natureList.filter(
          (element) => element.key === expertise.machine.nature.key) // UPDATE FCN change value with KEY
          [0].formStepsTypes[2].addOns.map(
            (element) => (machineCatalog.addOns[element])
        );

        machineAddonsAvailable.forEach((element) => {
        for (let [key,value] of Object.entries(expertise.machine)){
          if(key === element.property){
            element.value = value;
            element.visibleOnPdf = true;
            element.step = 'machine';
            machineToArray.push(element);
          }
        }
      })
      machineToArray.push('divider');

      /**ARRAY OF ALL THE ADDONS AVAILABLE AT STEP 3, ORDERED AS ON THE APPLICATION FORM */
      const machineFeatureAddonsAvailable = natureList.filter(
        (element) => element.key === expertise.machine.nature.key)
        [0].formStepsTypes[3].addOns.map(
          (element) => (machineFeatureCatalog.addOns[element]));

      /**SETTING MACHINEFEATURE_HOOK WITH THE COMPLETE ADDONS : TITLE - PROPERTY - VALUE */
      machineFeatureAddonsAvailable.forEach((element) => {
        if(expertise.machineFeatures){
          for (let [key,value] of Object.entries(expertise.machineFeatures)){
            if(key === element.property){
              element.value = value;
              element.visibleOnPdf = true;
              element.step = 'machine';
              machineToArray.push(element);
            }
          }
        }
      })

      machineToArray.push(
        {
          title:'Disponible le',
          property:'availableDate',
          value:(expertise.particularities && expertise.particularities.availableDate) ? Moment(expertise.particularities.availableDate).format('DD-MMMM-YYYY') : 'non renseigné',
          visibleOnPdf:true
        },
        {
          title:'Commentaires',
          property:'comments',
          value:(expertise.particularities && expertise.particularities.comments) ? expertise.particularities.comments : 'pas de commentaires',
          visibleOnPdf:true,
          step:'particularities'
        }
      )


      ////////// QUOTATIONS ARRAY BUILD \\\\\\\\\\

      const setUserToQuotations = (quotationList) => {
        let quotationsToArray = [];
        if(quotationList){
          quotationList.map((element) => {
            element.userDetail = cieMembers[element.userId];
            quotationsToArray.push(element);
          });
        }
      
        expertise.quotations = quotationsToArray; // replace the quotation array with a user included array
      }
      
      setUserToQuotations(expertise.quotations) //ADD USER DETAIL TO THE QUOTATIONS ARRAY
      
      ////////// MACHINE PICTURES ARRAY BUILD \\\\\\\\\\
      let pictureArrayList = [];
      if(expertise.pictures){
        for (let [key,value] of Object.entries(expertise.pictures)){
          pictureArrayList.push({title : "",value:value});
        }
      }

      if(expertise.particularities && expertise.particularities.points){
        expertise.particularities.points.forEach(element => {
          if(element.pictures && element.pictures.length){
            pictureArrayList = [...pictureArrayList,{title : element.text,value:element.pictures[0]}];
          }
        })

      }
      
      expertise.imageList = pictureArrayList;
      expertise.orderedDetailsToPrint = machineToArray;
      setFocusMachine(expertise);
      setIsExpertiseDetailsOpen(true)
      console.log('expertise : ',expertise);
    }

    useEffect(() => {
      
      //console.log('natureList : ',natureList);
    })


  return (
      <div className={classes.root}>
        <GridList cellHeight={200} className={classes.listGrid}>
          {
              (inspektList && JSON.stringify(inspektList) != '[]')
              ?inspektList.sort((a,b) => b.id - a.id).map((expertise) => (
                  <GridListTile key={expertise.id} style={{cursor:'pointer'}}  onClick={() => machineClicked(expertise)}>
                      {
                          expertise.pictures
                          ?<img src={Object.values(expertise.pictures)[0]}/>
                          :null
                      }
                      <GridListTileBar
                      title={['brand','model'].map((element) => 
                      (element && expertise.machine[element])).join(' ') + ' - ' + logInfo.cieMembers[expertise.openedBy].name}
                      subtitle={JSON.stringify(expertise.customer) != '{}' && expertise.customer && <span>Client: {['title','name','city'].map((element) => (element && expertise.customer[element])).join(' ')}</span>}
                      actionIcon={
                        <div>
                          {
                            /* /// -- MARKETER ACCESS -- \\\
                            <IconButton className={classes.icon} onClick={() => setIsOpenShareMarketersValidation(true)}>
                              <FontAwesomeIcon icon={faUserShield} style={{fontSize:'1em',color:'white'}}/>
                            </IconButton>
                          */}
                          <IconButton className={classes.icon}>
                            <Badge badgeContent={expertise && expertise.quotations && expertise.quotations.length} color="secondary">
                              <FontAwesomeIcon icon={faCalculator} style={{fontSize:'1em',color:'white'}}/>
                            </Badge>
                          </IconButton>
                        </div>
                      }
                      />
                  </GridListTile>
              )):
                <div style={{width:'100%',textAlign:'center',marginTop:'40px',color:Color.lightGrey}}>Aucun INSPEKT à évaluer pour le moment.</div>
          }
        </GridList>
        <Dialog
          open={isOpenShareMarketersValidation}
          onClose={() => setIsOpenShareMarketersValidation(false)}
          aria-labelledby="alert-shareInspekt-title"
          aria-describedby="alert-shareInspekt-description"
        >
          <DialogTitle id="alert-shareInspekt-title">{"Partager cet Inspekt"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-shareInspekt-description">
              Pour partager cette expertise avec une liste de marchands sécurisés et recevoir une offre d'achat vous devez mettre à niveau votre abonnement.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpenShareMarketersValidation(false)} color="primary" autoFocus>
              Mettre mon abonnement à niveau
            </Button>
          </DialogActions>
        </Dialog>
        <ExpertiseDetails
          open={isExpertiseDetailsOpen}
          setOpen={(isOpen) => setIsExpertiseDetailsOpen(isOpen)}
          focusMachine={focusMachine}
          setFocusMachine={(newFocusMachine) => setFocusMachine(newFocusMachine)}
          logInfo={logInfo}
          setStateFromChild={setStateFromChild}
          getInspekts={getInspekts}
          getQots={getQots}
        />
      </div>
  );
}