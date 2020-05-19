import React, { useEffect } from 'react';
import Moment from 'moment';

import CancelIcon from '@material-ui/icons/Cancel';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Color from '../constants/color.js';
import ExpertiseDetails from '../components/expertiseDetails';
import FormsCatalog from '../constants/FormsCatalog';
import Natures from '../constants/Natures';

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
  const {logInfo,qotList,sort,setSort} = props;

  const headCells = [
    { id: 'id', select: true, width:'1vi', label: 'id', selectOptions : [ ...new Set(qotList.map((element) => (element.id))) ].sort() },
    { id: 'date', select: true, width:'8vi', label: 'Date', selectOptions : [ ...new Set(qotList.map((element) => (Moment(element.addedOn).format('MMMM-YYYY')))) ].sort() },
    { id: 'salesman', select: true, width:'20vi', label: 'Commercial', selectOptions : [ ...new Set(qotList.map((element) => (
      logInfo.cieMembers[element.openedBy].name))) ].sort() },
    { id: 'nature', select: true, width:'12vi', label: 'Nature', selectOptions : [ ...new Set(qotList.map((element) => (
      element.machine.nature.name))) ].sort() },
    { id: 'brand', select: true, width:'12vi', label: 'Marque',selectOptions : [ ...new Set(qotList.map((element) => (
      element.machine.brand))) ].sort() },
    { id: 'model', select: true, width:'18vi', label: 'Modèle', selectOptions : [ ...new Set(qotList.map((element) => (
      element.machine.model))) ].sort() },
    { id: 'details', select: true, width:'30vi', label: 'Détails',selectOptions : [] },
    { id: 'year', select: true, label: 'Année',selectOptions : [ ...new Set(qotList.map((element) => (
      element.machine.year))) ].sort() },
    { id: 'estimatedBuyingPrice', width:'7vi', select: true, label: 'Cotation',selectOptions : [ ...new Set(qotList.map((element) => (element.quotation.estimatedBuyingPrice))) ].sort() },
    { id: 'machineDetails', width:'2vi', select: false, label: '',selectOptions : [] },
  ];

  console.log('sort : ',sort);

  /*const list = {
    salesman : [ ...new Set(qotList.map((element) => (
    logInfo.cieMembers[element.openedBy].name
    ))) ].sort(),
    nature: [ ...new Set(qotList.map((element) => (
    element.machine.nature.name
    ))) ].sort(),
    brand: [ ...new Set(qotList.map((element) => (
    element.machine.brand
    ))) ].sort(),
    model:[ ...new Set(qotList.map((element) => (
    element.machine.model && element.machine.model
    ))) ].sort()
  }*/

  let autoList = {}
  headCells.forEach((headCell) => {
    autoList = {...autoList,[headCell.id] : headCell.selectOptions}
  })

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
                value={sort[headCell.id]}
                onChange={(event) => setSort({...sort,[headCell.id]:event.target.value})}
                MenuProps={MenuProps}
                IconComponent={() => (
                  sort[headCell.id].length > 0
                  ? <CancelIcon 
                      style={{fontSize:'1em',cursor:'pointer',color:Color.warning}}
                      onClick={() => setSort({...sort,[headCell.id]:[]})} />
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

export default function EnhancedTable({qotList,cieMembers,logInfo,setStateFromChild,searchText}) {
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
  const [isExpertiseDetailsOpen,setIsExpertiseDetailsOpen] = React.useState(false);
  const [focusMachine,setFocusMachine] = React.useState({});
  const [sort,setSort] = React.useState({id:[],date:[],salesman:[],nature:[],brand:[],model:[],details:[],year:[],estimatedBuyingPrice:[]});

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
        && new RegExp(sort.id.join('|')).test(element.id) === true
        && new RegExp(sort.date.join('|')).test(Moment(element.addedOn).format('MMMM-YYYY')) === true
        && new RegExp(sort.salesman.join('|')).test(logInfo.cieMembers[element.openedBy].name) === true
        && new RegExp(sort.nature.join('|')).test(element.machine.nature.name) === true
        && new RegExp(sort.brand.join('|')).test(element.machine.brand) === true
        && new RegExp(sort.model.join('|')).test(element.machine.model) === true
        && new RegExp(sort.year.join('|')).test(element.machine.year) === true
        && new RegExp(sort.estimatedBuyingPrice.join('|')).test(element.quotation.estimatedBuyingPrice) === true
        )
        qotListFiltered = [...qotListFiltered,element];
    });
    
    qotListFiltered.forEach((element) => {
      rows = [...rows, {
        id : element.id,
        date : Moment(element.addedOn).format('MMMM-YYYY'),
        salesman: logInfo.cieMembers[element.openedBy].name,
        nature : element.machine.nature.name,
        brand : element.machine.brand,
        model : element.machine.model,
        details : machineFeatureToString(element.machineFeatures),
        year : element.machine.year,
        estimatedBuyingPrice : element.quotation.estimatedBuyingPrice,
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

  useEffect(()=>{
      console.log('sort : ',sort);
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
            />
            <TableBody>
              {rows
              && rows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      
                      <TableCell className={classes.TableCell} component="th" id={labelId} scope="row"  align="center" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">{row.date}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">{row.salesman}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">{row.nature}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">{row.brand}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">{row.model}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">{row.details}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">{row.year}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">{row.estimatedBuyingPrice}</TableCell>
                      <TableCell className={classes.TableCell} align="center" padding="none">
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{fontSize:'1em',color:Color.inspektBlue}}
                        onClick={() => machineClicked(row.expertiseObject)}/>
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
      />
    </div>
  );
}