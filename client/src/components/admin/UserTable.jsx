import React, { useState } from "react";

function UserTable({
  users,

  onDelete,

  onRoleChange,

  onView,
}) {
  const [search, setSearch] = useState("");

  const [role, setRole] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  // SEARCH + FILTER

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const roleMatch = role === "all" ? true : user.role === role;

    return searchMatch && roleMatch;
  });

  // PAGINATION

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,

    currentPage * usersPerPage,
  );

  const handleRoleChange = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    if (window.confirm(`Change ${user.name} role to ${newRole}?`)) {
      onRoleChange(
        user._id,

        newRole,
      );
    }
  };

  return (
    <div className="table">
       
        <div className="row p-3 ">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="🔍 Search user..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                setCurrentPage(1);
              }}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);

                setCurrentPage(1);
              }}
            >
              <option value="all">All roles</option>

              <option value="admin"> Admin</option>

              <option value="user"> User</option>
            </select>
          </div>
      
      </div>
    <div className="table">
     <h3 className="text-center">Users Liste</h3>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table">
            <tr>
              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayedUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No users found
                </td>
              </tr>
            ) : (
              displayedUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    {user.name}
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <button
                      className={
                        "btn btn-sm rounded-pill w-50 " +
                        (user.role === "admin" ? "btn-danger" : "btn-primary")
                      }
                      onClick={() => handleRoleChange(user)}
                    >
                      {user.role === "admin" ? " Admin" : " User"}
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => onView(user)}
                    >
                      👁 
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(user._id)}
                    >
                      🗑 
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center p-3">
          <button
            className="btn btn-secondary btn-sm me-3"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ⬅
          </button>

          <span className="pt-1">
            Page {currentPage} / {totalPages}
          </span>

          <button
            className="btn btn-secondary btn-sm ms-3"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            ➡
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default UserTable;
