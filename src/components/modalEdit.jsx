import React, { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "./loader";

export default function modalEdit(item) {
  const [isLoad, setIsLoad] = useState(false);
  const form = useRef(null);

  const [baseImage, setBaseImage] = useState("");
  const [dataImageBD, setDataImageBD] = useState('')

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

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
      civil: data.civil,
      ninos: data.ninos,
      talla: data.talla,
      genero: data.genero,
      pago: data.pago
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
    form.current.querySelector("#civil").value = person.civil;
    form.current.querySelector("#ninos").value = person.ninos;
    form.current.querySelector("#talla").value = person.talla;
    form.current.querySelector("#genero").value = person.genero;
    setDataImageBD(person.pago)
    setBaseImage(person.pago)
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
      ninos: form.current.querySelector("#ninos").value,
      civil: form.current.querySelector("#civil").value,
      talla: form.current.querySelector("#talla").value,
      genero: form.current.querySelector("#genero").value,
      pago: baseImage,
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
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>

                  <input
                    id="name"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Nombre"
                    aria-label="Nombre"
                  />
                  <label htmlFor="apellidos" className="form-label">
                    Apellidos
                  </label>

                  <input
                    id="last_name"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Apellidos"
                    aria-label="Apellidos"
                  />
                  <label htmlFor="pastor" className="form-label">
                    Pastor
                  </label>

                  <input
                    id="pastor"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Pastor"
                    aria-label="Pastor"
                  />
                  <label htmlFor="iglesia" className="form-label">
                    Iglesia
                  </label>

                  <input
                    id="iglesia"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Iglesia"
                    aria-label="Iglesia"
                  />
                  <label htmlFor="correo" className="form-label">
                    Correo
                  </label>

                  <input
                    id="correo"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Correo"
                    aria-label="Correo"
                  />
                  <label htmlFor="genero" className="form-label">
                    Genero
                  </label>

                  <select
                    id="genero"
                    className="form-select mb-4"
                    aria-label="Seleccione"
                  >
                    <option value="">Seleccione</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                  <label htmlFor="civil" className="form-label">
                    Estado Civil
                  </label>

                  <select
                    id="civil"
                    className="form-select mb-4"
                    aria-label="Seleccione"
                  >
                    <option value="">Seleccione</option>
                    <option value="Soltero">Soltero</option>
                    <option value="Casado">Casado</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="telefono" className="form-label">
                    Telefono
                  </label>

                  <input
                    id="telefono"
                    type="text"
                    className="form-control mb-4"
                    placeholder="Telefono"
                    aria-label="Telefono"
                  />
                  <label htmlFor="origen" className="form-label">
                    Origen
                  </label>

                  <select
                    id="origen"
                    className="form-select mb-4"
                    aria-label="Seleccione"
                  >
                    <option value="Lima">Lima</option>
                    <option value="Provincia">Provincia</option>
                  </select>
                  <label htmlFor="estado" className="form-label">
                    Estado
                  </label>

                  <select
                    id="estado"
                    className="form-select mb-4"
                    aria-label="Seleccione"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="separado">Separado</option>
                    <option value="completado">Completado</option>
                  </select>
                  <label htmlFor="dni" className="form-label">
                    DNI
                  </label>

                  <input
                    id="dni"
                    type="text"
                    className="form-control mb-4"
                    placeholder="DNI"
                    aria-label="DNI"
                  />
                  <label htmlFor="ninos" className="form-label">
                    Ninos
                  </label>
                  <input
                    id="ninos"
                    type="number"
                    className="form-control mb-4"
                    placeholder="Cantidad"
                    aria-label="Ninos"
                  />
                  <label htmlFor="talla" className="form-label">
                    Talla
                  </label>

                  <select
                    id="talla"
                    className="form-select mb-4"
                    aria-label="Seleccione"
                  >
                    <option value="">Seleccione</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  <label htmlFor="pago" className="form-label">
                    Voucher
                  </label>
                  <input
                    id="pago"
                    type="file"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    className="form-control mb-4"
                    placeholder="Adjuntar imagen"
                    aria-label="pago"
                  />
                </div>
              </div>
              <br></br>
              <img src={baseImage || dataImageBD} className="w-100" />
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
