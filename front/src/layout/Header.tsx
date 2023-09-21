import { ButtonAppBar } from "../components/ButtonAppBar.jsx";


function Header(props){
  // clothetのid, nameをhomeコンポーネントから受け取る
    const { handleLogout, closets, location, setLocation} = props;

    return (
        <ButtonAppBar handleLogout={handleLogout} closets={closets} location={location} setLocation={setLocation}/>
  
    );
  }

export { Header };