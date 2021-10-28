export default interface WorkCalendarData {
    id?: any | null,
    hito: {
        nombre: string,
        fechaIni: string,
        fechaFin: string,
        porcentajeCobro: number,
        entregables: [string],
    }
}