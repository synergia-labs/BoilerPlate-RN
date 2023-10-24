import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Button, Card, Paragraph, Text, Title } from 'react-native-paper';
import { IExample } from '../../../../shared/modules/example/exampleSch';
import { cardExemploStyle } from './CardExemploStyle';

interface ICardExemplo {
	exemplo: IExample;
	handleClick: () => void;
	handleDelete: (id: IExample) => void;
	navigation: StackNavigationProp<any>;
	visibleActions: boolean;
}

export const CardExemplo = (props: ICardExemplo) => {
	const { exemplo, navigation, handleClick, handleDelete, visibleActions } = props;

	return (
		<TouchableWithoutFeedback onPress={handleClick}>
			<Card style={cardExemploStyle.container} elevation={3}>
				<Card.Title
					title={exemplo.title}
					subtitle={exemplo.description}
					left={(props) => <Avatar.Icon {...props} icon="note" />}
				/>
				{visibleActions ? (
					<Card.Actions>
						<Button
							icon="pencil"
							onPress={() => navigation.navigate('ExampleDetail', { screenState: 'edit', id: exemplo._id })}>
							Editar
						</Button>
						<Button icon="delete" onPress={() => handleDelete(exemplo)}>
							Deletar
						</Button>
					</Card.Actions>
				) : null}
			</Card>
		</TouchableWithoutFeedback>
	);
};
