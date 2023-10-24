import Meteor from '@meteorrn/core';
import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Keyboard, ScrollView, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { CardExemplo } from '../components/CardExemplo';
import { IExample } from '../../../../shared/modules/example/exampleSch';
import { IMeteorError } from '../../../../shared/typings/IMeteorError';
import { StackNavigationProp } from '@react-navigation/stack';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../generalComponents/GeneralComponents';
import { NetInfoContext } from '../../../context/NetInfoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exampleOff } from '../api/exampleOff';
import { exampleListRNStyle } from './style/exampleListRNStyle';

interface IExampleList {
	navigation: StackNavigationProp<any>;
}

export const ExampleList = (props: IExampleList) => {
	const { navigation } = props;



	const { showSnackBar, showDialog } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

	const isInternetConnected = useContext(NetInfoContext);



	return (
		<View>
			<ScrollView style={{ minHeight: '100%' }}>

			</ScrollView>
			<FAB
				elevation={5}
				icon="plus"
				style={exampleListRNStyle.fab}
				onPress={() => navigation.navigate('ExampleCreate', { screenState: 'create' })}
			/>
		</View>
	);
};
