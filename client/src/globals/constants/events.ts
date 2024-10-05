export const EXPORT_CSV_EVENT = 'exportCsv'
export const SHOW_SNACKBAR_EVENT = 'snackbarMessageChange'

export interface ShowSnackBarEvent extends Event {
    detail : {
        message: string
    }
}