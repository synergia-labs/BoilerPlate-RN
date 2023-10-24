import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { BottomTabNavigator } from './BottomTabNavigator/BottomTabNavigator';
import { SignInRN } from '../pages/AuthPages/SignInRN';
import { IRootStackParamList } from '../typings/NavigationTypings';
import { SignUpRN } from '../pages/AuthPages/SignUpRN';
import { IUserProfile } from '../../shared/modules/userProfile/userProfileSch';
import { adaptNavigationTheme } from 'react-native-paper';
import { theme } from '../paper/themeRN';
import { IAsyncStorageUser } from '../context/UserContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

interface IAppNavigation {
	user: IUserProfile | IAsyncStorageUser | null;
}

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
const { DarkTheme } = adaptNavigationTheme({ reactNavigationDark: DefaultTheme });

export const AppNavigation = (props: IAppNavigation) => {
	const { user } = props;
	const colorScheme = useColorScheme();
	if (!user || !user._id) {
		return (
			<NavigationContainer key={'PublicNavigator'} theme={colorScheme === 'dark' ? DarkTheme: LightTheme}>
				<PublicNavigator />
			</NavigationContainer>
		);
	} else {
		return (
			<NavigationContainer key={'PrivateNavigator'} theme={colorScheme === 'dark' ? DarkTheme: LightTheme}>
				<ProtectedNavigator {...props} />
			</NavigationContainer>
		);
	}
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal

const ProtectedNavigator = (props: any) => {
	return <BottomTabNavigator {...props} />;
};

const Stack = createNativeStackNavigator<IRootStackParamList>();
interface IPublicNavigator {
	setUser?: () => void;
}
const PublicNavigator = (props: IPublicNavigator) => {
	const { Navigator, Screen } = Stack;

	return (
		<Navigator>
			<Screen
				name="Login"
				component={SignInRN}
				options={{
					headerShown: false
				}}
			/>
			<Screen
				name="SignUp"
				component={SignUpRN}
				options={{
					title: 'Cadastre-se',
				}}
			/>
		</Navigator>
	);
};
