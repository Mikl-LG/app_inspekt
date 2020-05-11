import React,{Component} from 'react';

import axios from 'axios';

import AppBar from './components/appBar.js';
import BottomTabNavigator from './components/bottomTabNavigator.js';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './components/header';
import InspektList from './views/inspektList';
import Login from './views/login';
import NewExpertise from './views/newExpertise';
import token from './constants/token';

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            navigation:1,
            //logInfo:'mikl' //RAT DELETE
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
                this.setState({inspektList : axiosResponse.data});
    
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
                url:'https://inspekt.herokuapp.com/api?request=QOTS&token='+token,
            });
            this.setState({qotList : axiosResponse.data});

        }catch(error){
            console.log('error getQots : ',error);
        };

    };

    setNavigation = (targetNav) => {
        this.setState({navigation : targetNav});
    };

    setStateFromChild= (param) => {
        this.setState(param);
    }

    componentDidUpdate(){
        console.log('homeState updated : ',this.state);
    }

    async componentDidMount(){
        
        
    };

    render(){

        const navigation = this.state.navigation;
        const inspektList = this.state.inspektList && this.state.inspektList;
        const cieMembers = this.state.logInfo && this.state.logInfo.cieMembers;
        const logInfo = this.state.logInfo;

        return(
            <ThemeProvider theme={this.theme}>
                {
                    this.state.logInfo
                    ?
                    <div>
                        <AppBar/>
                        <Container>
                            <Header navigation = {navigation}/>
                            {
                                navigation === 1
                                ?
                                <InspektList
                                    inspektList = {inspektList}
                                    cieMembers = {cieMembers} 
                                    logInfo={logInfo}
                                    setStateFromChild={this.setStateFromChild}
                                />
                                :
                                (
                                    navigation === 0
                                    ?<NewExpertise
                                        setStateFromChild={this.setStateFromChild}
                                        logInfo={logInfo}/>
                                    :null
                                )
                            }
                        </Container>
                        <BottomTabNavigator setNavigation = {this.setNavigation}/>
                    </div>
                :
                <Login
                    setStateFromChild={this.setStateFromChild}
                    getInspekts = {this.getInspekts}
                    getQots = {this.getQots}/>
                }
                
            </ThemeProvider>
            
        )
    }

}

export default Home;