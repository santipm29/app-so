import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast } from "../utils/toast";

const columns = [
  {
    name: "Nombre",
    selector: (row) => row.UserName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.UserEmail,
    sortable: true,
  },
  {
    name: "Teléfono",
    selector: (row) => row.UserPhone,
    sortable: true,
  },
];

export const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://18.204.18.23/getUsers.php", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast({
            icon: "error",
            title: data?.message,
          });
          return;
        }

        setLoading(false);
        setData(data?.data);
      })
      .catch((err) => {
        setLoading(false);
        toast({ icon: "error", title: err?.message });
      });
  }, []);

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <DataTable columns={columns} data={data} progressPending={loading} pagination />
    </div>
  );
};
