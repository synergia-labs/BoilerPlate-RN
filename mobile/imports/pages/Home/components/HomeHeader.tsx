//@ts-ignore
import Meteor from '@meteorrn/core';
import React, { useContext, useState } from 'react';
import { StatusBar, View, useColorScheme } from 'react-native';
import { Avatar, Button, Divider, Icon, Menu, Provider, Text, useTheme } from 'react-native-paper';
import { homeHeaderStyle } from './HomeHeaderStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext, IUserContext } from '../../../context/UserContext';
import { theme } from '../../../paper/themeRN';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { IAsyncStorageUser } from '../../../context/UserContext';
import { getVersion } from 'react-native-device-info';

interface IHomeHeader {
	user: IAsyncStorageUser | null;
}

export const HomeHeader = (props: IHomeHeader) => {
	const { user  } = props;
	const { setAsyncStorageUser } = useContext(UserContext) as IUserContext;
	const [visible, setVisible] = React.useState(false);

	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = homeHeaderStyle(colors);
	const colorScheme = useColorScheme();

	const nomes = user?.nome?.split(' ');
	const iniciais = nomes ? (nomes.length === 1 ? nomes[0].substring(0, 2) : nomes[0][0] + nomes[1][0]) : '-';

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);
	const clearAll = async () => {
		try {
			await AsyncStorage.clear();
			setAsyncStorageUser(null);
		} catch (err) {
			console.log('error', err);
		}
	};

	const handleLogout = () => {
		clearAll();
		// Meteor.logout();
	};

	return (
		<>
		<View style={[styles.container]}>
			<StatusBar backgroundColor={colors.background} barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
			<Text variant="titleLarge" style={{textAlign: 'center', flex: 1}}>BoilerPlate-RN</Text>
			<View >
				<Menu
					visible={visible}
					onDismiss={closeMenu}

					anchor={
						<View style={styles.botaoMenu}>
							<TouchableHighlight onPress={openMenu} style={{ borderRadius: 24 }}>
								<Avatar.Text style={styles.avatar} color={theme.colors.secondary} size={36} label={iniciais} />
							</TouchableHighlight>
						</View>
					}
					contentStyle={styles.menuOpcoes}>
					<Menu.Item
						title={
							<View>
								<View>
									<Text variant="bodyLarge">
										{user?.nome}
									</Text>
								</View>
								<View>
									<Text variant="bodyMedium">
										{user?.email}
									</Text>
								</View>
							</View>
						}
						titleStyle={styles.usuario}

					/>

					<Menu.Item
						style={styles.opcaoLogout}
						leadingIcon={(props) => <Icon source={'logout'} size={20} color={theme.colors.vermelho}/>}
						onPress={handleLogout}
						title={
							<Text style={{ color: theme.colors.vermelho }} >
								Sair
							</Text>
						}
						titleStyle={{flex: 1}}
					/>
					<Menu.Item
						style={{ padding: 0, height: 16 }}
						title={
							<Text style={{ color: theme.colors.cinza60 }} variant="bodySmall">
								{' '}
								Versão: {getVersion()}{' '}
							</Text>
						}
					/>
				</Menu>
			</View>
		</View>
		<Divider style={{backgroundColor: colorScheme === 'dark' ? colors.cinza60 : colors.cinza90}}/>
		</>
	);
};
