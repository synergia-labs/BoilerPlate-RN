# SYNERGIA METEORREACTBASEMUI

## INTRODUÇÃO

O MeteorReactBaseMUI é um boilerplate proposto pela equipe do Synergia para permitir a inialização de um novo produto de forma rápida e madura.
Ele foi projetado para permitir o inicio rápido de um novo produto que utiliza MeteorJS, ReactJS e MongoDB.

Dentre os benefícios de adotá-lo no desenvolvimento de um novo produto nós podemos destacar:

- suporte à prevenção de erros de desenvolvimento através da implementação de classes que encapsulam operações básicas referente à interação cliente-servidor e à comunicação com o banco de dados.

- estruturação do código para ampliar o controle das operações de banco de dados;

- gestão e controle do schema das coleções bem como a validação dos dados a partir de schemas, e;

- SimpleForm - gestão automática de formulaŕios, incluindo a inserçaõ de validações,comportamentos e informações do schema do banco de dados.

- SimpleTable - geração automática de tabelas a partir do schema do banco de dados, apresentando de forma intuitiva e simples as informações contidas no banco.

- UploadFiles - importação de arquivos de vários formatos.

- APIs estruturadas em módulos - padronização e modularização da implementação das funcionalidades do sistema.

- definição de uma estrutura de schemas, layout e rotas, dando maior flexibilidade nas questões de navegação e estilo do produto.

## ESTRUTURA DE PASTA

**MeteorReactBaseMUI**

**.meteor**

Arquivos gerados pelo meteor, informações de versões do meteor e seus pacotes e banco de dados local.

**.modulestemplate**

Módulo de exemplo que contém arquivos básicos a serem utilizados pelo módulo (api e schema), além de componentes que gerenciam as rotas, o contexto da aplicação e como o conteúdo do módulo será exibido.

**client**

Pasta que contém o arquivo da página HTML em que o componente react raiz será montado, bem como os arquivos utilizados na customização do estilo do produto.

**imports**

Pasta que contém os principais arquivos do produto. Esta pasta está organizada com as seguintes pastas:

    api         --> Contém os arquivos/classes bases, que tratam da comunicação com o banco de dados
    libs        --> Bibliotecas auxiliares utilizadas em todo o produto.
    materialui     --> Pasta que contém a configuração do tema e customização de estilo e comportamento dos componentes do material-ui a serem adotados pelo sistema.
    modules     --> Pasta que contém os módulos do sistema, com seus respectivos arquivos-base (api, schema e rotas da aplicação).
    server  --> Pasta que contém a inicialização das API, as configurações de login social, as configurçaões de indexação de banco de dados, o povoamento inicial da aplicação e outras configurçaões como email, política de segurança do browser, etc.
    ui	--> Pastas que agrupa os componentes e páginas da aplicação.
    	components  --> Contém componentes utilizados por toda a aplicação.
    		SimpleForm      --> Pasta com os arquivos do componente SimpleForm.
    		SimpleFormFields --> Pasta com as pastas e arquivos de cada field do simpleform
    		SimpleLabelView --> Pasta com o arquivo do simpleLabewView e seu style.
    		SimpleTable     --> Pasta com o arquivo da tabela e seu style.
    		InterfaceBaseSimpleFormComponent.ts --> Arquivo com a interface do simpleForm
    	config     --> Contém o código referente as rotas da aplicação, com a definição dos componentes a serem acessados e renderizados através dos menus da aplicação
    	layouts     --> Contém o código referente ao layout da apliação a serem utilizados por menus, rotas e navbar da aplicação
    	pages       --> Contém as páginas gerais da aplicação: tela de login, recuperação de senha, etc.
    		DevUtils          --> Página disponível durante o desenvolvimento com utilitários par ao desenvolvedor.
    		EmailVerify       --> Página de verificação de email.
    		EnrollAccount     --> Página de verificação de envio de token e seu style.
    		Home              --> Página home e seu style.
    		NotFound          --> Página quando não encontrar a rota indicada.
    		RecoveryPassword  --> Página de recuperação de senha e seu style.
    		ResetPassword     --> Página de nova senha e seu style.
    		SignIn            --> Página de sign in e seu style.
    		SignOut           --> Página de sign out e seu style.
    		SignUp            --> Página de sign up e seu style.
    		App.tsx           --> Componente principal montado na index.html.
    		AppGeneralComponents.tsx  --> Conjunto de componentes que podem ser acionados a qualquer momento como: caixas de diálogo, telas modais, etc.
    		AppGeneralComponentStyle.tsx  --> Estilo dos componentes gerais.
    	userprofile       --> Pasta que contém o módulo do sistema referente a exibição e edição do perfil de usuário, com seus respectivos arquivos-base (api, schema e rotas do módulo).
    		api                --> Pasta com os arquivos da API do userprofile.
    	    	config             --> Pasta com os arquivos de index, menu e router do userprofile.
    	      	ui                 --> Pasta com as pastas de Detail e List do userprofile e seu container.

**node_modules**

Pasta com as dependencias do produto.

**private**

Arquivos que não estarão disponíveis para os usuários da aplicação diretamente. Por exemplo, nesta pasta está o template do email que é enviado para os usuários.

**public**

Arquivos públicos e disponíveis durante o acesso dos usuários: imagens, fontes, etc.

**server**

Importa o arquivo /import/startup/server/index

**tests**

Realiza testes para identifição das camadas da aplicação sendo utilizadas: cliente ou servidor, e exibe mensagem de alerta de acordo

## PRIMEIROS PASSOS

Para começar a trabalhar com o MeteorReactBaseMUI faça um clone do repositório:

    git clone https://github.com/synergia-labs/MeteorReactBaseMUI.git

Em seguida, instale as dependências:

    meteor npm install

E depois, execute a aplicação:

    meteor

Acesse o sistema através do seu browser no endereço "http://localhost:3000" com as credenciais do administrador do sistema:

    login: admin@mrb.com
    password: admin@mrb.com

**Observação**: os dados do usuário "admin" foram inseridos no banco de dados pelo arquivo "/imports/server/fixtures.ts";

## TRABALHANDO COM MÓDULOS

### Meu primeiro módulo

A forma mais fácil de entender o funcionamento do MeteorReactBaseMUI é criando um novo módulo.

Para isso, iremos utilizar o arquivo "cloneModule.sh" para gerar um novo módulo com base no template existente. No terminal de seu sistema, acesse a pasta de "./modulestemplate" e execute o seguinte o comando:

    .\clonemodule.sh example nome_do_modulo

Desta forma, uma cópia do template de módulo será criado em "/imports/modules" com o nome de **nome_do_modulo** e o próximo passo será personalizar o módulo com campos de formulário.

Neste ponto, iremos utilizar o Dev Utils para gerar os campos de nosso primeiro formulário através do endereço:

    http://localhost:3000/devutils

Neste endereço, há configurações disponíveis para dois módulos:

    1. Example: Com campos no schema que correspondem ao formulário de criação de tarefas, por exemplo: Título, Descrição e Data. (template base sobre o qual o novo módulo foi gerado)
    2. UserProfile: Com campos no schema que correspondem ao perfil do usuário, por exemplo: Email, Foto e Nome de Usuário.

Uma vez escolhidos os campos do módulo desejado, será gerado um trecho de código que informará quais importações serão necessárias para utilização dos componentes correspondentes a estes campos.

Para personalizar os campos do formulário, acesse o arquivo "exampleDetail.ts" dentro do módulo que você gerou (**nome_do_modulo**, para fins de exemplo), cole as importações geradas no ínicio do arquivo e os componentes gerados (</>) dentro do componente de SimpleForm, que será responsável por cadastrar e validar dados utilizando esses novos campos de formulário.

### Entendendo a estrutura de um módulo no MeteorReactBaseMUI

O módulo possui uma estrutura muito semelhante à do MeteorReactBaseMUI. Apresentaremos a seguir a estrutura de pasta e a função de cada arquivo:

    imports
    	modules
    		nome_do_modulo                         --> Nome do módulo/api
    			api                     --> Pasta com os arquivos da api
    				exampleApi.ts           --> Especialização do arquivo /imports/modules/example/api/exampleApi.ts
    				exampleSch.ts           --> Especificação do schema da coleção
    			config                  --> Pasta de agrupa os arquivos de configuração das rotas, menus e toolbars do módulo
    				exampleappmenu.tsx      --> Arquivo de configuração da exibição de itens do módulo no menu da aplicação
    				examplerouters.tsx      --> Arquivo de configuração das rotas do módulo
    				index.tsx               --> Arquivo que exporta as configurações do módulo.
    			ui/pages
    			    exampleContainer.tsx    --> Arquivo de container do módulo.
    			    exampleDetail.tsx       --> Arquivo de detalhamento do módulo.
    			    exampleList.tsx         --> Arquivo de detalhamento em lista do módulo

Para que o módulo funcione não basta que ele seja colocado na pasta módulo, é necessário configurar alguns arquivos que irão reconhecer a existência do módulo e carregar suas informações.

Precisamos fazer as seguintes alterações nos arquivos abaixo:

1. /imports/modules/index.ts --> Inserir a importação das configurações do módulo que você criou para que suas configurações sejam repassadas às variáveis que serão utilizadas pelo componente "App", que carregará as configurações dos menus, as rotas, etc.

Para isso, primeiro importe o arquivo de configuração do seu módulo e, em seguida, adicione-o à rota de páginas e ao menu para que possa ser acessado normalmente como abaixo:

    import nome_do_modulo from './nome_do_modulo/config';

    class Modules {
      constructor() {
        // Create modules router list
        this.modulesRouterList = [
        	(...)
          ...example.exampleRouterList,
        ];

        // Create modules App Menu Item list
        this.modulesAppMenuItemList = [
        	(...)
          ...example.exampleMenuItemList,
        ];
      }
    (...)

2. /imports/server/registerApi.ts --> Deve importar o arquivo "/imports/modules/nome_do_modulo/api/exampleApi.ts" para que os métodos e as publicações do módulo sejam disponibilizados no lado do servidor.

Para isso, importe o arquivo responável pela api de seu módulo como abaixo:

    (...)
    import '../modules/nome_do_modulo/api/exampleApi';
    (...)

**Observação**: quando o módulo é criado através do script, ou mesmo clonado manualmente, é necessário editar os arquivos citados acima pois essa alteração não é feita automaticamente.

### Customizando o módulo criado nos passos anteriores

A seguir, apresentaremos algumas orientações sobre como customizar o modulo "example" que já vem com o boilerplate.

#### Criando novos campos no formulário

As validações de algumas informações referentes aos campos do formulário podem vir do esquema da coleção. Em nosso exemplo o esquema é definido no arquivo '/imports/modules/exmaple/api/exampleSch.ts'.

Ao visualizar o arquivo será exibido o seguinte conteúdo:

    export const exampleSch = {
      image: {
        type: String,
        label: 'Imagem',
        defaultValue: '',
        optional: true,
        isImage: true,
      },
      title: {
        type: String,
        label: 'Título',
        defaultValue: '',
        optional: false,

      },
      description: {
        type: String,
        label: 'Descrição',
        defaultValue: '',
        optional: true,
      },
      type: {
        type: String,
        label: 'Tipo',
        defaultValue: '',
        optional: true,
        options:[
          {value:'normal',label:'Normal'},
          {value:'extra',label:'Extra'},
        ],
      },
      date: {
        type: Date,
        label: 'Data',
        defaultValue: '',
        optional: true,
      },
      files: {
        type: [Object],
        label: 'Arquivos',
        defaultValue: '',
        optional: true,
        isUpload:true,
      },
      chip: {
        type: [String],
        label: 'Chips',
        defaultValue: '',
        optional: true,
      },
      contacts: {
        type: Object,
        label: 'Contatos',
        defaultValue: '',
        optional: false,
        subSchema: {
          phone: {
    	type: String,
    	label: 'Telefone',
    	defaultValue: '',
    	optional: false,
    	mask : '(##) ####-####',
          },
          cpf: {
    	type: String,
    	label: 'CPF',
    	defaultValue: '',
    	optional: false,
    	mask : '###.###.###-##',
          },
        }
      },
      tasks: {
        type: [Object],
        label: 'Tarefas',
        defaultValue: '',
        optional: true,
        subSchema: {
          name: {
    	type: String,
    	label: 'Nome da Tarefa',
    	defaultValue: '',
    	optional: false,
          },
          description: {
    	type: String,
    	label: 'Descrição da Tarefa',
    	defaultValue: '',
    	optional: true,
          },
        }
      },
      audio: {
        type: String,
        label: 'Áudio',
        defaultValue: '',
        optional: true,
        isAudio:true,
      },
      address: {
        type: Object,
        label: 'Localização',
        defaultValue: '',
        isMapLocation:true,
        optional: true,
      },
      statusCheck: {
        type: Object,
        label: 'Status CheckBox',
        defaultValue: '',
        optional: false,
        checksList: ['Todo', 'Doing', 'Done'],
        validate: (value) => {
          const statusTrue = value&&Object.keys(value).filter( status => {
            if(value[status]){
              return status
            }
          })
          return  statusTrue.length <= 1
        }
      },
      statusRadio: {
        type: String,
        label: 'Status RadioButton',
        defaultValue: '',
        optional: false,
        radiosList: ['Todo', 'Doing', 'Done'],
      },
      statusToggle: {
        type: Boolean,
        label: 'Status Toogle',
        defaultValue: false,
        optional: false,
      }
    };

    export interface IExample {
      _id?: string;
      image: string;
      title: string;
      description: string;
      createdat: Date;
      updatedat: Date;
      createdby: string;
      audio: string;
      statusCheck: object;
      statusToggle: boolean;
    }

No exemplo acima há vários campos definidos para o formulário, como image, title e etc. Veja que para cada campo
é necessário informar o tipo (type), o nome do campo(label) que aparecerá nas mensagens de erro e também na tela do usúario, o valor padrão (defaultValue) e se o campo é opcional ou não (optional).

Além disso, há outros dados que precisam ser fornecidos a campos específicos, como é o caso do campo "type" que se refere a um select e que no esquema do campo já estão definidos os valores que serão exibidos para o usúario no campo "options". Os campos que possuem valores para serem selecionados sempre possuem o campo "options" e os valores são sempre exibidos com oum array de objetos.

Há também o campo "isImage" para sinalizar que o campo será utilizado para armazenar uma imagem em base64.

Há ainda outras propriedades que podem ser inseridas nesse momento e que são interpretadas pelo SimpleForm que gera o esquema do formulário a partir do esquema do banco.

Esses outros campos são:

- "**isAvatar**" - quando o campo é do tipo imagem e diz respeito a um avatar.
- "**isUpload**" - quando o campo é do tipo "upload de arquivos" e, neste caso, utiliza o componente "UploadFilesCollection" do SimpleForm.
- "**readOnly**" - se o campo readOnly for definido com o valor "true" o campo será exibido como somente leitura nas telas de edição. Neste caso a biblioteca irá pegar essa informação e replicar ela no esquema do formulário.

A propriedade "type" também sugere componentes que podem ser utilizados. Por exemplo:

- "**[String]**" - uma lista de texto sugere que o componente é um "Chip Input". Se houver o campo "options" ele é do tipo "Select Chip Input", como mencionado anteriormente.
- "**Object**" - o tipo objeto indica que o campo é um documento aninhado e, neste caso, vai exigir o campo "subSchema". Um subSchema é o esquema do documento aninhado.
- "**[Object]**" - uma lista de objetos indica que o campo é uma lista de documentos aninhados e neste caso também é necessário indicar o campo "subSchema".
- **Number** ou **Date** - tipos número ou data sugere a utilização de componentes que permitem a entrada de somente números ou a seleção de datas.

Para criar um campo novo basta adicionar mais uma propriedade no objeto "**exampleSch**" e em seguida inserir esse novo campo no formulário. Por exemplo, iremos especificar abaixo o campo "subtitle" que informa um subtítulo que a tarefa deverá possui. Neste caso será uma string simples.

      subtitle: {
        type: String,
        label: 'SubTitle',
        defaultValue: '',
        optional: true,
      },

Após essa inserção, como o campo requisitado é do tipo string e se refere a um subtítulo, o componente adequado a ser utilizado é um TextField. Então, acesse o arquivo de "exampleDetail.js" do seu módulo e inclua o seguinte trecho de código.

Caso ainda não tenha importado o componente de TextField, insira no início do arquivo:

    import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';

Em seguida, inclua o componente TextField dentro do componente SimpleForm:

    <Container>
    	<Typography style={appStyle.title}>{screenState === 'view' ? 'Visualizar exemplo' : (screenState === 'edit' ? 'Editar Exemplo' : 'Criar exemplo')}</Typography>
    	    <SimpleForm
    		mode={screenState}
    		schema={exampleApi.schema}
    		doc={exampleDoc}
    		onSubmit={handleSubmit}
    		loading={loading}
    	    >
    		(...)
    			<TextField
    				placeholder='Subtítulo da Tarefa'
    				name='subtitle'
    			/>
    		(...)
    	    </SimpleForm>
    	</Container>

**Observação**: o campo "name" do componente que você pretende utilizar deve sempre corresponder ao nome do schema que você definiu no arquivo "exampleSch.js", para que o SimpleForm entenda com base em qual schema o banco de dados foi gerado e sobre quais restrições as validações deverão ser realizadas. Nos casos em que o campo name não corresponde a nenhum campo do schema ou simplesmente não é informado, o SimpleForm entende que não restrições pré-definidas e cria um schema próprio para o componente.

Na pasta _config_ há os arquivos:
pagesappmenu.tsx
pagesrouters.tsx
index.tsx

O arquivo _pagesappmenu_ contém as definições sobre a exibição de itens do menu do aplicação referente ao módulo. O arquivo possui a seguinte estrutura:

import React from 'react';
import Home from '@mui/icons-material/Home';

export const pagesMenuItemList = [
isMobile?{
path: '/',
name: 'Home',
icon: <Home />,
}:null,

A variável _pagesMenuItemList_ é uma lista de objetos que contém as configurações de exibição do menu. Esses objetos possui os seguintes campos:

- **path** - Define a rota que será chamada quando o item é acionado. Ex:'/',
- **name** - Define o título/text que será exibido no item: Ex: "Home"
- **icon** - Define o ícone que será utilizado. Ex: Home

A variável _pagesRouterList_ contém uma lista de definições de rota referente ao módulo. As definições de rota possuem os seguintes campos:

- **path** - Define o caminho/rota que acionará a renderização do componente definido abaixo. Ex: '/example/:screenState/:exampleId',
- **component** - Definie o componente que será renderizado. Ex: exampleContainer,
- **isProtected** - Define se na rota apenas usuários logados acessam as informações.

## UTILIZANDO O SimpleForm

### Entendendo o funcionamento

O _SimpleForm_ é um componente que faz a gestão de formulários e simplifica a criação das telas de
cadastro, edição e visualização dos dados da coleção.

A principal motivação para utilizá-lo ao invés de adotar componentes amplamente utilizados pela comunidade como _ReduxForms_ e outros, é a integração dele com o pacote _Material-UI_.

O SimpleForm foi criado para ser simples, flexível e extensível:

- simples porque a utilização dele não requer muita preparação: basta ter uma lista de ações e um esquema de formulário semelhante
  ao esquema do banco de dados.
- flexível porque pode ser utilizada uma ou várias instâncias dele para compor o formulário exibido para o usuário, utilizando
  uma ou mais opções de salvamento.
- extensível porque permite a implementação de componentes que poderão ser utilizados com a mesma simplicidade com que são utilizados os componentes do pacote _Material-UI_.

O SimpleForm possui dois modos de visualização: _edit_ e _view_. Ele possui as seguintes propriedades:

           <SimpleForm
                mode={screenState}
                schema={exampleApi.schema}
                doc={exampleDoc}
                onSubmit={handleSubmit}
                loading={loading}
            >

- **mode** - define qual é o modo de visualização: view, edit ou buttons. Quando a opção é _buttons_ somente os botões são renderizados e nesse caso pode ser informada uma propriedade à mais que é a _forms_, que contém uma lista de formulários, como será visto no exemplo a seguir.
- **onSubmit** - é uma propriedade opcional que pode ser utilizada quando se pretende salvar o estado do documento a cada vez que ele é alterado no formulário.
- **doc** - recebe o documento que será utilizado para popular os campos do formulário.
- **schema** - recebe o esquema de campos do formulário.
- **loading** - recebe a ação do carregamento.

**IMPORTANTE** : o botão de envio do formulário deve **obrigatoriamente** ter a prop 'id' com valor 'submit'.

**Observação:** a estilização do container que contém o componente ou do próprio componente é realizada internamente, ou seja, cada componente possui seu próprio arquivo css para definir regras de design sobre as quais os campos serão renderizados. Por exemplo, ao definir a propriedade display como "flex" e flexDirection como "row" os campos do formularío serão exibidos em linha ao invés de serem exibidos em coluna. Bem como a definição do tamanho da fonte, tamanho do componente e suas diferentes formas de se apresentar com base no tipo de dispositivo (mobile ou desktop).

#### Criando o schema do formulário manualmente

O SimpleForm cria formulários a partir de esquemas expressos em JSON. Como mencionado anteriormente, cada campo nesse esquema possui a seguinte estrutura básica e que pode ser incrementada com outras propriedades:

      name: {
        type: String,
        label: 'Título',
        defaultValue: '',
        optional: true,
      },

### Adicionando novos componentes

O SimpleForm foi construído considerando o funcionamento dos componentes do pacote _Material-UI_. Esses componentes possuem algumas
propriedades que são consideradas pelo SimpleForm para tratar as questões de interação e exibiões de informação que são as seguintes:

- **name** - recebe o texto que identifica o campo.
- **label** - recebe o texto a ser exibido como título do campo.
- **value** - recebe o valor a ser exibido como conteúdo ou estado do campo.
- **onChange** - nesta propriedade é esperado que seja passado o nome do campo e valor correspondente para inserção no BD. Exemplo:

      const imgValue = (...);
      onChange({target:{value: imgValue}},{ name, value: imgValue});

- **error** - está propriedade é um boleano que informa se ocorreu ou não algum erro no componente e, se afirmativo, a mensagem é exibida
  para o usúario assim como algumas característica do componentes serão exibidos na cor vermelha.
- **readOnly** - está propriedade é um boleano que informa se o estado atual do componente é somente visualização e, se afirmativo, não é permitida a edição dos conteúdos dos campos.
- **otherProps** - outras propriedades específicas de um componente como, por exemplo, a propriedade de "checked" para identificar o estado de um componente do tipo CheckBox.

Independente do que o componente faz, se ele recebe essas propriedades ele poderá ser utilizado automaticamente pelo SimpleForm.

## UTILIZANDO O SimpleTable

### Entendendo o funcionamento

O _SimpleTable_ é um componente que simplifica a demonstração dos dados presentes no banco de dados em uma tabela para consulta.

O SimpleTable foi criado para ser simples e extensível:

- simples porque a utilização dele não requer muita preparação: basta ter uma lista de ações e um esquema semelhante ao esquema do banco de dados.
- extensível porque permite a implementação de componentes que poderão ser utilizados com a mesma simplicidade com que são utilizados os componentes do pacote _Material-UI_.

O SimpleTable possui as seguintes propriedades:

           <SimpleTable
                schema={_.pick(exampleApi.schema,['image','title','description'])}
                data={examples}
                onClick={onClick}
                actions={[{icon:<Delete color={'primary'} />,onClick:callRemove}]}
            />

Vamos às explicações:

- **schema** é o schema que será utilizado para buscar as informações do banco de dados.
- **data** realizará a busca dos dados na API do componente.
- **actions** as ações disponíveis para serem realizadas com a tabela.

### Estilizando elementos

A estilização dos componentes foi feita em um arquivo .tsx à parte com a separação do estilo de cada um.
O nome dos arquivos seguem o padrão **nomeStyle.jsx** de acordo com o nome de cada componente.

    	const nomeStyle = {
    		fieldError: {
    		border:  '1px solid red'
    		},
    		container: {
    		display:  'flex',
    		flexDirection: 'row',
    		justifyContent: 'left',
    		},
    	};

    	export {
    		nomeStyle,
    	};

No arquivo do componente, importamos a folha de estilo:

         import {nameStyle} from './nameStyle'

## UTILIZANDO O UploadFiles

### Entendendo o funcionamento

O _UploadFiles_ é um componente utilizado para realizar o upload de vários tipos de arquivos.

O UploadFiles foi criado para ser simples e poder comportar arquivos de diferentes formatos, facilitando a utilização do sistema e tornando-o mais versátil.

O UploadFiles possui as seguintes propriedades:

            <UploadFilesCollection
                name='files'
                label={'Arquivos'}
                doc={exampleDoc}
    	/>

Vamos às explicações:

- **name** é o nome da propriedade do schema que será utilizado para buscar as informações do banco de dados.
- **label** nome que representa o componente no layout do sistema.
- **doc** recebe o documento que será utilizado para popular os campos do formulário.

**Observação**: Para este componente em específico, a área para upload é renderizada apenas quando o doc passado como referência possui um id. Entretanto, uma vez que foi definido como estratégia original que o id de um documento criado pelo MeteorReactBaseMUI seja instanciado apenas após a submissão do formulário, fizeram-se necessárias adaptações nesta estratégia para que o id gerado fosse fixo e anterior a submissão do formulário. Para tanto, utilizou-se um pacote "nanoid" para geração de um id assim que a opção de criar um novo documento em BD for acionado. Em caso de não utilização do componente de UploadFilesCollection, a estratégia original deverá ser mantida.

## LAYOUTS E EXIBIÇÃO DO CONTEÚDO

O layout do boilerplate e a estrutura dos conteúdos estão separadas em dois lugares distintos.

### Layout

A estrutura do layout está definida em ´/imports/libs/deviceVerify.ts`. O boilerplate está preparado para atender a dois tipos de layout: web e mobile.

A verificação se o cliente está acessando ou não através de um dispositivo móvel é feita através da constante "**isMobile**" que pode ser importada conforme apresentado abaixo:

    import { isMobile } from '../libs/deviceVerify';

**Observação**: Caso seja necessário modificar a forma de identificar se o dispositivo terá um acesso WEB ou Mobile será necessário mudar a regra de definição da constante "**isMobile**".

## OUTROS RECURSOS

### Perfis e controle de acesso

O controle de acesso através de perfis está implementado no múdulo "seguranca", e funciona da seguinte forma: no arquivo "RoleType.tsx" são definidos os perfis de acesso disponívels na aplicação. Cada módulo deverá possuir seu próprio arquivo de recursos, chamado "Recurso" na pasta "config" do próprio módulo. Nele, são definidos os recursos necessários para utilização daquele módulo. Basta agora atribuir os recursos necessários para cada perfil de usuário no arquivo "MapRolesRecursos.tsx". Nele, devem ser atribuidos para cada perfil os recursos que o mesmo possui. Como exemplo, já temos implementados recursos para o módulo "example" e perfil "Administrador".

Como funciona a validação dos recursos? Para validações no backend, utilize a função podeAcessarRecurso. Para validações no frontend, utilize o componente funcional "RenderComPermissao", que somente renderizará qualquer JSX passado como children caso a validação de recursos retorne verdadeiro. Para validação de acesso a rotas do sistema, a propriedade "resources" deve ser informada na configuração da rota, no arquivo "nomeDoModuloRouters.tsx". Exemplos de uso para todos os três casos estão implementados no módulo "example".

Caso não queira utilizar essa implementação de controle de acesso, não utilize as funções mencionadas acima e remova a validação por perfil de acesso no arquivo "AppRouterSwitch.tsx", linhas 66-67.

### Contexto geral da aplicação

O boilerplate possui propriedades e métodos armazenados em contexto geral que está disponível para todas as telas/componentes. Esse contexto é implementado utilizando as duas formas de contexto presentes na biblioteca ReactJS.

A mais antiga e que estava disponível em carater de experimentação nas versões antigas do React é a criação de um contexto a partir do recurso "**ChildContext**" que faz com que todos os componentes filhos possam acessar as informações do contexto de ancestral comum caso o contexto seja declarado através de PropTyhpes. Para mais informações veja: https://pt-br.reactjs.org/docs/legacy-context.html

Utilizamos também a propagação do contexto para as telas/componentes do boilerplate utilizando os atuais recursos de contexto do ReactJS: "**React.createContext()**","##AppContext.Provider##" e "##AppContext.Consumer##". Através desses recursos o boilerplate injeta o contexto em todas os "conteúdos/rotas" da aplicaçao conforme pode ser verificado no arquivo `/imports/app/app.js`. Para mais informações acesse: https://reactjs.org/docs/context.html

### Dialog e Snackbar

A visualização de mensagens através de Snackbar ou a utilização de Dialogs ao longo do boilerplate pode ser feito utilizando os métodos "**openSnackBar**" e "**openDialog**" presentes no contexto geral.

#### SnackBar

Podemos chamar o snackbar da seguinte forma:

    props.openSnackBar('<<Mensagem_Exibida>>', '<<Tipo_Mensagem>>');

Ambos os parâmetros são do tipo String. O parâmetro "**Tipo_Mensagem**" é uma String contendo um dos valores a seguir: info, success, warning, danger ou error.

#### Dialog

O dialog pode ser chamdo utilizando o seguinte método:

                this.props.openDialog(
                  '<<Titulo>>',
                  '<<Mensagem>>',
                );

Os parâmetros "**Titulo**" e "**Mensagem**" são do tipo String.

### Tratamento de imagens

Se uma determinado campo do documento é do tipo image, ou seja, se no esquema há a propriedade "**isImage**", o boilerplate, no arquivo `/imports/api/base.ts", faz uma transformação dos dados e, ao invés de retornar a image que está salva no formato Base64, ele retorna a URL referente à imagem, que remete à rota criada pelo recurso de geração automatica de API Rest.

Dessa forma, as imagens salvas no banco de dados consguem ser recuperadas através de um endereço acessado pelo browswer e por isso o browser consegue fazer cache das imagens.

# STORYBOOK E COMPONENTES

Para o MaterialReactBaseMUI, optamos por implementar o Storybook para ajudar na identificação, importação e utilização dos componentes.

## PRIMEIROS PASSOS

Antes da instalação do Storybook, certifique-se de que possui o NodeJs, Npm e Npx instalados em sua máquina utilizando:

    node -v
    npm -v
    npx -v

Caso não possua algum destes, prossiga para instalação do NodeJs em sua versão mais atualizada através do link https://nodejs.org/en/download/. Após a atualização, os comandos de npm e npx também serão atualizados para sua versão mais recente, portanto, prossiga para a instalação e mais informações sobre o Storybook disponível em https://storybook.js.org/docs/react/get-started/introduction.

Após a instalação, para rodar o Storybook utilize:

    npm run storybook

Você será redirecionado para a página da aplicação do Storybook e irá encontrar os principais componentes a serem utilizados no sistema, bem como sua função, formato de schema a ser definido no banco de dados, como usar o componentes e aspectos visuais para estlização. O Storybook foi implementado para facilitar a documentação dos componentes e entendimento acerca da utilização dos mesmos.

# CYPRESS E TESTES AUTOMATIZADOS

Para o MaterialReactBaseMUI, optamos por implementar o Cypress para implementação de testes automatizados end-to-end usando JavaScript para auxiliar na testagem dos componentes e da interação dos mesmos na aplicação.

## PRIMEIROS PASSOS

Assim como no Storybook, antes da instalação do Cypress certifique-se de que possui o comando Npm instalado em sua máquina utilizando:

    npm -v

Caso não possua, prossiga para instalação do NodeJs como instruído no tópico "Primeiros Passos" no Storybook.

Para instalação e mais informações sobre o Cypress acesse o conteúdo disponível em https://www.cypress.io/.
Ou utilize o seguinte comando:
npm install cypress

Após a instalação, para rodar o Cypress e ver a execução no console utilize o comando:

    npm run cypress:headless

E para abrir uma interface gráfica utilize o comando:

    npm run cypress:gui

Uma vez executado, o Cypress irá redireciona-lo para a página da aplicação onde você poderá encontrar os testes já implementados a serem utilizados como base no sistema.

**Observação**: Caso deseje verificar exemplos de uso e tutoriais de como criar um teste automatizado no cypress utilizando os comandos, funções, assertions, actions, navigations, entre outros componentes disponíveis, acesse a documentação completa e testável disponível em https://example.cypress.io.
