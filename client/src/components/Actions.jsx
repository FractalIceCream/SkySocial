import { Link } from 'react-router-dom';

import Auth from '../utils/auth';


const Actions = () => {
  return (
    <>
      {Auth.loggedIn() && ( 
      <div class="h-actionsWidget w-actionsWidget shadow-inner-strongest font-custom box-border flex flex-wrap items-center justify-center rounded-custom bg-gray">
        <div class="flex flex-col text-5xl font-thin text-white">
          <button class=""><Link style={{textDecoration: 'none', color:'inherit'}} to='/'>Home</Link></button>
          <button class="mt-9"><Link style={{textDecoration: 'none', color:'inherit'}} to='/me'>Profile</Link></button>
          <button class="mt-9" onClick={Auth.logout}>Log Out</button>
        </div>
      </div>
     )}


    </>
  );
};




export default Actions;




