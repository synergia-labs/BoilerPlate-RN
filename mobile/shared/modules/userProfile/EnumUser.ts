export enum EnumUserPresences {
	ONLINE = 'Online',
	OFFLINE = 'Offline'
}

export enum EnumUserRoles {
	ADMINISTRADOR = 'Administrador',
}

export enum EnumUserTypes {
	ADMINISTRADOR = 'administrador',
}

export const UserTypeDictionary: { [id: string]: string } = {
	[EnumUserTypes.ADMINISTRADOR]: 'Administrador',
};

export enum EnumPerfilUsuario {
	ADMINISTRADOR = 'Administrador',
}
