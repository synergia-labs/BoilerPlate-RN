import { StyleSheet } from 'react-native';

export const exampleListRNStyle = (colors: any) => StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: colors.background,
	},
	fab: {
		position: 'absolute',
		margin: 16,
		left: 0,
		bottom: 0,
		// backgroundColor: colors.branco
	}
});
