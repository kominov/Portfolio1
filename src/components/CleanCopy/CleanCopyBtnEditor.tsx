import React from 'react'
import { useHistory } from 'react-router'
import { ApprovalDocument, Status } from '../../interfaces/interfaces'

interface CleanCopyBtnEditorProps {
    approvalDocument: ApprovalDocument | undefined;
    onSave: (status: Status) => void
}

export const CleanCopyBtnEditor: React.FC<CleanCopyBtnEditorProps> = ({approvalDocument,onSave}) => {
    let history = useHistory();
    return (<>
        {
            Status.approval == approvalDocument?.status
                ? (<div> <button onClick={() => { history.push('/') }} className="brd__shadow__itput m2 btn btn-primary">Отправить на доработку</button>
                    <button onClick={() => onSave(Status.confirmed)} className="brd__shadow__itput m2 btn btn-primary">Согласовать</button></div>)
                : ""}
        {
            Status.confirmed == approvalDocument?.status
                ? (<div> <button onClick={() => onSave(Status.archived)} className="brd__shadow__itput m2 btn btn-primary">Отправить в архив</button>
                    <button onClick={() => onSave(Status.archived)} className="brd__shadow__itput m2 btn btn-primary">Отправить в архив</button></div>)
                : ""}
        {
            Status.archived == approvalDocument?.status
                ? (<div> <h3>Документ в архиве</h3></div>)
                : ""}
        {
            Status.checking == approvalDocument?.status
                ? (<div> <button onClick={() => { history.push('/') }} className="brd__shadow__itput m2 btn btn-primary">Отправить на доработку</button>
                    <button onClick={() => onSave(Status.approval)} className="brd__shadow__itput m2 btn btn-primary">Отправить на согласование</button></div>)
                : ""}
    </>)
}