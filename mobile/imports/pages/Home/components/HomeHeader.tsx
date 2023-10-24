//@ts-ignore
import Meteor from '@meteorrn/core';
import React, { useContext, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { Avatar, Button, Divider, Icon, Menu, Provider, Text } from 'react-native-paper';
import { homeHeaderStyle } from './HomeHeaderStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext, IUserContext } from '../../../context/UserContext';
import { theme } from '../../../paper/themeRN';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { IAsyncStorageUser } from '../../../context/UserContext';
import { getVersion } from 'react-native-device-info';
import { Logo32SVG } from '../../../../public/images/components/Logo32SVG';

interface IHomeHeader {
	user: IAsyncStorageUser;
	sincronizando: boolean;
	handleShowBluetooth: any;
}

export const HomeHeader = (props: IHomeHeader) => {
	const { user, sincronizando, handleShowBluetooth } = props;
	const { setAsyncStorageUser } = useContext(UserContext) as IUserContext;
	const [visible, setVisible] = React.useState(false);

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
		<View style={[homeHeaderStyle.container]}>
			<Text style={homeHeaderStyle.titulo} variant="headlineSmall">
				<Logo32SVG />
			</Text>
			<Button onPress={handleShowBluetooth}>ZoombeeSIA</Button>
			<View style={homeHeaderStyle.menu}>
				<Menu
					visible={visible}
					onDismiss={closeMenu}
					anchor={
						<View style={homeHeaderStyle.botaoMenu}>
							<TouchableHighlight onPress={openMenu} style={{ borderRadius: 24 }}>
								<Avatar.Text style={homeHeaderStyle.avatar} color={theme.colors.primary} size={36} label={iniciais} />
							</TouchableHighlight>
						</View>
					}
					contentStyle={homeHeaderStyle.menuOpcoes}>
					<Menu.Item
						title={
							<Text style={{ color: theme.colors.onPrimaryContainer }} variant="titleLarge">
								{user?.nome}
							</Text>
						}
						titleStyle={homeHeaderStyle.usuario}
					/>
					<Menu.Item
						title={
							<Text style={{ color: theme.colors.onBackground }} variant="bodyLarge">
								{user?.empresa}
							</Text>
						}
						titleStyle={homeHeaderStyle.matricula}
					/>
					<Divider style={{ marginTop: -25 }} />
					{/*<Menu.Item
						style={homeHeaderStyle.opcaoTrocaSenha}
						leadingIcon={(props) => <Icon name="vpn-key" color={theme.colors.primary} size={24} />}
						onPress={() => {}}
						title={
							<Text style={{ color: theme.colors.primary }} variant="labelLarge">
								Trocar senha
							</Text>
						}
						titleStyle={homeHeaderStyle.itemMenu}
					/>*/}
					<Menu.Item
						style={homeHeaderStyle.opcaoLogout}
						leadingIcon={(props) => <Icon source={'logout'} size={24} color={theme.colors.primary}/>}
						onPress={handleLogout}
						title={
							<Text style={{ color: theme.colors.primary }} variant="labelLarge">
								Sair
							</Text>
						}
						titleStyle={homeHeaderStyle.itemMenu}
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
	);
};
