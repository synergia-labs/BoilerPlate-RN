import { LatLng } from 'react-native-maps';
export interface ICoordenadasWGS8 {
	lngString: string;
	latString: string;
}

export type IPosicaoCaminhamento = [number, number, Date];
export type ITrilhaKML = { points: IPosicaoCaminhamento[]; name: string; description: string };
export type IPontoKML = {
	lat: number;
	lng: number;
	name: string;
	description: string;
	date: Date;
	Empresa?: string;
	'Responsável'?: string;
	Caminhamento?: string;
};

const converteCoordenadaParaWGS84 = (coord: number) => {
	const sinal = coord < 0 ? -1 : 1;
	const coordAbs = Math.abs(Math.round(coord * 1000000));
	const coordDivision = coordAbs / 1000000;
	const coordGraus = Math.floor(coordAbs / 1000000);
	const coordDivisionTimes60 = (coordDivision - Math.floor(coordDivision)) * 60;
	const coordMinutos = Math.floor(coordDivisionTimes60);
	const coordSegundos = (Math.floor((coordDivisionTimes60 - Math.floor(coordDivisionTimes60)) * 100000) * 60) / 100000;
	return `${coordGraus * sinal}°${coordMinutos}\'${coordSegundos.toFixed(1)}"`;
};

const converteWGS84ParaCoordenada = (degrees: string, minutes: string, seconds: string, direction: string) => {
	var dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);

	if (direction == 'S' || direction == 'W') {
		dd = dd * -1;
	}
	return dd;
};

/**
 * @param coords Objeto do tipo LatLng com coordenadas geográficas
 * @returns Objecto com strings formatadas no padrão WGS84, utilizado para coordenadas em GPS
 */
export const latLngParaWGS84 = (coords: LatLng): ICoordenadasWGS8 => {
	const { latitude, longitude } = coords;
	const latDirection = latitude < 0 ? 'S' : 'N';
	const lngDirection = longitude < 0 ? 'W' : 'E';
	const lngString = converteCoordenadaParaWGS84(longitude) + lngDirection;
	const latString = converteCoordenadaParaWGS84(latitude) + latDirection;
	return { latString, lngString };
};

export const WGS84ParaLatLng = (coords: string): any => {
	const latLng = coords.split(/[^\d\w]+/);
	const latDouble = converteWGS84ParaCoordenada(latLng[0], latLng[1], latLng[2], latLng[3]);
	const lngDouble = converteWGS84ParaCoordenada(latLng[4], latLng[5], latLng[6], latLng[7]);

	return [latDouble, lngDouble];
};

export const obtemMarcadorAPartirDeUmPonto = (pontoKML: IPontoKML, imagens, audios) => {
	const { lat, lng, ...others } = pontoKML;
	const marcadorGeoJson = {
		type: 'Feature' as const,
		geometry: {
			type: 'Point' as const,
			coordinates: [lng, lat]
		},
		properties: {
			...others,
			description:
				imagens && imagens.length > 0
					? `<![CDATA[
        ${imagens.map((img) => '<img src="' + img.href + '"> ').join('')}
        ${others.description || ''}
      ]]>`
					: others.description,
			// 'gx_media_links': [
			// 	...(imagens || []).map((item) => item.valorBase64),
			// 	...(audios || []).map((item) => item.valorBase64)
			// ]
			'gx_media_links': [
				...(imagens || []).map((img) => img.href), //.map(img=>`<![CDATA[${img.href}]]>`),
				...(audios || []).map((aud) => aud.href) //.map(aud=>`<![CDATA[${aud.href}]]>`),
			]
		}
	};
	return marcadorGeoJson;
};

export const obtemPolilinhasAPartirDeUmCaminhamento = (trilhaKML: ITrilhaKML) => {
	const { points, ...others } = trilhaKML;
	const trilhaGeoJson = {
		'type': 'Feature' as const,
		'geometry': {
			'type': 'LineString' as const,
			'coordinates': points.map((p) => [p[0], p[1]])
		},
		properties: { ...others }
	};
	return trilhaGeoJson;
};
export const montaMarcadorPosicaoCaminhamento = (posicaoCaminhamento: IPosicaoCaminhamento) => {
	const [longitude, latitude, dataRegistro] = posicaoCaminhamento;
	const marcadorGeoJson = {
		type: 'Feature' as const,
		geometry: {
			type: 'Point' as const,
			coordinates: [longitude, latitude]
		},
		properties: { layerType: 'marker', dataRegistro }
	};
	return marcadorGeoJson;
};

export const validaLatitude = (latitude: string) => {
	const regexLatitude = /^-?(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,7})?$/;
	return regexLatitude.test(latitude);
};

export const validaLongitude = (longitude: string) => {
	const regexLongitude = /^-?(?:[0-9]|[1-9][0-9]|[1][0-7][0-9]|180)(?:\.\d{1,7})?$/;
	return regexLongitude.test(longitude);
};
