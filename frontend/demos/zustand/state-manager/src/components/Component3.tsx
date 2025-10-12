import React from 'react'
import useCounterStore from '../store/counterStore'
import { Box, Typography } from '@mui/material'

const Component3: React.FC = () => {
  // Another way to read state
  const count = useCounterStore((state) => state.getCount());

  return (
    <Box
      sx={{
        border: '2px solid blue',
        borderRadius: '16px',
        p: 1,
        textAlign: 'center',
        width: '100%'
      }}
    >
      <Typography variant="h5" color="blue">
        Counter Value: { count }
      </Typography>
    </Box>
  )
}

export default Component3
