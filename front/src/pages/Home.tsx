import React, { useState } from 'react';
import { auth } from '../FirebaseConfig';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

import { AddButton } from '../components/AddButton';
import { Header } from '../layout/Header';
import { Clothet } from '../layout/Clothet';
import { AddModal } from '../components/AddModal';

function Home () {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const handleLogout = () => {
        auth.signOut();
        navigate("/login", { state: { id: 1 } });
    }

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
    if (!user) {
        console.log(user)
        return <Navigate replace to="/login" />
    };
    return(
        console.log(user),
        <div>
        <Header />
        <Clothet urls={urls} setUrls={setUrls} onLinkClick={handleLink} onDeleteClick={handleDelete}/>
        <AddModal/>
        <button onClick={handleLogout}>ログアウト</button>
        </div>
    );
}

export { Home };