import { createStackNavigator,createAppContainer } from 'react-navigation';
import Home from './Home';
import Utils from './Utils';


const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Utils: {screen: Utils}
    },

    {
        initialRouteName: 'Utils',
        headerMode: 'none'
    }
);


export default createAppContainer(AppNavigator);
