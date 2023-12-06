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
import { IconButton, Text, useTheme } from 'react-native-paper';
import SimpleFormRN from '../../../components/SimpleFormRN/SimpleFormRN';
import { CustomButton } from '../../../paper/components/CustomButton/CustomButton';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../generalComponents/GeneralComponents';
import { CameraInput } from '../../../components/SimpleFormRN/components/CameraInput';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import { nanoid } from 'nanoid';
import shortid from 'shortid';
import { RenderImagens } from '../../../components/RenderizaImagens/RenderImage';
import { ScrollView } from 'react-native-gesture-handler';

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
	
	const { address, chip, contacts, files, slider, statusRadio, tasks, typeMulti, audio, ...exampleSchReduzido } = exampleSch;
	
	const isInternetConnected = useContext(NetInfoContext);
	
	const { showSnackBar, showDialog, showModal, showModalSecondary, getDimensions } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;
	const loadExemplos = async () => {
		if (screenState !== 'create') {
			const value = await exampleOff.findById(id);
			value && setExampleDoc(value);

		//O CODIGO ABAIXO BUSCARIA O DADO DIRETAMENTE NO METEOR EM CASO DE CONEXAO COM A INTERNET
			// if (isInternetConnected) {
			// 	Meteor.call('example.obtemExemplo', id, (e: Meteor.Error, r: IExample) => {
			// 		if (!e) {
			// 			setExampleDoc(r);
			// 		}
			// 	});
			// } else {
			// 	const value = await exampleOff.findById(id);

			// 	value && setExampleDoc(value);
			// }
		}
	};


	const handleTirarFoto = () => {
		const onChange = (imgBase64: string, imgId) => {
			const imageId = `${'imagem' + shortid.generate()}`;
			const nomeArquivoComFormato = `${imageId}.png`;
			const path = RNFS.DocumentDirectoryPath + '/' + nomeArquivoComFormato;
			if (imgBase64.indexOf('base64') === -1) {
				RNFS.moveFile(imgBase64, path);
			} else {
				RNFS.writeFile(path, imgBase64.slice(22), 'base64');
			}

			const newImageDoc = {
				_id: imageId,
				keyName: imageId,
				tipo: 'imagem',
				path: path,
				value: path,
				valorBase64: imgBase64
			};
			exampleDoc.imagens = [...(exampleDoc?.imagens ?? []), newImageDoc];
			exampleDoc.lastUpdate = new Date();
			setExampleDoc({ ...exampleDoc });
		};

		// if (!isModalRoute) {
		showModal({
			isFullScreen: true,
			renderedComponent: (_props: any) => (
				<CameraInput
					handleCloseModal={_props.onDismiss}
					doc={{ ...exampleDoc }}
					onChange={onChange}
					{...{ showSnackBar, showDialog, getDimensions }}
				/>
			)
		});
	};

	const removerRegistroEvento = async (key: string) => {
		const newDoc = { ...exampleDoc };
		newDoc.imagens = (exampleDoc?.imagens ?? []).filter((img) => img._id !== key);
		newDoc.audios = (exampleDoc?.audios ?? []).filter((aud) => aud._id !== key);
		setExampleDoc(newDoc);
		//ToDo Remover Imagens salvas em Disco
	};

	const confirmDeleteRegistro = (key: string) => {
		removerRegistroEvento(key);
		showSnackBar({ texto: 'O registro foi removido com sucesso!', duration: 2000 });
	};

	const handleDeleteRegistro = (key: string, message: string) => {
		showDialog({
			textoCorpo: message,
			onConfirm: () => confirmDeleteRegistro(key)
		});
	};

	useEffect(() => {
		loadExemplos();
	}, [screenState]);


	const handleSubmit = async (doc: IExample) => {
		const methodName = screenState === 'create' ? 'example.insert' : 'example.update';
		if (!simpleFormRef) return;

		const newDoc = {
			...(doc || {}),
			...(simpleFormRef.current?.getDoc() || {}),
		};
		try {
			if (methodName === 'example.insert') {
				await exampleOff.insert(newDoc);
			} else if (methodName === 'example.update') {
				await exampleOff.update(newDoc);
			}
		} catch (e) {
			console.log(e);
		}

		//O CODIGO ABAIXO SALVARIA O DADO DIRETAMENTE NO METEOR EM CASO DE CONEXAO COM A INTERNET
		// if (isInternetConnected) {
		// 	Meteor.call(methodName, newDoc, (e: Meteor.Error, r: string) => {
		// 		if (e) {
		// 			console.log(e);
		// 		}
		// 	});
		// } else {

		// }

		Keyboard.dismiss();
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<HeaderBar titulo={titulo} navigation={navigation}/>
			<SimpleFormRN
				ref={simpleFormRef}
				key={exampleDoc ? 'Form_' + exampleDoc._id : 'NewForm'}
				mode={screenState}
				doc={exampleDoc}
				schema={exampleSchReduzido}>			
				<ScrollView>
					<TextInputSF name="title" key="title"  />
					<TextInputSF
						name="description"
						key="description"
						mask={Masks.BRL_CURRENCY}
					/>				
				{/* <AudioRecorderSF name="audio" key="audio" /> */}
				<IconButton name="image" key="image" onPress={handleTirarFoto} icon={'camera'}/>
				<View style={styles.renderImagem}>
					{exampleDoc && exampleDoc.imagens && exampleDoc.imagens.length > 0 ? (
						<RenderImagens
							key={'ListaImagens'}
							registrosEvento={exampleDoc && exampleDoc.imagens ? exampleDoc.imagens : []}
							handleDeleteRegistro={handleDeleteRegistro}
							screenState={screenState}
						/>
					) : (
						<View style={styles.emptyState}>
							<Text variant="bodyMedium" style={styles.textoEmptyState}>
								Nenhuma imagem registrada
							</Text>
						</View>
					)}
				</View>
				<CheckBoxSF name="check" key="check" />
				<SwitchSF name="statusToggle" key="statusToggle"/>
				<SelectInputSF name="type" key="type" />
				<DateTimePickerSF name="date" key="date" />
			</ScrollView>	
			</SimpleFormRN>

			
			{	screenState !== 'view' ? (
				<CustomButton text='Salvar'  style={{marginTop: 20}} onPress={() => handleSubmit(exampleDoc)}/>
			) : null}
		</View>
	);
};
