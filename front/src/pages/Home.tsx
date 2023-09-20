import React, { useEffect, useState } from 'react';
import { auth } from '../FirebaseConfig';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from '../context/AuthContext';
import { OpenAPI } from '../api_clients';

import { AddButton } from '../components/AddButton';
import { Header } from '../layout/Header';
import { Clothet } from '../layout/Clothet';
import { ClotheAddModal } from '../components/ClotheAddModal';
import { ClothesService, UsersService, ClosetsService } from '../api_clients';


// ClothesService.readClothesApiV1ClothesGetMyClothesClosetIdGet("string", )

function Home () {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const handleLogout = () => {
        auth.signOut();
        navigate("/login", { state: { id: 1 } });
        console.log("logout");
    }

    const handleLogin = () => {
        navigate("/login", { state: { id: 1 } });
    }

    const [closets, setClosets] = useState({} as any);
    useEffect(() => {
        OpenAPI.BASE = 'http://localhost:8003'
        async function fetchData() {
            const closets = await ClosetsService.readClosetApiV1ClosetsGetClosetIdGet();
            setProfile(closets);
        }
        fetchData();
    }, []);
    console.log(closets.closet_id)


    const [urls, setUrls] = useState(["https://www.google.com/"]);

    const handleLink = (url) => {
        window.open(url, '_blank');
    };

    const handleDelete = (index) => {
        // clothes_idsをfactory関数に渡す

        console.log("delete");
        const newwUrls = [...urls];
        newwUrls.splice(index, 1);
        setUrls(newwUrls);

    };

    const handleAddClick = () => {

        // closet_idをfactory関数に渡す
        console.log("add");
        const newwUrls = [...urls];
        newwUrls.push("https://qiita.com/Hashimoto-Noriaki/items/f35a2798f0900192c2d0");
        setUrls(newwUrls);
    }

    const [profile, setProfile] = useState({} as any);
    useEffect(() => {
        OpenAPI.BASE = 'http://localhost:8003'
        async function fetchData() {
            const response = await UsersService.readUserMeApiV1UsersGetMyProfileGet();
            setProfile(response);
        }
        fetchData();
    }, []);

    useEffect(() => {
        OpenAPI.BASE = 'http://localhost:8003'
        async function fetchData() {
            const response = await ClosetsService.readClosetApiV1ClosetsGetClosetIdGet();
            console.log(response)
        }
        fetchData();
    });

    if (!user ) {
        return <Navigate replace to="/login" />
    };
    return(
        <div>
            <AuthProvider>
                <Header handleLogout={handleLogout}/>
                <Clothet urls={urls} setUrls={setUrls} onLinkClick={handleLink} onDeleteClick={handleDelete}/>
                <ClotheAddModal/>
            </AuthProvider>
        </div>
    );
}

export { Home };

