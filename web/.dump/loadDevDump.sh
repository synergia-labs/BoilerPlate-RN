#!/bin/bash

# Defina as credenciais e o URL do banco de dados remoto
REMOTE_DB_URI="mongodb://zoombee:7wV12wyBYwVRYP6aInRq@prod.mongo.db.synergia.dcc.ufmg.br/zoombee-dev"
LOCAL_DB_URI="mongodb://localhost:3001/meteor"

# Defina o diretório onde o dump será salvo
DUMP_DIR="./dump"

# Baixe o DUMP do banco de dados remoto
mongodump --uri="$REMOTE_DB_URI" --out="$DUMP_DIR"

# Suba o conteúdo do banco de dados no servidor mongodb local
mongorestore --drop --uri="$LOCAL_DB_URI" "$DUMP_DIR/zoombee-dev"

# Remova o diretório de dump, se desejar
rm -r "$DUMP_DIR"

echo "Operação concluída com sucesso!"
