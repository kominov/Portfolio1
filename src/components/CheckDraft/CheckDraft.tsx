import React from 'react'
import { DraftDocument } from '../../interfaces'
import { InfoAboutDoc } from './InfoAboutDoc'
import { DataCheck } from './DataCheck'
import { IdCheck } from './IdCheck'
import { useHistory} from 'react-router-dom'
interface CheckProps {
    draft: DraftDocument
}

export const CheckDraft: React.FC<CheckProps> = ({ draft }) => {
const history = useHistory();
    return (<>
        <InfoAboutDoc draft={draft} />
        {draft.data.length >= 1 ? <DataCheck draft={draft} /> : <IdCheck draft={draft} />}
        <button onClick={() => { history.push('/document') }} className="brd__shadow__itput m2 btn btn-primary">Назад</button>
        <button onClick={() => { history.push('/cleancopy') }} className="brd__shadow__itput m2 btn btn-primary">Далее</button>
    </>)
}