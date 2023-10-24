import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, Text } from 'react-native-paper';
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

	const { Title, Content, Actions } = Dialog;

	return (
		<View>
			<Portal>
				<Dialog visible={visible} onDismiss={onDismiss} style={{ backgroundColor: '#fff' }}>
					<Title style={{ textAlign: 'center' }}>{textoHeader ?? ''}</Title>
					<Content>
						<Text variant="bodyLarge" style={{ textAlign: 'center' }}>
							{textoCorpo}
						</Text>
					</Content>
					<Actions style={dialogRNStyles.actions}>
						<Button onPress={onDismiss} labelStyle={dialogRNStyles.dismissButton}>
							Não
						</Button>
						<Button onPress={onConfirm} labelStyle={dialogRNStyles.confirmButton}>
							Sim
						</Button>
					</Actions>
				</Dialog>
			</Portal>
		</View>
	);
};
