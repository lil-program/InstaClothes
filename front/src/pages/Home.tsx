import React, { useEffect, useState } from 'react';
import { auth } from '../FirebaseConfig';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from '../context/AuthContext';
import { OpenAPI } from '../api_clients';

import { AddButton } from '../components/AddButton';
import { Header } from '../layout/Header';
import { Clothet } from '../layout/Clothet';
import { AddModal } from '../components/AddModal';
import { ClothesService, UsersService } from '../api_clients';


// ClothesService.readClothesApiV1ClothesGetMyClothesClosetIdGet("string", )

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

    const [profile, setProfile] = useState({} as any);
    useEffect(() => {
        OpenAPI.BASE = 'http://localhost:8003'
        async function fetchData() {
            console.log(OpenAPI.TOKEN)
            const response = await UsersService.readUserMeApiV1UsersGetMyProfileGet();
            setProfile(response);
        }
        fetchData();
    }, []);

    console.log(profile)
    console.log(user)
    if (!user) {
        return <Navigate replace to="/login" />
    };
    return(
        <div>
            <AuthProvider>
                <div>
                </div>
                <Header />
                <Clothet urls={urls} setUrls={setUrls} onLinkClick={handleLink} onDeleteClick={handleDelete}/>
                <AddModal/>
                <button onClick={handleLogout}>ログアウト</button>
            </AuthProvider>
        </div>
        
    );
}

export { Home };

