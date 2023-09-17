import axios from "axios";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ButtonAppBar from './components/Appbar';
import { Gallery } from './components/Gallery';
import SignUp from './SignUp';
import AddButton from "./components/AddButton";
import useAddModal from './hooks/useAddModal';
import { AuthProvider } from './context/AuthContext';
import NoMatch from './routes/NoMatch';
import { Home } from './pages/Home';

// import { BrowserRouter, Link, Switch, Route } from "react-router-dom";



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
	// const GetData = () => {
	// 	axios.get(url).then((res) => {
	// 		setData(res.data);
	// 	});
	// };


  return (
    <AuthProvider>
      <div style={{ margin: '2em' }}>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
      </div>
    </AuthProvider>

    // <div>
		// 	<div>ここに処理を書いていきます</div>
		// 	{data ? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}
		// </div>
  );
}

export default App;