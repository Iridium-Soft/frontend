import React, { useState } from "react";
import WorkCalendarData from "../types/workCalendar.type";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

type Props = {
  modalId: string;
  milestones: WorkCalendarData;
  nameAnnouncement: string;
  nameCompany: string;
  codeAnnouncement: string;
  partAHref: string;
  partBHref: string;
  warrantyHref: string;
  presentationHref: string;
  constitutionHref: string;
};

export const PostulationDetails = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const closeSnackbar = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const actionCloseSnackbar = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnackbar}
    >
      <span aria-hidden="true">&times;</span>
    </IconButton>
  );

  return (
    <>
      <div
        className="modal fade"
        id={props.modalId}
        tabIndex={-1}
        aria-hidden={true}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Postulación</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <h6>{props.nameAnnouncement}</h6>
                </div>
                <div className="col-6">
                  <h6>{props.nameCompany}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-6">Fecha de registro:</div>
                <div className="col-6">FECHA</div>
              </div>
              <div className="row">
                <div className="col-6">
                  Código de la convocatoria registrada:
                </div>
                <div className="col-6">{props.codeAnnouncement}</div>
              </div>
              <div className="row mt-3">
                <div className="col-auto">
                  <h6>Planificaión de la postulación</h6>
                </div>
              </div>
              {props.milestones.hitos.length === 0 ? (
                <p>Aún no existe una planificación registrada</p>
              ) : (
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="fs-5 p-3 text-center">Nombre Hito</td>
                      <td className="fs-5 p-3 text-center">Fecha Inicial</td>
                      <td className="fs-5 p-3 text-center">Fecha Final</td>
                      <td className="fs-5 p-3 text-center">
                        Porcentaje % de Cobro
                      </td>
                      <td className="fs-5 p-3 text-center">Entregables</td>
                    </tr>
                    {props.milestones.hitos.map((milestone) => (
                      <tr>
                        <td className="fs-5 p-3 text-center">
                          {milestone.nombre}
                        </td>
                        <td className="fs-5 p-3 text-center">
                          {milestone.fechaIni}
                        </td>
                        <td className="fs-5 p-3 text-center">
                          {milestone.fechaFin}
                        </td>
                        <td className="fs-5 p-3 text-center">
                          {milestone.porcentajeCobro}
                        </td>
                        <td className="fs-5 p-3 text-center">
                          {milestone.entregables}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              )}
              <h6 className="mt-4">Documentos adjuntos</h6>
              <div className="row justify-content-center">
                <a
                  href={props.partAHref !== "" ? props.partAHref : "#"}
                  className="col-auto btn btn-primary me-3"
                  onClick={() => {
                    if (props.partAHref === "") {
                      setMessage("El documento aun no fue registrado");
                      setOpen(true);
                    }
                  }}
                >
                  Parte A
                </a>
                <a
                  href={props.partBHref !== "" ? props.partBHref : "#"}
                  className="col-auto btn btn-primary me-3"
                  onClick={() => {
                    if (props.partAHref === "") {
                      setMessage("El documento aun no fue registrado");
                      setOpen(true);
                    }
                  }}
                >
                  Parte B
                </a>
                <a
                  href={props.warrantyHref !== "" ? props.warrantyHref : "#"}
                  className="col-auto btn btn-primary me-3"
                  onClick={() => {
                    if (props.partAHref === "") {
                      setMessage("El documento aun no fue registrado");
                      setOpen(true);
                    }
                  }}
                >
                  Boleta de garantía
                </a>
                <a
                  href={
                    props.presentationHref !== "" ? props.presentationHref : "#"
                  }
                  className="col-auto btn btn-primary me-3"
                  onClick={() => {
                    if (props.partAHref === "") {
                      setMessage("El documento aun no fue registrado");
                      setOpen(true);
                    }
                  }}
                >
                  Carta de presentación
                </a>
                <a
                  href={
                    props.constitutionHref !== "" ? props.constitutionHref : "#"
                  }
                  className="col-auto btn btn-primary me-3"
                  onClick={() => {
                    if (props.partAHref === "") {
                      setMessage("El documento aun no fue registrado");
                      setOpen(true);
                    }
                  }}
                >
                  Constitución
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={message}
        action={actionCloseSnackbar}
      />
    </>
  );
};
