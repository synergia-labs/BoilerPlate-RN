import { StyleSheet } from 'react-native';

export const signInRNStyle = (colors: any) =>
	StyleSheet.create({
		container: {
			flex:1,
			backgroundColor: colors.background,
		},
		scrollContent: { 
			flexGrow: 1,
			justifyContent: 'center',
		},

		imagem: {
			height: 100,
			alignSelf: 'center'
			
		},
		subtitle: {
			textAlign: 'center',
			color: colors.onPrimaryContainer,
			paddingBottom: 24
		},
		formContent: {
			width: '100%',
			height: '50%',
			padding: 30,
			justifyContent: 'center',
		},
		inputContainer: {
			padding: 8
		},

		button: {
			paddingTop: 20,
			alignItems: 'center',
			flex:1,
			justifyContent: 'center',
		},


	});
