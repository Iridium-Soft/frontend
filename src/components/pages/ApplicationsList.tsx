import React, { useEffect, useState } from "react";
import ApplicatiosnData from "../../types/applications.type";
import ApplicationsDataService from "../../services/applications.service";
import "./AnnouncementsList.css";
import { PostulationDetailsModal } from "../modals/PostulationDetailsModal";
import { PostModal } from "../modals/PostModal";

export const ApplicationsList = () => {
  const [applications, setApplications] = useState([] as ApplicatiosnData[]);
  const [typeDoc, setTypeDoc] = useState("");

  const defaultValuesCurrentApplication = {
    nombreGrupoEmpresa: "",
    idGrupoEmpresa: -1,
    idConvocatoria: -1,
    codigoConvocatoria: "",
    tituloConvocatoria: "",
    estado_id: -1,
    nombreEstado: "",
    adenda: "",
    orden_cambio: "",
    notificacion_conformidad: "",
    contrato: "",
    fechaRegistro: "",
    idPostulacion: -1,
  };
  const [currentApplication, setCurrentApplication] = useState(
    defaultValuesCurrentApplication
  );

  const retrieveApplications = async () => {
    try {
      const applicationsData = await ApplicationsDataService.get(1);
      setApplications(applicationsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveApplications();
  }, []);

  const modalDetailsApplicationId = "modal-details-application";
  const modalPostDocumentsId = "modal-post-documents";

  return (
    <>
      <PostulationDetailsModal
        modalId={modalDetailsApplicationId}
        currentApplication={currentApplication}
      />
      <PostModal
        modalId={modalPostDocumentsId}
        typeDoc={typeDoc}
        currentApplication={currentApplication}
      />
      <div className="container p-3 position-relative">
        <div className="row">
          <div className="col-12">
            <h3>Postulaciones</h3>
          </div>
        </div>
        {applications.map((application, index) => (
          <div key={index} className="row mx-0 mb-2">
            <button
              className="btn btn-info btn-md col-8 announcement"
              data-bs-toggle="modal"
              data-bs-target={`#${modalDetailsApplicationId}`}
              onClick={() => {
                setCurrentApplication(application);
              }}
            >
              <div className="row">
                <div className="col-4">{application.nombreGrupoEmpresa}</div>
                <div className="col-4">{application.tituloConvocatoria}</div>
                <div className="col-4">{application.codigoConvocatoria}</div>
              </div>
            </button>
            <div className="dropdown col-4">
              <button
                className="btn btn-info btn-md dropdown-toggle announcement"
                type="button"
                id={`dropdownMenuButton${index}`}
                data-bs-toggle="dropdown"
                aria-expanded={false}
                onClick={() => {
                  setCurrentApplication(application);
                }}
              >
                Opciones
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby={`dropdownMenuButton${index}`}
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalPostDocumentsId}`}
                    onClick={() => {
                      setTypeDoc("cambio");
                    }}
                  >
                    Publicar orden de cambio
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalPostDocumentsId}`}
                    onClick={() => {
                      setTypeDoc("conformidad");
                    }}
                  >
                    Publicar notificación de conformidad
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalPostDocumentsId}`}
                    onClick={() => {
                      setTypeDoc("adenda");
                    }}
                  >
                    Publicar adenda
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalPostDocumentsId}`}
                    onClick={() => {
                      setTypeDoc("contrato");
                    }}
                  >
                    Publicar contrato
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
