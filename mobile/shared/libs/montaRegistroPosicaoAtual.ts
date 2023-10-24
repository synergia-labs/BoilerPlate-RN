import { ILocalizacaoAtual, obterUltimaLocalizacaoDispositivo } from '../../imports/libs/utilitariosGeolocalizacaoRN';
import { IPosicaoCaminhamento } from './utilitariosGeograficos';
import { hasValue } from '../../imports/libs/hasValue';

export const montaRegistroPosicaoAtual = async () => {
	const { posicaoAtual } = (await obterUltimaLocalizacaoDispositivo()) as ILocalizacaoAtual;
	return hasValue(posicaoAtual) && posicaoAtual?.longitude !== 0 && posicaoAtual?.latitude !== 0
		? ([posicaoAtual?.longitude, posicaoAtual?.latitude, new Date()] as IPosicaoCaminhamento)
		: null;
};
