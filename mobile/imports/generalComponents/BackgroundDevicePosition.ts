import BackgroundService from 'react-native-background-actions';
import { montaRegistroPosicaoAtual } from '../../shared/libs/montaRegistroPosicaoAtual';
import { NativeModules } from 'react-native';
import { IPosicaoCaminhamento } from '../../shared/libs/utilitariosGeograficos';
import { ErrorOffline } from '../api/errorBaseOfflineRN';
import { theme } from '../paper/themeRN';

const { LocationManager } = NativeModules;

interface BackgroundDevicePositionState {
	lastPosition: IPosicaoCaminhamento | null;
	isActive: boolean;
}

export class BackgroundDevicePosition {
	lastPosition: IPosicaoCaminhamento | null = null;
	isActive: boolean = false;

	constructor(props?: BackgroundDevicePositionState) {
		this._inicializaServicoGeolocalizacao();
	}

	_inicializaServicoGeolocalizacao = () => {
		LocationManager.inicializaBusca()
			.then((msgRetorno: string) => {
				// aqui a busca pela localização foi iniciada corretamente
			})
			.catch((msgErro: string) => {
				// aqui ocorreu algum erro
			});
	};

	_toRadians = (degrees: number) => {
		return (degrees * Math.PI) / 180;
	};

	_calcDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
		// console.log({ lat1, lon1, lat2, lon2 });
		const R = 6371e3; // Raio da Terra em metros
		const aLat1 = this._toRadians(lat1);
		const aLat2 = this._toRadians(lat2);
		const aLonaLat = this._toRadians(lat2 - lat1);
		const aLonλ = this._toRadians(lon2 - lon1);

		const a =
			Math.sin(aLonaLat / 2) * Math.sin(aLonaLat / 2) +
			Math.cos(aLat1) * Math.cos(aLat2) * Math.sin(aLonλ / 2) * Math.sin(aLonλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return R * c;
	};

	_hasMinimumDistance = (position: IPosicaoCaminhamento) => {
		if (!this.lastPosition) {
			this.lastPosition = [...position];
			return true;
		} else {
			const distance = this._calcDistance(this.lastPosition[1], this.lastPosition[0], position[1], position[0]);
			// console.log('D', distance);
			if (distance >= 2) {
				this.lastPosition = [...position] as IPosicaoCaminhamento;
				return true;
			}
			return false;
		}
	};

	start = async (
		caminhamentoId: string,
		callback: (error: any, r: { caminhamentoId: string; position: IPosicaoCaminhamento } | null) => void
	) => {
		if (this.isActive) return;
		// console.log('CallStart');
		const options = {
			taskName: 'Atualiza Caminhamento',
			taskTitle: 'Atualizando caminhamento',
			taskDesc: 'Atualizando caminhamento com sua posição atual',
			taskIcon: {
				name: 'ic_stat_notification',
				type: 'drawable'
			},
			color: theme.colors.verdeEscuro,
			linkingURI: 'schemaZoombee://chat/jane', // See Deep Linking for more info
			parameters: {
				caminhamentoId,
				delay: 1000
			}
		};

		const pausarExecucaoPorTempoDeterminado = (tempo: number) =>
			new Promise((resolve) => setTimeout(() => resolve(null), tempo));

		const getPosition = async (taskDataArguments: any) => {
			const { caminhamentoId, delay } = taskDataArguments;
			await new Promise(async (resolve) => {
				for (let i = 0; BackgroundService.isRunning(); i++) {
					await pausarExecucaoPorTempoDeterminado(delay);
					try {
						const position = await montaRegistroPosicaoAtual();
						// console.log('getPosition', position);
						if (position && this._hasMinimumDistance(position as IPosicaoCaminhamento)) {
							// 	console.log('Minimum');
							if (!!position) callback(null, { caminhamentoId, position });
							else callback(new ErrorOffline('erro.getPosition', 'Posicão atual indisponível!'), null);
						}
					} catch (e) {
						callback(e, null);
					}
				}
			});
		};

		await BackgroundService.start(getPosition, options);
		this.isActive = true;
	};

	stop = async () => {
		if (!this.isActive) return;
		// console.log('CallStop');
		await BackgroundService.stop();
		this.isActive = false;
	};
}

export const backgroundDevicePosition = new BackgroundDevicePosition();
