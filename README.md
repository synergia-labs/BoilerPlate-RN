# Projeto Zoombee

O projeto é dividido em duas frentes: versão web e backend, desenvolvidas usando o BoilerPlate padrão do Synergia, implementado com as tecnologias React/TS/Meteor/Mongo. E a versão mobile, que contempla somente implementação frontend, implementada utilizando React Native.

- É necessário gerar um symbolic link da pasta 'web' para a pasta 'mobile/shared'. O Metro (bundler do React Native) não consegue lidar com symlinks. Dessa forma, optamos pela estrutura que mantém os arquivos compartilhados na pasta 'mobile' e obtemos acesso à eles via symlink para uso na pasta 'web'.

```console
ln -s ~/path/to/project/mobile/shared ~/path/to/project/web
```

Se você estiver no linux, uma alternativa é digitar dentro da pasta raiz do projeto:

```console
ln -s $(pwd)/mobile/shared $(pwd)/web
```

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

## Para apagar o banco do Realm

Utilize a função 'deletarBancoInteiro', definida no arquivo 'inicializaRealm.ts'.
