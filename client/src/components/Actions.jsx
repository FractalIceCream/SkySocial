import { Link } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';
import Auth from '../utils/auth';


const Actions = () => {

  const [themeState] = useTheme();

  const actionStyles = {
    background: themeState.darkTheme ? '#333' : '#fff',
    color: themeState.darkTheme ? '#fff' : '#333',
    // Add other styles as needed
  };

  return (
    <>
      {Auth.loggedIn() && ( 
      <div className="h-actionsWidget w-actionsWidget shadow-inner-strongest font-custom box-border flex flex-wrap items-center justify-center rounded-custom bg-gray" style={actionStyles}>
        <div className="flex flex-col text-5xl font-thin">
          <button className=""><Link style={{textDecoration: 'none', color:'inherit'}} to='/'>Home</Link></button>
          <button className="mt-9"><Link style={{textDecoration: 'none', color:'inherit'}} to='/me'>Profile</Link></button>
          <button className="mt-9" style={{textDecoration: 'none', color:'inherit'}} onClick={Auth.logout}>Log Out</button>
        </div>
      </div>
     )}
    </>
  );
};




export default Actions;




