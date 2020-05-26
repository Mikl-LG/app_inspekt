import React, { useEffect } from 'react';
import Moment from 'moment';

import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock,faEye,faFrown,faMoneyCheck,faSpinner,faTrashAlt,faTrophy } from '@fortawesome/free-solid-svg-icons';

import Color from '../constants/color.js';
import ExpertiseDetails from '../components/expertiseDetails';
import FormsCatalog from '../constants/FormsCatalog';
import Natures from '../constants/Natures';
import SnackBar from '../components/snackBar';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function LoadSelectHeadTable(props){
  const {logInfo,qotList,sort,setSort,tempSort,setTempSort} = props;

  const headCells = [
    { id: 'inStock', select: true, width:'1vi', label: 'Stock' ,selectOptions : ['STOCKS','QOTS']},
    { id: 'id', select: true, width:'1vi', label: 'id', selectOptions : [ ...new Set(qotList.map((element) => (element.id))) ].sort() },
    { id: 'date', select: true, width:'8vi', label: 'Date', selectOptions : [ ...new Set(qotList.map((element) => (Moment(element.addedOn).format('MMMM-YYYY')))) ].sort() },
    { id: 'salesman', select: true, width:'20vi', label: 'Commercial', selectOptions : [ ...new Set(qotList.map((element) => (
      logInfo.cieMembers[element.openedBy].name))) ].sort() },
    { id: 'customer', select: true, width:'20vi', label: 'Client', selectOptions : [ ...new Set(qotList.map((element) => (
      element.customer && element.customer.name && element.customer.name))) ].sort() },
    { id: 'nature', select: true, width:'12vi', label: 'Nature', selectOptions : [ ...new Set(qotList.map((element) => (
      element.machine.nature.name))) ].sort() },
    { id: 'brand', select: true, width:'12vi', label: 'Marque',selectOptions : [ ...new Set(qotList.map((element) => (
      element.machine && element.machine.brand && element.machine.brand))) ].sort() },
    { id: 'model', select: true, width:'18vi', label: 'Modèle', selectOptions : [ ...new Set(qotList.map((element) => (
      element.machine && element.machine.model && element.machine.model))) ].sort() },
    { id: 'details', select: true, width:'30vi', label: 'Détails',selectOptions : [] },
    { id: 'year', select: true, label: 'Année',selectOptions : [ ...new Set(qotList.map((element) => (
      element.machine && element.machine.year && element.machine.year))) ].sort() },
    { id: 'estimatedBuyingPrice', width:'7vi', select: true, label: 'Cotation',selectOptions : [ ...new Set(qotList.map((element) => (element.quotations[element.quotations.length - 1].estimatedBuyingPrice))) ].sort() },
    { id: 'qotState', width:'10vi', select: true, label: 'Affaire',selectOptions : [ ...new Set(qotList.map((element) => (element.state && element.state))) ].sort() }
  ];

  let autoList = {}
  headCells.forEach((headCell) => {
    autoList = {...autoList,[headCell.id] : headCell.selectOptions}
  })

  const handleSelectTempSort = (key,value) =>{
    let newSelected = tempSort[key];
    console.log('newSelected : ',key);
    const selectedIndex = newSelected.indexOf(value);

    //if(selectedIndex == -1){
      newSelected = [...value];
    //}else{
      //newSelected.splice(selectedIndex,1)
    //}
    setTempSort({...tempSort,[key]:newSelected})
  }

  const resetSort = (key) => {
    setSort({...sort,[key]:[]})
    setTempSort({...sort,[key]:[]})
  }

  return(
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          headCell.select === false
          ?
          <TableCell
            key={headCell.id}
            align='center'
          >
            {headCell.label}
          </TableCell>
          :
            <TableCell
            key={headCell.id}
            align='center'
            >
              <FormControl style={{display:'flex'}}>
              <InputLabel
                id="demo-mutiple-chip-label"
                style={{fontSize:'0.8em',fontWeight:'bold',color:Color.secondary,width:'100%',textAlign:'center'}}
              >
                {headCell.label}
              </InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                style={{minWidth: headCell.minWidth,maxWidth: headCell.maxWidth,fontSize:'1em',textAlign:'center'}}
                multiple
                value={tempSort[headCell.id]}
                onChange={(event) => handleSelectTempSort(headCell.id,event.target.value)}
                onClose={() => setSort(tempSort)}
                MenuProps={MenuProps}
                IconComponent={() => (
                  sort[headCell.id].length > 0
                  ? <CancelIcon 
                      style={{fontSize:'1em',cursor:'pointer',color:Color.warning}}
                      onClick={() => resetSort([headCell.id])} />
                  : null
                )}
              >
                {
                autoList[headCell.id] && autoList[headCell.id].map((element) => (
                  element &&
                  <MenuItem value={element} style={{fontSize:'1em'}}>
                    {element}
                  </MenuItem>
                ))
                }
              </Select>
              </FormControl>
            </TableCell>
        ))}
    </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles((theme) => ({
  
  root: {
    width: '100%',
    marginBottom:'70px'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    minWidth: 750,
  },
  TableCell: {
    fontSize:'0.8em',
    padding:'5px'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({qotList,cieMembers,logInfo,setStateFromChild,getQots,searchText,stateMenuItemsFiltered}) {
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
  const [stockDrawer,setStockDrawer] = React.useState({isOpen:false});
  const [natureList,setNatureList] = React.useState(Natures.Natures);
  const [inputInStock, setInputInStock] = React.useState({});
  const [isExpertiseDetailsOpen,setIsExpertiseDetailsOpen] = React.useState(false);
  const [focusMachine,setFocusMachine] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});
  const [sort,setSort] = React.useState({inStock:[],id:[],date:[],salesman:[],customer:[],nature:[],brand:[],model:[],details:[],year:[],qotState:[],estimatedBuyingPrice:[]});
  const [tempSort,setTempSort] = React.useState({inStock:[],id:[],date:[],salesman:[],customer:[],nature:[],brand:[],model:[],details:[],year:[],qotState:[],estimatedBuyingPrice:[]});

  const handleChangeInStock = (event,key) => {
    setInputInStock({...inputInStock,[key]:event.target.value});
  };

  const machineFeatureToString = (machineFeatures) => {

    const getFeatureTitle = (property) => { //RETURN THE TITLE OF A MACHINE FEATURES PROPERTY
      if(machineFeatureCatalog){
        for (let[key,value] of Object.entries(machineFeatureCatalog.addOns)){
          if(value.property == property){
           return value.title;
          }
        }
      }
    }
    let output = [];
    if(machineFeatures){
      for (let [key,value] of Object.entries(machineFeatures)){
        //console.log('value : ',getFeatureTitle(key) + ' : ' + value);
        output = [...output,getFeatureTitle(key) + ' : ' + value];
      }
    }
    return output.join(' - ');
  }

    let rows = [];
    const keyWords = searchText.split(' ');
    let qotListFiltered = [];
    qotList.forEach((element) => {
      if(
        JSON.stringify(element).toUpperCase().includes(keyWords[0].toUpperCase())
        && new RegExp(sort.inStock.join('|')).test(element.inStock) === true
        && new RegExp(sort.id.join('|')).test(element.id) === true
        && new RegExp(sort.date.join('|')).test(Moment(element.addedOn).format('MMMM-YYYY')) === true
        && new RegExp(sort.salesman.join('|')).test(logInfo.cieMembers[element.openedBy].name) === true
        && new RegExp(sort.customer.join('|')).test(element.customer) === true
        && new RegExp(sort.nature.join('|')).test(element.machine.nature.name) === true
        && new RegExp(sort.brand.join('|')).test(element.machine.brand) === true
        && new RegExp(sort.model.join('|')).test(element.machine.model) === true
        && new RegExp(sort.year.join('|')).test(element.machine.year) === true
        //&& new RegExp(sort.estimatedBuyingPrice.join('|')).test(element.quotation.estimatedBuyingPrice) === true
        && new RegExp(sort.qotState.join('|')).test(element.state) === true
        )
        qotListFiltered = [...qotListFiltered,element];
    });
    
    qotListFiltered.forEach((element) => {
      rows = [...rows, {
        inStock : element.inStock ? element.inStock : false,
        id : element.id,
        date : Moment(element.addedOn).format('MMMM-YYYY'),
        salesman: logInfo.cieMembers[element.openedBy].name,
        customer: element.customer && element.customer.name && element.customer.name,
        nature : element.machine.nature.name,
        brand : element.machine.brand && element.machine.brand,
        model : element.machine.model && element.machine.model,
        details : element.machineFeatures && machineFeatureToString(element.machineFeatures),
        year : element.machine.year && element.machine.year,
        estimatedBuyingPrice : element.quotations[element.quotations.length -1].estimatedBuyingPrice,
        state : element.state ? element.state : 'En-cours',
        expertiseObject : element
      }]
    });

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

      /**ARRAY OF ALL THE ADDONS AVAILABLE AT STEP 2, ORDERED AS ON THE APPLICATION FORM */

        machineCatalog.regular.map((element) => {
          for (let [key,value] of Object.entries(expertise.machine)){
            if(key === element.property){
              element.value = value;
              element.visibleOnPdf = true;
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
            if(element.property && key === element.property){

              element.value = value;
              element.visibleOnPdf = true;
              machineToArray.push(element);
            }
          }
        }
      })

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
          pictureArrayList.push(value);
        }
      }
      
      expertise.imageList = pictureArrayList;
      expertise.orderedDetailsToPrint = machineToArray;
      setFocusMachine(expertise);
      setIsExpertiseDetailsOpen(true)
    }

    const saveNewStock = async() => {
      if(
        logInfo.user.licence === 'admin'
        || logInfo.user.licence === 'manager'
        || logInfo.user.licence === 'qoter'
        ){
        
        inputInStock.userId = logInfo.user.id;
        inputInStock.timestamp = Date.now();
  
        const body = await Promise.resolve({
          expId : stockDrawer.qot.id,
          status: 'qot',
          merge: {            // {object} list des quotations à jour
            stockInfo : inputInStock
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
          updateQotInStock(stockDrawer.qot,true)
        } 
      }else{
        setSnackbar({message : 'Seuls les Qoter, Manager et Administrateurs peuvent créer les stocks',type:'snackbarWarning',isOpen:true});
      }
    }
  
    const updateQotInStock = async(qot,inStock) => {
  
        const body = await Promise.resolve({
          expId : qot.id,
          status: 'qot',
          merge: {            // {object} list des quotations à jour
            inStock
          },
          /**cieId is required if the qot is not from the user company but from a linkage */
          cieId:qot.cieId && qot.cieId
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
            setSnackbar({message : 'Mise à jour réussie',type:'snackbarSuccess',isOpen:true});
            getQots()
            setStockDrawer({isOpen:false});
        }else{
          setSnackbar({message : 'Echec de la mise à jour',type:'snackbarWarning',isOpen:true});
        }
    }

    const updateQotState = async(qot,state) => {

      if(
        logInfo.user.licence === 'admin'
        || logInfo.user.licence === 'manager'
        || logInfo.user.licence === 'qoter'
        ){
        const body = await Promise.resolve({
          expId : qot.id,
          status: 'qot',
          merge: {            // {object} list des quotations à jour
            state
          },
          /**cieId is required if the qot is not from the user company but from a linkage */
          cieId:qot.cieId && qot.cieId
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
            setSnackbar({message : 'Mise à jour réussie',type:'snackbarSuccess',isOpen:true});
            getQots()
        }else{
          setSnackbar({message : 'Echec de la mise à jour',type:'snackbarWarning',isOpen:true});
        }
      }else{
        setSnackbar({message : 'Oups! Seul ton boss peut modifier un statut',type:'snackbarWarning',isOpen:true});
      }
    }

  useEffect(()=>{
    console.log('inputStock : ',inputInStock);
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <LoadSelectHeadTable
              logInfo={logInfo}
              qotList={qotListFiltered}
              sort={sort}
              setSort={setSort}
              tempSort={tempSort}
              setTempSort={setTempSort}
              stateMenuItemsFiltered={stateMenuItemsFiltered}
            />
            <TableBody>
              {rows
              && rows.sort((a,b)=>(b.id - a.id)).map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      style={{cursor:'pointer'}}
                    >
                      
                      <TableCell className={classes.TableCell} align="center" padding="none">
                        <Switch
                          size="small"
                          defaultChecked={row.inStock === true ? true : false}
                          onChange={() => 
                            row.inStock === false 
                            ? setStockDrawer({qot : row.expertiseObject,inStock : row.inStock, isOpen:true})
                            : updateQotInStock(row.expertiseObject,false)
                          }
                          name={row.inStock}
                          color="primary"
                          />
                      </TableCell>
                      <TableCell className={classes.TableCell} id={labelId} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>
                        {row.id}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>{row.date}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>{row.salesman}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>{row.customer}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>{row.nature}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>{row.brand}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>{row.model}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>{row.details}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>{row.year}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none" onClick={() => machineClicked(row.expertiseObject)}>{row.estimatedBuyingPrice}€</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">
                      {
                        <Select
                        id={row.state}
                        value={row.state}
                        style={{fontSize:'0.9em'}}
                        IconComponent={() => (
                          row.state == 'Perdue'
                          ? <FontAwesomeIcon 
                              style={{fontSize:'1em',cursor:'pointer',color:Color.warning}}
                              icon={faFrown}/>
                          : row.state == 'Gagnée'
                            ? <FontAwesomeIcon 
                                style={{fontSize:'1em',cursor:'pointer',color:Color.success}}
                                icon={faTrophy}/>
                            : row.state == 'Annulée'
                              ? <FontAwesomeIcon 
                                  style={{fontSize:'1em',cursor:'pointer',color:Color.lightgrey}}
                                  icon={faTrashAlt}/>
                              : row.state == 'Reportée'
                                ? <FontAwesomeIcon 
                                style={{fontSize:'1em',cursor:'pointer',color:Color.secondary}}
                                icon={faClock}/>
                                :row.state == 'Dépôt-vente'
                                ? <FontAwesomeIcon 
                                style={{fontSize:'1em',cursor:'pointer',color:Color.lightgrey}}
                                icon={faMoneyCheck}/>
                                : <FontAwesomeIcon 
                                  style={{fontSize:'1em',cursor:'pointer',color:Color.inspektBlue}}
                                  icon={faSpinner}/>
                        )}
                        onChange={(event) => updateQotState(row.expertiseObject,event.target.value)}
                        MenuProps={MenuProps}
                      >
                        {
                        stateMenuItemsFiltered.map((e) => (
                          <MenuItem value={e} style={{fontSize:'0.8em'}}>
                            {e}
                          </MenuItem>
                        ))
                        }
                      </Select>
                    }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ExpertiseDetails
          open={isExpertiseDetailsOpen}
          setOpen={(isOpen) => setIsExpertiseDetailsOpen(isOpen)}
          focusMachine={focusMachine}
          setFocusMachine={(newFocusMachine) => setFocusMachine(newFocusMachine)}
          logInfo={logInfo}
          setStateFromChild={setStateFromChild}
          getQots={getQots}
        />
        <Drawer anchor='left' open={stockDrawer.isOpen} onClose={() => setStockDrawer({isOpen:false})}>
          <div
            className={clsx(classes.list, {[classes.fullList]: false})}
            role="presentation"
          >
            <List>
              <Typography
                variant='h6'
                style={{textAlign:'center',color:Color.secondary}}>
                Mettre en stock
              </Typography>
              <Divider />
              {[
                {title : 'Prix de vente',key:'customerSalePrice'},
                {title : 'Prix marchand',key:'marketerSalePrice'},
                {title : 'Préparation estimée',key:'repairCost'},
                {title : 'Préparation estimée (marchand)',key:'marketerRepairCost'},
                {title : 'N° de parc',key:'erpId'},
                {title : 'Prix d\'achat',key:'buyingPrice'},
              ].map((value, index) => (
                (logInfo.user.config.hiddenInput || []).indexOf(value.key) == -1
                &&
                <ListItem key={value.key}>
                  <TextField
                    label={value.title}
                    style={{width:'100%'}}
                    variant="outlined"
                    onChange={(event) => handleChangeInStock(event,value.key)}
                  />
                </ListItem>
              ))}
              <ListItem key={'publicComment'}>
                <TextField
                  multiline
                  rowsMin={4}
                  label={'Commentaire public'}
                  style={{width:'100%'}}
                  variant="outlined"
                  onChange={(event) => handleChangeInStock(event,'publicComment')}
                />
              </ListItem>
              <ListItem key={'privateComment'}>
                <TextField
                  multiline
                  rowsMin={4}
                  label={'Commentaire privé'}
                  style={{width:'100%'}}
                  variant="outlined"
                  onChange={(event) => handleChangeInStock(event,'privateComment')}
                />
              </ListItem>
              <div
                style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20px',marginBottom:'20px'}}>
                <Button
                  disabled={inputInStock.buyingPrice ? false : true}
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  style={{width:'auto'}}
                  onClick={() => (saveNewStock())}
                >
                   Mettre en stock
                </Button>
              </div>
            </List>
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