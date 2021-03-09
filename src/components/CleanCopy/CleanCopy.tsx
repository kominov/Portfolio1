
import React from 'react'
import { ApprovalDocument, Status } from '../../interfaces/interfaces'
import { DataCheck } from '../CheckDraft/DataCheck'
import { IdCheck } from '../CheckDraft/IdCheck'
import { InfoAboutDoc } from '../CheckDraft/InfoAboutDoc'
import { Header } from '../Header/Header'
import { CleanCopyBtnEditor } from './CleanCopyBtnEditor'

interface CleanCopyProps {
    approvalDocument: ApprovalDocument | undefined;
    onSave: (status: Status) => void
}

export const CleanCopy: React.FunctionComponent<CleanCopyProps> = ({ onSave, approvalDocument }) => {
    return (<>
        <Header title={approvalDocument!.status} />
        <div className="container">

            <InfoAboutDoc draft={approvalDocument?.dataDraft} />
            {approvalDocument!.dataDraft.data.length >= 1 
            ? <DataCheck draft={approvalDocument?.dataDraft} /> 
            : <IdCheck draft={approvalDocument?.dataDraft} />}
            <CleanCopyBtnEditor approvalDocument={approvalDocument} onSave={onSave}/>



            {/* <Switch>
                <Redirect path='/cleancopy' exact to='/cleancopy/id' />
                <Route path='/cleancopy/id' render={() => <CleanCopyId />} />
                <Route path='/cleancopy/confirm' render={() => <CleanCopyConfirm />} />
                <Route path='/cleancopy/archive' render={() => <CleanCopyArchive />} />
            </Switch> */}
        </div>
    </>)
}