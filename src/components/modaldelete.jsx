import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "./loader";

export default function modaldelete(item) {
  const [isLoad, setIsLoad] = useState(false);

  const deleteUrl = async () => {
    setIsLoad(true);
    const res = await axios
      .delete(`https://campamentoapi.pro/api/personas/${item.dataPerson._id}`)
      .then((res) => {
        console.log(res);
        setIsLoad(false);
        alert("Eliminado con Exito");
        location.reload();
      })
      .catch((err) => {
        setIsLoad(false);
        console.log(err);
      });
  };

  const deletePersonConfirm = () => {
    deleteUrl();
  };
  return (
    <div
      className="modal fade"
      id={`a${item.dataPerson._id}`}
      tabIndex={"-1"}
      aria-labelledby={`${item.dataPerson._id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Eliminar persona
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Seguro que quieres eliminar este registro:
            <p>
              {item.dataPerson.nombre} {item.dataPerson.apellidos}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deletePersonConfirm()}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      {isLoad && <Loader></Loader>}
    </div>
  );
}
