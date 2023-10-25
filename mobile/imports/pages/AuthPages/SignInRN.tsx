import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Image,  ScrollView,  StatusBar,  View, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, useTheme } from 'react-native-paper';
import { signInRNStyle } from './SigInRNStyle';
import { IAsyncStorageUser, IUserContext, UserContext } from '../../context/UserContext';
import { USER_ASYNC_COLLECTION } from '../../config/storageConfig';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../generalComponents/GeneralComponents';
import { NetInfoContext } from '../../context/NetInfoContext';


import { TextFieldRN } from '../../paper/components/TextFieldRN/TextFieldRN';
import { nanoid } from 'nanoid'
// @ts-ignore
import Meteor from '@meteorrn/core';
import { userProfileApi } from '../../userprofile/userProfileApi';
import { CustomButton } from '../../paper/components/CustomButton/CustomButton';

type Credentials = {
	email: string;
	password: string;
};

export const SignInRN = () => {
	
	const { setAsyncStorageUser } = useContext(UserContext) as IUserContext;
	const { showSnackBar } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;
	const [credentials, setCredentials] = useState<Credentials>({
		email: '',
		password: ''
	});
	const isInternetConnected = useContext(NetInfoContext);
	
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = signInRNStyle(colors);
	const colorScheme = useColorScheme();
	const signInBackground = colorScheme === 'dark'? require('../../../public/images/lilas_branca_horizontal.png') :require('../../../public/images/lilas_preta_horizontal.png');

	const configuraUsuarioAsyncStorage = async (user: IAsyncStorageUser) => {
		try {
			const userJsonString = JSON.stringify(user);
			await AsyncStorage.clear();
			await AsyncStorage.setItem(USER_ASYNC_COLLECTION, userJsonString);
			const loginToken = Meteor.getAuthToken();
			await AsyncStorage.setItem('loginToken', loginToken);
		} catch (e: any) {
			showSnackBar({ texto: `Erro ao definir dados do usuário: ${e.message}`, duration: 2000 });
		}
	};

	const handleSubmit = async () => {
		const email = (credentials.email || '').trim().toLocaleLowerCase();
		const password = (credentials.password || '').trim();

		const erroFormulario = validaFormulario(email, password);

		if (!!erroFormulario) {
			showSnackBar({ texto: `${erroFormulario}`, duration: 2000 });
			return;
		}

		Meteor.loginWithPassword(email, password, (e:any, r: any) => {
			if (!!e) {
				if (e.error === 403) {
					showSnackBar({ texto: `${'Usuário ou senha inválidos!'}`, duration: 2000 });
				} else if (e.error === 'Usuário inativo') {
					showSnackBar({
						texto: `${'Usuário inativo.'}`,
						duration: 2000
					});
				} else {
					showSnackBar({
						texto: `${'Erro ao tentar fazer login. Verifique sua conexão com a internet!'}`,
						duration: 2000
					});
				}
			} else {
				const user = Meteor.user();
				userProfileApi.callMethod('getDados', email, async (e: any, userData: any) => {
					if (!!e) {
						showSnackBar({
							texto: `${'Erro ao recuperar dados do usuário. Faça contato com o administrador!'}`,
							duration: 2000
						});
					} else {
						const { _id, email, username} = userData;
						const user = { _id, email, username, nome: username };
						console.log(user)
						await configuraUsuarioAsyncStorage(user);
						setAsyncStorageUser(user);
					}
				});

				return;
			}
		});
	};

	const validaFormulario = (email: string, password: string) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const isNomeValido = emailPattern.test(email);

		if (!isNomeValido) {
			return 'Você digitou caracteres inválidos';
		} else if (email.length <= 0 && password.length <= 0) {
			return 'Campos obrigatórios não preenchidos.';
		} else if (email.length <= 0) {
			return 'O campo usuário é obrigatório.';
		} else if (password.length <= 0) {
			return 'O campo password é obrigatório.';
		}
	};

	const disabledSubmit = credentials.email.length <= 0 || credentials.password.length <= 0;

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={colors.background} barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
				<ScrollView contentContainerStyle={styles.scrollContent} >
					<Image source={signInBackground} resizeMode="center" style={styles.imagem}/>
						<View style={styles.formContent}>
							<Text style={styles.subtitle} variant="headlineSmall">
								BoilerPlate-RN
							</Text>
								<View style={styles.inputContainer}>
									<TextFieldRN
										label="Email"
										placeholder="usuario@email.com"
										maxLength={50}
										value={credentials.email /* credentials.login */}
										onChangeText={(text) => setCredentials({ ...credentials, email: text /* login: text */ })}
									/>
								</View>
								<View style={styles.inputContainer}>
									<TextFieldRN
										label="Senha"
										secureTextEntry={true}
										placeholder="******"
										maxLength={50}
										value={credentials.password}
										onChangeText={(text) => setCredentials({ ...credentials, password: text })}
									/>
								</View>
							<View style={styles.button}>
								<CustomButton text={'Entrar'} startIcon='login' disabled={disabledSubmit} onPress={handleSubmit} />
							</View>
						</View>
				</ScrollView>
		</View>
	);
};
