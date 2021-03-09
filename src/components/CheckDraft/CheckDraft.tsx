import React from 'react'
import { ApprovalDocument, DraftDocument, Status } from '../../interfaces/interfaces'
import { InfoAboutDoc } from './InfoAboutDoc'
import { DataCheck } from './DataCheck'
import { IdCheck } from './IdCheck'
import { useHistory } from 'react-router-dom'
interface CheckProps {
    draft: DraftDocument
    onSave: (approvalDocument: ApprovalDocument) => void;
}

export const CheckDraft: React.FC<CheckProps> = ({ draft, onSave }) => {
    const history = useHistory();
    const checkDataType = (event: React.MouseEvent<HTMLButtonElement>) => {
        draft.ids.length > 0 ? history.push('/cleancopy/id') : history.push('/cleancopy/data')
        onSave({ dataDraft: draft, status: draft.ids.length > 0 ? Status.approval : Status.checking })
    }

    return (<>
        <InfoAboutDoc draft={draft} />
        {draft.data.length >= 1 ? <DataCheck draft={draft} /> : <IdCheck draft={draft} />}
        <button onClick={() => { history.push('/document') }} className="brd__shadow__itput m2 btn btn-primary">Назад</button>
        <button onClick={(e) => checkDataType(e)} className="brd__shadow__itput m2 btn btn-primary">Далее</button>
    </>)
}