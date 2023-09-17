import { useEffect, useState } from "react";

import ButtonAppBar from './components/Appbar';
import { Gallery } from './components/Gallery';


function Header(props){
  const { onAddClick } = props;

  return (
    <ButtonAppBar onAddClick={onAddClick}/>
  );
}

function Clothet(props) {
  const { urls, onLinkClick, onDeleteClick } = props;

  return (
    <Gallery
    urls={urls}
    onLinkClick={onLinkClick}
    onDeleteClick={onDeleteClick}
    />
  );
}

function App() {
  const [urls, setUrls] = useState(["https://www.google.com/"]);

  const handleLink = (url) => {
    window.open(url, '_blank');
  };

  const handleDelete = (index) => {
      console.log("delete");
      const newwUrls = [...urls];
      newwUrls.splice(index, 1);
      setUrls(newwUrls);

  };

  const handleAddClick = () => {
    console.log("add");
    const newwUrls = [...urls];
    newwUrls.push("https://qiita.com/Hashimoto-Noriaki/items/f35a2798f0900192c2d0");
    setUrls(newwUrls);
  }

  // const [data, setData] = React.useState();
	// const url = "http://127.0.0.1:8000";

	// const GetData = () => {
	// 	axios.get(url).then((res) => {
	// 		setData(res.data);
	// 	});
	// };


  return (
    <div>
      <Header onAddClick={handleAddClick}/>
      <Clothet urls={urls} setUrls={setUrls} onLinkClick={handleLink} onDeleteClick={handleDelete}/>
    </div>
  );
}
  
export default App;