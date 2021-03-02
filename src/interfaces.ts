export interface IId {
    identificator: string
    key: number
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
export interface IDoc{
    docname: string
    username:string
    date:string
    comment:string
}
export interface IDocErrors{
    errorMessage:{docname:string,username:string,date:string}
    touched:{docname:boolean,username:boolean,date:boolean}
    validationDocname: boolean
    validationUsername:boolean
    validationDate:boolean
    btnValid:boolean
}
export interface DraftDocument {
    ids: IId[];
    data: IData[];
    document: IDoc;
}