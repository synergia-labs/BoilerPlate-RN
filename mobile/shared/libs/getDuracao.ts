export const getDuracao = (dataInicio: Date, dataFim: Date) => {
	const dataInicial = new Date(dataInicio);
	const dataFinal = new Date(dataFim ?? new Date());

	const diff = (dataFinal.getTime() - dataInicial.getTime()) / 1000;
	const horasDiff = Math.abs(Math.floor(diff / 3600));
	const minutosDiff = (diff / 60) % 60;
	const horasStr = horasDiff < 10 ? `0${horasDiff}` : `${horasDiff}`;
	const minutos = Math.abs(Math.floor(minutosDiff));
	const minutosStr = minutos < 10 ? `0${minutos}` : `${minutos}`;

	return `${horasStr}:${minutosStr}`;
};
