import { useEffect, useState } from "react";
import userService from "../../../services/userService";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load users");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Users</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>

                  <td>
                    {user.firstName} {user.lastName}
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span
                      className={`badge ${
                        user.role === "ADMIN" ? "bg-danger" : "bg-primary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        user.enabled ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {user.enabled ? "Active" : "Disabled"}
                    </span>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;
