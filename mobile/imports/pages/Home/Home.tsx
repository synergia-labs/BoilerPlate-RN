//@ts-ignore
import Meteor, { useTracker } from '@meteorrn/core';
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, View } from 'react-native';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import { homeStyle } from './homeStyles';
import { HomeHeader } from './components/HomeHeader';
import { CardSincronizacao } from '../../components/Sincronizacao/CardSincronizacao';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../paper/themeRN';

export const Home = (props: any) => {
	const { user } = props;



	return (
		<View style={homeStyle.container}>
		<HomeHeader user={user} sincronizando={false} handleShowBluetooth={undefined} />
			{/* <HomeHeader />
			<CardSincronizacao /> */}

			<View >

			</View>
		</View>
	);
};
