import React, { useEffect, useState } from "react";
import ApplicationsData from "../../types/applications.type";
import ChangeOrderDataService from "../../services/changeOrder.service";
import ConformityNotificationDataService from "../../services/conformityNotification.service";
import AddendumDataService from "../../services/addendum.service";
import ContractDataService from "../../services/contract.service";
import { IconButton, Snackbar } from "@mui/material";

type Props = {
  modalId: string;
  typeDoc: string;
  currentApplication: ApplicationsData;
};

export const PostModal = (props: Props) => {
  const [visualize, setVisualize] = useState(false);
  const [currentDocument, setCurrentDocument] = useState("");

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

  const typesDocs: any = {
    cambio: {
      title: "Publicar orden de cambio",
      buttonText: "Visualizar orden de cambio",
      buttonTextHide: "Ocultar orden de cambio",
      functionGet: async () => {
        const docBase64 = await ChangeOrderDataService.getOrderDownload(
          //props.currentApplication.orden_cambio
          "PanIntegral.pdf"
        );
        setCurrentDocument(docBase64.data);
      },
      functionPost: async () => {
        const messageResponse = await ChangeOrderDataService.updatePostOrder(
          props.currentApplication.idGrupoEmpresa
        );
        showSnackbar(messageResponse.data.mensaje);
      },
    },
    conformidad: {
      title: "Publicar notificación de conformidad",
      buttonText: "Visualizar notificación de conformidad",
      buttonTextHide: "Ocultar notificación de conformidad",
      functionGet: async () => {
        const docBase64 =
          await ConformityNotificationDataService.getNotifyDownload(
            //props.currentApplication.notificacion_conformidad
            "PanIntegral.pdf"
          );
        setCurrentDocument(docBase64.data);
      },
      functionPost: async () => {
        const messageResponse =
          await ConformityNotificationDataService.updatePostNotification(
            props.currentApplication.idGrupoEmpresa
          );
        showSnackbar(messageResponse.data.mensaje);
      },
    },
    adenda: {
      title: "Publicar adenda",
      buttonText: "Visualizar adenda",
      buttonTextHide: "Ocultar adenda",
      functionGet: async () => {
        const docBase64 = await AddendumDataService.getAddendumDownload(
          //props.currentApplication.adenda
          "PanIntegral.pdf"
        );
        setCurrentDocument(docBase64.data);
      },
      functionPost: async () => {
        const messageResponse = await AddendumDataService.updatePostAddendum(
          props.currentApplication.idGrupoEmpresa
        );
        showSnackbar(messageResponse.data.mensaje);
      },
    },
    contrato: {
      title: "Publicar contrato",
      buttonText: "Visualizar contrato",
      buttonTextHide: "Ocultar contrato",
      functionGet: async () => {
        const docBase64 = await ContractDataService.getContractDownload(
          //props.currentApplication.contrato
          "PanIntegral.pdf"
        );
        setCurrentDocument(docBase64.data);
      },
      functionPost: async () => {
        const messageResponse = await ContractDataService.updatePostContract(
          props.currentApplication.idGrupoEmpresa
        );
        showSnackbar(messageResponse.data.mensaje);
      },
    },
  };

  useEffect(() => {
    if (props.typeDoc) {
      typesDocs[props.typeDoc].functionGet();
    }
  }, [props.currentApplication, props.typeDoc]);

  const modalContent = (
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-12">
          Nombre de la Grupo-Empresa:{" "}
          {props.currentApplication.nombreGrupoEmpresa}
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-12">
          Título de la convocatoria:{" "}
          {props.currentApplication.tituloConvocatoria}
        </div>
      </div>
      <div className="row mb-2">
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              setVisualize(!visualize);
            }}
          >
            {props.typeDoc && !visualize
              ? typesDocs[props.typeDoc].buttonText
              : ""}
            {props.typeDoc && visualize
              ? typesDocs[props.typeDoc].buttonTextHide
              : ""}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="modal fade"
        id={props.modalId}
        tabIndex={-1}
        aria-labelledby={`${props.modalId}Label`}
        aria-hidden={true}
      >
        <div className={`modal-dialog ${visualize ? "modal-fullscreen" : ""}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${props.modalId}Label`}>
                {props.typeDoc ? typesDocs[props.typeDoc].title : ""}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {visualize ? (
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="col-auto d-flex align-items-center">
                      {modalContent}
                    </div>
                    <div className="col-6">
                      <iframe
                        title="pdf"
                        src={`data:application/pdf;base64,${currentDocument.slice(
                          currentDocument.indexOf(",") + 1
                        )}`}
                        style={{ width: "100%", height: "690px" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                modalContent
              )}
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
                onClick={() => {
                  if (props.typeDoc) {
                    typesDocs[props.typeDoc].functionPost();
                  }
                }}
              >
                Publicar
              </button>
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
