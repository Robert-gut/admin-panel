import { useEffect, useState } from "react";
import instance from "../../common/api/axiosInstance";

const TestAuth = () => {
  const [users, setUsers] = useState<any[]>([]);
  console.log("=>(TestAuth.tsx:6) users", users);
  useEffect(() => {
    instance
      .get<any>("User/GetAllUsers?isAll=true")
      .then((resp) => {
        console.log(resp);
        setUsers(resp.data.payload);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <h1>test</h1>
      {users
        ? users.map((user) => <p key={user.id}>{user.name}</p>)
        : "Loading"}
    </div>
  );
};

export default TestAuth;
