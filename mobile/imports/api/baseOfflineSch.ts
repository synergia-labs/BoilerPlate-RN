export const baseOfflineSch = {
	_id: {
		type: 'string',
		indexed: true
	},
	data: {
		type: 'string'
	},
	sincronizadoEm: {
		type: 'date',
		indexed: true,
		optional: true
	},
};
