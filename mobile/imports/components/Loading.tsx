import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const Loading = (props: any) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator animating size={'large'} {...props} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
