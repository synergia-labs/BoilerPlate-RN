import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { Card, Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { ULTIMA_SINCRONIZACAO } from '../../config/storageConfig';
import { NetInfoContext } from '../../context/NetInfoContext';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../generalComponents/GeneralComponents';
import { theme } from '../../paper/themeRN';
import { cardSincronizacaoStyle } from './CardSincronizacaoStyle';
import { exampleOff } from '../../modules/example/api/exampleOff';

interface ICardSincronizacao {
	setSincronizando: React.Dispatch<React.SetStateAction<boolean>>;
	sincronizando: boolean;
	setMsgSincronizacao: Dispatch<SetStateAction<string>>;
}

export const CardSincronizacao = (props: ICardSincronizacao) => {
	const { setMsgSincronizacao, sincronizando, setSincronizando } = props;

	const [dataUltimaSincronizacao, setDataUltimaSincronizacao] = useState<string | null>(null);

	const isInternetConnected = useContext(NetInfoContext);

	const { showSnackBar } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = cardSincronizacaoStyle(colors);
	const colorScheme = useColorScheme();

	useEffect(() => {
		const buscaUltimaSync = async () => {
			const ultimaSync = await AsyncStorage.getItem(ULTIMA_SINCRONIZACAO);
			if (!!ultimaSync) setDataUltimaSincronizacao(ultimaSync);
		};
		buscaUltimaSync();
	}, []);

	const infoCallback = (msg: string) => {
		setMsgSincronizacao(msg);
	};

	const sincronizaDados = async () => {
		setMsgSincronizacao('dados');
		return await exampleOff.sincronizaDadosWeb(infoCallback);
	};

	const handleSincronizacao = async () => {
		setSincronizando(true);
		try {
			const msgRetorno = await exampleOff.sincronizaDadosMobile(infoCallback);
			const dataAtual = new Date();
			const dataString = `${dataAtual.toLocaleDateString('pt-BR')} às ${dataAtual
				.toLocaleTimeString('pt-BR')
				.slice(0, 5)}`;
			await AsyncStorage.setItem(ULTIMA_SINCRONIZACAO, dataString);
			setDataUltimaSincronizacao(dataString);
			showSnackBar({ texto: msgRetorno as string, duration: 2000 });

			await sincronizaDados();
			// await handleCarregarCaminhamentos();
			setSincronizando(false);
		} catch (e: any) {
			console.log(e)
			showSnackBar({ texto: `Erro ao enviar dados para o servidor: ${e.message}.`, duration: 2000 });
			setSincronizando(false);
		}
	};

	const { Content } = Card;

	return (
		<View style={{backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco , ...styles.container}}>
			<View>
				<Text style={styles.textoSync} variant="bodyLarge">
					Sincronização de dados
				</Text>
				<Text variant="bodySmall">Atualizado em: {dataUltimaSincronizacao ? dataUltimaSincronizacao : '-'}</Text>
			</View>
			{isInternetConnected && (
				<IconButton
					icon={({ size, color }) => <Icon source={'sync'} size={size} color={colors.primary} />}
					onPress={handleSincronizacao}
					disabled={sincronizando}
					style={{ marginRight: -8 }}
				/>
			)}
		</View>
	);
};
