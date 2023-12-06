import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAsyncStorageUser, UserContext } from '../../context/UserContext';
import { USER_ASYNC_COLLECTION } from '../../config/storageConfig';
import { AppNavigation } from '../../navigation/appNavigation';
import { IMeteorError } from '../../../shared/typings/IMeteorError';
import Meteor, {getAuthToken, useTracker} from '@meteorrn/core';

const getData = async (callback: any) => {
	try {
		const asyncStorageUser = await AsyncStorage.getItem(USER_ASYNC_COLLECTION);
		!!asyncStorageUser && callback(null, JSON.parse(asyncStorageUser));
	} catch (err) {
		callback(err, null);
	}
};

const clearAll = async (callback: any) => {
	try {
		await AsyncStorage.clear();
		callback(null, null);
	} catch (err) {
		console.log('error.LogoutUser', err);
	}
};


export const AppContainer = (_props: any) => {
	const [user, setUser] = useState<IAsyncStorageUser | null>(null);

	useEffect(() => {
		getData((e: IMeteorError, r: any) => setUser(r));
	}, []);

	const { connected} = Meteor.useTracker(() => {
			const status = Meteor.status();
			return { connected: status.connected };
		},[]);


	useEffect(() => {
		if(connected) {
			Meteor._loadInitialUser().then(r=>{
				if(!Meteor.user()&&user?.authToken) {
					Meteor._loginWithToken(user.authToken);
				}
			})
		}
	}, [connected]);

	return (
		<UserContext.Provider value={{ asyncStorageUser: user, setAsyncStorageUser: setUser }}>
			<AppNavigation
				user={user}
				{..._props}
			/>
		</UserContext.Provider>
	);
};
