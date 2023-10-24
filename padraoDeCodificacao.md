# Padrão de codificação

## Regras gerais

- A linguagem padrão do projeto é o TypeScript.
- Utilize a sintaxe do ES6.
- Coloque ponto-e-vírgula ";" ao final de cada instrução.
- Interfaces para entidades do banco de dados devem ser definidas e exportadas no arquivo entidadeSch.ts.
- Interfaces devem ser definidas para todo e qualquer componente que recebe props. O padrão de nomenclatura de tais interfaces deve adicionar um 'I' como prefixo no nome do componente. Exemplo: 'INomeDoComponente'.
- Interfaces para os componentes do item anterior podem ser definidas no próprio arquivo que define os componentes. Caso sejam utilizadas em outro arquivo, exporte-as.
- Interfaces para componentes padrão do Boilerplate ficam na pasta 'imports/typings'. Caso implemente uma nova, organize-a de acordo.
- Nome de funções e variáveis devem ser expressivos. Deixe claro o que cada variável armazena e o que uma função realiza em seus nomes. Utilizar preferencialmente nomes em português, deixando em inglês apenas termos consagrados.
- Arquivos _.tsx, _.ts criados devem ser \*UpperCamelCase\*\* (com a primeira letra maiúscula). Arquivos padrão do boilerplate devem ser mantidos em lowerCamelCase. Estes arquivos são: moduloList, moduloDetail, moduloContainer, moduloApi, moduloSch, moduloAppMenu, e moduloRouters.
- Os nomes de diretórios devem ser \*LowerCamelCase\*\* (com a primeira letra minúscula).
- Referência para o padrão CamelCase: https://pt.wikipedia.org/wiki/CamelCase
- Nomes de módulos preferencialmente no singular e \*LowerCamelCase\*\* (com a primeira letra minúscula).
- Não utilizar exportação default.
- Não utilize chaves "{}" para definição de escopo quando o mesmo é compostos de uma só linha.
- Não deixar chamadas de debug no código, como console.log().
- Não deixar código comentado.
- Remover imports, variáveis, funções e não utilizadas.
- Não repita código. Se for utilizar uma mesma lógica duas vezes, faça com que tal se torne uma função. Sea lógica for algo útil para o projeto como um todo, implemente-a em um arquivo separado em 'imports/libs/seuArquivo.ts'.
- Condicionais com somente uma linha no escopo não requerem o uso de chaves.
- Os padrões para a IDE de desenvolvimento estão definidos no arquivo .editorConfig, localizado na pasta raiz do projeto.
- Utilize 'Enum's para qualquer enumerador de opções necessário no sistema. Crie-o em um arquivo separado na pasta 'Config' do módulo que o define. O nome do arquivo deve ser o mesmo do próprio Enum, seguindo o padrão: 'EnumOpcoesParaAlgumaCoisa'.
- Qualquer texto deve ser colocado explicitamente no código, e não como uma string. Exemplo: `<span> Olá </span>` ao invés de `<span> {'Olá'} </span>`
- Props utilizadas em qualquer página devem ser destruturadas, i.e não utilizar `props.nomeDaProp`, e sim, `const {nomeDaProp} = props`;

## Regras Web:

- Três tamanhos padrão de campos de texto são definidos: 100, 200, e 400 caracteres, nomeados 'short', 'medium', e 'long', respectivamente. Exemplo de uso: `<TextField maxCaracteres='short'>`.

## Regras Mobile:

## Arquivos de Backend:

##### Classes:

- Nome do arquivo e da classe Api devem corresponder e possuir o sufixo Api. Exemplo: cursosApi para a coleção 'cursos'.

##### Métodos

- Nomes de métodos remotos registrados no Meteor.methods devem iniciar com o prefixo server: ex: serverNomeMetodo = () => {}
- Métodos invocados privativamente dentro da classe api deve possuir o prefixo \_ (underline): ex: \_nomeMetodo = () => {}
- Demais métodos (métodos públicos, protegidos) não necessitam de prefixos.
- Métodos não devem ter mais do que 25 linhas.

##### Publicações

- Nomes de publicações devem explicitar quais dados são retornados pela publicação.
- Dados somente devem ser publicados após validar se o perfil de acesso que os requisita de fato tem permissão para visualizá-los.
- O filtro aplicado na publicação deve ser também aplicado no find utilizado na tela que faz o subscribe para tal publicação.
- Opte por utilizar publicações transformadas (addTransformedPublication) ao invés de realizar transformações direto no container (withTracker), evitando subscrições desnecessárias.

##### Lançamento de Erros

- O padrão de lançamento de erros no backend deve seguir o seguinte: Meteor.Error("erro.nomeDaApi.método", "Mensagem descrevendo o erro encontrado").
- Exemplo: throw new Meteor.Error('erro.chat.apagarChat', 'Usuário não está logado ou não tem permissão para apagar o chat.')

## Arquivos de Frontend

- Regras de negócio devem estar declaradas nas classes de api. Validações sempre devem ser feitas no backend antes de qualquer persistência de dados.
- O bind entre as regras de negócio e os componentes devem ser feito preferencialmente nos containers. Use o componente de visualização de dados somente para tal.
- A importação de componentes direta do compomentes do MUI para evitar carregar módulos não utilizados. Exemplo:
  '''
  import Button from '@material-ui/core/Button';
  import TextField from '@material-ui/core/TextField';
  '''

##### Páginas:

- Nome de arquivos de container devem conter o sufixo Container.
- Nome de arquivos de telas de pesquisa/listagem devem carregar o sufixo List.
- Nome de arquivos de telas de CRUD devem carregar o sufixo Detail.

##### Componentes:

- Nome do arquivo deve corresponder ao nome do componente principal exportado, exceto nos componentes que implementam trackers. Neste caso, o nome do arquivo deve ser o nome do componente de visualização. Exemplo: exampleListContainer é o componente exportado no arquivo exampleList.tsx.
- Arquivos de estilos de ter o mesmo nome do arquivo de componente que estiliza com o profixo Style
  ex AppNavBar.tsx , AppNavBarStyle.jsx.
- Arquivos de estilo devem ficar dentro de uma pasta chamada 'style', a ser criada dentro da pasta 'ui' de cada módulo.
- Todos os arquivos \*.tsx deve ser prefixados com o tipo de elemento UI que ele representa.

Alguns prefixos já foram definidos no projeto:

```
Abas...tsx (um conjunto de abas)
Aba...tsx
Modal...tsx
Painel...tsx
Card...tsx
Botao...tsx
Acordeon...tsx
```

## Git e Fluxo de trabalho

- Nossa branch de desenvolvimento é chamada 'develop'. Mantenha-a sempre atualizada.
- Ao iniciar uma nova tarefa, crie uma nova branch para a implementação da mesma. O nome da branch deve ser exatamente igual o nome da tarefa no JIRA. Exemplo: git checkout -b SGRS-201
- A não ser em casos bastante específicos, qualquer nova branch deve ser criada a partir da branch 'develop'.
- Mantenha seu código atualizado com o remoto. Dê ao menos um 'git pull' todos os dias.
- Imediatamente após criar sua nova branch, envie-a para o remoto (git push --set-upstream origin nomeDaBranch) e crie um Merge Request (MR) para a mesma, marcando-o como WIP (Work in Progress).
- Ao terminar o desenvolvimento da tarefa, faça um merge com o 'develop' (e resolva qualquer possível conflito), remova a tag WIP e coloque o link para o MR no canal 'merge-request' do Discord. Não se esqueça de fazer um merge com a branch 'develop'!!
- Desenvolva o hábito de commitar seu código com frequência, ao invés de colocar todo o desenvolvimento em um só commit.
- Inicie toda mensagem de commit com o nome da branch corrente. Exemplo: 'SGRS-201 Implementacao de botão de salvar'. Isso ajuda na visualização dos commits levados para o develop/master após os merges.
