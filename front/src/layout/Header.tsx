import { ButtonAppBar } from "../components/ButtonAppBar.jsx";


function Header(props){
  // clothetのid, nameをhomeコンポーネントから受け取る
    const { handleLogout } = props;

    return (
        <ButtonAppBar handleLogout={handleLogout}/>
  
    );
  }

export { Header };