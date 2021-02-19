import React, { useState } from 'react'
import { Identificator } from '../Idetnificator/Identificator';
import s from "./StartPage.module.css"
import { useHistory } from 'react-router-dom'


export const StartPage: React.FC = () => {
    enum DocType {
        identificator = "identificator",
        data = "data"
    }
    const history = useHistory();
    let btn = "btn-secondary";
    const [docType, setDocType] = useState<DocType>();
    const [docError, setDocError] = useState(false);
    if (docType) btn = "btn-primary";

    function handleClick() {
        if (!docType) {
            setDocError(true);
            return;
        }
        if (docType == "data") { }
        if (docType == "identificator") {
            history.push('/identificator')
        }
    }
    return (
        <>
            <h1 className="document">Черновик</h1>
            <div className={s.radio__wrapper}>
                <div className={s.radio}>
                    <input className="btn-check" type='radio' id="btnradio1" name='doctype' onChange={() => setDocType(DocType.identificator)} />
                    <label className={`btn btn-outline-primary ${s.radio__label}`} htmlFor="btnradio1">Ввести идентификатор</label>
                </div>
                <div className={s.radio}>
                    <input className="btn-check" type='radio' id="btnradio2" name='doctype' onChange={() => setDocType(DocType.data)} />
                    <label className={`btn btn-outline-primary ${s.radio__label}`} htmlFor="btnradio2">Заполнить информацию о позиции</label>
                </div>
            </div>
            <button className={`btn ${btn}  ${s.next__btn}`} onClick={handleClick}>Далее</button>
        </>
    )
}