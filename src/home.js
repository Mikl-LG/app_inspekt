import React,{Component} from 'react';

import axios from 'axios';

import AppBar from './components/appBar.js';
import BottomTabNavigator from './components/bottomTabNavigator.js';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Header from './components/header';
import InspektList from './views/inspektList';
import Login from './views/login';
import NewExpertise from './views/newExpertise';
import token from './constants/token';

class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            navigation:0,
            //user:'mikl' //RAT : setted for build on home instead of login
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
    });

    getInspekts = async() => {
        try{
            const axiosResponse = await axios({
                method:'get',
                url:'https://inspekt.herokuapp.com/api?request=INSPEKTS&token='+token,
            });
            this.setState({inspektList : axiosResponse.data});

        }catch(error){
            console.log('error getInspekts : ',error);
        };

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

    setUserInState= (user) => {
        this.setState(user);
    }

    componentDidUpdate(){
        console.log('homeState updated : ',this.state);
    }

    async componentDidMount(){
        this.getInspekts();
        this.getQots();
    };

    render(){

        const navigation = this.state.navigation;
        const inspektList = this.state.inspektList;

        return(
            <ThemeProvider theme={this.theme}>
                {
                    this.state.user
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
                                />
                                :
                                (
                                    navigation === 0
                                    ?<NewExpertise/>
                                    :null
                                )
                            }
                        </Container>
                        <BottomTabNavigator setNavigation = {this.setNavigation}/>
                    </div>
                :
                <Login setUserInState={this.setUserInState}/>
                }
                
            </ThemeProvider>
            
        )
    }

}

export default Home;