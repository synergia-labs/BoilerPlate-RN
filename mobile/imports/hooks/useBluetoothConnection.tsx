import React, { useEffect, useState } from 'react';
import {
	NativeEventEmitter,
	NativeModules,
	Platform,
	PermissionsAndroid,
	AppState,
	EmitterSubscription
} from 'react-native';

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface IStateConnection {
	scanning: boolean;
	peripherals: Map<any, any>;
	appState: string;
}

type SubOrNull = EmitterSubscription | null;

export const useBluetoothConnection = () => {
	const [isGranted, setIsGranted] = useState<string | null>('');
	const [state, setState] = useState<IStateConnection>({
		scanning: false,
		peripherals: new Map(),
		appState: ''
	});

	let handlerDiscover: SubOrNull = null,
		handlerUpdate: SubOrNull = null,
		handlerStop: SubOrNull = null,
		handlerDisconnect: SubOrNull = null;

	useEffect(() => {
		AppState.addEventListener('change', handleAppStateChange);
		const permission = async () => {
			if (Platform.OS === 'android' && Platform.Version >= 23) {
				try {
					const grantedStatusConnect = await PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
					);
					const grantedStatusScan = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
					const isTypePermission = grantedStatusConnect === grantedStatusScan ? 'granted' : null;
					setIsGranted(isTypePermission);
				} catch (err) {
					console.error(err);
					return false;
				}
			}
		};

		permission();

		BleManager.start({ showAlert: false });
		handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
		handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
		handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
		handlerUpdate = bleManagerEmitter.addListener(
			'BleManagerDidUpdateValueForCharacteristic',
			handleUpdateValueForCharacteristic
		);
		startScan();

		return () => {
			handlerDiscover && handlerDiscover.remove();
			handlerStop && handlerStop.remove();
			handlerDisconnect && handlerDisconnect.remove();
			handlerUpdate && handlerUpdate.remove();
		};
	}, []);

	const startScan = () => {
		if (!state.scanning) {
			BleManager.scan([], 30, true).then((results) => {
				console.log('Scanning...', results);
				setState({ ...state, scanning: true });
			});
		}
	};

	const handleAppStateChange = (nextAppState: string) => {
		if (state.appState.match(/inactive|background/) && nextAppState === 'active') {
			console.log('App has come to the foreground!');
			BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
				console.log('Connected peripherals: ' + peripheralsArray.length);
			});
		}
		setState({ ...state, appState: nextAppState });
	};

	const handleDisconnectedPeripheral = (data: any) => {
		const peripherals = state.peripherals;
		const peripheral = peripherals.get(data.peripheral);
		if (peripheral) {
			peripheral.connected = false;
			peripherals.set(peripheral.id, peripheral);
			setState({ ...state, peripherals });
		}
		console.log('Disconnected from ' + data.peripheral);
	};

	const handleUpdateValueForCharacteristic = (data: any) => {
		console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
	};

	const handleStopScan = () => {
		console.log('Scan is stopped');
		setState({ ...state, scanning: false });
	};

	const retrieveConnected = () => {
		BleManager.getConnectedPeripherals([]).then((results) => {
			if (results.length == 0) {
				console.log('No connected peripherals');
			}
			console.log(results);
			const peripherals = state.peripherals;
			for (let i = 0; i < results.length; i++) {
				let peripheral: any = results[i];
				peripheral.connected = true;
				peripherals.set(peripheral.id, peripheral);
				setState({ ...state, peripherals });
			}
		});
	};

	const handleDiscoverPeripheral = (peripheral: any) => {
		const peripherals = state.peripherals;
		console.log('Got ble peripheral', peripheral);
		if (!peripheral.name) {
			peripheral.name = 'NO NAME';
		}
		peripherals.set(peripheral.id, peripheral);
		setState({ ...state, peripherals });
	};

	return state;
};
