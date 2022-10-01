import React, { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "./loader";

export default function modalEdit(item) {
  const [isLoad, setIsLoad] = useState(false);
  const form = useRef(null);

  useEffect(() => {
    setInputs(item.dataPerson);
  }, []);

  useEffect(() => {
    setInputs(item.dataPerson);
  }, [item]);

  const setInputs = (data) => {
    const person = {
      name: data.nombre,
      lastname: data.apellidos,
      pastor: data.pastor,
      iglesia: data.iglesia,
      correo: data.correo,
      telefono: data.telefono,
      origen: data.origen,
      estado: data.estado,
      dni: data.dni,
    };
    form.current.querySelector("#name").value = person.name;
    form.current.querySelector("#last_name").value = person.lastname;
    form.current.querySelector("#pastor").value = person.pastor;
    form.current.querySelector("#iglesia").value = person.iglesia;
    form.current.querySelector("#correo").value = person.correo;
    form.current.querySelector("#telefono").value = person.telefono;
    form.current.querySelector("#origen").value = person.origen;
    form.current.querySelector("#estado").value = person.estado;
    form.current.querySelector("#dni").value = person.dni;
  };
  const handleSubmit = async (e) => {
    setIsLoad(true);
    e.preventDefault();
    const person = {
      nombre: form.current.querySelector("#name").value,
      apellidos: form.current.querySelector("#last_name").value,
      pastor: form.current.querySelector("#pastor").value,
      iglesia: form.current.querySelector("#iglesia").value,
      correo: form.current.querySelector("#correo").value,
      telefono: form.current.querySelector("#telefono").value,
      origen: form.current.querySelector("#origen").value,
      estado: form.current.querySelector("#estado").value,
      dni: form.current.querySelector("#dni").value,
    };
    console.log();
    const res = await axios
      .put(
        `https://campamentoapi.pro/api/personas/${item.dataPerson._id}`,
        person
      )
      .then((res) => {
        console.log(res);
        setIsLoad(false);
        alert("Actualizado con Exito");
        location.reload();
      })
      .catch((err) => {
        console.log(err);
        setIsLoad(false);
      });
  };

  const deletePersonConfirm = () => {
    deleteUrl();
  };
  return (
    <div
      className="modal fade"
      id={`b${item.dataPerson._id}`}
      tabIndex={"1"}
      aria-labelledby={`b${item.dataPerson._id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar persona
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form ref={form} onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col">
                  <input
                    id="name"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Nombre"
                    aria-label="Nombre"
                  />
                  <input
                    id="last_name"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Apellidos"
                    aria-label="Apellidos"
                  />
                  <input
                    id="pastor"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Pastor"
                    aria-label="Pastor"
                  />
                  <input
                    id="iglesia"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Iglesia"
                    aria-label="Iglesia"
                  />
                  <input
                    id="correo"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Correo"
                    aria-label="Correo"
                  />
                </div>
                <div className="col">
                  <input
                    id="telefono"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Telefono"
                    aria-label="Telefono"
                  />
                  <select
                    id="origen"
                    className="form-select mb-4"
                    aria-label="Seleccione"
                  >
                    <option value="Lima">Lima</option>
                    <option value="Provincia">Provincia</option>
                  </select>
                  <select
                    id="estado"
                    className="form-select mb-4"
                    aria-label="Seleccione"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="separado">Separado</option>
                    <option value="completado">Completado</option>
                  </select>
                  <input
                    id="dni"
                    type="text"
                    className="form-control mb-4"
                    placeholder="DNI"
                    aria-label="DNI"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-danger">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoad && <Loader></Loader>}
    </div>
  );
}
