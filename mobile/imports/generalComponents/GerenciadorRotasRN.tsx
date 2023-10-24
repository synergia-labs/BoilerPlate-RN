import Modules from '../modules/index';
import React, { useState, useRef, createRef, useEffect, useCallback, useContext } from 'react';

export const GerenciadorRotas = (_props) => {
	const [actualRoute, setActualRoute] = React.useState(_props.initialRoute);
	const [componentParams, setComponentParams] = React.useState(_props.params);
	const arrayDeRotas = Modules.getListOfRouterModules(actualRoute.navigatorName);
	const routerData = arrayDeRotas.find((r) => r.name === actualRoute);
	const ComponentToRender = routerData && routerData.component ? routerData.component : null;
	const { screenState } = componentParams ?? { screenState: null };

	if (!ComponentToRender) return null;

	return (
		<ComponentToRender
			{..._props}
			{...componentParams}
			isModalRoute={true}
			caminhamentoId={_props.caminhamentoDoc._id}
			screenState={screenState}
			navigation={{
				navigate: (route, options) => {
					setComponentParams(options.params);
					setActualRoute(route);
				}
			}}
		/>
	);
};
