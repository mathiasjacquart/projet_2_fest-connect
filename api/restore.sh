#!/bin/bash

# Variables
BACKUP_PATH="/Users/mathi/www_mathias/FEST-CONNECT/projet_2_fest-connect/backup/saves"
LOG_PATH="/Users/mathi/www_mathias/FEST-CONNECT/projet_2_fest-connect/backup/log/restore.log"
URI="mongodb+srv://mathiasjacquart:azerty123456@cluster0.aki18iz.mongodb.net/fest-connect?retryWrites=true&w=majority&appName=Cluster0"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

# Chemin de la sauvegarde à restaurer
# Remplacez ceci par le chemin de votre sauvegarde spécifique
RESTORE_PATH="$BACKUP_PATH/restore"

# Vérifier si les répertoires de logs existent, sinon les créer
mkdir -p "$(dirname "$LOG_PATH")"

# Écrire dans le log pour debug
echo "Starting restore process: $DATE" > "$LOG_PATH"
echo "Restore path: $RESTORE_PATH" >> "$LOG_PATH"
echo "Log path: $LOG_PATH" >> "$LOG_PATH"
echo "MongoDB URI: $URI" >> "$LOG_PATH"

# Exécuter la commande de restauration
echo "Running mongorestore..." >> "$LOG_PATH"
mongorestore --uri "$URI" --drop "$RESTORE_PATH" >> "$LOG_PATH" 2>&1

# Vérifier le statut de la commande et enregistrement du résultat dans le log
if [ $? -eq 0 ]; then
  echo "Restore successful: $DATE" >> "$LOG_PATH"
else
  echo "Restore failed: $DATE" >> "$LOG_PATH"
fi

echo "Script execution completed." >> "$LOG_PATH"
