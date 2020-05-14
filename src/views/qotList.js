import React, { useEffect } from 'react';
import Moment from 'moment';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import Color from '../constants/color.js';
import ExpertiseDetails from '../components/expertiseDetails';
import FormsCatalog from '../constants/FormsCatalog';
import getPdf from '../components/expertisePdf';
import ImageSlider from '../components/imageslider';
import Natures from '../constants/Natures';


function createData(id, date, salesman, nature, brand, model, details, year, estimatedBuyingPrice) {
  return { id, date, salesman, nature, brand, model, details, year, estimatedBuyingPrice };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'id' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'salesman', numeric: true, disablePadding: false, label: 'Commercial' },
  { id: 'nature', numeric: true, disablePadding: false, label: 'Nature' },
  { id: 'brand', numeric: true, disablePadding: false, label: 'Marque' },
  { id: 'model', numeric: true, disablePadding: false, label: 'Modèle' },
  { id: 'details', numeric: true, disablePadding: false, label: 'Détails' },
  { id: 'year', numeric: true, disablePadding: false, label: 'Année' },
  { id: 'estimatedBuyingPrice', numeric: true, disablePadding: false, label: 'Cotation' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all qots' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color={Color.inspektBlue} variant="subtitle1" component="div">
          {numSelected} sélectionné(s)
        </Typography>
      ) : (
        null
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        null
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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

export default function EnhancedTable({qotList,cieMembers,logInfo,setStateFromChild}) {
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

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('salesman');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isExpertiseDetailsOpen,setIsExpertiseDetailsOpen] = React.useState(false);
  const [quotations, setQuotations] = React.useState(false);
  const [focusMachine,setFocusMachine] = React.useState({});

  const rows = qotList.map((element) => {
    return {
      id : element.id,
      date : Moment(element.addedOn).format('MMMM-YYYY'),
      salesman: logInfo.cieMembers[element.openedBy].name,
      nature : element.machine.nature.name,
      brand : element.machine.brand,
      model : element.machine.model,
      details : element.machine.model,
      year : element.machine.year,
      estimatedBuyingPrice : element.quotation.estimatedBuyingPrice,
      expertiseObject : element
    };
  });

  console.log('rows : ',rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const machineClicked = (expertise) => {

    ////////// MACHINE ARRAY BUILD \\\\\\\\\\
      console.log('expertise : ',expertise);
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
    console.log('natureList : ',natureList);
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
      console.log('qotList : ',qotList);
      console.log('rows : ',rows);
      console.log('order : ',order);
      console.log('orderBy : ',orderBy);
      console.log('selected : ',selected);
  })

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
              && stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.salesman}</TableCell>
                      <TableCell align="right">{row.nature}</TableCell>
                      <TableCell align="right">{row.brand}</TableCell>
                      <TableCell align="right">{row.model}</TableCell>
                      <TableCell align="right">{row.details}</TableCell>
                      <TableCell align="right">{row.year}</TableCell>
                      <TableCell align="right">{row.estimatedBuyingPrice}</TableCell>
                      <TableCell align="right">
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{fontSize:'1em',color:Color.inspektBlue}}
                        onClick={() => machineClicked(row.expertiseObject)}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100, 250, 500,1000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} color="primary" onChange={handleChangeDense} />}
        label="Mode condensé"
      />
      <ExpertiseDetails
        open={isExpertiseDetailsOpen}
        setOpen={(isOpen) => setIsExpertiseDetailsOpen(isOpen)}
        focusMachine={focusMachine}
        setFocusMachine={(newFocusMachine) => setFocusMachine(newFocusMachine)}
        possibleToQuote={true}
        logInfo={logInfo}
        setStateFromChild={setStateFromChild}
      />
    </div>
  );
}