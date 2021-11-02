export default interface WorkCalendarData {
    id?: any | null,
    hitos: Array<{
        nombre: string,
        fechaIni: string,
        fechaFin: string,
        porcentajeCobro: number,
        entregables: string,
    }>
}