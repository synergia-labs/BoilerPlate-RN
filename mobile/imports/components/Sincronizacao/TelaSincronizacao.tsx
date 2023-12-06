import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../paper/themeRN';
import { telaSincronizacaoStyle } from './TelaSincronizacaoStyle';
import { useTheme } from 'react-native-paper';

interface ITelaSincronizacao {
	msgSincronizacao?: string;
}

export const TelaSincronizacao = (props: ITelaSincronizacao) => {
	const rotateValueHolder = useRef(new Animated.Value(0)).current;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = telaSincronizacaoStyle(colors);
	const colorScheme = useColorScheme();

	const { msgSincronizacao } = props;

	useEffect(() => {
		rotacaoIcone('start');

		return () => rotacaoIcone('stop');
	}, []);

	const rotacaoIcone = (action: 'start' | 'stop') => {
		rotateValueHolder.setValue(0);
		Animated.loop(
			Animated.timing(rotateValueHolder, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true
			})
		)[action]();
	};

	const rotateData = rotateValueHolder.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '-360deg']
	});

	return (
		<View style={{backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco , ...styles.viewTelaSincronizacao}}>
			<Animated.Text
				style={{
					transform: [{ rotate: rotateData }]
				}}>
				<Icon name="sync" size={72} color={colors.accent} style={{}} />
			</Animated.Text>
			<Text style={styles.textSincronizandoDados}>Sincronizando {msgSincronizacao}...</Text>
		</View>
	);
};
