import React, { useEffect, useState } from "react";
import { auth } from "../FirebaseConfig";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthProvider, useAuthContext } from "../context/AuthContext";
import { OpenAPI } from "../api_clients";

import { Header } from "../layout/Header";
import { Clothet } from "../layout/Clothet";
import { ClotheAddModal } from "../components/ClotheAddModal";
import { Gallery } from "../components/Gallery";

import { ClothesService, UsersService, ClosetsService } from "../api_clients";


function Home() {


  // profile
//   const [profiles, setProfile] = useState({} as any);
//   useEffect(() => {
//     OpenAPI.BASE = "http://localhost:8003";
//     async function fetchData() {
//       const response = await UsersService.readUserMeApiV1UsersGetMyProfileGet();
//     }
//     fetchData().then((response) => {
//       setProfile(response);
//     });
//   }, []);



  // closets
  const [closets, setClosets] = useState([] as any);
  useEffect(() => {
    OpenAPI.BASE = import.meta.env.VITE_BACKEND_URL;
    async function fetchData() {
      const response =
        await ClosetsService.readClosetsApiV1ClosetsGetMyClosetsGet();
      setClosets(response);
      console.log(response); 
    }
    fetchData();
  }, []);




  const navigate = useNavigate();
  const { user } = useAuthContext();
  const handleLogout = () => {
    auth.signOut();
    navigate("/login", { state: { id: 1 } });
    console.log("logout");
  };



  const handleLogin = () => {
    navigate("/login", { state: { id: 1 } });
  };


  console.log(closets);
  if (!user) {
    return <Navigate replace to="/login" />;
  }
  if (closets.length === 0) {
    return <p>fafa</p>;
  }
  return (
    <div>
      <AuthProvider>
        <Header handleLogout={handleLogout} />
        {/* <Clothet urls={urls} setUrls={setUrls} onLinkClick={handleLink} onDeleteClick={handleDelete}/> */}
        <Gallery closet_id={closets[0].id} />
        <ClotheAddModal closet_id={closets[0].id}/>
      </AuthProvider>
    </div>
  );
}

export { Home };
