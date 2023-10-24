// @ts-ignore
import Meteor from '@meteorrn/core';
import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { IMeteorError } from '../../shared/typings/IMeteorError';
import { BaseOfflineRN } from '../api/baseOfflineRN';
import { NetInfoContext } from '../context/NetInfoContext';
import { areObjectsEqual } from '../../shared/libs/areObjectsEqual';

interface Params {
	methodParams?: object;
	realmFilters?: string;
	realmArgs?: any;
}

interface IFetchedData<T> {
	result: T | null;
	loading: boolean;
	error: IMeteorError | string | null;
	reload: () => void;
}

/**
 * @param name API name and method to invoke
 * @param apiOff OfflineRN
 * @param params optional parameters: methodParams, realmFilters, realmArgs
 * @returns  \{result:T | null,  loading: boolean, error: IMeteorError | ErrorOffline | null, reload: function used to fetch the data again }
 */

export const useFetchData = <T,>(name: string, apiOff: BaseOfflineRN<any>, params: Params = {}): IFetchedData<T> => {
	const [result, setResult] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [shouldLoad, setShouldLoad] = useState(false);
	const [error, setError] = useState<IMeteorError | string | null>(null);
	const optionsRef = useRef(params);

	const { methodParams, realmArgs, realmFilters } = params;

	const isInternetConnected = useContext(NetInfoContext);
	const isConnected = Meteor.status().connected;
	const fullConnected = isInternetConnected && isConnected;

	const reload = () => {
		setShouldLoad((s) => !s);
	};

	const thisShouldReload = (param: any, ref: React.MutableRefObject<any>) => {
		if (param && ref.current) {
			let changed = false;
			if (!areObjectsEqual(param, ref.current)) {
				ref.current = param;
				changed = true;
			}
			if (changed) {
				reload();
			}
		}
	};

	const getMethodFetchRealm = async (realmFilters?: string, realmArgs?: any) => {
		if (!!realmFilters && typeof realmFilters === 'string' && !!realmArgs) {
			return await apiOff.find(realmFilters, realmArgs);
		} else {
			return await apiOff.getCollection<T>();
		}
	};

	useEffect(() => {
		if (params && Object.keys(params).length > 0) {
			thisShouldReload(params, optionsRef);
		}
	}, [params]);

	useFocusEffect(
		useCallback(() => {
			reload();
		}, [])
	);

	useEffect(() => {
		if (fullConnected) {
			let wait = false;
			setLoading(true);

			const fetchData = () => {
				Meteor.call(name, methodParams, (e: Meteor.Error, res: T) => {
					if (!e) {
						if (!wait) {
							setResult(res);
							setLoading(false);
						}
					} else {
						if (!wait) {
							setLoading(false);
							setError(e);
						}
					}
				});
			};

			fetchData();

			return () => {
				wait = true;
			};
		} else {
			let wait = false;
			setLoading(true);

			const fetchData = async () => {
				try {
					const data = await getMethodFetchRealm(realmFilters, realmArgs);
					if (!wait) {
						setResult(data as T);
						setLoading(false);
					}
				} catch (e: any) {
					console.error('error: ', e.message);
					if (!wait) {
						setLoading(false);
						setError(e.message);
					}
				}
			};

			fetchData();

			return () => {
				wait = true;
			};
		}
	}, [shouldLoad, fullConnected]);

	return { result, loading, error, reload };
};
