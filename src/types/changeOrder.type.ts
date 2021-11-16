export default interface ChangeOrderData {
    grupoempresa_id: number,
    postulacion_id: number,
    convocatoria_id: number,
    nombre: string,
    cod_orden_cambio: string,
    fecha_entrega: string,
    lugar_entrega: string,
    fecha_emision: string,
    evaluacion: [
        {
            evaluacion_id: number,
            puntuacion: number,
        }
    ]
    observacion: [
        {
            documento: string,
            seccion: string,
            descripcion: string,
        }
    ]
}