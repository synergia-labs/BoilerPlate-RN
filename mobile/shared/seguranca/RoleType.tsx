type LabelValue = {
	value: string | number;
	label: string;
};

export enum RoleType {
	ADMINISTRADOR = 'Administrador',

}

type IRolesDicionario = {
	[key: string]: string;
};

export const rolesDicionario: IRolesDicionario = {
	[RoleType.ADMINISTRADOR]: 'Administrador',
};

export function obterListaRoles(): LabelValue[] {
	// @ts-ignore
	return Object.keys(rolesDicionario)
		.filter((chave) => !!rolesDicionario[chave])
		.map((chave) => ({
			value: chave,
			label: rolesDicionario[chave]
		}));
}
