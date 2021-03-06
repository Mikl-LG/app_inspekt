import React, { useEffect } from 'react';
import Moment from 'moment';

import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

import Color from '../constants/color.js';
import ExpertiseDetails from '../components/expertiseDetails';
import FormsCatalog from '../constants/FormsCatalog';
import Natures from '../constants/Natures';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

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
    borderRadius: '5px',
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

export default function TitlebarGridList({inspektList,qotList,cieMembers,logInfo,setStateFromChild,getInspekts,getQots,displayFromUrl}) {
    const classes = useStyles();

    if(displayFromUrl.waitUrlParam === true){
      let params = new URLSearchParams(document.location.search.substring(1));
      setStateFromChild({displayFromUrl : {...displayFromUrl,id : params.get("expId"),waitUrlParam : false}});
  }

    let inspektFromUrl;
    let qotFromUrl;
    let expertiseFromUrl;

    if(displayFromUrl.id){
      inspektFromUrl = inspektList && inspektList.find(i => i.id == displayFromUrl.id);
      qotFromUrl = qotList && qotList.find(q => q.id == displayFromUrl.id);
      expertiseFromUrl = inspektFromUrl || qotFromUrl;
    }
    
    const [displayFromUrlHook,setDisplayFromUrlHook] = React.useState(true);

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
        visibleOnPdf:true
      }
      
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
          if(key === element.property && ['counter','cabIndoor1','cabIndoor2'].indexOf(key) === -1){ //counter, cabIndoor1 and cabIndoor2 are picture format
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
      if(expertise.machineFeatures){
        const machineFeatureAddonsAvailableIndexed = machineFeatureAddonsAvailable.map((e,i) => {return {...e,index: i}}); //add index to machine addons available
        const machineFeatureAddonsSorted = Object.keys(expertise.machineFeatures).map((k) => machineFeatureAddonsAvailableIndexed.find((addons) => addons.property == k) || {property : k, title : k}).sort((a,b) => a.index - b.index); //add index to machine  features addons documented for this expertise

        machineFeatureAddonsSorted.forEach((feature) => {
          feature.value = expertise.machineFeatures[feature.property];
          feature.visibleOnPdf = true;
          feature.step = 'machineFeatures';
          machineToArray.push(feature);
        })
      }

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
      if (expertise.pictures) {
        for (let [key, value] of Object.entries(expertise.pictures)) {
          pictureArrayList.push({key: key, value: value, visibleOnPdf: true});
        }
      }

      if (expertise.particularities && expertise.particularities.points) {
        expertise.particularities.points.forEach((element) => {
          if (element.pictures && element.pictures.length) {
            pictureArrayList = [
              ...pictureArrayList,
              {
                key: element.text,
                title: element.text,
                value: element.pictures[0],
                visibleOnPdf: true,
              },
            ]; // title is used to display particularity text in imageSlider
          }
        });
      }

      ["counter", "cabIndoor1", "cabIndoor2"].forEach((key) => {
        if (expertise.machine[key]) {
          pictureArrayList = [
            ...pictureArrayList,
            {key: key, value: expertise.machine[key], visibleOnPdf: true},
          ];
        }
      });

      expertise.imageList = pictureArrayList;
      expertise.orderedDetailsToPrint = machineToArray;
      setFocusMachine(expertise);
      setIsExpertiseDetailsOpen(true)
    }

    if(displayFromUrl.allowed === true && displayFromUrlHook === true && expertiseFromUrl){ //need to use a local hook to avoid rerendering of InspektList and the state.param to remember after navigating in other tabs that the machine has already been displayed
      machineClicked(expertiseFromUrl);
      setDisplayFromUrlHook(false);
      setStateFromChild({displayFromUrl : {...displayFromUrl,allowed : false}})
    }

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