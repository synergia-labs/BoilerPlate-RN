import Meteor from '@meteorrn/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_ASYNC_COLLECTION } from '../config/storageConfig';

export const getUser = async () => {
	if (Meteor.isClient && Meteor.status().status !== 'connected') {
		return null;
	}

	const user = Meteor.user();

	try {
		const userAssyncStorage = await AsyncStorage.getItem(USER_ASYNC_COLLECTION);
		if (!userAssyncStorage) {
			return user;
		} else {
			const userJSON = JSON.parse(userAssyncStorage);
			return { ...userJSON };
		}
	} catch (error) {
		console.log('error', error);
	}
};
