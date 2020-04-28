import React,{Component} from 'react';

import axios from 'axios';

import AppBar from './components/appBar.js';
import BottomTabNavigator from './components/bottomTabNavigator.js';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Header from './components/header';
import token from './constants/token';
import InspektList from './components/inspektList';

class Home extends Component{

    constructor(props){
        super(props);
        this.state={navigation:0};
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

    componentDidUpdate(){
        console.log('state updated : ',this.state);
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
                <AppBar/>
                <Container>
                    <Header navigation = {navigation}/>
                    {
                        navigation === 1
                        ?
                        <InspektList
                            inspektList = {inspektList}
                        />
                        :null
                    }
                </Container>
                <BottomTabNavigator setNavigation = {this.setNavigation}/>
            </ThemeProvider>
            
        )
    }

}

export default Home;