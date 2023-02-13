import React from "react";
import Logo from "../assets/img/logo.png";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function login() {
  const form = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const login = async (e) => {
    e.preventDefault();
    const user = form.current.querySelector("#user").value;
    const pass = form.current.querySelector("#pass").value;
    const res = await axios.get(
      `https://campamentoapi.pro/api/user/${user}&${pass}`
    );
    console.log(res);
    if (res.data.length > 0) {
      localStorage.setItem("user", res.data[0]._id);
      localStorage.setItem("role", res.data[0].role || 1)
      setUser({
        user: res.data[0].user,
        role: res.data[0].role || 1,
      });
      navigate("home");
    } else {
      setError("Usuario Incorrecto");
    }
    console.log(localStorage.getItem("user"));
  };
  return (
    <div className="container pt-5 my-5" style={{ width: "28rem" }}>
      <div className="card py-4 px-2">
        <img src={Logo} className="card-img-top w-50 container " />
        <div className="card-body">
          <h5 className="card-title text-center">Administrador campamento</h5>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            Iniciar sesion
          </h6>
          <form ref={form} className="pt-4" onSubmit={login}>
            <div className="row g-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Usuario"
                  aria-label="Usuario"
                  id="user"
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Contrasena"
                  aria-label="Contrasena"
                  id="pass"
                />
              </div>
            </div>
            <p className="text-danger">{error}</p>
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
