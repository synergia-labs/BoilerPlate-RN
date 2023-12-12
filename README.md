# BoilerPlate-RN Synergia

O projeto é dividido em duas frentes: versão web e backend, desenvolvidas usando o BoilerPlate padrão do Synergia, implementado com as tecnologias React/TS/Meteor/Mongo. E a versão mobile, que contempla somente implementação frontend, implementada utilizando React Native e banco relacional Realm

- É necessário gerar um symbolic link da pasta 'web' para a pasta 'mobile/shared'. O Metro (bundler do React Native) não consegue lidar com symlinks. Dessa forma, optamos pela estrutura que mantém os arquivos compartilhados na pasta 'mobile' e obtemos acesso à eles via symlink para uso na pasta 'web'.

```console
ln -s ~/path/to/project/mobile/shared ~/path/to/project/web
```

Se você estiver no linux, uma alternativa é digitar dentro da pasta raiz do projeto:

```console
ln -s $(pwd)/mobile/shared $(pwd)/web
```

## Requerimentos necessários
Para executar o projeto é necessário ter instalado:

1. Android Studio
    
    Componentes do SDK-Tools dentro de Android Studio > Android SDK
    * NDK 25.1.X
    * Android SDK Command-line Tools (lastest)
    * CMake 3.22.1
2. Java 17 ou superior
3. Node 


## Para executar o aplicativo

### Na pasta web

```console
    meteor npm install
    meteor
```

### Na pasta mobile

```console
    npm install --save
    npx react-native start
```

No mesmo diretório, em outra guia do terminal execute:

```console
    npx react-native run-android
```


## Sobre a estrutura do projeto


### Suporte

Atualmente o projeto suporta até o SDK 34, Android 14

### Definição de estilos e fonte

Pasta raiz:

```shell
$: mobile/imports/paper
```

Nessa pasta está definido toda a estilização padrão do aplicativo, seja ela com cores, iconografia e estilos de tipografia.

O aplicativo tem suporte ao modo escuro, sendo assim na pasta theme ficam os padrões de cores para o modo dark e light que são passados no arquivo raiz do projeto chamado **AppRN.ts**

Para suportar a variavel theme na qual é salvo o tema do projeto faça:

```typescript
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = nome_da_funcao_Styles(colors);
```

A função **nome_da_funcao_Styles** é definida recebendo o parâmetro colors, que contem todas as cores presentes no arquivo **themeRN.ts** em theme.colors

### Navegação

Pasta raiz:

```shell
$: mobile/imports/navigation
```
A navegação se da pela biblioteca **@react-navigation**, utilizando a estrutura de stack nativa **'@react-navigation/native-stack'**. O uso dessa ao inves de **'@react-navigation/stack'** se dá pois a primeira é implementada com código nativo sem a necessidade de ser transpilado o que a torna mais rápida que a segunda.

Aqui usamos **BottomTabNavigator** um padrão de navegação presente a partir do Material Design 3 (Material You). O arquivo **appNavigation.tsx** possui a estrutura root de navegação do projeto com as stacks pública e privada. Na stack privada, a função BottomTabNavigator é a raiz da estrutura contendo cada tela definida por cada módulo.

Para o uso mobile a navegação acontece em forma de pilha, assim, cada guia aberta é sobreposta a outra existente, por exemplo, a tela inicial do aplicativo é a Home e suponhamos que exista a tela Exemplos, logo ao abrir a tela Exemplos, a stack de navegação é montada de forma que toda estrutura de Exemplos fique no topo da pilha, assim ao ser eliminada, um pop na pilha é feito e retornamos pra tela Home.

### Banco de dados Realm

Por padrão o projeto é utiliza apenas o banco de dados relacional Realm. Os dados são salvos sem a necessidade de conexão com a internet e caso queira é possivel sincronizar para que os dados sejam portados para a web.

Para o uso é necessário habilitar o modulo no seguinte arquivo:

```shell
$: mobile/InicializaRealm.ts
```

O arquivo gestor do banco Realm está em:
```shell
$: mobile/api/baseOfflineSch.ts
```

O schema definido para ele é padrão, contendo os campos _id, data, sincronizadoEm. Todos os dados do objeto ficam salvos no campo data de forma serializada, a própria api trata de converter os dados para o formato json. Além disso data é preenchido exatamente com os mesmos campos definidos no schema Mongo, assim, ao ser convertido em json o objeto é capaz de ser salvo no banco mongo/meteor

Utilize a função 'deletarBancoInteiro', definida no arquivo 'inicializaRealm.ts'.

### Sincronização

O boilerplate possui suporte para sincronização de dados mobile e web mas não possui suporte para sincronizar dados removidos. Os arquivos utilizados ficam dentro da baseOfflineRN.ts, tanto para salvar do mobile > web quanto web > mobile.

### Suporte para câmera

O boilerplate também conta com suporte para fotos, o componente que trata isso está em :
```shell
$: mobile/components/SimpleForm/CameraInput.tsx
```