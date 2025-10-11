import React from 'react'
import useCounterStore from '../store/counterStore'
import { Box, Button, Typography, Stack } from '@mui/material'

const Component2: React.FC = () => {
  const { count, increase, decrease } = useCounterStore()

  return (
    <Box
      sx={{
        border: '2px solid gray',
        borderRadius: '16px',
        p: 3,
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Counter Value: {count}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="primary" onClick={decrease}>
          -
        </Button>
        <Button variant="contained" color="secondary" onClick={increase}>
          +
        </Button>
      </Stack>
    </Box>
  )
}

export default Component2
