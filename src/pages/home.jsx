import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Modaldelete from "../components/modaldelete";
import ModalEdit from "../components/modalEdit";

export default function home() {
  const [listPerson, setListPerson] = useState([]);
  const [pages, setPages] = useState(0);
  const [registerNumber, setRegisterNumber] = useState("");
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [listPages, setListPages] = useState([]);

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

  useEffect(() => {
    setListPages([...Array(pages).keys()]);
  }, [pages]);

  useEffect(() => {
    getPersons(13, 0);
  }, []);
  useEffect(() => {
    setListPerson(listPerson);
  }, [listPerson]);
  return (
    <div className="px-5 py-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Personas Registradas</h1>
          <p>Total de personas registras: {registerNumber}</p>
          <table className="table table-striped ">
            <thead>
              <tr className="text-left bg-slate-400">
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Pastor</th>
                <th>Iglesia</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Origen</th>
                <th>Estado</th>
                <th>DNI</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listPerson.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item.nombre}</td>
                    <td>{item.apellidos}</td>
                    <td>{item.pastor}</td>
                    <td>{item.iglesia}</td>
                    <td>{item.correo}</td>
                    <td>{item.telefono}</td>
                    <td>{item.origen}</td>
                    <td>{item.estado}</td>
                    <td>{item.dni}</td>
                    <td className="">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#b${item._id}`}
                        className="btn btn-primary me-2"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target={`#a${item._id}`}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <Modaldelete dataPerson={item}></Modaldelete>
                      <ModalEdit dataPerson={item}></ModalEdit>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
    </div>
  );
}
