import React from "react";
import AnnouncementData from "../types/announcement.type";

type Props = {
    announcement: AnnouncementData;
    modalId: string;
};

export default function PostAnnouncement(props: Props): JSX.Element {
    const confirmApplication = () => {
        const option = window.confirm(
            `Usted como grupo-empresa GRUPO-EMPRESA desea postular a la convocatoria "${props.announcement.titulo}"`
        );
        if (option) {
            console.log("Aplicar");
        } else {
            console.log("No aplicar");
        }
    };

    return (
        <div
            className="modal fade"
            id={props.modalId}
            tabIndex={-1}
            aria-labelledby={`label${props.modalId}`}
            role="dialog"
            aria-hidden={true}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`label${props.modalId}`}>
                            {props.announcement.titulo}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <h6>{props.announcement.codigo}</h6>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <h5 className="col-12">Descripción</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quibusdam, mollitia natus corrupti corporis ipsa maiores. Quae
                                blanditiis reprehenderit doloribus obcaecati eligendi illo
                                excepturi a iusto vel alias, culpa, impedit omnis.
                            </p>
                        </div>
                        <div className="row">
                            <h5 className="col-md-8">Fecha limite de recepción: </h5>
                            <p className="col-4">Fecha1</p>
                        </div>
                        <h5>Fechas de duración del contrato</h5>
                        <div className="row">
                            <h5 className="col-md-2">Inicio: </h5>
                            <p className="col-md-2">Fecha2</p>
                            <h5 className="offset-md-3 col-md-2">Fin: </h5>
                            <p className="col-md-2">Fecha3</p>
                        </div>
                        <div className="row mt-3">
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <a className="btn btn-primary" type="button" href="#">
                                    Descargar archivo adjunto
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => confirmApplication()}
                        >
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}