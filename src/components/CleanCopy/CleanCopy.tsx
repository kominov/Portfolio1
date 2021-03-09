import { on } from 'node:events'
import React from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { ApprovalDocument, Status } from '../../interfaces/interfaces'
import { DataCheck } from '../CheckDraft/DataCheck'
import { IdCheck } from '../CheckDraft/IdCheck'
import { InfoAboutDoc } from '../CheckDraft/InfoAboutDoc'
import { Header } from '../Header/Header'
import { CleanCopyArchive } from './CleanCopyArchive'
import { CleanCopyConfirm } from './CleanCopyConfirm'
import { CleanCopyId } from './Id/CleanCopyId'
interface CleanCopyProps {
    approvalDocument: ApprovalDocument | undefined;
    onSave: (status: Status) => void
}

export const CleanCopy: React.FunctionComponent<CleanCopyProps> = ({ onSave, approvalDocument }) => {
    const history = useHistory();
    let btnName = "";
    let btnName2 = "";

    // if (approvalDocument) { Status.approval ? btnName = "Согласовать" : btnName = "Отправить на согласование"; }

    const handlerStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
        switch (approvalDocument?.status) {
            case "Черновик":
                onSave(Status.confirmed);

                break;
            case "Согласован":

                onSave(Status.archived);
                break;
            default:
                break;
        }
    }
    return (<>
        <Header title={approvalDocument!.status} />
        <div className="container">

            <InfoAboutDoc draft={approvalDocument?.dataDraft} />
            {approvalDocument!.dataDraft.data.length >= 1 ? <DataCheck draft={approvalDocument?.dataDraft} /> : <IdCheck draft={approvalDocument?.dataDraft} />}

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



            {/* <Switch>
                <Redirect path='/cleancopy' exact to='/cleancopy/id' />
                <Route path='/cleancopy/id' render={() => <CleanCopyId />} />
                <Route path='/cleancopy/confirm' render={() => <CleanCopyConfirm />} />
                <Route path='/cleancopy/archive' render={() => <CleanCopyArchive />} />
            </Switch> */}
        </div>
    </>)
}