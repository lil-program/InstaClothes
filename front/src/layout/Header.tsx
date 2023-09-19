import { ButtonAppBar } from '../components/AppBar';


function Header(props){
    const { onAddClick } = props;
  
    return (
      <ButtonAppBar onAddClick={onAddClick}/>
    );
  }

export { Header };