import { laranjaVale, error, onPrimaryContainer, primaryContainer, orangeContainer, errorContainer } from './styles';

export const getSeveridadeDetail = (severidade) => {
	if (severidade === 1) {
		return {
			label: 'Baixo',
			color: onPrimaryContainer,
			backgroundColor: primaryContainer,
			colorName: 'Verde'
		};
	} else if (severidade === 2 || severidade === 3) {
		return {
			label: 'Médio',
			color: laranjaVale,
			backgroundColor: orangeContainer,
			colorName: 'Laranja'
		};
	} else if (severidade === 4 || severidade === 5) {
		return {
			label: 'Alto',
			color: error,
			backgroundColor: errorContainer,
			colorName: 'Vermelho'
		};
	} else {
		return {
			label: 'Indefinido',
			color: '#013fb3',
			backgroundColor: '#013fb355',
			colorName: 'Azul'
		};
	}
};
