import React, { useEffect, useState } from 'react';
import { IconButton, Text } from 'react-native-paper';
import { ISFComponent } from '../ISFComponent';
import { DeviceEventEmitter, Image, View } from 'react-native';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface ICameraSF extends ISFComponent {
	onChange?: (base64String: string) => void;
	value?: string;
	icon?: string;
}

export const CameraSF = (props: ICameraSF) => {
	const { name, label, disabled, screenState, onChange, value, icon, ...otherProps } = props;

	const navigation: StackNavigationProp<any> = useNavigation();

	DeviceEventEmitter.addListener('event.fotoTirada', (eventData) => {
		getImageBase64(eventData);
	});

	useEffect(() => {
		return () => DeviceEventEmitter.removeAllListeners('event.fotoTirada');
	}, []);

	const getImageBase64 = async (path: string) => {
		try {
			if (!path) throw new Error('Endereço de arquivo inválido!');
			const base64fileString = await RNFS.readFile(path, 'base64');
			onChange && onChange('data:image/png;base64,' + base64fileString);
		} catch (e) {
			console.log('erro', e);
		}
	};

	return (
		<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
			<Text>{label}</Text>
			{!disabled && (
				<IconButton
					icon={icon ?? 'camera'}
					size={40}
					onPress={() => {
						navigation.navigate('Camera', {});
					}}
				/>
			)}
			{value && (
				<Image
					style={{
						width: 51,
						height: 51,
						resizeMode: 'contain'
					}}
					source={{
						uri: `${value}`
					}}
				/>
			)}
		</View>
	);
};
