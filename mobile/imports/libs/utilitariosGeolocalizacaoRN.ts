import { NativeModules } from 'react-native';
import { LatLng } from 'react-native-maps';

export interface ILocalizacaoAtual {
	posicaoAtual: LatLng;
}

export const obterUltimaLocalizacaoDispositivo = async () => {
	const { LocationManager } = NativeModules;
	const posicaoJsonString = await LocationManager.retornaUltimaPosicao();
	return { posicaoAtual: !!posicaoJsonString ? { ...JSON.parse(posicaoJsonString) } : {} };
};
