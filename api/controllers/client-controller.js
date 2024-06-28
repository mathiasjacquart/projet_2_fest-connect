const Client = require("../models/client.schema")

// Get all clients
const getClients = async (req, res) => {
    console.log(req.body);
    try {
      const clients = await Client.find();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get single client by ID
  const getClient = async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) return res.status(404).json({ message: 'Client not found' });
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update client by ID
  const updateClient = async (req, res) => {
    try {
      const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!client) return res.status(404).json({ message: 'Client not found' });
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete client by ID
  const deleteClient = async (req, res) => {
    try {
      const client = await Client.findByIdAndDelete(req.params.id);
      if (!client) return res.status(404).json({ message: 'Client not found' });
      res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const createClient = async (req, res) => { 
    try {
      const client = new Client (req.body) 
      await client.save();
      res.status(200).json(client)
    } catch (error) {
      res.status(500).json ({ error : error.message})
    }
  }


module.exports = {createClient, deleteClient, updateClient, getClient, getClients}
  