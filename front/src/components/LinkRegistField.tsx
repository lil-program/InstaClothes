import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function LinkRegistField(props) {
  const { closet_id, inputShopUrl, setInputShopUrl, handleAddClothe } = props;

  const handleInpuutShopUrl = (e) => {
    setInputShopUrl(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="shopUrl" label="shopのurlを追加" variant="standard" value={inputShopUrl} onChange={handleInpuutShopUrl} />
      <button onClick={() => handleAddClothe(closet_id, inputShopUrl)}>add</button>
    </Box>
  );
}
