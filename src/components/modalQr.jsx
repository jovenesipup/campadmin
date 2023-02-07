import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "./loader";
import { QrReader } from 'react-qr-reader';

export default function modalQr() {
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState(null);
  const [activeCamera, setActiveCamera] = useState(false)
  const [display, setDisplay] = useState('d-block')

  const getPersonByQr = async (data) => {
    
    const res = await axios.get(`https://campamentoapi.pro/api/personas/dni/${data}`)

    if (res.data.length < 1) {
        setData('error')

      } else {
        setData(res.data[0])
        setDisplay('d-none')
      }
  }
  const resetCamera = () => {
    setDisplay('d-block')
    setData(null)
  }
  return (
    <div
      className="modal fade"
      id={`modalQr`}
      tabIndex={"-1"}
      aria-labelledby={`modalQrLabel`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Buscar persona
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {!activeCamera && (
                <button className="btn btn-primary" type="button" onClick={() => setActiveCamera(true)}>
                    Activar camara
                </button>
            ) || (
                <div id="video-container" className={`${display}`}>
                    <QrReader
                        onResult={(result, error) => {
                        if (!!result) {
                            getPersonByQr(result?.text);
                        }

                        if (!!error) {
                            //console.info(error);
                        }
                        }}
                        scanDelay={2000}
                        style={{ width: '100%'}}
                    />
                </div>
            )}
            {data && data != 'error' && (
              <div>
                <button type="button" className="btn btn-primary" onClick={() => resetCamera()}>
                    Escanear de nuevo
                </button>
                  <p>Nombre: {data?.nombre} {data?.apellidos}</p>
                  <p>DNI: {data?.dni}</p>
                  <p>Estado del cupo: {data?.estado}</p>
              </div>  
            ) || data == 'error' && (
                <p>No se encontraron resultados</p>
            )}
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
