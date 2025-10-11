import React from 'react'
import useCounterStore from '../store/counterStore'
import { Box, Typography } from '@mui/material'

const Component1: React.FC = () => {
  const count = useCounterStore((state) => state.count)

  return (
    <Box
      sx={{
        border: '2px solid red',
        borderRadius: '16px',
        p: 3,
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography variant="h5" color="red">
        Counter Value: {count}
      </Typography>
    </Box>
  )
}

export default Component1
