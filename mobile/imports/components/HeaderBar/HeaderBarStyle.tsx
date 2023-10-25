import {StyleSheet} from 'react-native';

export const headerBarStyle = (colors:any) => StyleSheet.create({
  containerTop: {
    flexDirection: 'row',
    backgroundColor: colors.background,    
  },

  boxDescricao: {
    flexDirection:  'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flex: 1,
  },

  titulo: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },

  icone:{
    alignItems: 'center',
  }

});