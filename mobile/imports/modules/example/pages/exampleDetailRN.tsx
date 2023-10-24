import React, { useContext, useEffect, useState } from 'react';
import Meteor from '@meteorrn/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Keyboard, View } from 'react-native';
import { exampleSch, IExample } from '../../../../shared/modules/example/exampleSch';
import { SimpleFormRN_old } from '../../../components/SimpleFormRN/SimpleFormRN_old';
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

interface IExampleDetail {
	user: IUserProfile;
	screenState: string;
	id: string;
	navigation: StackNavigationProp<any>;
}

export const ExampleDetail = (props: IExampleDetail) => {
	const { screenState, id, navigation, user } = props;

	const [exampleDoc, setExampleDoc] = useState<{ [key: string]: any }>({});

	const { address, chip, contacts, files, slider, statusRadio, tasks, typeMulti, ...exampleSchReduzido } = exampleSch;

	const isInternetConnected = useContext(NetInfoContext);

	const loadExemplos = async () => {
		if (screenState !== 'create') {
			if (isInternetConnected) {
				Meteor.call('example.obtemExemplo', id, (e: Meteor.Error, r: IExample) => {
					if (!e) {
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

	const handleSubmit = async (doc: IExample) => {
		const methodName = screenState === 'create' ? 'example.insert' : 'example.update';
		if (isInternetConnected) {
			Meteor.call(methodName, doc, (e: Meteor.Error, r: string) => {
				if (e) {
					console.log(e);
				}
			});
		} else {
			try {
				if (methodName === 'example.insert') {
					await exampleOff.insert(doc);
				} else if (methodName === 'example.update') {
					await exampleOff.update(doc);
				}
			} catch (e) {
				console.log(e);
			}
		}
		Keyboard.dismiss();
		navigation.goBack();
	};

	return (
		<View style={exampleDetailRNStyle.container}>
			<SimpleFormRN_old
				screenState={screenState}
				doc={exampleDoc}
				setDoc={setExampleDoc}
				schema={exampleSchReduzido}
				onSubmit={handleSubmit}>
				<View style={exampleDetailRNStyle.primeiroForm}>
					<TextInputSF name="title" key="title" style={exampleDetailRNStyle.input} />
					<TextInputSF
						name="description"
						key="description"
						mask={Masks.BRL_CURRENCY}
						style={exampleDetailRNStyle.input}
					/>
					{/* <AudioRecorderSF name="audio" key="audio" /> */}
					<CameraSF name="image" key="image" />
					<CheckBoxSF name="check" key="check" />
					<SwitchSF name="statusToggle" key="statusToggle" />
					<SelectInputSF name="type" key="type" />
					<DateTimePickerSF name="date" key="date" />
				</View>
			</SimpleFormRN_old>
		</View>
	);
};
