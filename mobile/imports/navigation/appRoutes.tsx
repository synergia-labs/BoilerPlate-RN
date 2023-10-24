import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { IUserProfile } from '../../shared/modules/userProfile/userProfileSch';
import { Route } from '@react-navigation/native';

import Modules from '../modules/index';

interface IAppProps {
	user: IUserProfile;
}

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = (appProps: IAppProps) => {
	const modulesRoutes = Modules.getAppMenuItemList();
	const initialRoute = modulesRoutes[0];
	// console.log('Navigator Render');
	return (
		<Navigator initialRouteName={initialRoute.navigatorName} screenOptions={{ headerShown: false }}>
			{Modules.getListOfRouterModules().map((routerData) => {
				const ScreenComponent = routerData.component;
				return (
					<Screen
						key={routerData.name}
						name={routerData.name}
						options={{ title: routerData.title, headerStyle: routerData.headerStyle }}>
						{(props) => <ScreenComponent {...appProps} {...props} />}
					</Screen>
				);
			})}
		</Navigator>
	);
};

interface INavigatorProps {
	user: IUserProfile;
	route: Route<any>;
	navigation: StackNavigationProp<any>;
}
