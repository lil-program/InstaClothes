import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ClosetsService } from '../api_clients';

export function ClosetRegistField(props) {

  const [inputClosetName, setInputClosetName] = React.useState('');
  const  handleInputClosetName = (e) => {
    setInputClosetName(e.target.value);

  };

//   const handleAddClothe = async (closet_id, shop_url) => {

//     console.log(shop_url)
//     const requestBody = {"name": "string", "shop_url": shop_url};
//     await ClothesService.createClothesApiV1ClothesCreateClosetIdPost(closet_id, requestBody);

//     setInputShopUrl(shop_url);
// };
  const handleRegistCloset = async () => {
    const requestBody = {"name": inputClosetName};
    await ClosetsService.createClosetApiV1ClosetsCreatePost(requestBody);

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
      <TextField id="closetName" label="クローゼットの名前を追加" variant="standard" value={inputClosetName} onChange={handleInputClosetName}/>
      <button onClick={handleRegistCloset}>add</button>
    </Box>
  );
}
