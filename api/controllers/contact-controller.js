const Contact = require ("../models/contact.schema");
const mongoose = require('mongoose');
const {sendContactForm} = require("../email/email");

const sendForm = async (req, res) => {
    const { firstname, surname, email, message } = req.body;

    try {
        // Enregistrer les informations du formulaire dans la base de données
        const contact = new Contact({ firstname, surname, email, message });
        await contact.save();

        // Envoyer un email avec les informations du formulaire
        await sendContactForm(email, message, firstname, surname);

        // Répondre au client avec un statut de succès
        res.status(200).json({ message: "Formulaire envoyé avec succès. Nous reviendrons vers vous dans les meilleurs délais possibles ! " });
    } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire:", error);
        res.status(500).json({ message: "Erreur lors de l'envoi du formulaire." });
    }
}

module.exports = {
    sendForm,
};
