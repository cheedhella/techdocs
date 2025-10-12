import React from 'react'
import useCounterStore from '../store/counterStore'
import { Box, Button, Typography, Stack } from '@mui/material'

const Counter: React.FC<{ title: string; getCount: () => number; onIncrease: () => void; onDecrease: () => void }> = ({
  title,
  getCount,
  onIncrease,
  onDecrease,
}) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h5" sx={{ mb: 2 }}>
      {title}: {getCount()}
    </Typography>
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button variant="contained" color="primary" onClick={onDecrease}>
        -
      </Button>
      <Button variant="contained" color="secondary" onClick={onIncrease}>
        +
      </Button>
    </Stack>
  </Box>
);

const Component2: React.FC = () => {
  const {
    getCount1,
    increase1,
    decrease1,
    getCount2,
    increase2,
    decrease2,
  } = useCounterStore();

  console.log("Re-rendering Component2..");
  return (
    <Box
      sx={{
        border: '2px solid gray',
        borderRadius: '16px',
        p: 1,
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Counter title="Counter 1" getCount={getCount1} onIncrease={increase1} onDecrease={decrease1} />
      <Box sx={{ borderTop: '1px solid lightgray', pt: 2, mt: 2 }}>
        <Counter title="Counter 2" getCount={getCount2} onIncrease={increase2} onDecrease={decrease2} />
      </Box>
    </Box>
  )
}

export default Component2
