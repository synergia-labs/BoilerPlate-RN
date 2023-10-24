import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const bottomTabNavigatorIcon = (name: string) => {
	return ({ focused }: { focused: boolean }) => <Icon name={name} size={25} color={focused ? 'black' : 'gray'} />;
};
