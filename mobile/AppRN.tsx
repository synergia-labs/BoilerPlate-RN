import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { GeneralComponents } from './imports/generalComponents/GeneralComponents';
import { NetInfoContext } from './imports/context/NetInfoContext';
import NetInfo from '@react-native-community/netinfo';
import { accentColors, temaDark, temaLight, theme } from './imports/paper/themeRN';
import { inicializaRealmGlobal } from './InicializaRealm';
import { AppContainer } from './imports/pages/LandingPages/AppContainer';


export const AppRN = () => {
	const [isInternetConnected, setIsInternetConnected] = useState<boolean | null>(null);
	const colorScheme = useColorScheme();
  
	  const unsubscribe = NetInfo.addEventListener((state) => {
		  if (state.isConnected !== isInternetConnected) {
			  setIsInternetConnected(state.isConnected);
		  }
	  });
  
  
	useEffect(() => {
		  const inicializaRealm = async () => {
			  await inicializaRealmGlobal();
			  // await deletarBancoInteiro();
			  // await deletarBancoInteiroAgressivamente();
		  };
		  inicializaRealm();
	  return () => {
		unsubscribe();
	  }
	  
	  }, []);
  
	const themeDefault = {
	  ...theme,
	  colors: 
		colorScheme === 'dark' ? {...theme.colors, ...accentColors, ...temaDark} : {...theme.colors, ...accentColors , ...temaLight } 
	}


	return (
		<NetInfoContext.Provider value={isInternetConnected}>
		<PaperProvider theme={themeDefault}>
		  <GeneralComponents>
			  <AppContainer/>
		  </GeneralComponents>
	  </PaperProvider>
	</NetInfoContext.Provider>
	);
};
