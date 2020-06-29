import React, { useEffect } from 'react';
import Axios from 'axios';

import { fade, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import Slide from '@material-ui/core/Slide';
import SyncIcon from '@material-ui/icons/Sync';
import Switch from '@material-ui/core/Switch';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Color from '../constants/color.js';
import logo from '../inspektLogo_white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs,faSave,faUser,faUsers, faUserMinus, faUserPlus, faFolderPlus, faStar, faGavel } from '@fortawesome/free-solid-svg-icons';
import SnackBar from '../components/snackBar';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  button : {
    margin:'auto',
    marginTop : '15px'
  },
  container:{
    marginTop:'15px',
  },
  centeredList : {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:'100vi'
  },
  chip: {
    margin: theme.spacing(0.5),
    fontSize:'0.8em'
  },
  grow: {
    flexGrow: 1,
  },
  icon : {
    fontSize : '1.5em',
    color : Color.secondary
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sectionTitle : {
    color:Color.lightgrey
  },
  smallFontSizeCells:{
    fontSize:'0.8em'
  },
  textfield : {
    fontSize:'0.8em',
    marginBottom:'5px',
    width:'100%'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PrimarySearchAppBar(props) {

  const {cieMembers,logInfo,setStateFromChild,search,setSearch,stateMenuItems,synchroniser} = props;
  const classes = useStyles();
  const [addNotifEmail,setAddNotifEmail] = React.useState({open:false});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [createCompany,setCreateCompany] = React.useState({});
  const [createUser,setCreateUser] = React.useState({});
  const [expanded,setExpanded] = React.useState("dealerUsers");
  const [input,setInput] = React.useState();
  const [hiddenInput,setHiddenInput] = React.useState(
    logInfo.user.config && logInfo.user.config.hiddenInput || []);
  const [hiddenStateItems,setHiddenStateItems] = React.useState(
    logInfo.user.config && logInfo.user.config.hiddenStateItems || []);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isUserDetailOpen,setIsUserDetailOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [modifiableUserInformations,setModifiableUserInformations] = React.useState(
     logInfo.user.config || false
  );
  const [modifiableUserInformationsFromManager,setModifiableUserInformationsFromManager] = React.useState({});
  const [userConfig,setUserConfig] = React.useState(
    logInfo.user.config || false
 );
  const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});

  const addNotifEmailRequest = async() => {

    let recipientList;
    let userConfig = logInfo.cieMembers[addNotifEmail.user].config ? logInfo.cieMembers[addNotifEmail.user].config : {};
    let _cieMembers = logInfo.cieMembers;

    addNotifEmail.type === 'newExp'
    ? recipientList = (userConfig.notifEmails && userConfig.notifEmails.newExp) ? userConfig.notifEmails.newExp : []
    : recipientList = (userConfig.notifEmails && userConfig.notifEmails.quotations &&userConfig.notifEmails.quotations.qot) ? userConfig.notifEmails.quotations.qot : []

    addNotifEmail.emailToAdd && addNotifEmail.emailToAdd != '' && 
      recipientList.push(addNotifEmail.emailToAdd)

      addNotifEmail.type === 'newExp'
    ? userConfig = {...userConfig,notifEmails : {...userConfig.notifEmails,newExp : recipientList}}
    : userConfig = {...userConfig,notifEmails : {...userConfig.notifEmails,quotations : {qot : recipientList}}}

    const body = await Promise.resolve({
      userId : addNotifEmail.user,
      merge : {
        config : userConfig
      }
    })

    _cieMembers[addNotifEmail.user].config = userConfig;

    try{
      const url = `https://inspekt.herokuapp.com/api?request=MERGE_ANY_USER&token=${logInfo.token}`;
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
  
      if(error === false){
        setAddNotifEmail({open:false});
        setStateFromChild({logInfo : {...logInfo,cieMembers : _cieMembers}});
        setSnackbar({message : 'Mise à jour réussie',type:'snackbarSuccess',isOpen:true});
      }
    }catch(error){
      setSnackbar({message : 'La mise à jour a échoué.',type:'snackbarWarning',isOpen:true});
    }
    
  }

  const createNewCompany = async() => {

    const token = logInfo.token;
    const axiosParams = await Promise.resolve({
      method: "post",
      url: `https://inspekt.herokuapp.com/api?request=CREATE_COMPANY&token=${token}`,
      // FormData object containing all images in 'filedata'
      data:createCompany,
      config: {Accept: 'application/json','Content-Type': 'application/json',}
    })

    const {data, status} = await Axios(axiosParams);

    if(status === 200){
      //setStateFromChild({logInfo : {...logInfo,user : data}})
      setSnackbar({message : 'Concession créée avec succès.',type:'snackbarSuccess',isOpen:true});
    }
  }

  const createNewUser = async() => {

    const token = logInfo.token;
    try{
    const axiosParams = await Promise.resolve({
      method: "post",
      url: `https://inspekt.herokuapp.com/api?request=CREATE_ACCOUNT&token=${token}`,
      // FormData object containing all images in 'filedata'
      data:createUser,
      config: {Accept: 'application/json','Content-Type': 'application/json',}
    })

    const {data, status} = await Axios(axiosParams);
    

    if(status === 200){
      //setStateFromChild({logInfo : {...logInfo,user : data}})
      setSnackbar({message : 'Utilisateur créé avec succès.',type:'snackbarSuccess',isOpen:true});
    }
    }catch(error){
      console.log('erreur Axios : ',error.response)
    }
  }

  const deleteNotifEmails = async(user,recipient,type) => {

    let recipientList;
    let userConfig = logInfo.cieMembers[user].config;
    let _cieMembers = logInfo.cieMembers;

    type === 'newExp'
    ? recipientList = userConfig.notifEmails.newExp
    : recipientList = userConfig.notifEmails.quotations.qot

    const index = recipientList.indexOf(recipient);
    recipientList.splice(index,1);

    index > -1 && type === 'newExp'
    ? userConfig.notifEmails.newExp = recipientList
    : userConfig.notifEmails.quotations.qot = recipientList

    const body = await Promise.resolve({
      userId : user,
      merge : {
        config : userConfig
      }
    })

    _cieMembers[user].config = userConfig;

    try{
      const url = `https://inspekt.herokuapp.com/api?request=MERGE_ANY_USER&token=${logInfo.token}`;
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
  
      if(error === false){
        setStateFromChild({logInfo : {...logInfo,cieMembers : _cieMembers}});
        setSnackbar({message : 'Mise à jour réussie',type:'snackbarSuccess',isOpen:true});
      }
    }catch(error){
      setSnackbar({message : 'La mise à jour a échoué.',type:'snackbarWarning',isOpen:true});
    }

  }

  const deleteUser = async() => {

    const body = await Promise.resolve({
      id : input.userToDelete,
    })

    //**ADD COTATION REQUEST**\\
    const url = `https://inspekt.herokuapp.com/api?request=REMOVE_USER&token=${logInfo.token}`
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

    console.log('response : ',response);

    if(error == false){
      setSnackbar({message : 'Utilisateur supprimé',type:'snackbarSuccess',isOpen:true});
    } 
    
  }

  const licences = {
    admin : {
      disabled : false,
      icon : faStar,
      color : Color.inspektBlue
    },
    manager : {
      disabled : false,
      icon : faStar,
      color : Color.inspektBlue
    },
    qoter : {
      disabled : true,
      icon : faGavel,
      color : Color.secondary
    },
    inspekter : {
      disabled : true,
      icon : faUser,
      color : Color.lightgrey
    }}; //unauthorized user.license for company user modification

  const handleChangeCreateCompany = (event,key) => {
    event.target.value && setCreateCompany({...createCompany,[key]:event.target.value})
  }

  const handleChangeCreateUser = (event,key) => {
    event.target.value && setCreateUser({...createUser,[key]:event.target.value})
  }

  const handleChangeHiddenInput = (key) => {

    const selectedIndex = hiddenInput.indexOf(key);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(hiddenInput, key);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(hiddenInput.slice(1));
    } else if (selectedIndex === hiddenInput.length - 1) {
      newSelected = newSelected.concat(hiddenInput.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        hiddenInput.slice(0, selectedIndex),
        hiddenInput.slice(selectedIndex + 1),
      );
    }

    setHiddenInput(newSelected);
    setModifiableUserInformations({...modifiableUserInformations,hiddenInput : newSelected})

  }

  const handleChangeHiddenStateItems = (key) => {

    const selectedIndex = hiddenStateItems.indexOf(key);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(hiddenStateItems, key);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(hiddenStateItems.slice(1));
    } else if (selectedIndex === hiddenStateItems.length - 1) {
      newSelected = newSelected.concat(hiddenStateItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        hiddenStateItems.slice(0, selectedIndex),
        hiddenStateItems.slice(selectedIndex + 1),
      );
    }

    setHiddenStateItems(newSelected);
    setModifiableUserInformations({...modifiableUserInformations,hiddenStateItems : newSelected})

  }

  const handleChangeUserInformation = (value,key) => {
    setModifiableUserInformations({...modifiableUserInformations,[key]:value})
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const updateUser = async(type) => {
    
    let updatedData = {...logInfo.user.config};
    for (let[key,value] of Object.entries(modifiableUserInformations)){
      updatedData = {...updatedData,[key] : value}
    }

    const token = logInfo.token;
    const axiosParams = await Promise.resolve({
      method: "post",
      url: `https://inspekt.herokuapp.com/api?request=MERGE_USER&token=${token}`,
      // FormData object containing all images in 'filedata'
      data: type === 'informations' ? updatedData : {config:updatedData}, 
      //users informations are roots paramters instead of config which are stored in user.config
      config: {Accept: 'application/json','Content-Type': 'application/json',}
    })

    const {data, status} = await Axios(axiosParams);
    if(status === 200){
      setStateFromChild({logInfo : {...logInfo,user : data}})
      setSnackbar({message : 'Mise à jour réussie',type:'snackbarSuccess',isOpen:true});
    }
    
  }

  const updateUserFromManager = async(value,key,user,path) => {
    
    let body = {};

    if(path === 'root'){
      //in this case, param is directly attached to the user
      body = await Promise.resolve({
        userId : user,
        merge : {
          [key] : value
        }
      })
    }else if(path === 'config'){
      //in this case, param is attached to user.config
      const userConfig = logInfo.cieMembers[user].config || {};
      body = await Promise.resolve({
        userId : user,
        merge : {
          config : {...userConfig,[key] : value}
        }
      })
    }

    try{
      const url = `https://inspekt.herokuapp.com/api?request=MERGE_ANY_USER&token=${logInfo.token}`;
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
  
      if(error === false && path === 'root'){
        let _logInfo = {...logInfo};
        _logInfo.cieMembers[user][key] = value;
        setStateFromChild({logInfo : _logInfo});
        setSnackbar({message : 'Mise à jour réussie',type:'snackbarSuccess',isOpen:true});
      }else if(error === false && path === 'config'){
        let _logInfo = {...logInfo};
        _logInfo.cieMembers[user].config = {...logInfo.cieMembers[user].config,[key] : value}
        setStateFromChild({logInfo : _logInfo});
        setSnackbar({message : 'Mise à jour réussie',type:'snackbarSuccess',isOpen:true});
      }
    }catch(error){
      setSnackbar({message : 'La mise à jour a échoué.',type:'snackbarWarning',isOpen:true});
    }
    
    
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={(handleProfileMenuOpen)}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  let listOfMembers = Object.keys(logInfo.cieMembers);

  useEffect(() => {
  })

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          
          <img src={logo} height='30vh' alt='logo inspekt'/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Rechercher..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={() => synchroniser()} >
                <SyncIcon/>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => setIsUserDetailOpen(true)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
          {renderMenu}
          {renderMobileMenu}
      <Dialog
        fullScreen
        open={isUserDetailOpen}
        onClose={() => setIsUserDetailOpen(false)}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setIsUserDetailOpen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <FontAwesomeIcon icon={faCogs} style={{fontSize:'1.5em',marginRight:'10px'}}/>
              Paramètres et autorisations
            </Typography>
          </Toolbar>
        </AppBar>
        <Container style={{paddingTop:'25px',paddingBottom:'25px'}}>
          <Paper square>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              aria-label="disabled tabs example"
              centered
            >
              <Tab label="Profil" />
              <Tab label="Concession" />
              <Tab label="Paramètres" />
              {logInfo.user.licence === 'admin' && <Tab label="Statistiques" />}
              {logInfo.user.licence === 'admin' && <Tab label="Supervision" />}
            </Tabs>
          </Paper>
          {
            tabValue === 0 &&
            <div>
              <Typography
                className={classes.sectionTitle}
                variant="h6"
                style={{color:Color.secondary,marginTop:'25px'}}
              >
                <FontAwesomeIcon icon={faUser} style={{color:Color.secondary,marginRight:'15px'}}/>
                Ton profil
              </Typography>
              <Divider/>
              <Grid className={classes.container}>
                <Grid item xs={6} lg={6} className={classes.centeredList}>
                  <List style={{width:'100%'}}>
                    {
                      [{key:'name',title:'Nom'},
                      {key:'phoneNumber',title:'Numéro de téléphone'},
                      {key:'email',title:'Email'}]
                      .map((element) => (
                        <div style={{display:'flex'}} key={element.key}>
                          <TextField
                            defaultValue={logInfo.user && logInfo.user[element.key]}
                            label={logInfo.user && element.title}
                            style={{width:'100%',margin:'15px'}}
                            variant="outlined"
                            onChange={(event) => handleChangeUserInformation(event.target.value,element.key)}
                          >
                            {
                              logInfo.user && logInfo.user[element.key]
                            }
                          </TextField>
                        </div>
                      ))
                    }
                  </List>
                  <Button 
                    disabled={JSON.stringify(logInfo.user.config) == JSON.stringify(modifiableUserInformations)}
                    className={classes.button} 
                    variant="contained"
                    color="primary" 
                    onClick={() => updateUser('informations')}
                    startIcon={<FontAwesomeIcon icon={faSave}/>}>
                    SAUVEGARDER
                  </Button>
                </Grid>
              </Grid>
            </div>
          }
          
          {
            tabValue === 1 &&
            <div>
              <Typography
                className={classes.sectionTitle}
                variant="h6"
                style={{color:Color.secondary,marginTop:'25px'}}
              >
                <FontAwesomeIcon icon={faUsers} style={{color:Color.secondary,marginRight:'15px'}}/>
                {logInfo.company.name.toUpperCase()}
              </Typography>
              <Divider/>
              <Grid container xs={12} lg={12} className={classes.container}>
                <Grid item xs={12} lg={12} style={{marginTop:'25px',width:'100%'}}>
                <ExpansionPanel 
                    square
                    style={{width:'100%'}}
                    expanded={expanded === 'dealerUsers'}
                    onChange={(event) => expanded === 'dealerUsers' ? setExpanded(''):setExpanded('dealerUsers')}>
                    <ExpansionPanelSummary>
                      <Typography className={classes.sectionTitle} variant='subtitle1'>Gestion d'équipe</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.centeredList}>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.smallFontSizeCells} align="center">Utilisateur</TableCell>
                              <TableCell className={classes.smallFontSizeCells} align="center">Licence</TableCell>
                              <TableCell className={classes.smallFontSizeCells} align="center">Notifications expertise</TableCell>
                              <TableCell className={classes.smallFontSizeCells} align="center">Notifications cotation</TableCell>
                              <TableCell className={classes.smallFontSizeCells} align="center">Masquer prix achat</TableCell>
                              <TableCell className={classes.smallFontSizeCells} align="center">Mode</TableCell>
                              <TableCell className={classes.smallFontSizeCells} align="center">Actif</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listOfMembers && listOfMembers.map((user) => (
                              logInfo.cieMembers[user]
                              &&
                              <TableRow key={logInfo.cieMembers[user].email}>
                                <TableCell className={classes.smallFontSizeCells} component="th" scope="row">
                                  <div style={{display:'flex',justifyContent:'flex-start',alignItems : 'center'}}>
                                    <Tooltip title={logInfo.cieMembers[user].email}>
                                      <MailIcon className={classes.icon} onClick={()=> window.open('mailto:' + logInfo.cieMembers[user].email)}/>
                                    </Tooltip>
                                    <Tooltip title={logInfo.cieMembers[user].phoneNumber}>
                                      <PhoneIphoneIcon className={classes.icon} onClick={() => window.open('tel:' + logInfo.cieMembers[user].phoneNumber)}/>
                                    </Tooltip>
                                    <div style={{marginLeft:'10px'}}>{logInfo.cieMembers[user].name}</div>
                                  </div>
                                </TableCell>
                                <TableCell align="center" className={classes.smallFontSizeCells}>
                                {
                                    <Select
                                      id="userLicenceSelect"
                                      value={logInfo.cieMembers[user].licence}
                                      disabled={licences[logInfo.user.licence].disabled}
                                      style={{fontSize:'0.9em'}}
                                      IconComponent={() => (
                                        <FontAwesomeIcon 
                                          style={{
                                            fontSize:'1em',
                                            cursor:'pointer',
                                            color:licences[logInfo.cieMembers[user].licence].color
                                          }}
                                          icon={licences[logInfo.cieMembers[user].licence].icon}
                                        />
                                      )}
                                      onChange={(event) => updateUserFromManager(event.target.value,"licence",user,'root')}
                                    >
                                      {
                                      ["manager","qoter","inspekter"].map((e) => (
                                        <MenuItem key={e} value={e} style={{fontSize:'0.8em'}}>
                                          {e.toUpperCase()}
                                        </MenuItem>
                                      ))
                                      }
                                    </Select>
                                }
                                </TableCell>
                                <TableCell align="center" className={classes.smallFontSizeCells}>
                                  {
                                    logInfo.cieMembers[user].config
                                    && logInfo.cieMembers[user].config.notifEmails
                                    && logInfo.cieMembers[user].config.notifEmails.newExp
                                    && logInfo.cieMembers[user].config.notifEmails.newExp.length
                                    ? logInfo.cieMembers[user].config.notifEmails.newExp.map((recipient) => (
                                      <div>
                                        <Chip
                                          //icon={icon}
                                          disabled={logInfo.user.licence === 'inspekter'}
                                          size="small"
                                          variant='outlined'
                                          label={recipient}
                                          onDelete={() => deleteNotifEmails(user,recipient,'newExp')}
                                          className={classes.chip}
                                        />
                                      </div>
                                    ))
                                    : <div style={{color : Color.lightgrey,fontSize : '0.7em'}}>Aucun destinataire</div>
                                  }
                                  {
                                    <div><AddCircleIcon
                                    style={{cursor:'pointer'}}
                                    className={classes.icon}
                                    onClick={() => setAddNotifEmail({open:true,type:'newExp',user:user})}
                                    /></div>
                                  }
                                  
                                </TableCell>
                                <TableCell align="center" className={classes.smallFontSizeCells}>
                                {
                                    logInfo.cieMembers[user].config
                                    && logInfo.cieMembers[user].config.notifEmails
                                    && logInfo.cieMembers[user].config.notifEmails.quotations
                                    && logInfo.cieMembers[user].config.notifEmails.quotations.qot
                                    && logInfo.cieMembers[user].config.notifEmails.quotations.qot.length
                                    ? logInfo.cieMembers[user].config.notifEmails.quotations.qot.map((recipient) => (
                                  <div>
                                    <Chip
                                      //icon={icon}
                                      size="small"
                                      variant='outlined'
                                      label={recipient}
                                      onDelete={() => deleteNotifEmails(user,recipient,'quotations')}
                                      className={classes.chip}
                                    />
                                  </div>
                                    ))
                                    : <div style={{color : Color.lightgrey,fontSize : '0.7em'}}>Aucun destinataire</div>
                                  }
                                  {
                                    <div><AddCircleIcon
                                    style={{cursor:'pointer'}}
                                    className={classes.icon}
                                    onClick={() => setAddNotifEmail({open:true,type:'quotations',user:user})}
                                    /></div>
                                  }
                                </TableCell>
                                <TableCell className={classes.smallFontSizeCells} className={classes.TableCell} align="center" padding="none">
                                  {
                                    <Switch 
                                      id="isUserRestrictedOnBuyingPrice"
                                      checked={logInfo.cieMembers[user].config.restrictionOnBuyingPrice}
                                      disabled={licences[logInfo.user.licence].disabled}
                                      color="primary"
                                      onChange={()=>updateUserFromManager(logInfo.cieMembers[user].config.restrictionOnBuyingPrice === true ? false : true,"restrictionOnBuyingPrice",user,'config')}
                                    />
                                  }
                                </TableCell>
                                <TableCell className={classes.smallFontSizeCells} className={classes.TableCell} align="center" padding="none">
                                  {
                                    <Select
                                      id="isUserTeamSelect"
                                      value={logInfo.cieMembers[user].team === false ? 'SOLO' : 'TEAM'}
                                      disabled={licences[logInfo.user.licence].disabled}
                                      style={{fontSize:'0.9em'}}
                                      IconComponent={() => (
                                        logInfo.cieMembers[user].team === false
                                        ? <FontAwesomeIcon 
                                            style={{fontSize:'1em',cursor:'pointer',color:Color.warning}}
                                            icon={faUser}/>
                                        : <FontAwesomeIcon 
                                        style={{fontSize:'1em',cursor:'pointer',color:Color.success}}
                                        icon={faUsers}/>
                                      )}
                                      onChange={(event) => updateUserFromManager(event.target.value === 'SOLO' ? false : true,"team",user,'root')}
                                    >
                                      {
                                      ["SOLO","TEAM"].map((e) => (
                                        <MenuItem key={e} value={e} style={{fontSize:'0.8em'}}>
                                          {e}
                                        </MenuItem>
                                      ))
                                      }
                                    </Select>
                                }
                                </TableCell>
                                <TableCell className={classes.smallFontSizeCells}>
                                  {
                                    <Switch 
                                    checked={logInfo.cieMembers[user].active}
                                    disabled={licences[logInfo.user.licence].disabled}
                                    color="primary"
                                    onChange={()=>updateUserFromManager(logInfo.cieMembers[user].active === true ? false : true,"active",user,'root')}
                                  />
                                  }
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>   
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>
                <Grid item xs={12} lg={12} style={{marginTop:'25px',width:'100%'}}>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <div>
                      <img src={logInfo.company && logInfo.company.logo} width='200px'/>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                    <div style={{fontWeight:'bold'}}>{logInfo.company.name.toUpperCase()}</div>
                    <div style={{fontSize:'0.8em'}}>{logInfo.company.address.toUpperCase()}</div>
                    <div style={{fontSize:'0.8em'}}>
                      {logInfo.company.postCode.toUpperCase() + ' ' + logInfo.company.city.toUpperCase()}
                    </div>
                    <div style={{fontSize:'0.8em'}}>{'SIRET : ' + logInfo.company.legalNumber.toUpperCase()}</div>
                  </div>
                  
                </Grid>
              </Grid>
            </div>
            }

            {
            tabValue === 2 &&
            <div>
              <Typography className={classes.sectionTitle} variant="h6" style={{color:Color.secondary,marginTop:'25px'}}>
                <FontAwesomeIcon icon={faCogs} style={{color:Color.secondary,marginRight:'15px'}}/>
                Optimise ton application web
              </Typography>
              <Divider/>
              <Grid className={classes.container}>
                <Grid item xs={6} lg={6} className={classes.centeredList}>
                  <ExpansionPanel 
                    square
                    style={{width:'100%'}}
                    expanded={expanded === 'hiddenInput'}
                    onChange={(event) => expanded === 'hiddenInput' ? setExpanded(''):setExpanded('hiddenInput')}>
                    <ExpansionPanelSummary style={{display:'flex',alignItems:'center'}}>
                      <Typography className={classes.sectionTitle} variant='subtitle1'>Masquer des champs de cotation</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.centeredList}>
                      <FormControl style={{width:'100%',alignSelf:'center'}}>
                        {
                          [
                            {title : 'Prix de vente',key:'customerEstimatedSalePrice'},
                            {title : 'Prix marchand',key:'marketerEstimatedSalePrice'},
                            {title : 'Préparation estimée',key:'estimatedRepairCost'},
                            {title : 'Préparation estimée (marchand)',key:'estimatedMarketerRepairCost'},
                            {title : 'Cote SIMO',key:'simoQuotation'}
                          ].map((element) => (
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={hiddenInput.indexOf(element.key) > -1 ? true : false}
                                  onChange={() => handleChangeHiddenInput(element.key)}
                                  name={element.key}
                                  color="primary"
                                />}
                              label={element.title}
                            />
                          ))
                        }
                      </FormControl>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel 
                    square
                    style={{width:'100%'}}
                    expanded={expanded === 'hiddenStateItems'}
                    onChange={(event) => expanded === 'hiddenStateItems' ? setExpanded(''):setExpanded('hiddenStateItems')}>
                    <ExpansionPanelSummary style={{display:'flex',alignItems:'center'}}>
                      <Typography className={classes.sectionTitle} variant='subtitle1'>Masquer des statuts d'affaire</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.centeredList}>
                      <FormControl style={{width:'100%',alignSelf:'center'}}>
                        {
                          stateMenuItems.map((element) => (
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={hiddenStateItems.indexOf(element) > -1 ? true : false}
                                  onChange={() => handleChangeHiddenStateItems(element)}
                                  name={element}
                                  color="primary"
                                />}
                              label={element}
                            />
                          ))
                        }
                      </FormControl>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  {
                    (logInfo.user.licence === 'admin' || logInfo.user.licence === 'manager' || logInfo.user.licence === 'qoter') &&
                      <ExpansionPanel 
                      square
                      style={{width:'100%'}}
                      expanded={expanded === 'qoterMode'}
                      onChange={(event) => expanded === 'qoterMode' ? setExpanded(''):setExpanded('qoterMode')}
                    >
                      <ExpansionPanelSummary style={{display:'flex',alignItems:'center'}}>
                        <Typography className={classes.sectionTitle} variant='subtitle1'>Mode QOTER par défaut</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.centeredList}>
                        <FormControl style={{width:'100%',alignSelf:'center'}}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={modifiableUserInformations.isDefaultQoter}
                                onChange={() =>
                                  modifiableUserInformations.isDefaultQoter == true 
                                  ? setModifiableUserInformations(
                                    {...modifiableUserInformations,isDefaultQoter : false}) 
                                  : setModifiableUserInformations(
                                      {...modifiableUserInformations,isDefaultQoter : true})
                                }
                                name='isDefaultQoter'
                                color="primary"
                              />}
                            label="Activer"
                          />
                        </FormControl>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  }
                  <Button 
                    disabled={JSON.stringify(logInfo.user.config) == JSON.stringify(modifiableUserInformations)}
                    className={classes.button} 
                    variant="contained"
                    color="primary" 
                    onClick={() => updateUser('config')}
                    startIcon={<FontAwesomeIcon icon={faSave}/>}>
                    SAUVEGARDER
                  </Button>
                </Grid>
              </Grid>
            </div>
          }

            {
            (tabValue === 4 && logInfo.user.licence ==='admin')
            && <div>
              <Grid container>
                <Grid item xs={6} lg={6} style={{marginTop:'25px'}}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary style={{display:'flex',alignItems:'center'}}>
                      <FontAwesomeIcon icon={faFolderPlus} style={{color:Color.secondary}}/>
                      <Typography className={classes.sectionTitle} variant='h6' style={{marginLeft:'5px'}}>Ajouter une concession</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <FormControl style={{width:'100%'}} className={classes.centeredList}>
                        {
                          [
                            {title:'Raison sociale',key:'name'},
                            {title:'Adresse',key:'address'},
                            {title:'Code postal',key:'postCode'},
                            {title:'Ville',key:'city'},
                            {title:'Siren',key:'legalNumber'},
                            {title:'Nombre d\'utilisateurs',key:'usersAvailable'},
                          ].map((element) => (
                            <TextField
                              className={classes.textfield}
                              variant='outlined'
                              label={element.title}
                              onChange={(event) => handleChangeCreateCompany(event,element.key)}/>
                          ))
                        }
                        <Button className={classes.button} onClick={() => createNewCompany()}>
                          <FontAwesomeIcon icon={faSave}/>
                        </Button>
                      </FormControl>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel>
                    <ExpansionPanelSummary>
                    <FontAwesomeIcon icon={faUserPlus} style={{color:Color.secondary}}/>
                      <Typography variant='h6' className={classes.sectionTitle} style={{marginLeft:'5px'}}>Ajouter un utilisateur</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <FormControl style={{width:'100%'}} className={classes.centeredList}>
                        {
                          [
                            {title:'Identifiant concession',key:'cieId'},
                            {title:'Nom d\'utilisateur',key:'name'},
                            {title:'Email',key:'email'},
                            {title:'Licence',key:'licence'},
                            {title:'avatar',key:'avatar'},
                            {title:'Téléphone portable',key:'phoneNumber'},
                          ].map((element) => (
                            <TextField
                              className={classes.textfield}
                              variant='outlined'
                              label={element.title}
                              onChange={(event) => handleChangeCreateUser(event,element.key)}/>
                          ))
                        }
                        <Button className={classes.button} onClick={() => createNewUser()}>
                          <FontAwesomeIcon icon={faSave}/>
                        </Button>
                      </FormControl>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel>
                    <ExpansionPanelSummary>
                      <FontAwesomeIcon icon={faUserMinus} style={{color:Color.secondary}}/>
                      <Typography variant='h6' className={classes.sectionTitle} style={{marginLeft:'5px'}}>Supprimer un utilisateur</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <FormControl style={{width:'100%'}} className={classes.centeredList}>
                        {
                          [
                            {title:'Identifiant utilisateur',key:'userid'},
                          ].map((element) => (
                            <TextField
                              className={classes.textfield}
                              variant='outlined'
                              label={element.title}
                              onChange={(event) => setInput({userToDelete : event.target.value})}/>
                          ))
                        }
                        <Button className={classes.button} onClick={() => deleteUser()}>
                          <FontAwesomeIcon icon={faSave}/>
                        </Button>
                      </FormControl>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>
              </Grid>
            </div>
          }
        </Container>
      </Dialog>
      <Dialog open={addNotifEmail.open} onClose={() => setAddNotifEmail({open:false})}>
        <DialogContent>
          <TextField 
            label = 'Ajouter un destinataire'
            onChange={(event) => setAddNotifEmail(
              {...addNotifEmail,emailToAdd:event.target.value})
              }>    
          </TextField>
        </DialogContent>
        <Button
          variant="contained"
          color="primary" 
          style={{margin:'20px'}}
          onClick={() => addNotifEmailRequest()}
          >
            VALIDER
        </Button>
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

export default PrimarySearchAppBar