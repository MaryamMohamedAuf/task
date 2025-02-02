import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './/Index.css';

const Index = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const pageSize = 3;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Fetching users with search:", searchTerm, "page:", page);

                const response = await axios.get("http://localhost:5278/api/user", {
                    params: {
                        search: searchTerm || "",
                        page,
                        pageSize,
                    },
                });

                console.log("Response data:", response.data);
                setUsers(response.data.users);
                setTotalUsers(response.data.totalUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [searchTerm, page]);

    const handleSearch = (e) => {
        const value = e.target.value;
        console.log("Search input changed:", value);
        setSearchTerm(value);
        setPage(1);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-3">User List</h2>

            <div className="mb-3">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.age}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-muted">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-primary btn-sm mx-1"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary btn-sm mx-1"
                    onClick={() => setPage(page + 1)}
                    disabled={page * pageSize >= totalUsers}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Index;
