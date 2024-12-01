import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import { Edit, Trash, Info } from "lucide-react";
import Link from "next/link";
import { deleteData } from "../../utlis/deleteData";
import confirmAction from "../../utlis/confirmAction";
import { toast } from "react-toastify";
import { successMessage } from "../../utlis/sucessMessage";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners"; // Loading spinner component
import LoadingSpinner from "../../utlis/loadingSpinner";

const Table = ({
  table,
  action,
  editPage,
  rowIdField,
  data,
  columnNames,
  onEdit,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call to fetch data
    setTimeout(() => {
      // Example: you can fetch your data from an API here
      setIsLoading(false);
    }, 2000); // Adjust the timeout to simulate loading time
  }, []);

  const onDelete = (row, table) => {
    const rowId = row[rowIdField]; // Access the ID dynamically using rowIdField
    if (!rowId) {
      console.error("Row ID not found for deletion.");
      toast.error("Invalid row ID.");
      return;
    }

    confirmAction({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      confirmText: "Yes, delete it!",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          const response = await deleteData(table, rowId);
          console.log("response", response);
          if (response.status === 200) {
            successMessage(`${table} Deleted successfully!`);
            if (action) action(); // Dispatch the action to refresh data
          } else {
            toast.error("Failed to delete.");
          }
        } catch (error) {
          toast.error("An error occurred during deletion.");
          console.error("Delete error:", error);
        }
      },
    });
  };

  const handleEdit = (row) => {
    const rowId = row[rowIdField];
    if (!rowId) {
      toast.error("Invalid row ID.");
      return;
    }
    // Navigate to the edit route
    router.push(`/admin/${editPage}?id=${rowId}`);
  };

  return (
    <div className={styles.tableRow}>
      <div className={styles.createContainer}>
        <Link href={`/admin/new${table}/`} passHref>
          <a className={styles.createUserButton}>{`Create ${table}`}</a>
        </Link>
      </div>
      <div className={styles.tblContent}>
        {isLoading ? (
          <LoadingSpinner />
        ) : data.length === 0 ? (
          <div className={styles.noDataContainer}>
            <Info size={50} className={styles.noDataIcon} />
            <p className={styles.noDataMessage}>
              There is no data for this table.
            </p>
          </div>
        ) : (
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr className={styles.columnNames}>
                {columnNames.map((name, index) => (
                  <th className={styles.thStyle} key={index}>
                    {name}
                  </th>
                ))}
                <th className={styles.thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columnNames.map((colName, colIndex) => {
                    const key = colName.toLowerCase(); // Ensure consistent key access
                    const value = row[key];

                    return (
                      <td className={styles.tdStyle} key={colIndex}>
                        {typeof value === "string" &&
                        (key.includes("date") || key.includes("time"))
                          ? new Date(value).toLocaleString()
                          : value || "-"}
                      </td>
                    );
                  })}
                  <td className={styles.tdStyle}>
                    <span
                      className={`${styles.actionIcon} ${styles.editIcon}`}
                      onClick={() => handleEdit(row)}
                    >
                      <Edit size={20} />
                    </span>
                    <span
                      className={`${styles.actionIcon} ${styles.deleteIcon}`}
                      onClick={() => onDelete(row, table)}
                    >
                      <Trash size={20} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
