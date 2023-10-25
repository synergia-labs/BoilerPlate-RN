import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import Modules from '../../modules/index';
import { IBottomTabParamList, IHomeParamList } from '../../typings/NavigationTypings';
import { Home } from '../../pages/Home/Home';
import { IUserProfile } from '../../../shared/modules/userProfile/userProfileSch';
import { Route } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

const BottomTab = createMaterialBottomTabNavigator<IBottomTabParamList>();

interface INavigatorProps {
	user: IUserProfile;
	route: Route<any>;
	navigation: StackNavigationProp<any>;
}

interface IAppProps {
	user: IUserProfile;
}


const varianteSemOutline = (name: string) =>  {
    return name.replace('-outline', '');
};

const bottomTabNavigatorIcon = (name: string, colors: {[key:string]: any}) => {
	const variante = varianteSemOutline(name);
	return ({ focused }: { focused: boolean }) => <Icon name={focused ? variante : name} 
			size={24} color={focused ? colors.iconeNavegacaoAtiva : colors.iconeNavegacaoInativa} />;
};

export const BottomTabNavigator = (appProps: IAppProps) => {
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;

	return (
		<BottomTab.Navigator initialRouteName="Home" activeColor={colors.navegacaoAtiva} inactiveColor={colors.navegacaoInativa} barStyle={{backgroundColor: colors.barraNavegacao }}
		>
			<BottomTab.Screen
				name="HomeScreen"
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: bottomTabNavigatorIcon('home', colors)
				}}>
				{(props) => <HomeNavigator {...props} {...appProps} />}
			</BottomTab.Screen>

			{Modules.getAppMenuItemList().map((menuData) => {
				return (
					<BottomTab.Screen
						key={menuData.navigatorName}
						name={menuData.navigatorName}
						component={getModuleNavigator(menuData.navigatorName)}
						options={{
							tabBarLabel: menuData.name,
							tabBarIcon: bottomTabNavigatorIcon(menuData.icon, colors)
						}}
					/>
				);
			})}
		</BottomTab.Navigator>
	);
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<IHomeParamList>();

const HomeNavigator = (navigatorProps: INavigatorProps) => {
	return (
		<HomeStack.Navigator screenOptions={{ headerShown: false }}>
			<HomeStack.Screen name="Home" options={{ title: 'Seja bem vindo!' }}>
				{(props) => <Home {...props} {...navigatorProps} />}
			</HomeStack.Screen>
		</HomeStack.Navigator>
	);
};

const getModuleNavigator = (navigatorName: string) => {
	const { Navigator, Screen } = createStackNavigator();

	const InitialRouter = Modules.getListOfRouterModules(navigatorName).find((r) => r.isInitialRoute);

	return (...params: Object[]) => {
		return (
			<Navigator
				initialRouteName={InitialRouter ? InitialRouter.name : navigatorName}
				screenOptions={{ headerShown: false }}>
				{Modules.getListOfRouterModules(navigatorName).map((routerData) => {
					const ScreenComponent = routerData.component;
					return (
						<Screen key={routerData.name} name={routerData.name} options={{ title: routerData.title }}>
							{(props) => <ScreenComponent {...params} {...props} />}
						</Screen>
					);
				})}
			</Navigator>
		);
	};
};
