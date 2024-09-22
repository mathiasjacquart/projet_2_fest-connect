require ('dotenv').config();
const express = require('express')
const path = require("path")
const {exec} = require("child_process")
const mongoose = require('mongoose')
const cors = require("cors")
const port = process.env.PORT || 4000
const userRoutes = require ("./routes/users")
const storageRoutes = require("./routes/storages")
const adminRoutes = require("./routes/admin")
const categoryRoutes = require("./routes/categories")
const prestataireRoutes =  require("./routes/prestataire")
const clientRoutes = require("./routes/client")
const reviewRoutes = require("./routes/review");
const contactRoutes = require("./routes/contact")
const locationRoutes = require("./routes/locations")
const cron = require("node-cron")

const app = express();
app.use(express.json());
app.use(
    cors({
        origin:"*"
    })
);
app.use("/api/contact",contactRoutes)
app.use("/api/users", userRoutes);
app.use("/api/storages" , storageRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/providers" , prestataireRoutes)
app.use("/api/client", clientRoutes)
app.use("/api/reviews", reviewRoutes)
app.use('/api/locations', locationRoutes); 

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> {
        app.listen(port, () => { 
            console.log(`connected to db and listening on port : ${port}`);
        });
    })
    .catch((err) => console.log(err)) 


    
const backupScript = path.join(__dirname, 'backup.sh');
const logPath = path.join(__dirname, 'logs', 'backup.log');

// Planifier la tâche de sauvegarde à 2h du matin tous les jours
cron.schedule('0 2 * * *', () => {
    exec(backupScript, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing backup: ${error.message}`);
            return;
        }
        console.log(`Backup script output: ${stdout}`);
        if (stderr) {
            console.error(`Backup script error output: ${stderr}`);
        }
    });
});

app.post('/restore', (req, res) => {
    const { backupFolder } = req.body;
    if (!backupFolder) {
      return res.status(400).send('Backup folder is required');
    }
  
    const restoreScript = path.join(__dirname, 'restore.sh');
    const command = `${restoreScript} ${backupFolder}`;
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing restore: ${error.message}`);
        return res.status(500).send(`Error executing restore: ${error.message}`);
      }
      console.log(`Restore script output: ${stdout}`);
      if (stderr) {
        console.error(`Restore script error output: ${stderr}`);
      }
      res.send('Restore initiated successfully');
    });
  });
