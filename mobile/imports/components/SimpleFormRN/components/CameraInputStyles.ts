import { StyleSheet } from 'react-native';

export const cameraInputStyles = (colors: any) => StyleSheet.create({
	footer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		alignItems: 'center',
		flex: 1
	},
	close: {
		position: 'absolute',
		alignSelf: 'flex-end',
		zIndex: 1,
		padding: 20
	},
	fab: {
		borderRadius: 100,
		backgroundColor: 'white',
		alignItems: 'center',
		marginBottom: 20
	},
	upload: {
		borderRadius: 10,
		backgroundColor: 'white',
		position: 'absolute',
		top: 15,
		right: 15
	},
	cameraRoll: {
		borderRadius: 10,
		backgroundColor: 'white',
		position: 'absolute',
		borderWidth: 13,
		top: 15,
		left: 15
	},
	notFound: {
		flex: 1,
		top: 60,
		height: '100%',
		alignItems: 'center',
		backgroundColor: 'black'
	}
});
