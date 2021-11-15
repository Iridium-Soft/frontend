import React from "react";

export const PostulationDetails = ({ modalId, milestones }) => {
  return (
    <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden={true}>
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
                <h6>Nombre convocatoria</h6>
              </div>
              <div className="col-6">
                <h6>Nombre de la Grupo-Empresa</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-6">Fecha de registro:</div>
              <div className="col-6">FECHA</div>
            </div>
            <div className="row">
              <div className="col-6">Código de la convocatoria registrada:</div>
              <div className="col-6">CÓDIGO</div>
            </div>
            <div className="row mt-3">
              <div className="col-auto">
                <h6>Planificaión de la postulación</h6>
              </div>
            </div>
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
                {milestones.map((milestone) => (
                  <tr>
                    <td className="fs-5 p-3 text-center">{milestone.nombre}</td>
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
            <h6>Documentos adjuntos</h6>
            <div className="row justify-content-center">
              <a href="" className="col-auto btn btn-primary me-3">
                Parte A
              </a>
              <a href="" className="col-auto btn btn-primary me-3">
                Parte B
              </a>
              <a href="" className="col-auto btn btn-primary me-3">
                Boleta de garantía
              </a>
              <a href="" className="col-auto btn btn-primary me-3">
                Carta de presentación
              </a>
              <a href="" className="col-auto btn btn-primary me-3">
                Constitución
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
