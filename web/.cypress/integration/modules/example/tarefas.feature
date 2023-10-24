Feature: Módulo de editar tarefas

  Validando edição de tarefas

  Scenario: Editando exemplo
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Exemplos"
    When cliquei na linha com o texto "Texto do Título"
    And cliquei em "Editar"
    And cliquei em "addSubForm"
    And preenchi o campo "Nome da Tarefa" com o valor "Nome da Tarefa"
    And preenchi o campo "Descrição da Tarefa" com o valor "Descrição da Tarefa"
    And acionei o comando "Salvar"
    Then foi exibida a mensagem "Operação realizada!O exemplo foi atualizado com sucesso!"
