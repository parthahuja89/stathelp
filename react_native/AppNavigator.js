import { createStackNavigator,createAppContainer } from 'react-navigation';
import Home from './Home';
import Utils from './Utils';
import Dist from './Dist';
import Graphing from './Graphing';
const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Utils: {screen: Utils},
    Dist: {screen: Dist},
    Graphing : {screen: Graphing},
    },

    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);


export default createAppContainer(AppNavigator);
