import React, {  useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { FAB, Icon, useTheme, Text } from 'react-native-paper';
import { NetInfoContext } from '../../../context/NetInfoContext';
import { exampleListRNStyle } from './style/exampleListRNStyle';
import { IUserProfile } from '../../../../shared/modules/userProfile/userProfileSch';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IExampleList {
	navigation: NativeStackNavigationProp<any>;
	user: IUserProfile;
}

export const ExampleList = (props: IExampleList) => {
	const { navigation } = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = exampleListRNStyle(colors);
	const isInternetConnected = useContext(NetInfoContext);

	return (
		<View style={styles.container}>
			<View style={{padding: 20}}>
				<Text variant='headlineSmall'> Lista de Exemplos</Text>
			</View>
			<ScrollView style={{ flex: 1}}>
			</ScrollView>
			<FAB
				icon={() => <Icon source='plus' size={24} color={colors.branco}/>}
				style={styles.fab}
				onPress={() => navigation.navigate('ExampleCreate', { screenState: 'create' })}
			/>
		</View>
	);
};
