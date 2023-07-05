import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSelectedUser} from "../../common/utils/localStorageLogic.ts";

import './profile.css'

export interface logicSelectedUser {
  id: string;
  Name: string;
  Surname: string;
  Email: string;
  PhoneNumber: number;
  EmailConfirmed: boolean;
  lockoutEnd: void; //хз шо це має бути, тому поки так))
  role: string;
}


export default function Profile() {

  const [user, setUser] = useState<logicSelectedUser>();

  useEffect(() => {
    const selectedUser = getSelectedUser();
    setUser(selectedUser);
  }, []);

  // console.log(user);


  return (
          <div className={"box"}>
    <div className="card-container">
      <span className="pro">{user?.role}</span>
      <div className={"av"}>
      <Stack direction="row" spacing={2}>
      <Avatar className={"avatar"}
        alt="Remy Sharp"
        src="https://www.training.com.au/wp-content/uploads/admin-worker-vector.png"
        sx={{ width: 100, height: 100 }}
      />
    </Stack>
        </div>
      <h3>{user?.Name} {user?.Surname}</h3>
      <h6>Ukraine</h6>
      <p>Chief manager in the company: The one who makes all the important decisions and takes full responsibility... for blaming others when things go wrong.</p>
      <div className="buttons">
        <Link to={"/admin/edit"}>
    <Button variant="contained" disableElevation>
      Edit profile
    </Button>
          </Link>
      </div>
      <div className="skills">
        <h6>Info</h6>
        <ul>
            <li>Email: {user?.Email}</li>
            <li>Phone: {user?.PhoneNumber}</li>
                      <li>Name: {user?.Name}</li>
                      <li>Surname: {user?.Surname}</li>
            <li>Role: {user?.role}</li>

        </ul>
      </div>
    </div>

          </div>
  );
}