export const executeSequentially = async (promises) => {
	for (let promise of promises) {
		try {
			await promise;
		} catch (e) {
			console.log('ERROR executeSequentially', e);
		}
	}
};

export const executeSequentiallyWithHooks = async (promises, onInit, onEnd, onError) => {
	for (let promise of promises) {
		try {
			onInit();
			const result = await promise;
			console.log('result', result);
			onEnd();
		} catch (e) {
			console.log('ERROR - executeSequentiallyWithHooks', e);
			onError(e);
		}
	}
};
