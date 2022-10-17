import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "./loader";


export default function modalexport() {
  const [isLoad, setIsLoad] = useState(false);
  const [dataFile, setdataFile] = useState("");

  const getData = async () => {
    const response = await axios.get(
      `https://campamentoapi.pro/api/personas?size=500&page=0`
    );
    setdataFile(response.data.docs);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(dataFile);
  }, [dataFile]);

  return (
    <div
      className="modal fade"
      id={`modalexport`}
      tabIndex={"-1"}
      aria-labelledby={`modalexportLabel`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Exportar Registro
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Se exportará el registro en excel</div>
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
              onClick={() => exportExcel()}
            >
              Exportar
            </button>
          </div>
        </div>
      </div>
      {isLoad && <Loader></Loader>}
    </div>
  );
}
