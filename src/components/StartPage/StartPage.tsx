import React, { useState } from 'react'
import { Identificator } from '../Idetnificator/Identificator';
import s from "./StartPage.module.css"
import classNames from 'classnames';
import { useHistory } from 'react-router-dom'


export const StartPage: React.FC = () => {
    enum DocType {
        identificator = "identificator",
        data = "data"
    }
    const history = useHistory();
    const [docType, setDocType] = useState<DocType>();
    const buttonStyle = classNames('btn', s.next__btn,{
        ["btn-secondary"]: !docType,
        ["btn-primary"]: !!docType
    })

    function handleClick() {
       
        
        if (docType == "data") history.push('/data')
        if (docType == "identificator") history.push('/identificator')

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
            <button disabled={!docType} className={buttonStyle} onClick={handleClick}>Далее</button>
        </>
    )
}