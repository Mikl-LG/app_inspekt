import React, { useEffect } from 'react';
import Axios from 'axios';

import { fade, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Slide from '@material-ui/core/Slide';
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
import Typography from '@material-ui/core/Typography';

import Color from '../constants/color.js';
import logo from '../inspektLogo_white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs,faSave,faUser } from '@fortawesome/free-solid-svg-icons';
import SnackBar from '../components/snackBar';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  button : {
    backgroundColor : Color.inspektBlue,
    color : 'white',
    margin:'auto'
  },
  formList : {
    marginTop:'25px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  grow: {
    flexGrow: 1,
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

  const {cieMembers,logInfo,setStateFromChild,search,setSearch} = props;
  console.log('props : ',props)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [createCompany,setCreateCompany] = React.useState({});
  const [createUser,setCreateUser] = React.useState({});
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isUserDetailOpen,setIsUserDetailOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [modifiableUserInformations,setModifiableUserInformations] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({message:'Init',type:'snackbarSuccess',isOpen:false});

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
    console.log(status,data);
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
    
    console.log(status,data);
    if(status === 200){
      //setStateFromChild({logInfo : {...logInfo,user : data}})
      setSnackbar({message : 'Utilisateur créé avec succès.',type:'snackbarSuccess',isOpen:true});
    }
    }catch(error){
      console.log('erreur Axios : ',error.response)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeUserInformation = (event,key) => {
    setModifiableUserInformations({...modifiableUserInformations,[key]:event.target.value})
  }

  const handleChangeCreateCompany = (event,key) => {
    event.target.value && setCreateCompany({...createCompany,[key]:event.target.value})
  }

  const handleChangeCreateUser = (event,key) => {
    event.target.value && setCreateUser({...createUser,[key]:event.target.value})
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

  const updateUser = async() => {

    let updatedData = {};
    for (let[key,value] of Object.entries(modifiableUserInformations)){
      updatedData = {...updatedData,[key] : value}
    }

    const token = logInfo.token;
    const axiosParams = await Promise.resolve({
      method: "post",
      url: `https://inspekt.herokuapp.com/api?request=MERGE_USER&token=${token}`,
      // FormData object containing all images in 'filedata'
      data:updatedData,
      config: {Accept: 'application/json','Content-Type': 'application/json',}
    })

    const {data, status} = await Axios(axiosParams);
    if(status === 200){
      setStateFromChild({logInfo : {...logInfo,user : data}})
      setSnackbar({message : 'Ton profil a été mis à jour.',type:'snackbarSuccess',isOpen:true});
    }
    

    //UPDATE INSPEKT THANKS TO SET_EXP (SIMILAR TO QOT ADD) -> ADD FEATURES INTO THE KEY (QUOTATION, PARTICULARITIES ARE KEYS)
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

  useEffect(() => {
    console.log('createUser : ',createUser);
  })

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
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
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={6} color="secondary">
                <NotificationsIcon />
              </Badge>
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
              <Tab label="Réglages" />
              <Tab label="Statistiques" />
              {logInfo.user.licence === 'admin' && <Tab label="Supervision" />}
            </Tabs>
          </Paper>
          {
            tabValue === 0 &&
            <div>
              <Typography className={classes.sectionTitle} variant="h6" style={{marginTop:'25px'}}>
                <FontAwesomeIcon icon={faUser} style={{color:Color.inspektBlue,marginRight:'15px'}}/>
                Ici tu peux modifier tes informations.
              </Typography>
              <Grid container>
                <Grid item xs={6} lg={6} className={classes.formList}>
                  <List style={{width:'100%'}}>
                    {
                      [{key:'name',title:'Nom'},
                      {key:'phoneNumber',title:'Numéro de téléphone'},
                      {key:'email',title:'Email'}]
                      .map((element) => (
                        <div style={{display:'flex'}}>
                          <TextField
                            defaultValue={logInfo.user && logInfo.user[element.key]}
                            label={logInfo.user && element.title}
                            style={{width:'100%',margin:'15px'}}
                            variant="outlined"
                            onChange={(event) => handleChangeUserInformation(event,element.key)}
                          >
                            {
                              logInfo.user && logInfo.user[element.key]
                            }
                          </TextField>
                        </div>
                      ))
                    }
                  </List>
                  <Button className={classes.button} onClick={() => updateUser()}>
                    <FontAwesomeIcon icon={faSave}/>
                  </Button>
                </Grid>
              </Grid>
            </div>
          }
          
          {
            tabValue === 1 &&
            <div>
              <Grid container xs={12} lg={12} style={{padding:'15px'}}>
                <Grid item xs={6} lg={6} style={{marginTop:'25px',width:'100%'}}>
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <div>
                      <img src={logInfo.company && logInfo.company.header} width='200px'/>
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
                <Grid item xs={6} lg={6} style={{marginTop:'25px',width:'100%'}}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Utilisateur</TableCell>
                        <TableCell align="right">Licence</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Téléphone</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {logInfo.company.members && logInfo.company.members.map((user) => (
                        logInfo.cieMembers[user]
                        &&
                        <TableRow key={logInfo.cieMembers[user].email}>
                          <TableCell component="th" scope="row">
                            {logInfo.cieMembers[user].name}
                          </TableCell>
                          <TableCell align="center">{logInfo.cieMembers[user].licence}</TableCell>
                          <TableCell align="center">{logInfo.cieMembers[user].email}</TableCell>
                          <TableCell align="center">{logInfo.cieMembers[user].phoneNumber}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>                  
                </Grid>
              </Grid>
            </div>
            }
            {
            tabValue === 4 &&
            <div>
              <Grid container>
                <Grid item xs={6} lg={6} style={{marginTop:'25px'}}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary style={{display:'flex',alignItems:'center'}}>
                      <AddCircleIcon color="primary"/>
                      <Typography className={classes.sectionTitle} variant='h6' style={{marginLeft:'5px'}}>Nouvelle concession</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <FormControl style={{width:'100%'}} className={classes.formList}>
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
                      <AddCircleIcon color="primary"/>
                      <Typography variant='h6' className={classes.sectionTitle} style={{marginLeft:'5px'}}>Nouvel utilisateur</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <FormControl style={{width:'100%'}} className={classes.formList}>
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
                  
                </Grid>
              </Grid>
            </div>
          }
        </Container>
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