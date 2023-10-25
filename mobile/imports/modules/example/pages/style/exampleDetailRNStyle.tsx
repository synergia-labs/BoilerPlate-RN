import { StyleSheet } from 'react-native';
import { theme } from '../../../../paper/themeRN';

export const exampleDetailRNStyle =(colors: any) => StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: colors.background,
	},
	input: {
		// alignItems: 'center',
		// justifyContent: "space-between",
		width: '100%',
		// borderColor: theme.colors.secondary,
		backgroundColor: 'transparent'
		// borderWidth: 1
	},
	primeiroForm: {
		alignContent: 'space-between',
		width: '100%',
		paddingBottom: 15
	},

	audioEVideo: {
		flexWrap: 'wrap',
		alignItems: 'center',
		flexDirection: 'row',
		paddingTop: 10
	}
});
