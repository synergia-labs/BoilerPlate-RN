import Meteor, { useTracker } from '@meteorrn/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { IMeteorError } from '../../../shared/typings/IMeteorError';
import { theme } from '../../paper/themeRN';
import { signUpRNStyle } from './SigUpRNStyle';

interface ISignUpRN {
	navigation: StackNavigationProp<any>;
}

export const SignUpRN = (props: ISignUpRN) => {
	const [credentials, setCredentials] = useState({
		login: '',
		pass: '',
		confirmPass: ''
	});

	const { navigation } = props;

	const { loading } = useTracker(() => {
		const subHandle = Meteor.subscribe('userData');
		return { loading: !subHandle.ready() };
	});

	const handleSubmit = () => {
		const { login, pass, confirmPass } = credentials;
		if (pass !== confirmPass) return;
		const userDoc = { username: login, email: login, password: pass };
		Meteor.call('userprofile.insert', userDoc, (e: IMeteorError, r: any) => {
			// if (!e)
			Meteor.call('verifyUser', login, (_e: IMeteorError, _r: any) => {
				// if (_e){
				navigation.navigate('Tabs');
				// }
			});
		});
	};

	return (
		<View style={signUpRNStyle.container}>
			<View style={signUpRNStyle.inputForm}>
				<TextInput
					value={credentials.login}
					onChangeText={(text) => setCredentials({ ...credentials, login: text })}
					style={{
						width: '100%',
						textAlign: 'center',
						borderColor: theme.colors.secondary,
						backgroundColor: 'transparent',
						borderWidth: 1
					}}
					label="Digite seu email"
				/>
				<TextInput
					value={credentials.pass}
					onChangeText={(text) => setCredentials({ ...credentials, pass: text })}
					style={{
						width: '100%',
						textAlign: 'center',
						borderColor: theme.colors.secondary,
						backgroundColor: 'transparent',
						borderWidth: 1
					}}
					secureTextEntry
					label="Digite sua senha"
				/>
				<TextInput
					value={credentials.confirmPass}
					onChangeText={(text) => setCredentials({ ...credentials, confirmPass: text })}
					style={{
						width: '100%',
						textAlign: 'center',
						borderColor: theme.colors.secondary,
						backgroundColor: 'transparent',
						borderWidth: 1
					}}
					secureTextEntry
					label="Confirme sua senha"
				/>
				<Button
					onPress={handleSubmit}
					mode="contained"
					icon={'account'}
					style={{ width: '50%', alignSelf: 'center' }}
					disabled={
						loading ||
						credentials.pass === '' ||
						(credentials.pass !== '' && credentials.pass !== credentials.confirmPass)
					}>
					Criar conta
				</Button>
			</View>
		</View>
	);
};
