import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Parles-nous de toi', 'Choisis les services dans lesquels tu souhaites être répertorié', 'Délimites un secteur dans lequel tu peux te déplacer'];

export default function HorizontalLinearStepper({ activeStep }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper  sx={{ width: '100%',}}activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
