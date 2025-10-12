import React from 'react'
import useCounterStore from '../store/counterStore'
import { Box, Typography } from '@mui/material'

const Component3: React.FC = () => {
  const count2 = useCounterStore((state) => state.count2);

  console.log("Re-rendering Component3..");
  return (
    <Box
      sx={{
        border: '2px solid blue',
        borderRadius: '16px',
        p: 1,
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography variant="h5" color="blue">
        Counter #2 Value: {count2}
      </Typography>
    </Box>
  )
}

export default Component3
