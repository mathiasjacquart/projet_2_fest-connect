const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendContactForm = async (email, message, firstname, surname) => {
  const mailOptions = { 
    from:process.env.EMAIL_USER, 
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `${firstname} ${surname} Formulaire de contact`,
    html: `Bonjour, voici mon adresse e-mail : ${email}. <br/>
    je me permets de vous contact pour la raison suivante : <br/>
     ${message}`
  };
  await transporter.sendMail(mailOptions)
}
const sendConfirmationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation d'inscription",
    html: `<p>Merci de vous être inscrit ! Cliquez sur le lien suivant pour confirmer l'inscription : <a href="http://localhost:4560/api/users/verifyMail/${token}">Confirmer l'inscription</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
const sendForgottenPassword = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Mot de passe oublié",
    html: `<p>Vous avez oublié votre mot de passe sur Fest Connect ? Pas de problème ! Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="http://localhost:4560/api/users/resetPassword/${token}">Réinitialiser le mot de passe </a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendValidationAccount = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Inscription validée",
    html: `<p>Bienvenue sur notre site ! Cliquez sur le lien pour vous connecter : <a href="http://localhost:5173/login">Se connecter</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendInvalideToken = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Problème lors de la validation de votre compte.",
    html: `<p>Le temps d'inscription a expiré. Cliquez sur le lien pour vous inscrire à nouveau : <a href="http://localhost:5173/register">S'inscrire</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendConfirmationEmail,
  sendValidationAccount,
  sendInvalideToken,
  sendContactForm,
  sendForgottenPassword 
};
