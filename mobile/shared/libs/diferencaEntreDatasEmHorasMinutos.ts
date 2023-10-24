export const diferencaEntreDatasEmHorasMinutos = (dataInicio: Date, dataFim: Date) => {
	const dataInicial = new Date(dataInicio);
	const dataFinal = new Date(dataFim ?? new Date());

	const diff = (dataFinal.getTime() - dataInicial.getTime()) / 1000;
	let horasDiff = Math.abs(Math.floor(diff / 3600));
	let minutosDiff = (diff / 60) % 60;

	const aux = minutosDiff < 10 ? '0' : '';

	if (horasDiff < 10) horasDiff = '0' + horasDiff;

	return `${horasDiff}:${aux}${Math.abs(Math.floor(minutosDiff))}h`;
};
