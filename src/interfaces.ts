export interface IId {
    identificator: string
    key: number
    complited: boolean
}
export interface IData {
    name:string
    amount:string
    cost: string
    key: number
    
}
export interface IDataErrors {
    errorMessage:{name:string,amount:string,cost:string}
    touched:{name:boolean,amount:boolean,cost:boolean}
    validationName: boolean
    validationAmount:boolean
    validationCost:boolean
    btnValid:boolean
}