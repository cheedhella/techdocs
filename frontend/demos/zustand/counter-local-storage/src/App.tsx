import React from 'react'
import { Container, Grid } from '@mui/material'
import Component1 from './components/Component1'
import Component2 from './components/Component2'
import Component3 from './components/Component3'

const App: React.FC = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Component1 />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Component2 />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Component3 />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
