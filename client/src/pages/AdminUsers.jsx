    import { useEffect, useState } from "react";

    import api from "../services/api";

    import UserTable from "../components/admin/UserTable";

    import UserDetailsModal from "../components/admin/UserDetailsModal";

    function AdminUsers() {
    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
        const res = await api.get("/users");

        setUsers(res.data);
        } catch (error) {
        console.log(error);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        await api.delete(`/users/${id}`);

        fetchUsers();
    };

    const changeRole = async (id, role) => {
        await api.put(
        `/users/${id}/role`,

        {
            role,
        },
        );

        fetchUsers();
    };

    const viewUser = async (user) => {
        try {
        const res = await api.get(`/users/${user._id}/details`);

        setSelectedUser(res.data);
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <div className="container-fluid">
        <h2 className="mb-4"> <i className="bi bi-people me-2"></i>Users Management</h2>

        <UserTable
            users={users}
            onDelete={deleteUser}
            onRoleChange={changeRole}
            onView={viewUser}
        />

        <UserDetailsModal
            data={selectedUser}
            onClose={() => setSelectedUser(null)}
        />
        </div>
    );
    }

    export default AdminUsers;
