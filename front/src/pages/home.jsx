import React, { useState } from 'react';
import { AddButton } from '../components/AddButton';
import { Header } from '../layout/Header';
import { Clothet } from '../layout/Clothet';
import { AddModal } from '../components/AddModal';

function Home() {
    const [data, setData] = useState();
	const url = "http://127.0.0.1:8003/api/v1/test/test";


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

    return(

    <div>
      <Header />
      <Clothet urls={urls} setUrls={setUrls} onLinkClick={handleLink} onDeleteClick={handleDelete}/>
      <AddModal/>
    </div>
    );
}

export { Home };