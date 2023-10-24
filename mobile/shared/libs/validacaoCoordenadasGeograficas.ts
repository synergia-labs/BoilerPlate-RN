//.
export const validaLatitude = (latitude: string) => {
	const regexLatitude = /^-?(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,7})?$/;

	return regexLatitude.test(latitude);
};

export const validaLongitude = (longitude: string) => {
	const regexLongitude = /^-?(?:[0-9]|[1-9][0-9]|[1][0-7][0-9]|180)(?:\.\d{1,7})?$/;

	return regexLongitude.test(longitude);
};
