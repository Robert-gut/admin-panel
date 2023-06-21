import './profile.css'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Profile() {
  return (
          <div className={"box"}>

      <div id="gradient"></div>
      <div id="card">
          <div className={"name"}>
    <Stack direction="row" spacing={2}>
        <Avatar
        alt="Name Namowich"
        src="https://i.ytimg.com/vi/K6bDF8f6MRM/maxresdefault.jpg"
        sx={{ width: 85, height: 85 }}
      />
    </Stack>

          </div>


        <p>Name: Billy Herrington</p>
        <p>Email: admin@email.com</p>
        <p>Role: Administrator</p>
          <p>When programmers open Photoshop during LGBTQ+ month, they simply click the "Rainbow Magic" button!</p>
        <span className="left bottom">tel: 731 366 ***</span>
        <span className="right bottom">address: United States</span>
      </div>

          </div>
  );
}





//