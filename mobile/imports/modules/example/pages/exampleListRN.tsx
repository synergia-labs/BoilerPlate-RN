import React, {  useCallback, useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FAB, Icon, useTheme, Text } from 'react-native-paper';
import { NetInfoContext } from '../../../context/NetInfoContext';
import { exampleListRNStyle } from './style/exampleListRNStyle';
import { IUserProfile } from '../../../../shared/modules/userProfile/userProfileSch';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IExample } from '../../../../shared/modules/example/exampleSch';
import { IMeteorError } from '../../../../shared/typings/IMeteorError';
import Meteor from '@meteorrn/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exampleOff } from '../api/exampleOff';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../generalComponents/GeneralComponents';
import { CardExemplo } from '../components/CardExemplo';
import { useFocusEffect } from '@react-navigation/native';

interface IExampleList {
	navigation: NativeStackNavigationProp<any>;
	user: IUserProfile;
}

export const ExampleList = (props: IExampleList) => {
	const { navigation } = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = exampleListRNStyle(colors);
	const [exemplos, setExemplos] = useState<IExample[]>([]);
	const [idsRealm, setIdsRealm] = useState<{ [key: string]: any }>({});
	const isInternetConnected = useContext(NetInfoContext);
	const { showSnackBar, showDialog } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;
	
	useFocusEffect(
		useCallback(() => {
			const retornaExemplos = async () => {
				await loadExemplos();
			}
			retornaExemplos();
		}, [])
	);

	const loadExemplos = async () => {
		//O CODIGO ABAIXO BUSCARIA O DADO DIRETAMENTE NO METEOR EM CASO DE CONEXAO COM A INTERNET
		// if (isInternetConnected) {
		// 	Meteor.call('example.obtemExemplos', (e: IMeteorError, r: IExample[]) => {
		// 		if (!e) {
		// 		}
		// 		// console.log('rrr', r)
		// 		setExemplos(r);
		// 	});
		// } 

		const value  = await exampleOff.getCollection<IExample>();
		value && setExemplos(value)
	};

	const confirmDelete = async (doc: IExample) => {
		try {
			await exampleOff.remove(doc);
		} catch (e: any) {
			console.log(e);
		}
		showSnackBar({ texto: 'O exemplo foi removido com sucesso!', duration: 2000 });
		loadExemplos();

		//O CODIGO ABAIXO SALVARIA O DADO DIRETAMENTE NO METEOR EM CASO DE CONEXAO COM A INTERNET
		// if (isInternetConnected) {
		// 	Meteor.call('example.remove', doc, (e: IMeteorError, r: any) => {
		// 		if (e) console.log(e);
		// 		else {
		// 			// snackbar sucesso
		// 			showSnackBar({ texto: 'O exemplo foi removido com sucesso!', duration: 2000 });
		// 			loadExemplos();
		// 		}
		// 	});
		// } else {
		// 	try {
		// 		await exampleOff.remove(doc);
		// 	} catch (e: any) {
		// 		console.log(e);
		// 	}
		// 	showSnackBar({ texto: 'O exemplo foi removido com sucesso!', duration: 2000 });
		// 	loadExemplos();
		// }
	};

	const handleDelete = (doc: IExample) => {
		showDialog({
			textoHeader: 'Excluir exemplo',
			textoCorpo: `Tem certeza que deseja excluir o exemplo ${doc.title}?`,
			onConfirm: () => confirmDelete(doc)
		});
	};

	return (
		<View style={styles.container}>
			<View style={{padding: 20}}>
				<Text variant='headlineSmall'> Lista de Exemplos</Text>
			</View>
			<ScrollView style={{ flex: 1}}>
			{exemplos.length > 0 &&
					exemplos.map((e, i) => (
						<CardExemplo
							key={i}
							exemplo={e}
							visibleActions={isInternetConnected ? true : idsRealm && idsRealm[e._id as string] ? true : false}
							navigation={navigation}
							handleClick={() =>
								navigation.navigate('ExampleDetail', {
									screenState: 'view',
									id: e._id
								})
							}
							handleDelete={handleDelete}
						/>
					))}
			</ScrollView>
			<FAB
				icon={() => <Icon source='plus' size={24} color={colors.branco}/>}
				style={styles.fab}
				onPress={() => navigation.navigate('ExampleCreate', { screenState: 'create' })}
			/>
		</View>
	);
};


