import React, { useState } from 'react'
import { Route, Switch, } from 'react-router-dom'
import { Identificator } from './components/Idetnificator/Identificator';
import { Data } from './components/Data/Data';
import { Document } from './components/Document/Document';
import { DraftDocument, IData, IDoc, IId } from './interfaces';
import { CheckDraft } from './components/CheckDraft/CheckDraft';



export const Draft: React.FC = () => {

    const [draft, setDraft] = useState<DraftDocument>({ data: [], ids: [], document: { docname: "", username: "", date: "", comment: "" } });
    return (<>

        <Switch>
            <Route path='/identificator' render={() => <Identificator onSaveState={ids => setDraft(state => ({ ...state, ids }))} />} />
            <Route path='/data' render={() => <Data onSaveState={data => setDraft(state => ({ ...state, data }))} />} />
            <Route path='/document' render={() => <Document onSaveState={document => setDraft(state => ({ ...state, document }))} />} />
            <Route path='/checkpage' render={() => <CheckDraft draft={draft} />} />
        </Switch>

    </>)
}