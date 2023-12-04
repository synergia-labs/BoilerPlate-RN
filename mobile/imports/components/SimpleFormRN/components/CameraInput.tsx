import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, StatusBar, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { Camera, useCameraDevices, TakePhotoOptions } from 'react-native-vision-camera';
import { theme } from '../../../paper/themeRN';
import { styles } from './CameraInputStyles';

interface ICameraInput {
	doc: { [key: string]: any };
	handleCloseModal: () => void;
	onChange: (str: string) => void;
	getDimensions: () => number[];
}

export const CameraInput = (props: ICameraInput) => {
	const { handleCloseModal, onChange, getDimensions } = props;
	const [cameraAtiva, setCameraAtiva] = useState(true);
	const [desativarBotaoFoto, setDesativarBotaoFoto] = useState(false);

	const deviceDimensions = getDimensions();

	const photoConfig: TakePhotoOptions = {
		qualityPrioritization: 'balanced',
		flash: 'auto'
	};

	useEffect(() => {
		requestCameraPermission();
	}, []);

	//handlers
	const requestCameraPermission = useCallback(async () => {
		const permissao = await Camera.requestCameraPermission();
		if (permissao === 'denied') await Linking.openSettings();
	}, []);

	//camera
	const cameraRef = useRef<Camera>(null);
	const devices = useCameraDevices();
	const device = devices.back;

	const takePhoto = useCallback(async () => {
		try {
			if (cameraRef.current == null) throw new Error('Camera não encontrada!');
			const photo = await cameraRef.current.takePhoto(photoConfig);
			return photo;
		} catch (e) {
			console.error('Falha ao tirar foto!', e);
		}
	}, [cameraRef]);

	const handleTirarFoto = async () => {
		setDesativarBotaoFoto(true);
		const pic = await takePhoto();
		if (onChange && pic) {
			onChange && onChange(pic.path);
		}
		// DeviceEventEmitter.emit('event.fotoTirada', pic?.path);
		setCameraAtiva(false);
	};

	const handleCloseCamera = () => {
		setDesativarBotaoFoto(true);
		// DeviceEventEmitter.emit('event.cameraFechada', route.params?.key);
		setCameraAtiva(false);
		//navigation.goBack();
		handleCloseModal();
	};

	const capturarImagem = async () => {
		await handleTirarFoto();
		//navigation.goBack();
		handleCloseModal();
	};

	return (
		<View style={{ flex: 1, position: 'absolute' }}>
			<StatusBar hidden />
			{/* Header da camera */}
			<View style={styles.close}>
				<IconButton
					icon={({ size, color }) => <CustomIcon icon={'close'} size={size} color={color} />}
					size={24}
					style={{ backgroundColor: theme.colors.branco }}
					iconColor={theme.colors.verdeVale}
					onPress={handleCloseCamera}
					disabled={desativarBotaoFoto}
				/>
			</View>
			{/* Renderiza a camera */}
			{!device ? (
				<View style={styles.notFound}>
					<Text>{'Dispositivo não encontrado!'}</Text>
				</View>
			) : (
				<View style={{ flex: 1, width: deviceDimensions[0], height: deviceDimensions[1] }}>
					<Camera
						ref={cameraRef}
						style={{ flex: 1, width: deviceDimensions[0], height: deviceDimensions[1] }}
						device={device}
						isActive={cameraAtiva}
						photo={true}
					/>

					<View style={styles.footer}>
						{/* <IconButton
							icon={({ size, color }) => <CustomIcon icon={'camera'} size={size} color={color} />}
							onPress={async () => await capturarImagem()}
							style={styles.fab}
							iconColor={theme.colors.verdeVale}
							size={52}
							disabled={desativarBotaoFoto}
						/> */}
					</View>
				</View>
			)}
		</View>
	);
};
