import deviceInfoModule from 'react-native-device-info';

const carregaIdAparelho = async () => {
	const idAparelho = await deviceInfoModule.getAndroidId();
	globalThis.idAparelho = idAparelho;
};

carregaIdAparelho();
