import React, { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Modaldelete from "../components/modaldelete";
import ModalEdit from "../components/modalEdit";
import ModalExport from "../components/modalexport";
import { useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ModalQr from "../components/modalQr";
import useUser from "../hooks/useUser";
import ModalFood from "../components/modalFood";

export default function home() {
  const navigate = useNavigate();

  const userRole = useUser();

  const [listPerson, setListPerson] = useState([]);
  const [listPersonExcel, setListPersonExcel] = useState([]);
  const [pages, setPages] = useState(0);
  const [registerNumber, setRegisterNumber] = useState("");
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [listPages, setListPages] = useState([]);
  const filter = useRef(null);
  const [cupoSep, setCupoSep] = useState("");
  const [cupoCom, setCupoCom] = useState("");
  const [cupoPen, setCupoPen] = useState("");
  const [cupoPen125, setCupoPen125] = useState("");
  const [cupoPen135, setCupoPen135] = useState("");
  const [cupoCom200, setCupoCom200] = useState("");
  const [cupoCom210, setCupoCom210] = useState("");
  const [cupoCom250, setCupoCom250] = useState("");
  const [cupoCom270, setCupoCom270] = useState("");
  const [cupoMale, setCupoMale] = useState("");
  const [cupoFemale, setCupoFemale] = useState("");
  const [tallaS, setTallaS] = useState("");
  const [tallaM, setTallaM] = useState("");
  const [tallaL, setTallaL] = useState("");
  const [tallaXL, setTallaXL] = useState("");
  const [carpa, setCarpa] = useState("");
  const [cabana, setCabana] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const classBorder = "border border-3 border-primary";
  const [filterStatus, setFilterStatus] = useState(false);
  const [hospedaStatus, setHospedaStatus] = useState(false);
  const [busStatus, setbusStatus] = useState(false);
  const [actualStatus, setActualStatus] = useState(null);
  const [tipoFiltro, setTipoFiltro] = useState("nombre");
  const [busSanta, setBusSanta] = useState("");
  const [busPan, setBusPan] = useState("");
  const [busMotupe, setBusMotube] = useState("");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getPersonByDni = async (e) => {
    e.preventDefault();
    if (filter.current.value && filter.current.id == "nombre") {
      const dni = filter.current.value;
      const res = await axios.get(
        `https://campamentoapi.pro/api/personas/nombre/${dni}`
      );
      setActualPage(0);
      setPages(0);
      setListPerson(res.data);
    } else if (filter.current.value && filter.current.id == "dni") {
      const dni = filter.current.value;
      const res = await axios.get(
        `https://campamentoapi.pro/api/personas/dni/${dni}`
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
  const getPersonByStatus = async (limit, skipPage, status) => {
    document
      .querySelector(`#${actualStatus}`)
      ?.classList?.remove("border-primary");
    document.querySelector(`#${actualStatus}`)?.classList?.remove("border-3");
    document.querySelector(`#${actualStatus}`)?.classList?.remove("border");
    document.querySelector(`#${status}`)?.classList?.add("border-primary");
    document.querySelector(`#${status}`)?.classList?.add("border-3");
    document.querySelector(`#${status}`)?.classList?.add("border");

    const total = await axios.get(
      `https://campamentoapi.pro/api/personas/estado/${status}&600&0`
    );

    const response = await axios
      .get(
        `https://campamentoapi.pro/api/personas/estado/${status}&${limit}&${skipPage}`
      )
      .then((response) => {
        console.log(response.data);
        setListPerson(response.data);
        setPages(Math.ceil(total.data.length / 13));
        if (skipPage > 0) {
          setActualPage(skipPage / 13 + 1);
        } else {
          setActualPage(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setActualStatus(status);
    setFilterStatus(true);
  };

  const getPersonByBus = async (limit, skipPage, status) => {
    document
      .querySelector(`#${actualStatus}`)
      ?.classList?.remove("border-primary");
    document.querySelector(`#${actualStatus}`)?.classList?.remove("border-3");
    document.querySelector(`#${actualStatus}`)?.classList?.remove("border");
    document.querySelector(`#${status}`)?.classList?.add("border-primary");
    document.querySelector(`#${status}`)?.classList?.add("border-3");
    document.querySelector(`#${status}`)?.classList?.add("border");

    const total = await axios.get(
      `https://campamentoapi.pro/api/personas/${status}/600&0`
    );

    const response = await axios
      .get(
        `https://campamentoapi.pro/api/personas/${status}/${limit}&${skipPage}`
      )
      .then((response) => {
        setListPerson(response.data);
        setPages(Math.ceil(total.data.length / 13));
        if (skipPage > 0) {
          setActualPage(skipPage / 13 + 1);
        } else {
          setActualPage(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setActualStatus(status);
    setbusStatus(true);
  };

  const getPersonByHospeda = async (limit, skipPage, status) => {
    document
      .querySelector(`#${actualStatus}`)
      ?.classList?.remove("border-primary");
    document.querySelector(`#${actualStatus}`)?.classList?.remove("border-3");
    document.querySelector(`#${actualStatus}`)?.classList?.remove("border");
    document.querySelector(`#${status}`)?.classList?.add("border-primary");
    document.querySelector(`#${status}`)?.classList?.add("border-3");
    document.querySelector(`#${status}`)?.classList?.add("border");

    const total = await axios.get(
      `https://campamentoapi.pro/api/personas/${status}/600&0`
    );

    const response = await axios
      .get(
        `https://campamentoapi.pro/api/personas/${status}/${limit}&${skipPage}`
      )
      .then((response) => {
        setListPerson(response.data);
        setPages(Math.ceil(total.data.length / 13));
        if (skipPage > 0) {
          setActualPage(skipPage / 13 + 1);
        } else {
          setActualPage(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setActualStatus(status);
    setHospedaStatus(true);
  };

  const getOrFilter = (limit, item) => {
    const newItem = item;
    if (filterStatus) {
      getPersonByStatus(limit, limit * newItem, actualStatus);
    } else if (hospedaStatus) {
      getPersonByHospeda(limit, limit * newItem, actualStatus);
    } else if (busStatus) {
      getPersonByBus(limit, limit * newItem, actualStatus);
    } else {
      getPersons(limit, item);
    }
  };

  const getPersonsExcel = async () => {
    const response = await axios.get(
      `https://campamentoapi.pro/api/personas?size=600`
    );
    setListPersonExcel(response.data.docs);
  };

  const getGeneralValues = async () => {
    const response = await axios.get(
      `https://campamentoapi.pro/api/personas?size=600`
    );
    setCupoCom(
      response.data.docs.filter((item) => item.estado == "completado").length
    );
    setCupoCom200(
      response.data.docs.filter((item) => item.estado == "completado200").length
    );
    setCupoCom210(
      response.data.docs.filter((item) => item.estado == "completado210").length
    );
    setCupoCom250(
      response.data.docs.filter((item) => item.estado == "completado250").length
    );
    setCupoCom270(
      response.data.docs.filter((item) => item.estado == "completado270").length
    );
    setCupoPen(
      response.data.docs.filter((item) => item.estado == "pendiente").length
    );
    setCupoSep(
      response.data.docs.filter((item) => item.estado == "separado").length
    );
    setCupoPen125(
      response.data.docs.filter((item) => item.estado == "separado125").length
    );
    setCupoPen135(
      response.data.docs.filter((item) => item.estado == "separado135").length
    );
    setCupoMale(
      response.data.docs.filter(
        (item) =>
          item.estado != "pendiente" &&
          item.hospeda != "carpa" &&
          item.genero == "M"
      ).length
    );
    setCupoFemale(
      response.data.docs.filter(
        (item) =>
          item.estado != "pendiente" &&
          item.hospeda != "carpa" &&
          item.genero == "F"
      ).length
    );
    setTallaS(
      response.data.docs.filter(
        (item) =>
          item.estado != "pendiente" &&
          item.hospeda != "carpa" &&
          item.talla == "S"
      ).length
    );
    setTallaM(
      response.data.docs.filter(
        (item) =>
          item.estado != "pendiente" &&
          item.hospeda != "carpa" &&
          item.talla == "M"
      ).length
    );
    setTallaL(
      response.data.docs.filter(
        (item) =>
          item.estado != "pendiente" &&
          item.hospeda != "carpa" &&
          item.talla == "L"
      ).length
    );
    setTallaXL(
      response.data.docs.filter(
        (item) =>
          item.estado != "pendiente" &&
          item.hospeda != "carpa" &&
          item.talla == "XL"
      ).length
    );
    setCabana(
      response.data.docs.filter(
        (item) => item.estado != "pendiente" && item.hospeda == "cabana"
      ).length
    );
    setCarpa(
      response.data.docs.filter(
        (item) => item.estado != "pendiente" && item.hospeda == "carpa"
      ).length
    );
    setBusSanta(
      response.data.docs.filter(
        (item) => item.estado != "pendiente" && item.weiPoint == "2"
      ).length
    );
    setBusPan(
      response.data.docs.filter(
        (item) => item.estado != "pendiente" && item.weiPoint == "1"
      ).length
    );
    setBusMotube(
      response.data.docs.filter(
        (item) => item.estado != "pendiente" && item.weiPoint == "3"
      ).length
    );
    console.log(response.data.docs);
  };

  useEffect(() => {
    setListPages([...Array(pages).keys()]);
  }, [pages]);

  useEffect(() => {
    getPersons(13, 0);
    getPersonsExcel();
    getGeneralValues();
  }, []);
  useEffect(() => {
    setListPerson(listPerson);
  }, [listPerson]);
  if (localStorage.getItem("user")) {
    return (
      <div className="container py-5">
        <ModalQr></ModalQr>
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
                <div className="accordion mt-2" id="accordionFilter">
                  {localStorage.getItem("role") == 1 && (
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="header1">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse1"
                          aria-expanded="true"
                          aria-controls="collapse1"
                        >
                          Filtros de Estado
                        </button>
                      </h2>
                      <div
                        id="collapse1"
                        className="accordion-collapse collapse"
                        aria-labelledby="header1"
                        data-bs-parent="#accordionFilter"
                      >
                        <div className="accordion-body">
                          <div className="container">
                            <div className="row">
                              <div className={`p-2 m-1 col card`}>
                                Total de personas registras: {registerNumber}
                              </div>
                              <div
                                className={`p-2 m-1 col card`}
                                id="pendiente"
                                role="button"
                                onClick={() =>
                                  getPersonByStatus(13, 0, "pendiente")
                                }
                              >
                                Total de cupos pendientes: {cupoPen}
                              </div>
                              <div
                                className={`p-2 m-1 col card`}
                                id="separado"
                                role="button"
                                onClick={() =>
                                  getPersonByStatus(13, 0, "separado")
                                }
                              >
                                Total de cupos separados (50%): {cupoSep}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className={`p-2 m-1 col card`}
                                id="separado125"
                                role="button"
                                onClick={() =>
                                  getPersonByStatus(13, 0, "separado125")
                                }
                              >
                                Total de cupos separados (125): {cupoPen125}
                              </div>
                              <div
                                className={`p-2 m-1 col card`}
                                id="separado135"
                                role="button"
                                onClick={() =>
                                  getPersonByStatus(13, 0, "separado135")
                                }
                              >
                                Total de cupos separados (135): {cupoPen135}
                              </div>
                              <div
                                className={`p-2 m-1 col card`}
                                id="completado"
                                role="button"
                                onClick={() =>
                                  getPersonByStatus(13, 0, "completado")
                                }
                              >
                                Total de cupos completados: {cupoCom}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className={`p-2 m-1 col card`}
                                id="completado200"
                                role="button"
                                onClick={() =>
                                  getPersonByStatus(13, 0, "completado200")
                                }
                              >
                                Total de cupos completados (200): {cupoCom200}
                              </div>
                              <div
                                className={`p-2 m-1 col card`}
                                id="completado210"
                                role="button"
                                onClick={() =>
                                  getPersonByStatus(13, 0, "completado210")
                                }
                              >
                                Total de cupos completados (210): {cupoCom210}
                              </div>
                              <div
                                className={`p-2 m-1 col card`}
                                id="completado250"
                                role="button"
                                onClick={() =>
                                  getPersonByStatus(13, 0, "completado250")
                                }
                              >
                                Total de cupos completados (250): {cupoCom250}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className={`p-2 m-1 col card`}
                                id="completado270"
                                role="button"
                                onClick={() =>
                                  getPersonByStatus(13, 0, "completado270")
                                }
                              >
                                Total de cupos completados (270): {cupoCom270}
                              </div>
                              <div className="col m-1 p-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="header3">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse3"
                        aria-expanded="true"
                        aria-controls="collapse3"
                      >
                        Filtros de Hospedaje
                      </button>
                    </h2>
                    <div
                      id="collapse3"
                      className="accordion-collapse collapse"
                      aria-labelledby="header3"
                      data-bs-parent="#accordionFilter"
                    >
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className={`p-2 m-1 col card`}>
                              Total de personas a hospedar: {cabana + carpa}
                            </div>
                            <div
                              className={`p-2 m-1 col card`}
                              id="cabana"
                              role="button"
                              onClick={() =>
                                getPersonByHospeda(13, 0, "cabana")
                              }
                            >
                              Total de personas en cabaña: {cabana}
                            </div>
                            <div
                              className={`p-2 m-1 col card`}
                              id="carpa"
                              role="button"
                              onClick={() => getPersonByHospeda(13, 0, "carpa")}
                            >
                              Total de personas en carpa: {carpa}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="header4">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse4"
                        aria-expanded="true"
                        aria-controls="collapse4"
                      >
                        Filtros de Buses
                      </button>
                    </h2>
                    <div
                      id="collapse4"
                      className="accordion-collapse collapse"
                      aria-labelledby="header4"
                      data-bs-parent="#accordionFilter"
                    >
                      <div className="accordion-body">
                        <div className="container">
                          <div className="row">
                            <div className={`p-2 m-1 col card`}>
                              Total de personas a transportar:{" "}
                              {busMotupe + busPan + busSanta}
                            </div>
                            <div
                              className={`p-2 m-1 col card`}
                              id="pan"
                              role="button"
                              onClick={() => getPersonByBus(13, 0, "pan")}
                            >
                              Pan De Vida: {busPan}
                            </div>
                            <div
                              className={`p-2 m-1 col card`}
                              id="santa"
                              role="button"
                              onClick={() => getPersonByBus(13, 0, "santa")}
                            >
                              Santa Anita: {busSanta}
                            </div>
                            <div
                              className={`p-2 m-1 col card`}
                              id="motupe"
                              role="button"
                              onClick={() => getPersonByBus(13, 0, "motupe")}
                            >
                              Motupe: {busMotupe}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="header2">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse2"
                        aria-expanded="true"
                        aria-controls="collapse2"
                      >
                        Filtros de Nombre/DNI
                      </button>
                    </h2>
                    <div
                      id="collapse2"
                      className="accordion-collapse collapse"
                      aria-labelledby="header2"
                      data-bs-parent="#accordionFilter"
                    >
                      <div className="accordion-body">
                        <div className="card col-lg-4 p-2 m-1">
                          <div className="w-100">
                            <label htmlFor="filtro" className="form-label">
                              Filtrar por:
                            </label>

                            <select
                              id="filtro"
                              className="form-select mb-4"
                              aria-label="Seleccione"
                              onChange={(e) => setTipoFiltro(e.target.value)}
                            >
                              <option value="nombre">Nombre</option>
                              <option value="dni">DNI</option>
                            </select>
                          </div>
                          <form onSubmit={getPersonByDni}>
                            <div
                              className="w-100"
                              style={{ top: "10px", right: "30px" }}
                            >
                              {(tipoFiltro == "nombre" && (
                                <div>
                                  <label
                                    htmlFor="nombre"
                                    className="form-label"
                                  >
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
                                  <button className="btn btn-primary">
                                    Buscar
                                  </button>
                                </div>
                              )) || (
                                <div>
                                  <label htmlFor="dni" className="form-label">
                                    Buscar por DNI
                                  </label>

                                  <input
                                    ref={filter}
                                    id="dni"
                                    type="number"
                                    className="form-control mb-4"
                                    placeholder="Buscar DNI"
                                    aria-label="dni"
                                  />
                                  <button className="btn btn-primary">
                                    Buscar
                                  </button>
                                </div>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between my-3">
                  <div>
                    {localStorage.getItem("role") == 1 && (
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="btn btn-success"
                        table="lista"
                        filename="Registrados"
                        sheet="Pagina"
                        buttonText="Exportar Excel"
                      />
                    )}
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#modalQr`}
                      className="btn btn-primary ms-2 d-inline-block align-self-start"
                    >
                      Escanear QR
                    </button>
                  </div>
                  <div>
                    <div className={`p-2 mx-1 col card`}>
                      Hombres: {cupoMale} | Mujeres: {cupoFemale}
                    </div>
                  </div>
                  <div>
                    <div className={`p-2 mx-1 col card`}>
                      Polos S: {tallaS} | Polos M: {tallaM} | Polos L: {tallaL}{" "}
                      | Polos XL: {tallaXL}
                    </div>
                  </div>
                </div>
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
              <table className="table table-light table-striped table-hover mw-100">
                <thead>
                  <tr className="text-left bg-slate-400">
                    <th>Estado</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Es Niño</th>
                    <th>Edad</th>
                    <th>Genero</th>
                    <th>Hospeda</th>
                    <th>Pto Partida</th>
                    <th>E. Civil</th>
                    <th>Ninos</th>
                    <th>Talla</th>
                    <th>Pastor</th>
                    <th>Iglesia</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Origen</th>
                    <th className="">DNI</th>
                    {localStorage.getItem("role") == 1 && <th>Comentario</th>}
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
                          {(localStorage.getItem("role") == 1 && (
                            <span
                              className={`badge ${
                                (item.estado == "pendiente" &&
                                  "text-bg-danger") ||
                                (item.estado == "separado" &&
                                  "text-bg-primary") ||
                                (item.estado == "separado125" &&
                                  "text-bg-primary") ||
                                (item.estado == "separado135" &&
                                  "text-bg-primary") ||
                                (item.estado == "completado" &&
                                  "text-bg-success") ||
                                (item.estado == "completado200" &&
                                  "text-bg-info") ||
                                (item.estado == "completado210" &&
                                  "text-bg-info") ||
                                (item.estado == "completado250" &&
                                  "text-bg-info") ||
                                (item.estado == "completado270" &&
                                  "text-bg-info")
                              }`}
                            >
                              {(item.estado == "completado200" &&
                                "completado (200)") ||
                                (item.estado == "completado210" &&
                                  "completado (210)") ||
                                (item.estado == "completado250" &&
                                  "completado (250)") ||
                                (item.estado == "completado270" &&
                                  "completado (270)") ||
                                (item.estado == "separado125" &&
                                  "separado (125)") ||
                                (item.estado == "separado135" &&
                                  "separado (135)") ||
                                item.estado}
                            </span>
                          )) || (
                            <span
                              className={`badge ${
                                (item.estado == "pendiente" &&
                                  "text-bg-danger") ||
                                (item.estado == "separado" &&
                                  "text-bg-primary") ||
                                (item.estado == "separado125" &&
                                  "text-bg-primary") ||
                                (item.estado == "separado135" &&
                                  "text-bg-primary") ||
                                (item.estado == "completado" &&
                                  "text-bg-success") ||
                                (item.estado == "completado200" &&
                                  "text-bg-info") ||
                                (item.estado == "completado210" &&
                                  "text-bg-info") ||
                                (item.estado == "completado250" &&
                                  "text-bg-info") ||
                                (item.estado == "completado270" &&
                                  "text-bg-info")
                              }`}
                            >
                              {(item.estado == "completado200" &&
                                "completado") ||
                                (item.estado == "completado210" &&
                                  "completado") ||
                                (item.estado == "completado250" &&
                                  "completado") ||
                                (item.estado == "completado270" &&
                                  "completado") ||
                                (item.estado == "separado125" && "separado") ||
                                (item.estado == "separado135" && "separado") ||
                                item.estado}
                            </span>
                          )}
                        </td>

                        <td className="text-nowrap text-break">
                          {item.nombre}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.apellidos}
                        </td>
                        <td className="text-nowrap text-break">
                          {(item.infante == true && "Si") || "No"}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.edad || "N/A"}
                        </td>
                        <td className="text-nowrap text-break">
                          {item.genero || "M"}
                        </td>
                        <td className="text-nowrap text-break">
                          {(item.hospeda == "carpa" && "Carpa") || ""}
                          {(item.hospeda == "cabana" && "Cabaña") || ""}
                        </td>
                        <td className="text-nowrap text-break">
                          {(item.weiPoint == "1" && "Pan de vida") || ""}
                          {(item.weiPoint == "2" && "Santa Anita") || ""}
                          {(item.weiPoint == "3" && "Motupe") || ""}
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
                        {localStorage.getItem("role") == 1 && (
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "150px" }}
                          >
                            {item.comentario}
                          </td>
                        )}
                        <td
                          className={`position-sticky end-0`}
                          style={{ position: "-webkit-sticky" }}
                        >
                          <div className="d-flex flex-row">
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target={`#b${item._id}`}
                              className={`btn btn-primary me-2 d-inline-block align-self-start ${
                                localStorage.getItem("role") == 2
                                  ? "d-none"
                                  : ""
                              }`}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              type="button"
                              className={`btn btn-danger me-2 d-inline-block align-self-start ${
                                localStorage.getItem("role") == 2
                                  ? "d-none"
                                  : ""
                              }`}
                              data-bs-toggle="modal"
                              data-bs-target={`#a${item._id}`}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-warning d-inline-block align-self-start"
                              data-bs-toggle="modal"
                              data-bs-target={`#f${item._id}`}
                            >
                              <i className="bi bi-basket"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <Modaldelete dataPerson={item}></Modaldelete>
                          <ModalEdit dataPerson={item}></ModalEdit>
                          <ModalFood dataPerson={item}></ModalFood>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ul className="pagination overflow-scroll">
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
                        onClick={() => getOrFilter(13, item)}
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
        <table
          className="table d-none table-light table-striped table-hover mw-100"
          id="lista"
        >
          <thead>
            <tr className="text-left bg-slate-400">
              <th>Estado</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Es Niño</th>
              <th>Edad</th>
              <th>Genero</th>
              <th>Hospeda</th>
              <th>Pto Partida</th>
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
            </tr>
          </thead>
          <tbody>
            {listPersonExcel.map((item, key) => {
              return (
                <tr key={key}>
                  <td className="text-nowrap">
                    <span
                      className={`badge ${
                        (item.estado == "pendiente" && "text-bg-danger") ||
                        (item.estado == "separado" && "text-bg-primary") ||
                        (item.estado == "separado125" && "text-bg-primary") ||
                        (item.estado == "separado135" && "text-bg-primary") ||
                        (item.estado == "completado" && "text-bg-success") ||
                        (item.estado == "completado200" && "text-bg-info") ||
                        (item.estado == "completado210" && "text-bg-info") ||
                        (item.estado == "completado250" && "text-bg-info") ||
                        (item.estado == "completado270" && "text-bg-info")
                      }`}
                    >
                      {(item.estado == "completado200" && "completado (200)") ||
                        (item.estado == "completado210" &&
                          "completado (210)") ||
                        (item.estado == "completado250" &&
                          "completado (250)") ||
                        (item.estado == "completado270" &&
                          "completado (270)") ||
                        (item.estado == "separado125" && "separado (125)") ||
                        (item.estado == "separado135" && "separado (135)") ||
                        item.estado}
                    </span>
                  </td>

                  <td className="text-nowrap text-break">{item.nombre}</td>
                  <td className="text-nowrap text-break">{item.apellidos}</td>
                  <td className="text-nowrap text-break">
                    {(item.infante == true && "Si") || "No"}
                  </td>
                  <td className="text-nowrap text-break">
                    {item.edad || "N/A"}
                  </td>
                  <td className="text-nowrap text-break">
                    {item.genero || "M"}
                  </td>
                  <td className="text-nowrap text-break">
                    {item.hospeda || "Cabaña"}
                  </td>
                  <td className="text-nowrap text-break">
                    {(item.weiPoint == "1" && "Pan de vida") || ""}
                    {(item.weiPoint == "2" && "Santa Anita") || ""}
                    {(item.weiPoint == "3" && "Motupe") || ""}
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
                  <td className="text-nowrap text-break">{item.pastor}</td>
                  <td className="text-nowrap text-break">{item.iglesia}</td>
                  <td className="text-nowrap text-break">{item.correo}</td>
                  <td className="text-nowrap">{item.telefono}</td>
                  <td className="text-nowrap">{item.origen}</td>
                  <td className="text-nowrap ">{item.dni}</td>
                  <td className="text-truncate" style={{ maxWidth: "150px" }}>
                    {item.comentario}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    navigate("/");
  }
}
