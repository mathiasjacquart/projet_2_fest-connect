import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionUsage() {
  return (
    <div>
      <Accordion className='mb-20'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            color:'#2B2D42',
            fontSize:'1.2rem',
            fontWeight:600,
        }}
        >
          Comment puis-je trouver un prestataire pour mon événement ?
        </AccordionSummary>
        <AccordionDetails     sx={{
            color:'#2B2D42'}}>
        Sur Fest Connect, il vous suffit de créer un compte et de remplir les informations sur votre événement. Vous pouvez ensuite parcourir les profils des prestataires, lire leurs avis et demander des devis directement sur la plateforme.
        </AccordionDetails>
      </Accordion>
      <Accordion className='mb-20'>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            color:'#2B2D42',
            fontSize:'1.2rem',
            fontWeight:600,
        }}
        >
          Quels types de prestataires sont disponibles sur Fest Connect ?
        </AccordionSummary>
        <AccordionDetails sx={{
            color:'#2B2D42'}}>
        Nous avons une large gamme de prestataires disponibles, y compris des artistes, des DJ, des photographes, des traiteurs, des décorateurs et bien d'autres professionnels de l'événementiel.
        </AccordionDetails>
      </Accordion >
      <Accordion className='mb-20'>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            color:'#2B2D42',
            fontSize:'1.2rem',
            fontWeight:600,
        }}
        >
          Comment puis-je être sûr de la qualité des prestataires ?
        </AccordionSummary>
        <AccordionDetails sx={{
            color:'#2B2D42'}}>
        Tous nos prestataires sont vérifiés par notre équipe avant d'être listés sur la plateforme. De plus, vous pouvez consulter les avis laissés par d'autres clients pour vous faire une idée de la qualité de leurs services.

        </AccordionDetails>
      </Accordion>
      <Accordion className='mb-20'>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            color:'#2B2D42',
            fontSize:'1.2rem',
            fontWeight:600,
        }}
        >
          Quels sont les avantages d'être listé sur Fest Connect ?
        </AccordionSummary>
        <AccordionDetails sx={{
            color:'#2B2D42'}}>
        En tant que prestataire sur Fest Connect, vous aurez accès à un large réseau de clients potentiels, la possibilité de recevoir des demandes de devis personnalisées et de gérer vos réservations directement via notre plateforme.

        </AccordionDetails>
      </Accordion>
      </div>
  );
}