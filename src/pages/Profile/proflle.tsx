import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSelectedUser } from "../../common/utils/localStorageLogic.ts";
import { logicSelectedUser } from "../EditProfile/typeProfiles.ts";
import "./profile.css";

export default function Profile() {
  const [user, setUser] = useState<logicSelectedUser>();

  useEffect(() => {
    const selectedUser = getSelectedUser();
    setUser(selectedUser);
  }, []);

  // Додаємо підписку на подію storage, що виникає при зміні стану локального сховища
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "selectedUser") {
      const updatedUser = JSON.parse(
        event.newValue || "{}"
      ) as logicSelectedUser;
      setUser(updatedUser);
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return (
    <div className={"box"}>
      <div className="card-container">
        <span className="pro">{user?.roles[0]}</span>
        <div className={"av"}>
          <Stack direction="row" spacing={2}>
            <Avatar
              className={"avatar"}
              alt="Remy Sharp"
              src="https://www.training.com.au/wp-content/uploads/admin-worker-vector.png"
              sx={{ width: 100, height: 100 }}
            />
          </Stack>
        </div>
        <h3>
          {user?.firstName} {user?.lastName}
        </h3>
        <h6>Ukraine</h6>
        <p>
          Chief manager in the company: The one who makes all the important
          decisions and takes full responsibility... for blaming others when
          things go wrong.
        </p>
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
            <li>Email: {user?.email}</li>
            <li>Phone: {user?.phone}</li>
            <li>Name: {user?.firstName}</li>
            <li>Surname: {user?.lastName}</li>
            <li>Role: {user?.roles[0]}</li>
            <li>Sex: {user?.sex}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
