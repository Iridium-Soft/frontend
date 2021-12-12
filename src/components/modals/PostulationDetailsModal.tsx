import React, { useEffect, useState } from "react";
import ApplicationsData from "../../types/applications.type";
import ApplicationsDataService from "../../services/applications.service";
import { IconButton, Snackbar } from "@mui/material";

type Props = {
  modalId: string;
  currentApplication: ApplicationsData;
};

export const PostulationDetailsModal = (props: Props) => {
  const [currentMilestones, setCurrentMilestones] = useState([] as any);

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

  const showSnackbar = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const retriveMilestones = async () => {
    try {
      if (props.currentApplication.idPostulacion !== -1) {
        const milestonesAux =
          await ApplicationsDataService.getApplicationMilestones(
            props.currentApplication.idPostulacion
          );
        setCurrentMilestones(milestonesAux.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retriveMilestones();
  }, [props.currentApplication.idPostulacion]);

  return (
    <>
      <div
        className="modal fade"
        id={props.modalId}
        tabIndex={-1}
        aria-labelledby={`documentsDetailsModalLabel-${props.modalId}`}
        aria-hidden={true}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id={`documentsDetailsModalLabel-${props.modalId}`}
              >
                Postulación
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-6">
                    <h6>{props.currentApplication.tituloConvocatoria}</h6>
                  </div>
                  <div className="col-6">
                    <h6>{props.currentApplication.nombreGrupoEmpresa}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">Fecha de registro: </div>
                  <div className="col-6">
                    {props.currentApplication.fechaRegistro.substr(
                      0,
                      props.currentApplication.fechaRegistro.indexOf("T")
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    Código de la convocatoria registrada:{" "}
                  </div>
                  <div className="col-6">
                    {props.currentApplication.codigoConvocatoria}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <h6>Planificaión de la postulación</h6>
                  </div>
                </div>
                {currentMilestones.length === 0 ? (
                  <div className="row">
                    <p className="col-12">
                      Aún no existe una planificación registrada
                    </p>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td className="fs-5 p-3 text-center">
                              Nombre Hito
                            </td>
                            <td className="fs-5 p-3 text-center">
                              Fecha Inicial
                            </td>
                            <td className="fs-5 p-3 text-center">
                              Fecha Final
                            </td>
                            <td className="fs-5 p-3 text-center">
                              Porcentaje % de Cobro
                            </td>
                            <td className="fs-5 p-3 text-center">
                              Entregables
                            </td>
                          </tr>
                          {currentMilestones.map(
                            (milestone: any, index: number) => (
                              <tr key={index}>
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
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                <div className="row mt-4">
                  <h6 className="col-12">Documentos adjuntos</h6>
                </div>
                <div className="row justify-content-center">
                  <a href="#" className="col-auto btn btn-primary me-3">
                    Parte A
                  </a>
                  <a href="#" className="col-auto btn btn-primary me-3">
                    Boleta de garantía
                  </a>
                  <a href="#" className="col-auto btn btn-primary me-3">
                    Carta de presentación
                  </a>
                  <a href="#" className="col-auto btn btn-primary me-3">
                    Constitución
                  </a>
                  <a href="#" className="col-auto btn btn-primary me-3">
                    Parte B
                  </a>
                </div>
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
