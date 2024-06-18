#!/bin/bash

BACKUP_PATH="/Users/mathi/www_mathias/FEST-CONNECT/projet_2_fest-connect/backup/saves"
LOG_PATH="/Users/mathi/www_mathias/FEST-CONNECT/projet_2_fest-connect/backup/log/backup.log"
URI="mongodb+srv://mathiasjacquart:azerty123456@cluster0.aki18iz.mongodb.net/fest-connect?retryWrites=true&w=majority&appName=Cluster0"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

# Vérifier si les répertoires existent, sinon les créer
mkdir -p "$BACKUP_PATH"
mkdir -p "$(dirname "$LOG_PATH")"

# Test simple d'écriture dans le log
echo "Starting backup process: $DATE" > "$LOG_PATH"

# Exécuter la commande de sauvegarde
mongodump --uri "$URI" --out "$BACKUP_PATH/$DATE" >> "$LOG_PATH" 2>&1

# Vérifier le statut de la commande et enregistrement du résultat dans le log
if [ $? -eq 0 ]; then
  echo "Backup successful: $DATE" >> "$LOG_PATH"
else
  echo "Backup failed: $DATE" >> "$LOG_PATH"
fi

echo "Script execution completed." >> "$LOG_PATH"
