import './profile.css'

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Profile() {
  return (
          <div className={"box"}>

    <div className="card-container">
      <span className="pro">Admin</span>
      <div className={"av"}>
      <Stack direction="row" spacing={2}>
      <Avatar className={"avatar"}
        alt="Remy Sharp"
        src="https://www.training.com.au/wp-content/uploads/admin-worker-vector.png"
        sx={{ width: 73, height: 73 }}
      />
    </Stack>
        </div>
      <h3>Ricky Park</h3>
      <h6>Ukraine</h6>
      <p>Chief manager in the company</p>
      <div className="buttons">
    <Button variant="contained" disableElevation>
      Edit profile
    </Button>
      </div>
      <div className="skills">
        <h6>Info</h6>
        <ul>
          <li>Email: admin@email.com</li>
          <li>Phone: 389 97 055 3072</li>
          <li>Address: Ukraine, Rivne</li>
          <li>Password: w*******</li>
        </ul>
      </div>
    </div>

          </div>
  );
}





//