import React from 'react';
import { CameraInput } from '../../../components/SimpleFormRN/components/CameraInput';
import { bottomTabNavigatorIcon } from '../../../navigation/BottomTabNavigator/bottonTabNavigatorIconStyle';
import { ExampleContainer } from '../pages/exampleContainerRN';

export const exampleRouterList = [
	{
		navigatorName: 'exampleRoute',
		title: 'Detalhes do Exemplo',
		name: 'ExampleDetail',
		path: 'Example/:screenState/:id',
		component: ExampleContainer,
		isProtected: true
	},
	{
		navigatorName: 'exampleRoute',
		title: 'Novo Exemplo',
		name: 'ExampleCreate',
		path: 'Example/:screenState',
		component: ExampleContainer,
		isProtected: true
	},
	{
		isInitialRoute: true,
		navigatorName: 'exampleRoute',
		title: 'Lista de Exemplos',
		name: 'Example',
		path: 'Example',
		component: ExampleContainer,
		isProtected: true
	},
	{
		navigatorName: 'exampleRoute',
		title: 'Câmera Exemplo',
		name: 'Camera',
		path: 'Example/camera',
		component: CameraInput,
		isProtected: true
	}
];

export const exampleMenuItemList = [
	{
		navigatorName: 'exampleRoute',
		name: 'Exemplo',
		icon: bottomTabNavigatorIcon('folder')
	}
];

export default {
	exampleRouterList,
	exampleMenuItemList
};
