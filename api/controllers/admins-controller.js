const Admin = require("../models/admin.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createTokenLogin = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3600s" });
};

const signupAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(password, salt);
      const admin = new Admin({
        username,
        email,
        password: hashpwd,
      });
      await admin.save();
      res.status(200).json({
        message: "Vous êtes inscris",
        status: 200,
      });
    } else {
      res.status(400).json({ message: "Compte déjà existant.", status: 400 });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};

const signinAdmin = async (req, res) => {
  const { identifier, password } = req.body;
  console.log(req.body);
  try {
    // Rechercher soit par email, soit par nom d'utilisateur
    const admin = await Admin.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (admin) {
      if (!admin.token) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = createTokenLogin(admin._id);
          res.status(200).json({ admin, token });
        } else {
          res.status(400).json({ message: "Mauvais identifiant et/ou mot de passe" });
        }
      } else {
        res.status(400).json({ message: "Email non validé" });
      }
    } else {
      res.status(400).json({ message: "Mauvais identifiant et/ou mot de passe" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signinAdmin, signupAdmin };
