import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import InboxDocumentsDataService from "../../services/inboxDocuments.service";
import "../UploadDocument.css";

type Props = {
  modalId: string;
  nameDocument: string;
  typeDocument: string;
  codeDocument: string;
  receptionDate: string;
  nameDocumentReceived: string;
  listDocsForOrderChange: Array<{ id: any; nombre: string }>;
};
type DocumentForChangeOrder = {
  documento_id: number;
  documento: any;
};

export const ModelPostulationDocsModal = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [openFooter, setOpenFooter] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [isFileUploaded, setIsFileUploaded] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [files, setFiles] = useState([] as DocumentForChangeOrder[]);

  const [documento, setDocumento] = useState("");
  const retrieveInboxDoc = () => {
    InboxDocumentsDataService.getDocumentFile(props.nameDocumentReceived)
      .then((response) => {
        setDocumento(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveInboxDoc();
  }, [props.nameDocumentReceived]);

  const updateOpenModal = () => {
    if (files.length === props.listDocsForOrderChange.length) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    updateOpenModal();
  }, [files, props.listDocsForOrderChange]);

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

  const fileToBase64 = (file: any, cb: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  const onUploadFileChange = (event: React.ChangeEvent<any>, id: number) => {
    if (event.target.files < 1 || !event.target.validity.valid) {
      return;
    }
    fileToBase64(event.target.files[0], (err: any, result: any) => {
      if (result) {
        let filesAux = files;
        let flag = false;
        for (let i = 0; i < filesAux.length; i++) {
          if (filesAux[i].documento_id === id) {
            filesAux[i].documento = result;
            flag = true;
            break;
          }
        }
        if (!flag) {
          filesAux.push({ documento_id: id, documento: result });
        }
        setFiles(filesAux);
        updateOpenModal();
      } else {
        console.log(err);
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const idModalConfirm = "inboxConfirm";

  return (
    <>
      <div
        className="modal fade"
        id={idModalConfirm}
        tabIndex={-1}
        aria-hidden={true}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                ¿Desea enviar los documentos subidos a la empresa TIS?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                data-bs-dismiss="modal"
                onClick={() => {
                  InboxDocumentsDataService.postDocumentForChangeOrder(
                    files
                  ).then((response) => {
                    setMessage(response.data);
                    setOpen(true);
                  });
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id={props.modalId}
        tabIndex={-1}
        aria-hidden={true}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.typeDocument}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <p className="text-secondary col-6">
                  <strong>Código del documento: </strong>
                </p>
                <p className="text-secondary col-6">
                  <strong>{props.codeDocument}</strong>
                </p>
              </div>
              <div className="row">
                <p className="text-secondary col-6">
                  <strong>Fecha de recepción: </strong>
                </p>
                <p className="text-secondary col-6">
                  <strong>{props.receptionDate}</strong>
                </p>
              </div>
              <div className="row">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <a
                    download={`${props.nameDocument}.pdf`}
                    className="btn btn-primary"
                    type="button"
                    href={documento}
                    onClick={async () => {
                      await retrieveInboxDoc();
                    }}
                  >{`Descargar documento ${props.nameDocument}`}</a>
                </div>
              </div>
              {props.listDocsForOrderChange.length > 0 && (
                <div className="row d-flex justify-content-end mt-4">
                  <button
                    className="btn col-auto btn-primary me-3"
                    onClick={() => {
                      setOpenFooter(!openFooter);
                    }}
                  >
                    Devolver revisión{" "}
                    <span
                      className={`fas ${
                        !openFooter
                          ? "fa-chevron-circle-down"
                          : "fa-chevron-circle-up"
                      }`}
                    ></span>
                  </button>
                </div>
              )}
            </div>
            {openFooter && props.listDocsForOrderChange.length > 0 && (
              <form
                onSubmit={handleSubmit}
                className="modal-footer d-flex justify-content-center"
              >
                <h6>Devolver documentos revisados</h6>
                <div className="col-12">
                  {props.listDocsForOrderChange.map((typeDoc, index) => (
                    <div
                      className={`file-upload btn ${
                        isFileUploaded[index] ? "btn-primary" : "btn-secondary"
                      }`}
                      style={{ width: "215px", height: "50px", margin: "5px" }}
                      key={typeDoc.id}
                    >
                      <span>{typeDoc.nombre + " "}</span>
                      <input
                        type="file"
                        name={`docUploadOC${index}`}
                        id={`docUploadOC${index}`}
                        accept="application/pdf"
                        className="upload"
                        onChange={(e) => {
                          onUploadFileChange(e, typeDoc.id);
                          let isFileUploadedAux = isFileUploaded;
                          isFileUploadedAux[index] = true;
                          setIsFileUploaded(isFileUploadedAux);
                          setOpenModal(true);
                        }}
                        required
                      />
                      <div className="fa fa-upload icon"></div>
                    </div>
                  ))}
                </div>
                <div className="col-12 mt-5">
                  <div className="row justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-success col-auto me-3"
                      data-bs-toggle={openModal ? "modal" : ""}
                      data-bs-target={`#${idModalConfirm}`}
                      onClick={() => {
                        if (
                          files.length !== props.listDocsForOrderChange.length
                        ) {
                          setMessage("Debe subir todos los documentos");
                          setOpen(true);
                        }
                      }}
                    >
                      Enviar documentos
                    </button>
                  </div>
                </div>
              </form>
            )}
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
