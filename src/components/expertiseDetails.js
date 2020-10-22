import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import AWS from 'aws-sdk';
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
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SaveIcon from '@material-ui/icons/Save';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import UndoIcon from '@material-ui/icons/Undo';
import Slide from '@material-ui/core/Slide';

import Color from '../constants/color.js';
import getPdf from '../components/expertisePdf';
import ImageSlider from '../components/imageslider';
import SnackBar from '../components/snackBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator,faPen,faTimesCircle,faMoneyBillAlt,faCheck,faComments, faEuroSign,faFileSignature, faCheckSquare,faSearch } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.REACT_APP_AWS_REGION,
});

let s3 = new AWS.S3();

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
  penEdit:{
      color:Color.softGrey,
      marginLeft:'10px',
      fontSize : '0.8em',
      cursor:'pointer',
      '&:hover': {
        color: Color.secondary,
     },
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
  const {open,setOpen,focusMachine,setFocusMachine,logInfo,getQots,getInspekts} = props;
  const [drawer,setDrawer] = React.useState({isOpen:false});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inputQuotations, setInputQuotations] = React.useState({});
  const [gridScreenWidth,setGridScreenWidth] = React.useState({xs:12,sm:6,md:6,lg:6,scrollToTop:0})
  const [listOfPictures,setListOfPictures] = React.useState();
  const [loader,setLoader] = React.useState({isOpen:false,title:'',content:''})
  const [priceDialog,setPriceDialog] = React.useState({isOpen : false});
  const [qoterMode,setQoterMode] = React.useState()
  const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});
  const [validation,setValidation] = React.useState({isOpen : false});
  const [updateMachineFeatures,setUpdateMachineFeatures] = React.useState({open:false});
  const [updateInStockPrices,setUpdateInStockPrices] = React.useState({open:false})

  const allowedLicenses = {
    admin : true,
    manager : true,
    qoter : true,
    inspekter : false}; //unauthorized user.license for company user modification

  const userRestrictions = logInfo.user.config.restriction || {};

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

    if(error == false){

      setSnackbar({message : 'Cette machine est désormais évaluée, beau boulot.',type:'snackbarSuccess',isOpen:true});
      setDrawer({isOpen:false});
      setOpen(false);
      getInspekts();
      getQots();
      setInputQuotations({});
    }
  }

  const downloadPictures = async (imageList) => {
    if (imageList.length) {
      setLoader({
        isOpen: true,
        title: "Téléchargement...",
        content: "Tu pourras consulter les photos dans quelques secondes.",
      });

      let promises = await Promise.resolve(
        imageList.map(async (image) => {
          return new Promise(async (resolve) => {
            let picture = await Promise.resolve(
              image.value.replace("%2F", "/")
            );
            let splitted = await Promise.resolve(picture.split("/"));
            let key = await Promise.resolve(splitted[splitted.length - 1]);
            let folder = await Promise.resolve(splitted[splitted.length - 2]);
            let params = await Promise.resolve({
              Bucket: `inspekt-prod`,
              Key: `MEDIASLANDER/${key}`,
            });

            s3.getObject(params, async (err, data) => {
              let blob = await Promise.resolve(
                new Blob([data.Body], {type: "image/jpeg"})
              );
              let link = await Promise.resolve(document.createElement("a"));
              link.href = await Promise.resolve(
                window.URL.createObjectURL(blob)
              );
              link.download = await Promise.resolve(image.key + ".jpg");
              let clicked = await new Promise((_clicked) => {
                link.click();
                _clicked(true);
              });
              resolve(true);
              setLoader({isOpen: false});
            });
          });
        })
      );
      const result = await Promise.all(promises);
    } else {
      setSnackbar({
        message: "Aucune image disponible",
        type: "snackbarWarning",
        isOpen: true,
      });
    }
  };

  /////DEPRECATED\\\\\\\\\
  // const downloadPictures = async(pictures) => {

  //   setLoader({isOpen:true,title:'Téléchargement...',content:'Tu pourras consulter les photos dans quelques secondes.'});
  //   const keys = await Promise.resolve(Object.keys(pictures)); //[leftFront,rightBack]
  //   let promises = await Promise.resolve(keys.map(async(k) => {
  //     return new Promise(async(resolve) => {
  //       let picture = await Promise.resolve(pictures[k].replace('%2F','/'));
  //       let splitted = await Promise.resolve(picture.split('/'));
  //       let key = await Promise.resolve(splitted[splitted.length-1]);
  //       let folder = await Promise.resolve(splitted[splitted.length-2]);
  //       let params = await Promise.resolve({Bucket : 'inspekt-prod',Key:`${folder}/${key}`})

  //       s3.getObject(params, async(err, data) => {
  //         let blob = await Promise.resolve(new Blob([data.Body], {type: 'image/jpeg'}));
  //         let link = await Promise.resolve(document.createElement('a'));
  //         link.href = await Promise.resolve(window.URL.createObjectURL(blob));
  //         link.download = await Promise.resolve(k+'.jpeg');
  //         let clicked = await new Promise((_clicked) => {
  //           link.click();
  //           _clicked(true);
  //         })
  //         resolve(true);
  //       setLoader({isOpen:false});
  //       })
  //     })
      
  //   }))
  //   const result = await Promise.all(promises);
  // }

  const editPdf = (type) => {
    //type = ficheExpertise || bonReprise || contreExpertise
    setAnchorEl(null);
    const visibleOnPdfPictures = listOfPictures.filter((p) => p.visibleOnPdf === true);
    getPdf(focusMachine.orderedDetailsToPrint,type,logInfo,visibleOnPdfPictures,setLoader)
    setLoader({isOpen:true,title:'PDF en construction...',content:'Tu pourras télécharger ta fiche dans quelques secondes.'});
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
      allowedLicenses[logInfo.user.licence]
      ){
        const body = await Promise.resolve(
          { expId : expertise.id, 
            /**cieId is required if the qot is not from the user company but from a linkage */
            cieId:focusMachine.cieId && focusMachine.cieId,
            status : 'inspekt'
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
          setValidation({isOpen:false});
          getInspekts();
        }else{
          setSnackbar({message : 'Essayes à nouveau en vérifiant ta connexion Internet',type:'snackbarWarning',isOpen:true});
        }
      }else{
        setSnackbar({message : 'Seul un QOTER peut supprimer une expertise.',type:'snackbarWarning',isOpen:true});
      }

  }

  const saveNewQuotation = async() => {

    const allowedLicenses = {admin : true, manager:true, qoter:true};

    inputQuotations.userId = logInfo.user.id;
    inputQuotations.timestamp = Date.now();

    if(qoterMode === true){
      if(
        allowedLicenses[logInfo.user.licence]
        ){
            closeQuotation(inputQuotations)
        }
      
    }else{

      const body = await Promise.resolve({
        expId : focusMachine.id,
          // {object} list des quotations à jour
        quotation : inputQuotations,
        /**cieId is required if the inspekt is not from the user company but from a linkage */
        cieId:focusMachine.cieId && focusMachine.cieId
      })

      //**ADD COTATION REQUEST**\\
      const url = `https://inspekt.herokuapp.com/api?request=ADD_QUOTATION&token=${logInfo.token}`
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
          getInspekts();
          setDrawer({isOpen:false});
          setOpen(false);
          setInputQuotations({});
      } 
    }
  }

  const sendMeExpertiseByMail = async (pdfType) => {
    const body = await Promise.resolve({
      orderedDetailsToPrint: focusMachine.orderedDetailsToPrint,
      type: pdfType,
      headerFileName: logInfo.company.header,
      pictures: focusMachine.pictures,
      emailTo: logInfo.user.email,
    });

    //**ADD COTATION REQUEST**\\
    const url = `${process.env.REACT_APP_URL_API}api?request=PRINT_PDF&token=${logInfo.token}`;
    let fetchOptions = await Promise.resolve({
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let fetching = await fetch(url, fetchOptions);
    let error = await Promise.resolve(!fetching.ok);
    let response = !error && (await Promise.resolve(fetching.json()));

    if (error == false) {
      setSnackbar({
        message: "Ton expertise arrive dans ta boîte email.",
        type: "snackbarSuccess",
        isOpen: true,
      });
    }
  };

  const startCotation = () => {
    setQoterMode(logInfo.user.config && logInfo.user.config.isDefaultQoter === true ? true : false);
    setDrawer({isOpen:true});

  }

  const undoQot = async() => {

    if(
      logInfo.user.licence === 'admin'
      || logInfo.user.licence === 'manager'
      || logInfo.user.licence === 'qoter'
      ){
        const body = await Promise.resolve({
          expId : focusMachine.id,
          cieId : focusMachine.cieId && focusMachine.cieId || logInfo.company.id
        })

        //**ADD COTATION REQUEST**\\
        const url = `https://inspekt.herokuapp.com/api?request=UNDO_QOT&token=${logInfo.token}`
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
          getInspekts();
          getQots();
          setSnackbar({message : 'Expertise ' + focusMachine.id + ' prête à évaluer.',type:'snackbarSuccess',isOpen:true});
          setValidation({isOpen:false});
          setOpen(false);
        }
      }else{
          setSnackbar({message : 'Seul un QOTER peut basculer un QOT en INSPEKT.',type:'snackbarWarning',isOpen:true});
        }
  }

  const updateMachineFeaturesRequest = async() => {

    const body = await Promise.resolve({
      expId : focusMachine.id,
      status: focusMachine.status,
      merge: {            // {object} list des quotations à jour
        //[machineFeatures] : {...expertise.machineFeatures, tyreSize : 420-75-28}
        [updateMachineFeatures.step] : {...focusMachine[updateMachineFeatures.step],[updateMachineFeatures.property] : updateMachineFeatures.updatedValue}
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
    if(error === false){
      getInspekts();
      getQots();
      setUpdateMachineFeatures({open:false});
      setOpen(false);
    }
    
  }

  const updateInStockPricesRequest = async() => {

    const body = await Promise.resolve({
      cieId : focusMachine.cieId,
      expId : focusMachine.id,
      status: 'inspekt',
      merge: {            // {object} list des quotations à jour
        //[machineFeatures] : {...expertise.machineFeatures, tyreSize : 420-75-28}
        [updateMachineFeatures.step] : {...focusMachine[updateMachineFeatures.step],[updateMachineFeatures.property] : updateMachineFeatures.updatedValue}
      },
      /**cieId is required if the qot is not from the user company but from a linkage */
      cieId:focusMachine.cieId && focusMachine.cieId
    })
    
  }

  useEffect(()=>{
    setListOfPictures(focusMachine.imageList);
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
              <Button autoFocus color="inherit" onClick={() => setValidation({isOpen : true,title : 'Supprimer cet Inspekt',message : 'Vous êtes sur le point de supprimer un Inspekt : ces données seront effacées et ne pourront pas être récupérées.',validationLabel : 'Supprimer',methodType : 'delete'})}>
                <DeleteIcon/>
              </Button>
            </Tooltip>
            }
            {
              focusMachine.status === 'qot'
                &&
            <Tooltip title="Annuler">
              <Button autoFocus color="inherit" onClick={() => setValidation({isOpen : true,title : 'Annuler QOT',message : 'Cette expertise sera à nouveau disponible dans votre liste INSPEKT.',validationLabel : 'Valider',methodType : 'undo'})}>
                <UndoIcon/>
              </Button>
            </Tooltip>
            }
            {
              focusMachine.inStock && focusMachine.inStock === true
              &&
              <Tooltip title="Prix">
                <Button 
                  aria-controls='price-edit'
                  autoFocus
                  color="inherit" 
                  onClick={() => {setPriceDialog({isOpen:true})}}
                >
                  <FontAwesomeIcon icon={faEuroSign} style={{fontSize:'1.5em'}}/>
                </Button>
              </Tooltip>
            }
            <Tooltip title="Cotations">
              <Button autoFocus color="inherit" onClick={() => startCotation()}>
                <Badge badgeContent={focusMachine.quotations && focusMachine.quotations.length} color="secondary">
                  <FontAwesomeIcon icon={faCalculator} style={{fontSize:'1.5em'}}/>
                </Badge>
              </Button>
            </Tooltip>
            <Tooltip title='Recevoir par email'>
              <Button
                autoFocus
                color='inherit'
                onClick={() => sendMeExpertiseByMail("ficheExpertise")}>
                <MailOutlineIcon />
              </Button>
            </Tooltip>           
            <Tooltip title="Télécharger les photos">
              <Button autoFocus color="inherit"
                onClick={() => downloadPictures(focusMachine.imageList)}
              >
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
              <MenuItem onClick={() => editPdf('bonReprise')}>
                <FontAwesomeIcon
                  icon={faFileSignature}
                  style={{
                    fontSize:'1em',
                    color:Color.secondary,
                    marginRight:'15px'}}
                />
                Bon de reprise
              </MenuItem>
              <MenuItem onClick={() => editPdf('contreExpertise')}>
                <FontAwesomeIcon
                  icon={faCheckSquare}
                  style={{
                    fontSize:'1em',
                    color:Color.secondary,
                    marginRight:'15px'}}
                />
                Contre-expertise</MenuItem>
              <MenuItem onClick={() => editPdf('ficheExpertise')}>
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    fontSize:'1em',
                    color:Color.secondary,
                    marginRight:'15px'}}
                />
                Fiche d'expertise</MenuItem>
              <MenuItem onClick={() => editPdf('fichePhotos')}>
                <FontAwesomeIcon
                  icon={faImages}
                  style={{
                    fontSize:'1em',
                    color:Color.secondary,
                    marginRight:'15px'}}
                />
                Fiche photos
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Divider />
        <Grid container>
          <Grid item xs={gridScreenWidth.xs} sm={gridScreenWidth.sm} md={gridScreenWidth.md} lg={gridScreenWidth.lg}>
            <ImageSlider 
              listOfPictures = {listOfPictures}
              setListOfPictures = {setListOfPictures}
              gridScreenWidth = {gridScreenWidth}
              setGridScreenWidth = {setGridScreenWidth}
              focusMachine = {focusMachine}
              logInfo = {logInfo}
            />
          </Grid>
          <Grid item xs={gridScreenWidth.xs} sm={gridScreenWidth.sm} md={gridScreenWidth.md} lg={gridScreenWidth.lg}>
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
                  ? <Divider key={index}/>
                  :
                    element.value !== null 
                    && <ListItemText key={element.property} classes={{primary:classes.listItemText}}>
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
                        {
                          element.step
                          && (logInfo.user.licence != 'inspekter' || focusMachine.openedBy === logInfo.user.id)
                          && <FontAwesomeIcon
                                className={classes.penEdit}
                                icon={faPen}
                                onClick={() => setUpdateMachineFeatures({
                                  open:true,
                                  title:element.title,value:element.value,
                                  property:element.property,step:element.step
                                })}
                              />
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
        open={validation.isOpen}
        onClose={() => setValidation({isOpen : false})}
        aria-labelledby="alert-deleteInspekt-title"
        aria-describedby="alert-deleteInspekt-description"
      >
        <DialogTitle id="alert-deleteInspekt-title">{validation.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-deleteInspekt-description">
            {validation.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setValidation({isOpen : false})} color="primary">
            Annuler
          </Button>
          <Button onClick={validation.methodType === 'delete' ? () => inspektDelete(focusMachine) : () => undoQot()} color="primary" autoFocus>
            {validation.validationLabel}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={priceDialog.isOpen}
        onClose={() => setPriceDialog({isOpen : false})}
        aria-labelledby="alert-deleteInspekt-title"
        aria-describedby="alert-deleteInspekt-description"
      >
        <DialogTitle id="alert-deleteInspekt-title">Prix</DialogTitle>
        <Divider/>
        <DialogContent>
          <List>
                {
                  [
                    {key : 'customerSalePrice',title : 'Prix de vente',sigle:'€'},
                    {key : 'marketerSalePrice',title : 'Prix marchand',sigle:'€'},
                    {key : 'repairCost',title : 'Préparation',sigle:'€'},
                    {key : 'marketerRepairCost',title : 'Préparation (marchand)',sigle:'€'},
                    {key : 'buyingPrice',title : 'Prix achat gestion',sigle:'€'},
                    {key : 'publicComment',title : 'Commentaire public',sigle:''},
                    {key : 'privateComment',title : 'Commentaire privé',sigle:''},
                  ].map((element) => 
                    focusMachine.stockInfo
                    && focusMachine.stockInfo[element.key]
                    && 
                      (userRestrictions[element.key] === true
                      ? 
                      (
                        <ListItem>
                          <span style={{fontWeight:'bold'}}>{element.title}</span>{' : n/c'}
                        </ListItem>
                      )
                      : 
                      (
                        <ListItem>
                          <span style={{fontWeight:'bold'}}>{element.title}</span>{' : ' + focusMachine.stockInfo[element.key] + element.sigle}
                          {
                          allowedLicenses[logInfo.user.licence]
                          && <FontAwesomeIcon
                                className={classes.penEdit}
                                icon={faPen}
                                onClick={() => setUpdateInStockPrices({
                                  open:true,
                                  title:element.title,value:focusMachine.stockInfo[element.key],
                                  property:element.key,step:element.step
                                })}
                              />
                          }
                        </ListItem>
                      )
                      )
                  )
                }
          </List>
        </DialogContent>
      </Dialog>
      <Drawer anchor='right' open={drawer.isOpen} onClose={() => setDrawer({isOpen:false})}>
        <div
          className={clsx(classes.list, {[classes.fullList]: false})}
          role="presentation"
          style={
            (qoterMode === true && focusMachine.status === 'inspekt')
            ? {border : '5px solid', borderColor:Color.inspektBlue}
            :{border : 'none'}
          }
        >
          {
            focusMachine.status === 'inspekt'
            ?<List>
              <Typography
                variant='h6'
                style={{textAlign:'center',color:Color.secondary}}>
                  Nouvelle cotation
              </Typography>
              <Divider />
              {[
                {title : 'Prix de vente estimé',key:'customerEstimatedSalePrice'},
                {title : 'Prix marchand estimé',key:'marketerEstimatedSalePrice'},
                {title : 'Préparation estimée',key:'estimatedRepairCost'},
                {title : 'Préparation estimée (marchand)',key:'estimatedMarketerRepairCost'},
                {title : 'Cote SIMO',key:'simoQuotation'},
                {title : 'Prix d\'achat gestion',key:'estimatedBuyingPrice'},
              ].map((value, index) => (
                ((logInfo.user.config && logInfo.user.config.hiddenInput) || []).indexOf(value.key) == -1
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
                  {
                    qoterMode === true
                    ? 'QOTER'
                    :'INSPEKTER'
                  }
                </Button>
              </div>
            </List>
            :
              null
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
                    {
                      [
                        {title : 'Prix de vente estimé',key:'customerEstimatedSalePrice'},
                        {title : 'Prix marchand estimé',key:'marketerEstimatedSalePrice'},
                        {title : 'Préparation estimée',key:'estimatedRepairCost'},
                        {title : 'Préparation estimée (marchand)',key:'estimatedMarketerRepairCost'},
                        {title : 'Cote SIMO',key:'simoQuotation'},
                        {title : 'Prix d\'achat gestion',key:'estimatedBuyingPrice'},
                      ].map((value) => (
                        <div 
                          key={value}
                          className={classes.listItemText}
                          style={{color:value.key === 'estimatedBuyingPrice' && Color.secondary}}
                        >
                          {
                          value.key === 'estimatedBuyingPrice' &&
                            <FontAwesomeIcon
                              icon={faMoneyBillAlt}
                              style={{
                              fontSize:'1em',
                              color:Color.secondary,
                              marginRight:'5px'}}
                            />
                          }
                          {
                            userRestrictions[value.key] === true
                            ? value.title + ' : n/c'
                            : element[value.key] && value.title + ' : ' + element[value.key] + '€'
                          }
                        </div>
                      ))
                    }
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
      <Dialog open={updateMachineFeatures.open} onClose={() => setUpdateMachineFeatures({open:false})}>
      <DialogContent>
        <TextField 
          label = {updateMachineFeatures.title ? updateMachineFeatures.title : 'Titre'}
          defaultValue={updateMachineFeatures.value ? updateMachineFeatures.value : 'value'}
          onChange={(event) => setUpdateMachineFeatures(
            {...updateMachineFeatures,updatedValue:event.target.value})
            }>    
        </TextField>
      </DialogContent>
        <Button
          variant="contained"
          color="primary" 
          style={{margin:'20px'}}
          onClick={() => updateMachineFeaturesRequest()}
          >
            VALIDER
        </Button>
      </Dialog>
      <Dialog open={updateInStockPrices.open} onClose={() => setUpdateInStockPrices({open:false})}>
        <DialogContent>
          <TextField 
            label = {updateInStockPrices.title ? updateInStockPrices.title : 'Titre'}
            defaultValue={updateInStockPrices.value ? updateInStockPrices.value : 'value'}
            onChange={(event) => setUpdateInStockPrices(
              {...updateInStockPrices,updatedValue:event.target.value})
              }>    
          </TextField>
        </DialogContent>
        <Button
          variant="contained"
          color="primary" 
          style={{margin:'20px'}}
          onClick={() => updateInStockPricesRequest()}
          >
            VALIDER
        </Button>
      </Dialog>
      <Dialog
        open={loader.isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{loader.title}</DialogTitle>
        <DialogContent>
          <LinearProgress style={{width:'100%'}} />
          <LinearProgress style={{width:'100%'}} color="secondary" />
          <DialogContentText id="alert-dialog-description">
            {loader.content}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <SnackBar
        handleClose={() => setSnackbar({isopen : false})}
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.isOpen}
      />
    </div>
  );
}