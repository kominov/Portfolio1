import React from 'react'
import { DraftDocument } from '../../interfaces'
import { InfoAboutDoc } from './InfoAboutDoc'
import { DataCheck } from './DataCheck'
import { IdCheck } from './IdCheck'
interface CheckProps {
    draft: DraftDocument
}

export const CheckDraft: React.FC<CheckProps> = ({ draft }) => {

    return (<>
        <InfoAboutDoc draft={draft} />
        {draft.data.length >= 1 ? <DataCheck draft={draft} /> : <IdCheck draft={draft} />}
    </>)
}