import React, { useState } from 'react'
import { Route, Switch, } from 'react-router-dom'
import { Identificator } from '../Idetnificator/Identificator';
import { Data } from '../Data/Data';
import { Document } from '../Document/Document';
import { ApprovalDocument, DraftDocument, IData, IDoc, IId } from '../../interfaces/interfaces';
import { CheckDraft } from './CheckDraft';
import { Header } from '../Header/Header';
interface DraftProps {
    approvalDocument: ApprovalDocument | undefined;
    onSave: (approvalDocument: ApprovalDocument) => void;
}

export const Draft: React.FC<DraftProps> = ({ approvalDocument, onSave }) => {

    const [draft, setDraft] = useState<DraftDocument>({ data: [], ids: [], document: { docname: "", username: "", date: "", comment: "" } });

    return (<>
        <Header title={"Черновик"} />
        <div className="container">
            <Switch>
                <Route path='/draft/identificator' render={() => <Identificator onSaveState={ids => setDraft(state => ({ ...state, ids }))} />} />
                <Route path='/draft/data' render={() => <Data onSaveState={data => setDraft(state => ({ ...state, data }))} />} />
                <Route path='/draft/document' render={() => <Document onSaveState={document => setDraft(state => ({ ...state, document }))} />} />
                <Route path='/draft/checkpage' render={() => <CheckDraft draft={draft} onSave={onSave} />} />
            </Switch>
        </div>

    </>)
}