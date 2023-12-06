//@ts-ignore
import React, { useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { homeStyle } from './homeStyles';
import { HomeHeader } from './components/HomeHeader';
import { useTheme } from 'react-native-paper';
import { CardSincronizacao } from '../../components/Sincronizacao/CardSincronizacao';
import { TelaSincronizacao } from '../../components/Sincronizacao/TelaSincronizacao';


export const Home = (props: any) => {
	const { user } = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const sytles = homeStyle(colors);

	const [sincronizando, setSincronizando] = useState<boolean>(false);
	const [msgSincronizacao, setMsgSincronizacao] = useState<string>('');

	return (
		<View style={sytles.container}>
			<HomeHeader user={user} />
			{sincronizando ? (
				<TelaSincronizacao msgSincronizacao={msgSincronizacao} />
			): (<CardSincronizacao 
					sincronizando={sincronizando}
					setSincronizando={setSincronizando}
					setMsgSincronizacao={setMsgSincronizacao}/>)}
			
			<View >

			</View>
		</View>
	);
};
