const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendValidationAccount,
  sendInvalideToken,
} = require("../email/email");

const createTokenEmail = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "180s" });
};

const createTokenLogin = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3600s" });
};

const signupUser = async (req, res) => {
  const { firstname, surname, username, email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const token = createTokenEmail(email);
      console.log(token);
      await sendConfirmationEmail(email, token);
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(password, salt);
      const user = new User({
        firstname,
        surname,
        username,
        email,
        password: hashpwd,
        token,
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

module.exports = { signupUser, verifyMail, signinUser };
