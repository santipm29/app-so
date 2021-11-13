import React, { useState } from "react";
import { toast } from "../utils/toast";

const initialStateForm = {
  UserName: "",
  UserEmail: "",
  UserPhone: "",
};

export const Home = () => {
  const [form, setForm] = useState(initialStateForm);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://18.204.18.23/saveUser.php", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
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
        setForm(initialStateForm);
        toast({ icon: "success", title: data?.message });
      })
      .catch((err) => {
        setLoading(false);
        toast({ icon: "error", title: err?.message });
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <h1>Agregar usuario</h1>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre completo"
            name="UserName"
            maxLength="100"
            value={form?.UserName}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Teléfono"
            name="UserPhone"
            minLength="7"
            maxLength="7"
            value={form?.UserPhone}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electronico</label>
          <input
            type="email"
            className="form-control"
            placeholder="Correo electronico"
            name="UserEmail"
            value={form?.UserEmail}
            onChange={onChange}
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
