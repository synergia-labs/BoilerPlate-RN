Feature: Módulo de editar tarefas

  Validando edição de tarefas

  Scenario: Editando exemplo
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Exemplos"
    When cliquei na linha com o texto "Texto do Título"
    And cliquei em "Editar"
    And cliquei no valor "Doing" no campo "radioGroup"
    And acionei o comando "Salvar"
    Then foi exibida a mensagem "Operação realizada!O exemplo foi atualizado com sucesso!"
