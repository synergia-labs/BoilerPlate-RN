export enum EnumUserPresences {
    ONLINE = 'Online',
    OFFLINE = 'Offline',
}

export enum EnumUserRoles {
    ADMINISTRADOR = 'Administrador',
    USUARIO = 'Usuario',
    // GESTOR = 'gestor',
    // FUNCIONARIO = 'funcionario',
    PUBLICO = 'Publico',
}

export enum EnumUserTypes {
    ADMINISTRADOR = 'administrador',
    CONVIDADO = 'convidado',
}

export const UserTypeDictionary: { [id: string]: string } = {
    [EnumUserTypes.ADMINISTRADOR]: 'Administrador',

};
