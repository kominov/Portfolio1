export interface IId {
    identificator: string
    key: number
    complited: boolean
}
export interface IData {
    name: string
    amount: string
    cost: string
    key: number
}
export interface IDataErrors {
    errorMessage: string 
    validation: boolean
}