import React, { useState } from 'react';
import { AddButton } from '../components/AddButton';
import { useAddModal } from '../hooks/useAddModal';


function Home() {
    const [data, setData] = useState();
	const url = "http://127.0.0.1:8003/api/v1/test/test";

    const { AddModal, openAddModal, closeAddModal } = useAddModal();


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
      <AddButton onAddClick={openAddModal}/>
      <AddModal>
        <div
          style={{
            backgroundColor: 'white',
            width: '300px',
            height: '200px',
            padding: '1em',
            borderRadius: '15px',
          }}
        >
          <h2>追加してください</h2>
          <button onClick={closeAddModal}>Close</button>
        </div>
      </AddModal>
    </div>
    );
}

export default Home;