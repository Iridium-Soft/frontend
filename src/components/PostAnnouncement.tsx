import React, { useState } from "react";
import AnnouncementData from "../types/announcement.type";
import AnnouncementDataService from "../services/announcement.service";
import documentsService from "../services/documents.service";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

type Props = {
  announcement: AnnouncementData;
  refresh: any;
  modalId: string;
};
type Consultant = {
  id: number;
  nombre: string;
};

export default function PostAnnouncement(props: Props): JSX.Element {
  const consultores: Array<Consultant> = [
    {
      id: 1,
      nombre: "Leticia Blanco",
    },
    {
      id: 2,
      nombre: "Vladimir Costas",
    },
    {
      id: 3,
      nombre: "Patricia Gonzales",
    },
  ];

  const [documento, setDocumento] = useState("");
  const [consultantsAvailables, setConsultantsAvailables] =
    useState(consultores);
  const [consultantsSelected, setConsultantsSelected] = useState(
    [] as Consultant[]
  );

  const publishAnnouncement = () => {
    const {
      id,
      titulo,
      consultorEnc,
      codigo,
      descripcion,
      fechaLimRec,
      fechaIniDur,
      fechaFinDur,
      documento,
    } = props.announcement;
    AnnouncementDataService.update(
      {
        id: id,
        titulo: titulo,
        consultorEnc: consultorEnc,
        codigo: codigo,
        descripcion: descripcion,
        fechaLimRec: fechaLimRec,
        fechaIniDur: fechaIniDur,
        fechaFinDur: fechaFinDur,
        documento: documento,
        publica: true,
        pliego: "",
      },
      id
    );
    props.refresh();
  };
  const retrieveAnnouncementDoc = () => {
    documentsService
      .get(props.announcement.documento)
      .then((response) => {
        setDocumento(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = (id: number) => {
    let consultantsSelectedAux = consultantsSelected.filter(
      (consultant) => id !== consultant.id
    );
    setConsultantsSelected(consultantsSelectedAux);

    let consultantsAvailablesAux = consultantsAvailables;
    consultantsAvailablesAux.push(
      consultores.filter((consultor) => consultor.id === id)[0]
    );
  };
  return (
    <div
      className="modal fade "
      id={props.modalId}
      data-bs-backdrop="static"
      tabIndex={-1}
      aria-labelledby={`label${props.modalId}`}
      role="dialog"
      aria-hidden={true}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`label${props.modalId}`}>
              Publicar convocatoria
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                window.location.reload();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mt-1">
              <p className="col-12 text-secondary">
                Título: {props.announcement.titulo}
              </p>
            </div>
            <div className="row">
              <p className="col-12 text-secondary">
                Código: {props.announcement.codigo}
              </p>
            </div>
            <div className="row">
              <h6 className="col-12">
                Seleccionar consultores TIS para los cuales publicar
              </h6>
            </div>
            <div className="row">
              <div className="dropdown col-md-6">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownConsultores"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Seleccione consultor
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownConsultores"
                >
                  {consultantsAvailables.map((consultor) => (
                    <li key={consultor.id}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          let consultantsSelectedAux = consultantsSelected;
                          consultantsSelectedAux.push(consultor);
                          setConsultantsSelected(consultantsSelectedAux);
                          setConsultantsAvailables(
                            consultantsAvailables.filter(
                              (consultant) => consultant !== consultor
                            )
                          );
                        }}
                      >
                        {consultor.nombre}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="row mt-3">
              <Stack direction="row" spacing={1}>
                {consultantsSelected.map((consultant) => (
                  <Chip
                    label={consultant.nombre}
                    onDelete={() => handleDelete(consultant.id)}
                  />
                ))}
              </Stack>
            </div>
            <div className="row mt-3">
              <div className="d-grid gap-2 col-6">
                <a
                  download={`${props.announcement.titulo}.pdf`}
                  className="btn btn-info text-white"
                  type="button"
                  href={documento}
                  onClick={async () => {
                    await retrieveAnnouncementDoc();
                  }}
                >
                  {props.announcement.titulo}.pdf
                </a>
              </div>
            </div>
            <div className="row mt-2">
              <p
                className={`${
                  props.announcement.publica ? "text-success" : "text-danger"
                }`}
              >
                Estado:{" "}
                {props.announcement.publica ? "Publicada" : "No publicada"}
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary text-white"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-info text-white"
              onClick={async () => {
                await publishAnnouncement();
              }}
            >
              Publicar convocatoria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
