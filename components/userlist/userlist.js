import React, { useState, useEffect } from "react";
import styles from "../../styles/userlist.module.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// import { deleteUser } from "../../features/user/helpers";

export default function UserList() {
  const {
    user: { users },
  } = useSelector((state) => state);
  console.log("All users", users);

  // Exclude users with is_superuser set to true and initialize state
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  // const navigate = useNavigate(); // For redirection

  // Fetch users and update local state whenever users are fetched
  useEffect(() => {
    dispatch(getUsers()); // Fetch users
  }, [dispatch]);

  // Update data when users are fetched
  useEffect(() => {
    if (users) {
      setData(users.filter((user) => !user.is_superuser));
    }
  }, [users]);

  // const handleDelete = (user_id) => {
  //   console.log("user_id ", user_id);
  //   // Optimistically update the UI by removing the user locally
  //   setData(data.filter((user) => user.user_id !== user_id));

  //   // Dispatch the delete action to remove the user from the backend
  //   dispatch(deleteUser({ user_id: user_id }))
  //     .then(() => {
  //       console.log(`User with id ${user_id} deleted successfully.`);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting user:", error);
  //     });
  // };

  const columns = [
    { field: "id", headerName: "ID", width: 90 }, // Using user_id as id
    {
      field: "user",
      headerName: "Username",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={styles.userListUser}>
            <img
              className={styles.userListImg}
              src="/publishly_logo.jpg"
              alt=""
            />
            {params.row.user_username}
          </div>
        );
      },
    },
    { field: "user_email", headerName: "Email", width: 150 },
    { field: "user_firstname", headerName: "First Name", width: 150 },
    { field: "user_lastname", headerName: "Last Name", width: 150 },
    {
      field: "followers",
      headerName: "Followers",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/admin/user/${params.row.id}`}>
              <button className={styles.userListEdit}>View</button>
            </Link>
            <DeleteOutline
              className={styles.userListDelete}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  // Map user data to fit the DataGrid's expected `id` format
  const rows = data.map((user) => ({
    id: user.user_id, // Mapping user_id to id for DataGrid
    user_username: user.user_username,
    user_email: user.user_email,
    user_firstname: user.user_firstname || "N/A",
    user_lastname: user.user_lastname || "N/A",
    followers: user.followers ? user.followers.length : 0, // Ensure followers is always an array
  }));

  return (
    <div className={styles.userList}>
      {/* Header with Create User Button */}
      <div className={styles.userListHeader}>
        <h2>All Teams</h2>
        <button
          className={styles.createUserButton}
          onClick={() => navigate("/admin/newUser")} // Redirect to create user page
        >
          Add New
        </button>
      </div>

      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
      />
    </div>
  );
}
