import { StyleSheet, View, Text } from 'react-native';
import { Snackbar, IconButton } from 'react-native-paper';
import { theme } from '../paper/themeRN';

export interface ISnackBarRN {
	texto: string;
	visible: boolean;
	onDismiss: () => void;
	duration?: number;
	onPress?: () => void;
	actionLabel?: string;
}

export const SnackBarRN = (props: ISnackBarRN) => {
	const { visible, onDismiss, duration, texto, actionLabel, onPress } = props;

	return (
		<View style={styles.container}>
			<Snackbar
				visible={visible!}
				duration={duration ?? 2000}
				onDismiss={onDismiss}
				action={{
					label: actionLabel ?? '',
					onPress: onPress
				}}
				style={styles.snackbar}
                theme={{ colors: { accent: '#2196F3' } }}
                >
                    <View style={styles.snackbarContentContainer}>
                        <Text style={styles.snackbarContent}>
                            {texto}
                        </Text>
                    </View>
			</Snackbar>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
        height: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        paddingHorizontal: 16,
        marginLeft: -16,
        width: '100%'
    },
    snackbar: {
        backgroundColor: '#333',
        width: '104%',
    },
    snackbarContent: {
        color: '#FFFFFF',
        fontFamily: 'lato',
    },
    snackbarContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        width: '100%'
    },
});
