import {Grid, Card } from '@mui/material';
import React from 'react'
import "./Assets/CSS/ProgressPage.css";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Cookies from 'js-cookie'

const steps = [
  'File created',
  'File sent',
  'File approved',
];

const ProgressPage = () => {
  let id = Cookies.get("id")

  return (
    <Grid container className='progressPage_container'>
      <Grid className='grid' xs={6} item>
        <h1 className='candidate_heading'>Candidate Status</h1>
      <Card className='card_'>
        <h3 className='personal'>Personal id: {id}</h3>
        <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label} >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </Card>
      </Grid>
    </Grid>
  )
}

export default ProgressPage;
