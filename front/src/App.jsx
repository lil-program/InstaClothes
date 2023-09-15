import { useEffect, useState } from "react";

import ButtonAppBar from './components/Appbar';
import { Gallery } from './components/Gallary';



function Header(){
    return (
      <ButtonAppBar />
    );
}

// function Image() {
//     return (

//     );
// }

// function Gallery() {
//     return (

//     );
// }

// function Main() {
//     return (

//     );
// }

// function Footer() {
//     return (

//     );
// }

function App() {
  const urls = [
    "https://www.google.com/"
    ];

  return (
    <div>
      <Header />
      <Gallery urls={urls}/>
    </div>
  );
}
  
export default App;