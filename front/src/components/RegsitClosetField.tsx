import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function RegistClosetField() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="closetName" label="クローゼットの名前を追加" variant="standard" />
    </Box>
  );
}
