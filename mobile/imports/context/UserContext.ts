import { createContext, Dispatch, SetStateAction } from 'react';

export interface IAsyncStorageUser {
	_id: string;
	nome: string;
	email: string;
	username: string;
}

export interface IUserContext {
	asyncStorageUser: IAsyncStorageUser | null;
	setAsyncStorageUser: Dispatch<SetStateAction<IAsyncStorageUser | null>>;
}

export const UserContext = createContext<IUserContext | null>({
	asyncStorageUser: null,
	setAsyncStorageUser: () => {}
});
