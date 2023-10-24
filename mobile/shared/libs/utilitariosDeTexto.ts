export const normalizarTexto = (texto: string) => {
	return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const validaEmailUser = (email: string) => {
	const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return pattern.test(email);
};
