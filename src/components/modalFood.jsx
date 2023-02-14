import React from "react";
import axios from "axios";
import { useState } from "react";
import Loader from "./loader";

export default function modalFood(item) {
  const [isLoad, setIsLoad] = useState(false);
  const [food1, setFood1] = useState(null);
  const [food2, setFood2] = useState(null);
  const [food3, setFood3] = useState(null);
  const [food4, setFood4] = useState(null);
  const [food5, setFood5] = useState(null);
  const [food6, setFood6] = useState(null);

  console.log(item.dataPerson)

  const handleSubmit = async () => {
    setIsLoad(true);
    const person = {
      food: {
        comida1: item.dataPerson.food?.comida1 ? item.dataPerson.food.comida1 : food1,
        comida2: item.dataPerson.food?.comida2 ? item.dataPerson.food.comida2 : food2,
        comida3: item.dataPerson.food?.comida3 ? item.dataPerson.food.comida3 : food3,
        comida4: item.dataPerson.food?.comida4 ? item.dataPerson.food.comida4 : food4,
        comida5: item.dataPerson.food?.comida5 ? item.dataPerson.food.comida5 : food5,
        comida6: item.dataPerson.food?.comida6 ? item.dataPerson.food.comida6 : food6,
      },
    };
    console.log(typeof person.pago);
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

  return (
    <div
      className="modal fade"
      id={`f${item.dataPerson._id}`}
      tabIndex={"-1"}
      aria-labelledby={`f${item.dataPerson._id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Registro de comidas
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="fw-bold">
              {item.dataPerson.nombre} {item.dataPerson.apellidos}
            </p>
            <p className="fw-bold">DNI: {item.dataPerson.dni}</p>
            <div className="d-flex flex-lg-row flex-column justify-content-between gap-2 pe-2">
              <div className="card col-lg-4 col-sm-12">
                <div className="card-header">
                  <p className="fs-5">Día 1 (Jueves)</p>
                </div>
                <div className="card-body">
                  <div
                    className={`fs-2 ${
                      item.dataPerson.food?.comida1 ? "pe-none bg-success" : ""
                    }`}
                    role={"button"}
                    onClick={() => setFood1(true)}
                  >
                    {item.dataPerson.food?.comida1 || food1 && (
                        <i className="bi bi-check2-circle align-middle"></i>
                      ) || <i className="bi bi-circle align-middle"></i>}
                    <span
                      className={`fs-6 align-middle ms-1 ${
                        item.dataPerson.food?.comida1
                          ? "text-decoration-line-through"
                          : ""
                      }`}
                    >
                      Cena
                    </span>
                  </div>
                </div>
              </div>
              <div className="card col-lg-4 col-sm-12">
                <div className="card-header">
                  <p className="fs-5">Día 2 (Viernes)</p>
                </div>
                <div className="card-body">
                <div
                    className={`fs-2 ${
                      item.dataPerson.food?.comida2 ? "pe-none bg-success" : ""
                    }`}
                    role={"button"}
                    onClick={() => setFood2(true)}
                  >
                    {item.dataPerson.food?.comida2 || food2 && (
                        <i className="bi bi-check2-circle align-middle"></i>
                      ) || <i className="bi bi-circle align-middle"></i>}
                    <span
                      className={`fs-6 align-middle ms-1 ${
                        item.dataPerson.food?.comida2
                          ? "text-decoration-line-through"
                          : ""
                      }`}
                    >
                      Desayuno
                    </span>
                  </div>
                  <div
                    className={`fs-2 ${
                      item.dataPerson.food?.comida3 ? "pe-none bg-success" : ""
                    }`}
                    role={"button"}
                    onClick={() => setFood3(true)}
                  >
                    {item.dataPerson.food?.comida3 || food3 && (
                        <i className="bi bi-check2-circle align-middle"></i>
                      ) || <i className="bi bi-circle align-middle"></i>}
                    <span
                      className={`fs-6 align-middle ms-1 ${
                        item.dataPerson.food?.comida3
                          ? "text-decoration-line-through"
                          : ""
                      }`}
                    >
                      Almuerzo
                    </span>
                  </div>
                  <div
                    className={`fs-2 ${
                      item.dataPerson.food?.comida4 ? "pe-none bg-success" : ""
                    }`}
                    role={"button"}
                    onClick={() => setFood4(true)}
                  >
                    {item.dataPerson.food?.comida4 || food4 && (
                        <i className="bi bi-check2-circle align-middle"></i>
                      ) || <i className="bi bi-circle align-middle"></i>}
                    <span
                      className={`fs-6 align-middle ms-1 ${
                        item.dataPerson.food?.comida4
                          ? "text-decoration-line-through"
                          : ""
                      }`}
                    >
                      Cena
                    </span>
                  </div>
                </div>
              </div>
              <div className="card col-lg-4 col-sm-12">
                <div className="card-header">
                  <p className="fs-5">Día 3 (Sábado)</p>
                </div>
                <div className="card-body">
                <div
                    className={`fs-2 ${
                      item.dataPerson.food?.comida5 ? "pe-none bg-success" : ""
                    }`}
                    role={"button"}
                    onClick={() => setFood5(true)}
                  >
                    {item.dataPerson.food?.comida5 || food5 && (
                        <i className="bi bi-check2-circle align-middle"></i>
                      ) || <i className="bi bi-circle align-middle"></i>}
                    <span
                      className={`fs-6 align-middle ms-1 ${
                        item.dataPerson.food?.comida5
                          ? "text-decoration-line-through"
                          : ""
                      }`}
                    >
                      Desayuno
                    </span>
                  </div>
                  <div
                    className={`fs-2 ${
                      item.dataPerson.food?.comida6 ? "pe-none bg-success" : ""
                    }`}
                    role={"button"}
                    onClick={() => setFood6(true)}
                  >
                    {item.dataPerson.food?.comida6 || food6 && (
                        <i className="bi bi-check2-circle align-middle"></i>
                      ) || <i className="bi bi-circle align-middle"></i>}
                    <span
                      className={`fs-6 align-middle ms-1 ${
                        item.dataPerson.food?.comida6
                          ? "text-decoration-line-through"
                          : ""
                      }`}
                    >
                      Almuerzo
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={() => handleSubmit()}
            >
              Guardar
            </button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      {isLoad && <Loader></Loader>}
    </div>
  );
}
