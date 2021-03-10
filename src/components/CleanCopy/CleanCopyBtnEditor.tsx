import React from 'react'
import { useHistory } from 'react-router'
import { ApprovalDocument, Status } from '../../interfaces/interfaces'

interface CleanCopyBtnEditorProps {
    approvalDocument: ApprovalDocument | undefined;
    onSave: (status: Status) => void
}

export const CleanCopyBtnEditor: React.FC<CleanCopyBtnEditorProps> = ({ approvalDocument, onSave }) => {
    let history = useHistory();
    const clearStoreg = () => {
        localStorage.clear();
    }
    return (<>
        {
            Status.approval == approvalDocument?.status
                ? (<div> <button onClick={() => { approvalDocument.dataDraft.ids.length > 0 ? history.push('/draft/identificator') : history.push('/draft/data') }} className="brd__shadow__itput m2 btn btn-primary">Отправить на доработку</button>
                    <button onClick={() => onSave(Status.confirmed)} className="brd__shadow__itput m2 btn btn-primary">Согласовать</button></div>)
                : ""}
        {
            Status.confirmed == approvalDocument?.status
                ? (<div> <button onClick={() => onSave(Status.archived)} className="brd__shadow__itput m2 btn btn-primary">Отправить в архив</button></div>)
                : ""}
        {
            Status.archived == approvalDocument?.status
                ? (<div> <h3 style={{ textAlign: 'center' }}>Документ в архиве</h3>
                    <button onClick={() => {
                        history.push('/');
                        clearStoreg();}}
                        className="brd__shadow__itput mt-4 btn btn-primary">Перейти к выбору типа ввода данных</button>
                </div>)
                : ""}
        {
            Status.checking == approvalDocument?.status
                ? (<div><button onClick={() => { approvalDocument.dataDraft.ids.length > 0 ? history.push('/draft/identificator') : history.push('/draft/data') }} className="brd__shadow__itput m2 btn btn-primary">Отправить на доработку</button>
                    <button onClick={() => onSave(Status.approval)} className="brd__shadow__itput m2 btn btn-primary">Отправить на согласование</button></div>)
                : ""}
    </>)
}