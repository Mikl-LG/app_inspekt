import React,{Component} from 'react';

import AppBar from './components/appBar.js';
import BottomTabNavigator from './components/bottomTabNavigator.js';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

class Home extends Component{

    constructor(props){
        super(props);
        this.state={};
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

    render(){

        return(
            <ThemeProvider theme={this.theme}>
                <AppBar/>
                <BottomTabNavigator/>
            </ThemeProvider>
            
        )
    }

}

export default Home;