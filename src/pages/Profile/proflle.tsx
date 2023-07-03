import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSelectedUser } from "../../services/api-user-service/api-user-service.ts";

import './profile.css'

interface logicSelectedUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: number;
  emailConfirmed: boolean;
  lockoutEnd: void; //хз шо це має бути, тому поки так))
  role: string;
}

export default function Profile() {
  const [user, setUser] = useState<logicSelectedUser>();

  useEffect(() => {
    const selectedUser = getSelectedUser();
    setUser(selectedUser);
  }, []);

  console.log(user);

  return (
    <div className={"box"}>
      <div className="card-container">
        <span className="pro">Admin</span>
        <div className={"av"}>
          <Stack direction="row" spacing={2}>
            <Avatar className={"avatar"}
              alt="Remy Sharp"
              src="https://www.training.com.au/wp-content/uploads/admin-worker-vector.png"
              sx={{ width: 100, height: 100 }}
            />
          </Stack>
        </div>
        <h3>Ricky Park</h3>
        <h6>Ukraine</h6>
        <p>Chief manager in the company: The one who makes all the important decisions and takes full responsibility... for blaming others when things go wrong.</p>
        <div className="buttons">
          <Link to={"/Userslist"}>
            <Button variant="contained" disableElevation>
              Edit profile
            </Button>
          </Link>
        </div>
        <div className="skills">
          <h6>Info</h6>
          <ul>
            <li>Email: {user?.email}</li>
            <li>Address: Ukraine, Rivne</li>
            <li>Password: w*******</li>
            <li>Phone: {user?.phoneNumber}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
