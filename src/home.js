import React,{Component} from 'react';

import axios from 'axios';

import AppBar from './components/appBar.js';
import BottomTabNavigator from './components/bottomTabNavigator.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import Color from './constants/color.js';
import Header from './components/header';
import InspektList from './views/inspektList';
import logo from './logo_inspekt.png';
import Compass from './views/compass';
import QotList from './views/qotList';
import StockList from './views/stockList';
import Login from './views/login';
import NewExpertise from './views/newExpertise';
import token from './constants/token';

import ExpertiseDetails from './components/expertiseDetails';

import 'moment/locale/fr';
import { Typography } from '@material-ui/core';

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            navigation:1,
            searchText:'',
            loading : false,
            displayFromUrl : {allowed : true,waitUrlParam : true}
        };
    }

    theme = createMuiTheme({
        palette: {
          primary: {main:'#0692CD'},
          secondary: {main:'#BB0A21'}
        },
        status: {
          danger: 'orange',
        },
        listItemText:{
            fontSize:'0.7em',//Insert your required size
          }
    });

    getInspekts = async() => {
        if(this.state.logInfo){
            try{
                const axiosResponse = await axios({
                    method:'get',
                    url:'https://inspekt.herokuapp.com/api?request=INSPEKTS&token='+this.state.logInfo.token,
                });

                const isTeamRestricted = await Promise.resolve(typeof this.state.logInfo.user === 'object' && this.state.logInfo.user.team === false);
                const sortedList = (
                    isTeamRestricted 
                    ? await Promise.resolve(
                        axiosResponse.data.filter((e) => (
                            (e.openedBy === this.state.logInfo.user.id)
                            || e.inStock
                        ))
                    )
                    : axiosResponse.data
                )

                this.setState({inspektList : sortedList});
    
            }catch(error){
                console.log('error getInspekts : ',error);
            };
        }else{
            console.log('Pas de user connecté')
        }
    };

    getQots = async() => {
        try{
            const axiosResponse = await axios({
                method:'get',
                url:'https://inspekt.herokuapp.com/api?request=QOTS&token='+this.state.logInfo.token,
            });

            const isTeamRestricted = await Promise.resolve(typeof this.state.logInfo.user === 'object' && this.state.logInfo.user.team === false);
            const sortedList = (
                isTeamRestricted 
                ? await Promise.resolve(
                    axiosResponse.data.filter((e) => (
                        (e.openedBy === this.state.logInfo.user.id)
                        || e.inStock
                    ))
                )
                : axiosResponse.data
            )

            this.setState({qotList : sortedList,loading:false});

        }catch(error){
            console.log('error getQots : ',error);
        };

    };

    setNavigation = (targetNav) => {
        if(this.state.qotList && this.state.inspektList){
            this.setState({navigation : targetNav});
        }
    };

    setStateFromChild = (param) => {
        this.setState(param);
    }

    synchroniser = () => {
        try{
            this.getInspekts();
            this.getQots();
        }
        catch(error){
            console.log('synchroniser_error : ',error);
        }
    }

    componentDidUpdate(){
        console.log('stateUpdate : ',this.state);
    }

    async componentDidMount(){
        
    };

    render(){

        const navigation = this.state.navigation;
        const inspektList = this.state.inspektList && this.state.inspektList;
        const qotList = this.state.qotList && this.state.qotList;
        const stockList = this.state.qotList && this.state.qotList.filter((element) => (element.inStock && element.inStock === true));
        const cieMembers = this.state.logInfo && this.state.logInfo.cieMembers;
        const logInfo = this.state.logInfo;
        const stateMenuItems = ['Annulée','Dépôt-vente','En-cours','Gagnée','Perdue','Reportée'];
        let stateMenuItemsFiltered = [];
        (this.state.logInfo && !(this.state.logInfo.user.config && this.state.logInfo.user.config.hiddenStateItems))
        ? stateMenuItemsFiltered = stateMenuItems
        : stateMenuItems.forEach((element) => (
            this.state.logInfo 
            && this.state.logInfo.user.config 
            && this.state.logInfo.user.config.hiddenStateItems
            && this.state.logInfo.user.config.hiddenStateItems.indexOf(element) == -1
            && stateMenuItemsFiltered.push(element)
          ))

        return(
            <ThemeProvider theme={this.theme}>
                {
                    this.state.logInfo
                    ?
                    <div>
                        <AppBar
                            cieMembers = {cieMembers} 
                            logInfo = {logInfo}
                            setStateFromChild = {this.setStateFromChild}
                            search = {this.state.searchText}
                            setSearch = {(searchText) => this.setState({searchText:searchText})}
                            stateMenuItems={stateMenuItems}
                            getInspekts={this.getInspekts}
                            synchroniser={this.synchroniser}
                        />
                        <Container maxWidth='xl'>
                            <Header navigation = {navigation}/>
                            {
                                navigation === 0
                                ?   <NewExpertise
                                        setStateFromChild={this.setStateFromChild}
                                        logInfo={logInfo}
                                        getInspekts={this.getInspekts}
                                    />
                                :
                                (
                                    navigation === 1
                                    ?   <InspektList
                                            inspektList = {inspektList}
                                            qotList = {qotList}
                                            cieMembers = {cieMembers} 
                                            logInfo={logInfo}
                                            setStateFromChild={this.setStateFromChild}
                                            getInspekts={this.getInspekts}
                                            getQots={this.getQots}
                                            displayFromUrl={this.state.displayFromUrl && this.state.displayFromUrl}
                                        />
                                        :navigation === 2
                                        ?   <QotList
                                                qotList = {qotList}
                                                cieMembers = {cieMembers} 
                                                logInfo={logInfo}
                                                setStateFromChild={this.setStateFromChild}
                                                getInspekts={this.getInspekts}
                                                getQots={this.getQots}
                                                searchText={this.state.searchText}
                                                stateMenuItemsFiltered={stateMenuItemsFiltered}
                                            />
                                        :navigation === 3
                                        ? <StockList
                                            stockList = {stockList}
                                            cieMembers = {cieMembers} 
                                            logInfo={logInfo}
                                            setStateFromChild={this.setStateFromChild}
                                            getInspekts={this.getInspekts}
                                            getQots={this.getQots}
                                            searchText={this.state.searchText}
                                            stateMenuItemsFiltered={stateMenuItemsFiltered}
                                        />
                                        :navigation === 4
                                        ? <Compass
                                            logInfo = {logInfo}
                                        />
                                        : null
                                )
                            }
                        </Container>
                        <BottomTabNavigator
                            setNavigation = {this.setNavigation}
                            deleteSearchText = {() => this.setState({searchText:''})}
                            logInfo = {logInfo}/>
                    </div>
                :
                    this.state.loading == true
                    ?   <div style={{
                                height:window.innerHeight,
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                                justifyContent:'space-around',
                                //marginTop : '20vh'
                        }}>
                            <div>
                                <img src={logo} height='100vh'></img>
                            </div>
                            <div style={{height:'15vi',display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <Typography variant='subtitle1' style={{color:Color.lightgrey}}>Chargement</Typography>
                                <CircularProgress />
                            </div>
                            
                        </div>
                    :
                    <Login
                        setStateFromChild={this.setStateFromChild}
                        getInspekts = {this.getInspekts}
                        getQots = {this.getQots}
                    />
                }
                
            </ThemeProvider>
            
        )
    }

}

export default Home;