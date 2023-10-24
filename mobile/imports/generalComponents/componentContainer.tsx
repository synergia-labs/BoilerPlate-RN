import React, { useState, useEffect } from 'react';
import { IAsyncStorageUser } from '../context/UserContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { Loading } from '../components/Loading';
import { useIsFocused } from '@react-navigation/native';

export interface IComponentContainerProps {
	user: IAsyncStorageUser;
	navigation: StackNavigationProp<any>;
}

interface ILoading {
	loading: boolean | null;
}

export const useAsyncMethod = (asyncMethod: any, params: any) => {
	const [state, setState] = useState({ loading: true });

	const callAsyncMethod = async () => {
		try {
			const response = await asyncMethod(params);
			setState({ result: response, loading: false });
		} catch (error) {
			console.error('Erro ao executar o método assíncrono', error);
		}
	};

	useEffect(() => {
		callAsyncMethod();
	}, []);

	return { ...state, callReload: callAsyncMethod };
};

export const ComponentContainer = <T extends IComponentContainerProps>(
	f: (p: IComponentContainerProps) => React.ComponentType<T & ILoading>
) => {
	return <P extends IComponentContainerProps>(Component: React.ComponentType<P>): React.ComponentType<P & ILoading> => {
		return React.memo((containerProps) => {
			const { loading, ...props } = f(containerProps);

			return (
				<>
					<Component {...containerProps} {...((props as P) || {})} />
					{loading && <Loading />}
				</>
			);
		});
	};
};
