import { View, useColorScheme } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Text, useTheme } from 'react-native-paper';
import { theme } from '../paper/themeRN';
import { dialogRNStyles } from './DialogRNStyle';

export interface IDialogRN {
	visible: boolean;
	textoHeader?: string;
	textoCorpo: string;
	onDismiss: () => void;
	onConfirm?: () => void;
}

export const DialogRN = (props: IDialogRN) => {
	const { visible, onDismiss, textoHeader, textoCorpo, onConfirm } = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = dialogRNStyles(colors);
	const colorScheme = useColorScheme();

	const { Title, Content, Actions } = Dialog;

	return (
		<View>
			<Portal>
				<Dialog visible={visible} onDismiss={onDismiss} style={{ backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco }}>
					<Title style={{ textAlign: 'center' }}>{textoHeader ?? ''}</Title>
					<Content>
						<Text variant="bodyLarge" style={{ textAlign: 'center' }}>
							{textoCorpo}
						</Text>
					</Content>
					<Actions style={styles.actions}>
						<Button onPress={onDismiss} labelStyle={styles.dismissButton}>
							Não
						</Button>
						<Button onPress={onConfirm} labelStyle={styles.confirmButton}>
							Sim
						</Button>
					</Actions>
				</Dialog>
			</Portal>
		</View>
	);
};
