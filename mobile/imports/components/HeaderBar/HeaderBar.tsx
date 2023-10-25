import { StatusBar, View, useColorScheme } from "react-native"
import { IconButton, Text, useTheme } from "react-native-paper"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext } from "react";
import { NetInfoContext } from "../../context/NetInfoContext";
import { headerBarStyle } from "./HeaderBarStyle";

interface IHeaderBar {
    titulo: string;
    navigation: NativeStackNavigationProp<any>;
    ativarBusca?: boolean;
    onPressBusca?: () => void;
}

export const HeaderBar = (props: IHeaderBar) => {
    const { titulo, navigation, ativarBusca, onPressBusca } = props;

    const temConexao = useContext(NetInfoContext);

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = headerBarStyle(colors);

    const colorScheme = useColorScheme();

    return (
        <>
          <StatusBar backgroundColor={colors.background} barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
          <View style={styles.containerTop}>
              <IconButton
                  accessible={true}
                  accessibilityLabel='Toque para voltar a página'
                  accessibilityRole='button' 
                  icon="arrow-left"
                  size={28}
                  iconColor={colorScheme === 'dark' ? colors.cinza95: colors.preto}
                  onPress={() => navigation?.goBack()}
                />
            <View style={styles.boxDescricao} accessible={true}>
              <View style={styles.titulo}>
                <Text variant="titleLarge" numberOfLines={3} ellipsizeMode="tail"> {titulo}</Text>
              </View>
             {ativarBusca ? (
              <View style={styles.icone}>
                <IconButton icon='magnify' size={28} onPress={onPressBusca} 
                    style={{marginRight: 10}}
                    iconColor={colorScheme === 'dark' ? colors.cinza95: colors.preto}
                    accessible={true}
                    accessibilityLabel='Toque para compartilhar o link'
                    accessibilityRole='button' />
              </View>
            ) : null} 
            </View>
          </View>
        </>
    )
}