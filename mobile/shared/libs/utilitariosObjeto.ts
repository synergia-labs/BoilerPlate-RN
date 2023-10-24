export const filterProperties = (obj: any, propertyNames: string[]): any => {
	const result = {};
	for (const propName of propertyNames) {
		if (obj[propName] !== null && obj[propName] !== undefined) {
			result[propName] = obj[propName];
		}
	}
	return result;
};
