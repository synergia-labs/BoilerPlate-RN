import React from 'react';
import example from './example/config'
// import pages from '../ui/config/index';

class Modules {
	modulesRouterList: (any | null)[] = [null];
	modulesAppMenuItemList: (any | null)[] = [null];
	constructor() {
		// Create modules router list
		this.modulesRouterList = [
			...example.exampleRouterList
		];

		// Create modules App Menu Item list
		this.modulesAppMenuItemList = [
			...example.exampleMenuItemList
		];
	}

	/**
	 * Retonar a rota de todos os módulos
	 * registrados na pasta modules
	 * @returns {Array}
	 */
	getListOfRouterModules = (navigatorName) => {
		return navigatorName
			? this.modulesRouterList.filter((r) => r.navigatorName === navigatorName)
			: this.modulesRouterList;
	};

	/**
	 * Retorna todos os items de menu lateral para os módulos
	 * retistrados na pasta modules
	 * @returns {Array}
	 */
	getAppMenuItemList = () => {
		return this.modulesAppMenuItemList;
	};
}

export default new Modules();
