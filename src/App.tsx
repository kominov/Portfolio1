import React, { useState } from 'react';
import { StartPage } from './components/StartPage/StartPage';
import { BrowserRouter, Route, Switch, useHistory, useLocation } from 'react-router-dom'

import { Header } from './components/Header/Header';
import { Draft } from './components/CheckDraft/Draft';
import { CleanCopy } from './components/CleanCopy/CleanCopy';
import { ApprovalDocument, Status } from './interfaces/interfaces';



function App() {
  const [approvalDocument, setApprovalDocument] = useState<ApprovalDocument>();
  const showDraft = !document.location.pathname.startsWith('/cleancopy');
  console.log(approvalDocument, showDraft);

  const handlerApprovalDocument = (stat: Status) => {
    if (approvalDocument) {
      setApprovalDocument({ ...approvalDocument, status: stat })
    }
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={StartPage} />
        <Route path='/draft' render={() => <Draft approvalDocument={approvalDocument} onSave={setApprovalDocument} />} />
        <Route path='/cleancopy' render={() => <CleanCopy approvalDocument={approvalDocument} onSave={status => handlerApprovalDocument(status)} />} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
