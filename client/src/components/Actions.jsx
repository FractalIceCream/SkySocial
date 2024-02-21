import { Link } from 'react-router-dom'; 

import Auth from '../utils/auth';


const Actions = () => {




return (


<div className=''>
<div className=''>
<Link to="Profile" className="">
          Profile
        </Link>
</div>

<button className='LogOut' onClick={Auth.logout}>

</button>



</div>





)



}





