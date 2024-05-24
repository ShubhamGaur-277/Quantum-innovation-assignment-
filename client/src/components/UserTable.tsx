// src/components/UserTable.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import authService from "../services/authService";
import "../styles/userTable.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

interface User {
  _id: string;
  name: string;
  dob: string;
  email: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([
    {
      _id: "1",
      name: "John Doe",
      dob: "1990-01-01",
      email: "john.doe@gmail.com",
    },
    {
      _id: "2",
      name: "Alex Ray",
      dob: "1985-05-15",
      email: "alex.ray@gmail.com",
    },
    {
      _id: "3",
      name: "Kate Hunington",
      dob: "1988-10-20",
      email: "kate.hunington@gmail.com",
    },
  ]);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.removeToken();
    navigate("/");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users", {
          headers: {
            Authorization: `${authService.getToken()}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);

        if (!authService.isAuthenticated()) {
          navigate("/register");
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="container-table">
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Email</th>
            <th scope="col">Position</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{user.name}</p>
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
              </td>
              <td>{user.dob}</td>
              <td>{user.email}</td>
              <td>
                <p className="fw-normal mb-1">Software engineer</p>
                <p className="text-muted mb-0">IT department</p>
              </td>
              <td>
                <MDBBadge color="success" pill>
                  Active
                </MDBBadge>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <Button variant="primary" type="button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserTable;
