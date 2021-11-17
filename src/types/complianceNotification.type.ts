export default interface ComplianceNotificationData {
    grupoempresa_id: number,
    postulacion_id: number,
    convocatoria_id: number,
    nombre: string,
    fechaFirma: string,
    lugar: string,
    fecha_emision: string,
    evaluacion: [
        {
            evaluacion_id: number,
            puntuacion: number,
        }
    ]
}