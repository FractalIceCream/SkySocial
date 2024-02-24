import { Link } from 'react-router-dom';

import Auth from '../utils/auth';


const Actions = () => {
  return (
    <>
      {Auth.loggedIn() && ( 
      <div className="h-actionsWidget w-actionsWidget shadow-inner-strongest font-custom box-border flex flex-wrap items-center justify-center rounded-custom bg-gray">
        <div className="flex flex-col text-5xl font-thin text-white">
          <button className=""><Link style={{textDecoration: 'none', color:'inherit'}} to='/'>Home</Link></button>
          <button className="mt-9"><Link style={{textDecoration: 'none', color:'inherit'}} to='/me'>Profile</Link></button>
          <button className="mt-9" onClick={Auth.logout}>Log Out</button>
        </div>
      </div>
     )}


    </>
  );
};




export default Actions;




