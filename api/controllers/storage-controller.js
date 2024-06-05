// const mongoose = require("mongoose");
const Storage = require("../models/storage.schema")

const getStorage = async (req, res) => {
    console.log(req.body);
    try {
      const allStorage = await Storage
      .find({})

      console.log(allStorage)
      res.status(200).json(allStorage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



module.exports = { getStorage}