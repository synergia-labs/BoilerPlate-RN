import React from 'react';

// Cria o Context
export const AppContext = React.createContext({
	subscribe: () => {},
	unsubscribe: () => {}
});
