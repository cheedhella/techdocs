import React from 'react'
import useCounterStore from '../store/counterStore'
import { Box, Typography } from '@mui/material'

const Component1: React.FC = () => {
  const count1 = useCounterStore((state) => state.count1);

  console.log("Re-rendering Component1..");
  return (
    <Box
      sx={{
        border: '2px solid red',
        borderRadius: '16px',
        p: 1,
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography variant="h5" color="red">
        Counter #1 Value: {count1}
      </Typography>
    </Box>
  )
}

export default Component1
