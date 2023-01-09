import React, { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Modaldelete from "../components/modaldelete";
import ModalEdit from "../components/modalEdit";
import ModalExport from "../components/modalexport";
import { useNavigate } from "react-router-dom";

export default function home() {
  const navigate = useNavigate();

  const [listPerson, setListPerson] = useState([]);
  const [pages, setPages] = useState(0);
  const [registerNumber, setRegisterNumber] = useState("");
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [listPages, setListPages] = useState([]);
  const filter = useRef(null);
  const [cupoSep, setCupoSep] = useState('');
  const [cupoCom, setCupoCom] = useState('');
  const [cupoPen, setCupoPen] = useState('');
  const [cupoPen125, setCupoPen125] = useState('');
  const [cupoPen135, setCupoPen135] = useState('');
  const [cupoCom200, setCupoCom200] = useState('');
  const [cupoCom210, setCupoCom210] = useState('');
  const [cupoCom250, setCupoCom250] = useState('');
  const [cupoCom270, setCupoCom270] = useState('');

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getPersonByDni = async (e) => {
    e.preventDefault();
    if (filter.current.value) {
      const dni = filter.current.value;
      const res = await axios.get(
        `https://campamentoapi.pro/api/personas/nombre/${dni}`
      );
      setActualPage(0);
      setPages(0);
      setListPerson(res.data);
    } else {
      getPersons(13, 0);
    }
  };

  const getPersons = async (size, page) => {
    const response = await axios.get(
      `https://campamentoapi.pro/api/personas?size=${size}&page=${page}`
    );
    setNextPage(response.data.hasNextPage);
    setPrevPage(response.data.hasPrevPage);
    setActualPage(response.data.page);
    setPages(response.data.totalPages);
    setRegisterNumber(response.data.totalDocs);
    setListPerson(response.data.docs);
  };

  const getGeneralValues = async () => {
    const response = await axios.get(
      `https://campamentoapi.pro/api/personas?size=600`
    );
    setCupoCom(response.data.docs.filter((item) => item.estado == "completado").length)
    setCupoCom200(response.data.docs.filter((item) => item.estado == "completado200").length)
    setCupoCom210(response.data.docs.filter((item) => item.estado == "completado210").length)
    setCupoCom250(response.data.docs.filter((item) => item.estado == "completado250").length)
    setCupoCom270(response.data.docs.filter((item) => item.estado == "completado270").length)
    setCupoPen(response.data.docs.filter((item) => item.estado == "pendiente").length)
    setCupoSep(response.data.docs.filter((item) => item.estado == "separado").length)
    setCupoPen125(response.data.docs.filter((item) => item.estado == "separado125").length)
    setCupoPen135(response.data.docs.filter((item) => item.estado == "separado135").length)

  }

  useEffect(() => {
    setListPages([...Array(pages).keys()]);
  }, [pages]);

  useEffect(() => {
    getPersons(13, 0);
    getGeneralValues();
  }, []);
  useEffect(() => {
    setListPerson(listPerson);
  }, [listPerson]);
  if (localStorage.getItem("user")) {
    return (
      <div className="container py-5">
        <div className="card ">
          <div className="card-body position-relative">
            <div className="d-flex justify-content-between">
              <h1 className="card-title">Personas Registradas</h1>
              <button type="button" className="btn btn-danger" onClick={logout}>
                Cerrar Sesion
              </button>
            </div>
            <div className="d-flex justify-content-between">
              <div className="w-100">
                <span>Total de personas registras: {registerNumber}</span>
                <span className="ps-5">Total de cupos pendientes: {cupoPen}</span>
                <span className="ps-5">Total de cupos separados (50%): {cupoSep}</span>
                <span className="ps-5">Total de cupos separados (125): {cupoPen125}</span>
                <span className="ps-5">Total de cupos separados (135): {cupoPen135}</span>
                <span className="ps-5">Total de cupos completados: {cupoCom}</span>
                <span className="ps-5">Total de cupos completados (200): {cupoCom200}</span>
                <span className="ps-5">Total de cupos completados (210): {cupoCom210}</span>
                <span className="ps-5">Total de cupos completados (250): {cupoCom250}</span>
                <span className="ps-5">Total de cupos completados (270): {cupoCom270}</span>
                <form onSubmit={getPersonByDni}>
                  <div className="w-25" style={{ top: "10px", right: "30px" }}>
                    <label htmlFor="nombre" className="form-label">
                      Buscar por Nombre
                    </label>

                    <input
                      ref={filter}
                      id="nombre"
                      type="text"
                      className="form-control mb-4"
                      placeholder="Buscar Nombre"
                      aria-label="nombre"
                    />
                    <button className="btn btn-primary">Buscar</button>
                  </div>
                </form>
              </div>
              {/* <button
                className="btn btn-success h-25 align-self-end mb-4"
                data-bs-toggle="modal"
                data-bs-target={`#modalexport`}
              >
                Exportar
              </button>  */}
            </div>

            <div className="table-responsive overflow-scroll pt-1">
              <table className="table table-light table-striped table-hover mw-100" id='lista'>
                <thead>
                  <tr className="text-left bg-slate-400">
                    <th>Estado</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Genero</th>
                    <th>E. Civil</th>
                    <th>Ninos</th>
                    <th>Talla</th>
                    <th>Pastor</th>
                    <th>Iglesia</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Origen</th>
                    <th className="">DNI</th>
                    <th>Comentario</th>
                    <th
                      className="position-sticky end-0"
                      style={{ position: "-webkit-sticky" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listPerson.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td className="text-nowrap">
                          <span
                            className={`badge ${
                              (item.estado == "pendiente" &&
                                "text-bg-danger") ||
                              (item.estado == "separado" &&
                                "text-bg-primary") ||
                              (item.estado == "separado125" && "text-bg-primary") ||
                              (item.estado == "separado135" && "text-bg-primary") ||
                              (item.estado == "completado" && "text-bg-success") ||
                              (item.estado == "completado200" && "text-bg-info") ||
                              (item.estado == "completado210" && "text-bg-info") ||
                              (item.estado == "completado250" && "text-bg-info") ||
                              (item.estado == "completado270" && "text-bg-info")
                            }`}
                          >
                            {item.estado == 'completado200' && 'completado (200)' || item.estado == 'completado210' && 'completado (210)' || item.estado == 'completado250' && 'completado (250)' || item.estado == 'completado270' && 'completado (270)' || item.estado == 'separado125' && 'separado (125)' || item.estado == 'separado135' && 'separado (135)' || item.estado}
                          </span>
                        </td>

                        <td className="text-nowrap text-break">
                          {item.nombre}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.apellidos}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.genero || "M"}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.civil || "Soltero"}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.ninos || "No aplica"}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.talla || "M"}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.pastor}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.iglesia}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.correo}
                        </td>
                        <td className="text-nowrap">{item.telefono}</td>
                        <td className="text-nowrap">{item.origen}</td>
                        <td className="text-nowrap ">{item.dni}</td>
                        <td className="text-truncate" style={{maxWidth: "150px"}}>{item.comentario}</td>
                        <td
                          className="position-sticky end-0"
                          style={{ position: "-webkit-sticky" }}
                        >
                          <div className="d-flex flex-row">
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target={`#b${item._id}`}
                              className="btn btn-primary me-2 d-inline-block align-self-start"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger d-inline-block align-self-start"
                              data-bs-toggle="modal"
                              data-bs-target={`#a${item._id}`}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <Modaldelete dataPerson={item}></Modaldelete>
                          <ModalEdit dataPerson={item}></ModalEdit>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ul className="pagination">
              {/* <li className={`page-item ${prevPage ? "" : "disabled"}`}>
                <button className="page-link" onClick={() => getPersons(7, prevPage)}>
                  Previous
                </button>
              </li> */}
              {pages &&
                listPages?.map((item, jey) => {
                  return (
                    <li key={jey} className="page-item">
                      <button
                        className={`page-link ${
                          actualPage == jey + 1 ? "active" : ""
                        }`}
                        onClick={() => getPersons(13, item)}
                      >
                        {item + 1}
                      </button>
                    </li>
                  );
                })}
              {/* <li className={`page-item ${nextPage ? "" : "disabled"}`}>
                <button className="page-link">
                  Next
                </button>
              </li> */}
            </ul>
          </div>
        </div>
        {/* <ModalExport></ModalExport> */}
      </div>
    );
  } else {
    navigate("/");
  }
}
