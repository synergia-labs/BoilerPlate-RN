import { StyleSheet } from 'react-native';
import { theme } from '../../paper/themeRN';

export const signUpRNStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	inputForm: {
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 5,
		backgroundColor: theme.colors.background,
		width: '100%',
		height: '40%'
	}
});
