import React, { useEffect, useState } from 'react';
import { Image, View, useColorScheme } from 'react-native';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import { Icon, IconButton, useTheme } from 'react-native-paper';
import { renderImageStyle } from './RenderImageStyle';

const ImagemComBotaoRemoverImagem = ({ handleDeleteRegistro, i, screenState }) => {
    const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = renderImageStyle(colors);
    const colorScheme = useColorScheme();
	const viewKey = `view${i._id}`;
	const imgPath =
		(i.path || i.value).indexOf('base64') === -1 && (i.path || i.value).indexOf('file:') === -1
			? 'file://' + (i.path || i.value)
			: i.path || i.value;
	return (
		<View key={viewKey} style={styles.item}>
			<View style={styles.deleteButtonWrapper}>
                {screenState !== 'view' ? (
                    <IconButton
                        icon={({ size, color }) => <Icon source={'delete'} size={size} color={color} />}
                        iconColor={colors.background}
                        size={18}
                        style={{backgroundColor: colorScheme === 'dark' ? colors.branco: colors.preto,  
                        borderColor: colors.cinza90, ...styles.deleteButton}}
                        onPress={() =>
                            handleDeleteRegistro(
                                i._id as string,
                                `A imagem será excluída permanentemente.\nVocê realmente deseja excluir essa imagem?`
                            )
                        }
                    />
                ): null}
			</View>
			<Image
				key={i._id}
				source={{ uri: imgPath }}
				style={{
					width: 140,
					height: 140,
					borderRadius: 8
				}}
				{...{ name: i._id }}
			/>
		</View>
	);
};

export const RenderImagens = React.memo(({ registrosEvento, handleDeleteRegistro, handlerAudioChange, screenState }) => {
	const imagens = registrosEvento || [];
	const [imgData, setImgData] = useState<any | undefined>(undefined);

    const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = renderImageStyle(colors);

	useEffect(() => {
		if (imagens) {
			const transformImagens = async () => {
				try {
					const result = await RNFS.readDir(RNFS.DocumentDirectoryPath);
					const nomesArquivos: { [key: string]: number } = result.reduce((prev, file) => {
						return file.isFile() ? { ...prev, [file.name]: 1 } : prev;
					}, {});
					const novasImagens = await Promise.all(
						imagens?.map(async (image) => {
							const nomeArquivoComFormato = `${image._id}.png`;
							const path = RNFS.DocumentDirectoryPath + '/' + nomeArquivoComFormato;
							if (!nomesArquivos[nomeArquivoComFormato]) {
								try {
									if (image.valorBase64.indexOf('base64') === -1) {
										await RNFS.moveFile(image.valorBase64, path);
									} else {
										await RNFS.writeFile(path, image.valorBase64.slice(22), 'base64');
									}

									return { ...image, path };
								} catch (error) {
									console.log('Erro ao escrever arquivo: ', error);
								}
							} else {
								return { ...image, path };
							}
						}) ?? []
					);

					setImgData(novasImagens.filter((img) => !!img));
				} catch (e: any) {
					console.log('Erro: ', e);
				}
			};

			transformImagens();
		}
	}, [registrosEvento]);

	if (!imgData) return null;

	if (!!imagens && imagens.length > 0 && imgData) {
		return (
			<View style={{ paddingVertical: 24 }}>
				<View style={styles.grid}>
					{imgData.map((i) => (
						<ImagemComBotaoRemoverImagem key={i._id || i.id} handleDeleteRegistro={handleDeleteRegistro} i={i} screenState={screenState}/>
					))}
				</View>
			</View>
		);
	}
	return null;
});