const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Avatars = require('@dicebear/avatars').default;
const style = require('@dicebear/avatars-initials-sprites').default;
const User = require('../models/user.schema');
const {
  sendConfirmationEmail,
  sendValidationAccount,
  sendInvalideToken,
  sendForgottenPassword,
} = require('../email/email');

const createTokenEmail = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: '300s' });
};
const createResetPasswordToken = (email, _id) => {
  return jwt.sign(
    { email, _id }, 
    process.env.SECRET, 
    { expiresIn: '600s' }
  );
};
const createTokenLogin = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '8000000s' });
};

const signupUser = async (req, res) => {
  const { firstname, surname, username, email, password, role } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const token = createTokenEmail(email);
      await sendConfirmationEmail(email, token);
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(password, salt);

      // Créer un avatar
      const avatars = new Avatars(style, { 
        base64: true,
        radius:50,
        size:48,
        backgroundColor:'#EF233C'
         
      });
      const avatar = avatars.create(`${firstname} ${surname}`);

      const newUser = new User({
        firstname,
        surname,
        username,
        email,
        password: hashpwd,
        role,
        avatar,
        token,
      });
      await newUser.save();
      res.status(200).json({
        message: 'Veuillez confirmer votre inscription en consultant votre boite mail',
        status: 200,
      });
    } else {
      res.status(400).json({ message: 'Compte déjà existant.', status: 400 });
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
      res.status(400).json({ message: 'Token déjà validé.', status: 400 });
      return;
    }
    if (decoded.exp * 1000 > new Date().getTime()) {
      await User.findOneAndUpdate({ email: decoded.email }, { token: null });
      await sendValidationAccount(decoded.email);
      res.redirect('http://localhost:5173/');
    } else {
      await User.findOneAndDelete({ email: decoded.email });
      await sendInvalideToken(decoded.email);
      res.status(400).json({ message: 'Token non valide ou expiré', status: 400 });
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
        const match = await bcrypt.compare(password, user.password)
        if (match) {
          const token = createTokenLogin(user._id);
          res.status(200).json({ user, token });
        } else {
          res.status(400).json({ message: 'Mauvaise adresse e-mail ou mot de passe' });
        }
      } else {
        res.status(400).json({ message: 'Email non validé' });
      }
    } else {
      res.status(400).json({ message: 'Mauvaise adresse e-mail ou mot de passe' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('relatedId');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('relatedId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // Vérifier si le mot de passe est présent dans la requête
    if (password) {
      // Vérifier si le mot de passe est déjà chiffré
      const isHashed = password.startsWith('$2a$') || password.startsWith('$2b$') || password.startsWith('$2y$');
      
      if (!isHashed) {
        // Si le mot de passe n'est pas chiffré, le chiffrer
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(password, saltRounds);
      } else {
        // Si le mot de passe est déjà chiffré, ne pas le modifier
        updateData.password = password;
      }
    }

    // Mise à jour de l'utilisateur
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true } // runValidators: pour s'assurer que les validations du modèle sont respectées
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgottenPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  
  try {
    const user = await User.findOne({ email });
    console.log(user);
    
    if (user) {
      // Ici, vous pouvez décider de créer un nouveau token indépendamment de la valeur actuelle de user.token
      const token = createResetPasswordToken(email, user._id);
      console.log(token);
      
      // Mettre à jour le token de l'utilisateur dans la base de données
      user.token = token;
      await user.save(); // Sauvegarder le nouveau token dans la base de données

      await sendForgottenPassword(email, token); // Envoyer le token à l'utilisateur par email
      res.status(200).json({ message: 'Un email de réinitialisation du mot de passe a été envoyé sur votre boite mail', status: 200 });
    } else {
      res.status(400).json({ message: 'Mauvais adresse e-mail', status: 400 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  console.log(req.body);
  

  try {

    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(password, salt);


    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashpwd },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

  
    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });

  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};


const verifyResetPassword = async (req, res) => {
  const token = req.params.token;
  console.log(token);
  
  try {
    // Vérifier la validité du token
    const decoded = jwt.verify(token, process.env.SECRET, {
      ignoreExpiration: true,
    });
    console.log(decoded);
    
    // Rechercher l'utilisateur avec ce token
    const user = await User.findOne({ token: token });

    // Si aucun utilisateur n'est trouvé avec ce token
    if (!user) {
      res.status(400).json({ message: 'Token non valide ou déjà utilisé.', status: 400 });
      return;
    }

    // Si le token est expiré
    if (decoded.exp * 1000 <= new Date().getTime()) {
      await User.findOneAndDelete({ email: decoded.email });
      await sendInvalideToken(decoded.email);
      res.status(400).json({ message: 'Token non valide ou expiré', status: 400 });
    } else {
      // Token valide, réinitialiser le token pour éviter la réutilisation
      await User.findOneAndUpdate({ email: decoded.email }, { token: null });
      res.redirect(`http://localhost:5173/reset-password/${user._id}`);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la vérification du token.' });
  }
};

module.exports = {
  forgottenPassword,
  verifyResetPassword,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
  signupUser,
  verifyMail,
  signinUser,
  createUser,
  resetPassword
};
