import { createStackNavigator,createAppContainer } from 'react-navigation';
import Home from './Home';
import Utils from './Utils';
import Dist from './Dist';
import Bio from './Distributions/Bionomial';

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Utils: {screen: Utils},
    Dist: {screen: Dist},
    Bionomial: {screen: Bio},
    },

    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);


export default createAppContainer(AppNavigator);
