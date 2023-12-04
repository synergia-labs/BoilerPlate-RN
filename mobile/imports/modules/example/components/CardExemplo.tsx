import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableWithoutFeedback, View, useColorScheme } from 'react-native';
import { Avatar, Button, Card, IconButton, Paragraph, Text, Title, useTheme } from 'react-native-paper';
import { IExample } from '../../../../shared/modules/example/exampleSch';
import { cardExemploStyle } from './CardExemploStyle';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ICardExemplo {
	exemplo: IExample;
	handleClick: () => void;
	handleDelete: (id: IExample) => void;
	navigation: NativeStackNavigationProp<any>;
	visibleActions: boolean;
}

export const CardExemplo = (props: ICardExemplo) => {
	const { exemplo, navigation, handleClick, handleDelete, visibleActions } = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = cardExemploStyle(colors);
	const colorScheme = useColorScheme();

	return (
		<TouchableWithoutFeedback onPress={handleClick}>
			<Card style={{backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco ,...styles.container}}>
				<Card.Title
					title={exemplo.title}
					subtitle={exemplo.description}
					left={(props) => <Avatar.Icon {...props} icon="note" />}
				/>
				{visibleActions ? (
					<Card.Actions>
						<IconButton
							icon="pencil"
							style={styles.botoes}
							iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
							onPress={() => navigation.navigate('ExampleDetail', { screenState: 'edit', id: exemplo._id })}/>

						<IconButton 
							icon="delete" 
							style={styles.botoes}
							onPress={() => handleDelete(exemplo)}
							iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}/>
					</Card.Actions>
				) : null}
			</Card>
		</TouchableWithoutFeedback>
	);
};
