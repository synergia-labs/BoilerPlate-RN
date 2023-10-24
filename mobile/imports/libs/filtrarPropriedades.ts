export const filtrarPropriedades = (objeto, propriedades) => {
	const novoObjeto = {};

	propriedades.forEach((propriedade) => {
		if (objeto.hasOwnProperty(propriedade)) {
			novoObjeto[propriedade] = objeto[propriedade];
		}
	});

	return novoObjeto;
};
