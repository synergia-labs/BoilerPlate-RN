import React, { useContext, useEffect, useRef, useState } from 'react';
import Meteor from '@meteorrn/core';
import { Keyboard, View } from 'react-native';
import { exampleSch, IExample } from '../../../../shared/modules/example/exampleSch';
import { TextInputSF } from '../../../components/SimpleFormRN/components/TextInputSF';
import { CheckBoxSF } from '../../../components/SimpleFormRN/components/CheckBoxSF';
import { SelectInputSF } from '../../../components/SimpleFormRN/components/SelectInputSF';
import { SwitchSF } from '../../../components/SimpleFormRN/components/SwitchSF';
import { exampleDetailRNStyle } from './style/exampleDetailRNStyle';
import { DateTimePickerSF } from '../../../components/SimpleFormRN/components/DateTimePickerSF';
import { Masks } from 'react-native-mask-input';
import { IUserProfile } from '../../../../shared/modules/userProfile/userProfileSch';
import { NetInfoContext } from '../../../context/NetInfoContext';
import { exampleOff } from '../api/exampleOff';
import { CameraSF } from '../../../components/SimpleFormRN/components/CameraSF';
import { HeaderBar } from '../../../components/HeaderBar/HeaderBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import SimpleFormRN from '../../../components/SimpleFormRN/SimpleFormRN';
import { CustomButton } from '../../../paper/components/CustomButton/CustomButton';
import { exampleApiRN } from '../api/exampleApi';
import { SimpleFormRN_old } from '../../../components/SimpleFormRN/SimpleFormRN_old';

interface IExampleDetail {
	user: IUserProfile;
	screenState: string;
	id: string;
	navigation: NativeStackNavigationProp<any>;
}

export const ExampleDetail = (props: IExampleDetail) => {
	const { screenState, id, navigation, user } = props;
	const titulo = screenState === 'edit' ? 'Editar exemplo' : screenState === 'view' ? 'Visualizar exemplo': 'Criar novo exemplo';
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = exampleDetailRNStyle(colors);
	const simpleFormRef = useRef<any>();

	const [exampleDoc, setExampleDoc] = useState<{ [key: string]: any }>({});

	const { address, chip, contacts, files, slider, statusRadio, tasks, typeMulti, audio, check, ...exampleSchReduzido } = exampleSch;

	const isInternetConnected = useContext(NetInfoContext);


	const loadExemplos = async () => {
		if (screenState !== 'create') {
			if (isInternetConnected) {
				Meteor.call('example.obtemExemplo', id, (e: Meteor.Error, r: IExample) => {
					if (!e) {
						console.log(r)
						setExampleDoc(r);
					}
				});
			} else {
				const value = await exampleOff.findById(id);

				value && setExampleDoc(value);
			}
		}
	};



	useEffect(() => {
		loadExemplos();
	}, [screenState]);


	const handleSubmit = (doc: IExample) => {
		const methodName = screenState === 'create' ? 'example.insert' : 'example.update';
		// try {
		// 	if (methodName === 'example.insert') {
		// 		_id = await exampleOff.insert(doc);
		// 	} else if (methodName === 'example.update') {
		// 		_id = await exampleOff.update(doc);
		// 	}
		// } catch (e) {
		// 	console.log(e);
		// }

		// console.log('doc teste',doc)
		if (isInternetConnected) {
			Meteor.call(methodName, doc, (e: Meteor.Error, r: string) => {
				if (e) {
					console.log(e);
				}
			});
		} else {

		}

		Keyboard.dismiss();
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<HeaderBar titulo={titulo} navigation={navigation}/>
			<SimpleFormRN
				mode={screenState}
				doc={exampleDoc}
				setDoc={setExampleDoc}
				schema={exampleSchReduzido}
				onSubmit={handleSubmit}
				>				
					<TextInputSF name="title" key="title"  />
					<TextInputSF
						name="description"
						key="description"
						mask={Masks.BRL_CURRENCY}
						style={styles.input}
					/>				
				{/* <AudioRecorderSF name="audio" key="audio" /> */}
				{/* <CameraSF name="image" key="image" /> */}
				{/* <CheckBoxSF name="check" key="check" /> */}
				<SwitchSF name="statusToggle" key="statusToggle" />
				<SelectInputSF name="type" key="type" />
				<DateTimePickerSF name="date" key="date" />
				<CustomButton text='Salvar'  style={{marginTop: 20}} submit={true}/>
			</SimpleFormRN>
		</View>
	);
};
