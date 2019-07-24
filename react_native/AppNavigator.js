import { createStackNavigator,createAppContainer } from 'react-navigation';
import Home from './Home';
import Utils from './Utils';
import Dist from './Dist';
import Graphing from './Graphing';
import BoxPlot from './Graphs/BoxPlot';
import BarChart from './Graphs//BarChart';
import PieChart from './Graphs/PieChart';
import Scatter from './Graphs/Scatter';

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Utils: {screen: Utils},
    Dist: {screen: Dist},
    Graphing : {screen: Graphing},
    //graphs 
    BoxPlot: {screen: BoxPlot},
    PieChart: {screen: PieChart},
    BarChart: {screen: BarChart},
    Scatter: {screen: Scatter},
    },

    {
        initialRouteName: 'Graphing',
        headerMode: 'none'
    }
);


export default createAppContainer(AppNavigator);
