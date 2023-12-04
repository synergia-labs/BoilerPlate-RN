import React, { useContext, useEffect, useRef, useState } from 'react';
import { IconButton, Text } from 'react-native-paper';
import { ISFComponent } from '../ISFComponent';
import { PermissionsAndroid, View } from 'react-native';
import { audioRecorderSFStyle } from './AudioRecorderSFStyles';
import { Player, Recorder, RecorderError, PlayerError } from '@react-native-community/audio-toolkit';

import RNFS from 'react-native-fs';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../generalComponents/GeneralComponents';
import { hasValue } from '../../../libs/hasValue';
import { CustomIcon } from '../../../paper/icons/customIcon';
import { theme } from '../../../paper/themeRN';

interface IAudioRecorderSF extends ISFComponent {
	onChange?: (base64String: string) => void;
	onRemove?: () => void;
	value?: string;
}

export const AudioRecorderSF = (props: IAudioRecorderSF) => {
	const { name, label, disabled, recordOnLoading, onChange, value, onRemove, isModalRoute } = props;
	const { showSnackBar } = !isModalRoute ? (useContext(GeneralComponentsContext) as IGeneralComponentsContext) : props;

	const recorderConfig = {
		bitrate: 256000,
		channels: 2,
		sampleRate: 44100,
		quality: 'max',
		format: 'aac',
		encoder: 'aac'
	};

	const basePath = '/data/user/0/com.synergia.zoombee/files/';
	const fileName = name ?? 'AU_0';
	const filePath = basePath + fileName;

	const audioData = useRef({
		tempoTotalEmSegundos: 0,
		timer: null,
		recorder: null
	}).current;

	const initTimer = (onPlay) => {
		audioData.timer && clearInterval(audioData.timer);
		if (audioData.tempoTotalEmSegundos && audioData.tempoTotalEmSegundosOriginal && audioData.tempoTotalEmSegundos < 0)
			audioData.tempoTotalEmSegundos = audioData.tempoTotalEmSegundosOriginal;
		const milisegundos = 1000;
		const increment = onPlay || !!playing ? -1 : 1;
		audioData.timer = setInterval(() => {
			audioData.tempoTotalEmSegundos = audioData.tempoTotalEmSegundos + increment;
			if (audioData.tempoTotalEmSegundos > 0) {
				const minutes = Math.floor(audioData.tempoTotalEmSegundos / 60);
				const seconds = audioData.tempoTotalEmSegundos % 60;

				setDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
			}
		}, milisegundos);
	};

	const [duration, setDuration] = useState<string | undefined>(undefined);
	const [playing, setPlaying] = useState(false);

	const [audioPlayer, setAudioPlayer] = useState<Player | null>(null);

	const [recording, setRecording] = useState(false);

	const handlePlay = () => {
		if (playing) {
			audioPlayer?.pause((err: PlayerError | null, paused: boolean) => {
				setPlaying(false);
				audioData.timer && clearInterval(audioData.timer);
				if (err) showSnackBar({ texto: `Erro ao parar/iniciar playback!: ${err.message}`, duration: 2000 });
			});
		} else if (!!audioPlayer) {
			audioPlayer.on('ended', hnadleStopPlay);
			audioPlayer?.play((err: PlayerError | null, paused: boolean) => {
				setPlaying(true);
				const onPlay = true;
				initTimer(onPlay);
				if (err) showSnackBar({ texto: `Erro ao parar/iniciar playback!: ${err.message}`, duration: 2000 });
			});
		}
	};
	const hnadleStopPlay = () => {
		if (audioPlayer) {
			if (audioData.tempoTotalEmSegundosOriginal > 0) {
				const minutes = Math.floor(audioData.tempoTotalEmSegundosOriginal / 60);
				const seconds = audioData.tempoTotalEmSegundosOriginal % 60;

				setDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
			}
		}
		setPlaying(false);
		audioData.timer && clearInterval(audioData.timer);
	};
	const hnadleStopRecorder = () => {
		setRecording(false);
		audioData.tempoTotalEmSegundosOriginal = duration + 0;
		audioData.timer && clearInterval(audioData.timer);
	};

	useEffect(() => {
		return () => {
			audioData.timer && clearInterval(audioData.timer);
			if (recording || playing) {
				handleClickStop();
			}
			// apagar arquivo de audio criado
			// if (!value) return;
			// RNFS.unlink(filePath)
			// 	.then(() => {})
			// 	.catch((e) => console.error('Erro ao apagar arquivo!', e));
		};
	}, []);

	useEffect(() => {
		if (audioData.tempoTotalEmSegundos > 0) return;
		if (recordOnLoading) handleClickRecord();
	}, [recordOnLoading]);

	useEffect(() => {
		if (value) {
			const writeAudioFile = async () => {
				const exists = await RNFS.exists(filePath);

				if (!exists) {
					try {
						await RNFS.writeFile(filePath, value, 'base64');
						reloadPlayer();
					} catch (e) {
						showSnackBar({ texto: `Erro ao escrever arquivo de áudio: ${e.message}`, duration: 2000 });
					}
				} else {
					reloadPlayer();
				}
			};
			writeAudioFile();
		} else reloadRecorder();
	}, [value]);

	const reloadRecorder = () => {
		if (audioData.recorder)
			audioData.recorder?.destroy(() => {
				audioData.recorder = new Recorder(fileName, recorderConfig);
			});
		else {
			audioData.recorder = new Recorder(fileName, recorderConfig);
		}
	};

	const getAudioFileBase64 = async () => {
		try {
			const base64fileString = await RNFS.readFile(filePath, 'base64');
			return base64fileString;
		} catch (e) {
			console.error('erro', e);
		}
	};

	const handleClickStop = () => {
		if (recording) {
			audioData.recorder?.stop(async (err: RecorderError | null) => {
				if (!!err) showSnackBar({ texto: `Erro ao parar gravação: ${err.message}`, duration: 2000 });
				else {
					const base64String = await getAudioFileBase64();
					onChange && onChange({ name, target: { value: base64String as string, name } });
					hnadleStopRecorder();
				}

				reloadRecorder();
			});
		} else {
			hnadleStopPlay();
		}
	};

	const reloadPlayer = () => {
		const newPlayer = new Player(fileName, { autoDestroy: false });

		if (audioPlayer) {
			audioPlayer?.destroy(() => {
				setAudioPlayer(newPlayer);
			});
		} else {
			setAudioPlayer(newPlayer);
		}

		newPlayer.prepare((err) => {
			if (err) {
				console.error('Erro na preparação do áudio: ', err.message);
				return;
			}
			audioData.tempoTotalEmSegundos = Math.floor(newPlayer.duration / 1000);
			audioData.tempoTotalEmSegundosOriginal = Math.floor(newPlayer.duration / 1000);
			if (audioData.tempoTotalEmSegundosOriginal > 0) {
				const minutes = Math.floor(audioData.tempoTotalEmSegundosOriginal / 60);
				const seconds = audioData.tempoTotalEmSegundosOriginal % 60;

				setDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
			}
		});
	};

	const requestRecordAudioPermission = async () => {
		try {
			const requisicaoPermissao = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
				title: 'Acesso ao microfone',
				message: 'Zoombee requer sua permissão para acessar o microfone do dispositivo',
				buttonNeutral: 'Pergunte-me depois',
				buttonNegative: 'Cancelar',
				buttonPositive: 'OK'
			});
			return requisicaoPermissao === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			showSnackBar({ texto: `O aplicativo necessita de acesso ao microfone do dispositivo!`, duration: 2000 });
			return false;
		}
	};

	const handleClickRecord = () => {
		requestRecordAudioPermission().then((temPermissao) => {
			if (!temPermissao) return;

			audioData.recorder?.record((err: RecorderError | null) => {
				if (err) {
					showSnackBar({ texto: `Erro na gravação: ${err.message}`, duration: 2000 });
					return;
				}
				setRecording(true);
				initTimer();
			});
		});
	};

	return (
		<View style={{ ...audioRecorderSFStyle.container, ...(onRemove ? {} : { paddingRight: 16 }) }}>
			{!recording ? (
				<IconButton
					icon={({ size, color }) => (
						<CustomIcon icon={hasValue(value) ? (playing ? 'pause' : 'playArrow') : 'mic'} size={size} color={color} />
					)}
					size={24}
					iconColor={theme.colors.primary}
					style={{ margin: -8 }}
					onPress={hasValue(value) ? handlePlay : handleClickRecord}
				/>
			) : (
				<>
					{(playing || recording) && (
						<IconButton
							icon={({ size, color }) => <CustomIcon icon={'stop'} size={size} color={color} />}
							iconColor={theme.colors.primary}
							size={24}
							style={{ margin: -8 }}
							onPress={handleClickStop}
						/>
					)}
					<CustomIcon icon="graphicEq" size={24} color={theme.colors.cinza20} />
				</>
			)}
			<Text variant="bodyLarge" style={{ flex: 1 }}>{recording ? 'Gravando...' : label}</Text>
			<Text variant="bodyMedium" style={{ color: theme.colors.cinza50 }}>{duration ? duration : '--:--'}</Text>
			{!recording && onRemove && (
				<IconButton
					icon={({ size, color }) => <CustomIcon icon={'delete'} size={size} color={color} />}
					size={24}
					iconColor={theme.colors.primary}
					style={{ margin: -8 }}
					onPress={onRemove}
				/>
			)}
		</View>
	);
};
