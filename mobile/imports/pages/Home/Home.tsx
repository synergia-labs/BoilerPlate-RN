//@ts-ignore
import React from 'react';
import { View, useColorScheme } from 'react-native';
import { homeStyle } from './homeStyles';
import { HomeHeader } from './components/HomeHeader';
import { useTheme } from 'react-native-paper';


export const Home = (props: any) => {
	const { user } = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const sytles = homeStyle(colors);

	return (
		<View style={sytles.container}>
			<HomeHeader user={user} />
			<View >

			</View>
		</View>
	);
};
