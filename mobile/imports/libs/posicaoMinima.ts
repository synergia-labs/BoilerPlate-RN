import { montaRegistroPosicaoAtual } from '../../shared/libs/montaRegistroPosicaoAtual';
import { NativeModules } from 'react-native';
import { IPosicaoCaminhamento } from '../../shared/libs/utilitariosGeograficos';
import { ErrorOffline } from '../api/errorBaseOfflineRN';

const { LocationManager } = NativeModules;

interface BackgroundDevicePositionState {
	lastPosition: IPosicaoCaminhamento | null;
	isActive: boolean;
}

export class PosicaoMinima {
	lastPosition: IPosicaoCaminhamento | null = null;
	isActive: boolean = false;

	constructor(props?: BackgroundDevicePositionState) {
		this._calcDistance = this._calcDistance.bind(this);
		this._toRadians = this._toRadians.bind(this);
		this._hasMinimumDistance = this._hasMinimumDistance.bind(this);
		this.getPosition = this.getPosition.bind(this);
	}

	_toRadians = (degrees: number) => {
		return (degrees * Math.PI) / 180;
	};

	_calcDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
		// console.log({ lat1, lon1, lat2, lon2 });
		const R = 6371e3; // Raio da Terra em metros
		const aLat1 = this._toRadians(lat1);
		const aLat2 = this._toRadians(lat2);
		const aLonΔ = this._toRadians(lon2 - lon1); // <== Esta linha foi modificada
		const aLatΔ = this._toRadians(lat2 - lat1); // <== Esta linha foi modificada

		const a =
			Math.sin(aLatΔ / 2) * Math.sin(aLatΔ / 2) +
			Math.cos(aLat1) * Math.cos(aLat2) * Math.sin(aLonΔ / 2) * Math.sin(aLonΔ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return R * c;
	};

	_hasMinimumDistance = (position: IPosicaoCaminhamento) => {
		if (!this.lastPosition) {
			this.lastPosition = [...position];
			return true;
		} else {
			const distance = this._calcDistance(this.lastPosition[1], this.lastPosition[0], position[1], position[0]);
			if (distance >= 2) {
				this.lastPosition = [...position] as IPosicaoCaminhamento;
				return true;
			}
			return false;
		}
	};

	getPosition = async (
		caminhamentoId: string,
		callback: (error: any, r: { caminhamentoId: string; position: IPosicaoCaminhamento } | null) => void
	) => {
		const position = await montaRegistroPosicaoAtual();
		// console.log('POSITION', caminhamentoId, position);
		if (position && this._hasMinimumDistance(position as IPosicaoCaminhamento)) {
			if (!!position) {
				callback(null, { caminhamentoId, position });
			} else {
				callback(new ErrorOffline('posicaoMinima.getPosition', 'Posicão atual indisponível!'), null);
			}
		} else {
			!position && callback('Posição não definida', null);
		}
	};
}

export const posicaoMinima = new PosicaoMinima();
