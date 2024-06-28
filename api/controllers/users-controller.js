const User = require("../models/user.schema");
const Client = require ("../models/client.schema");
const Prestataire = require ("../models/prestataire.schema");
const axios = require('axios');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendValidationAccount,
  sendInvalideToken,
} = require("../email/email");

//TOKEN EMAIL & LOGIN 
const createTokenEmail = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "180s" });
};

const createTokenLogin = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3600s" });
};


// SIGN UP & SIGN IN 
const signupUser = async (req, res) => {
  const { firstname, surname, username, email, password, role } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const token = createTokenEmail(email);
      console.log(token);
      await sendConfirmationEmail(email, token);
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(password, salt);

      // Générer un avatar random 
      const avatarResponse = await axios.get('https://avatars.dicebear.com/api/initials/:seed.svg', {
        params: {
          seed: username,
         
        }
      });
      const avatarUrl = avatarResponse.config.url;
      console.log(avatarUrl);
      let relatedDoc;
      if (role === "client") { 
        relatedDoc = new Client({ businessname, photo, review, location, biography, description})
      } else if (role === "prestataire") { 
        relatedDoc = new Prestataire({ businessname, photo, service, location, biography, description, socials
      })
      }
      await relatedDoc.save();

      const user = new User({
        firstname,
        surname,
        username,
        email,
        password: hashpwd,
        role,
        avatar: avatarUrl,
        token,
        relatedId:relatedDoc._id
      });
      await user.save();
      res.status(200).json({
        message:
          "Veuillez confirmer votre inscription en consultant votre boite mail",
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

const verifyMail = async (req, res) => {
  const token = req.params.token;
  const isTokenNull = await User.findOne({ token: token });
  const decoded = jwt.verify(token, process.env.SECRET, {
    ignoreExpiration: true,
  });
  console.log(decoded);
  try {
    if (!isTokenNull) {
      res.status(400).json({ message: "Token déjà validé.", status: 400 });
      return;
    }
    if (decoded.exp * 1000 > new Date().getTime()) {
      //Token encore valide
      await User.findOneAndUpdate({ email: decoded.email }, { token: null });
      await sendValidationAccount(decoded.email);
      res.json({ message: "Inscription confirmée avec succès", status: 200 });
    } else {
      await User.findOneAndDelete({ email: decoded.email });
      await sendInvalideToken(decoded.email);
      res
        .status(400)
        .json({ message: "Token non valide ou expiré", status: 400 });
    }
  } catch (error) {
    console.error(error);
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (!user.token) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = createTokenLogin(user._id);
          res.status(200).json({ user, token });
        } else {
          res.status(400).json({ message: "Mauvais Email et/ou Password" });
        }
      } else {
        res.status(400).json({ message: "Email non validé" });
      }
    } else {
      res.status(400).json({ message: "Mauvais Email et/ou Password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("relatedId");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("relatedId");
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => { 
  try {
    const user = new User (req.body) 
    await user.save();
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json ({ error : error.message})
  }
}


module.exports = { deleteUser, updateUser, getUser, getUsers, signupUser, verifyMail, signinUser, createUser };
