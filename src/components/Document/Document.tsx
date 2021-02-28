import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IDoc, IDocErrors } from '../../interfaces';
import s from './Document.module.css'
export const Document: React.FC = () => {
    function getDefaultErrorsState(): IDocErrors {
        return {
            errorMessage: { docname: "", username: "", date: "" },
            touched: { docname: false, username: false, date: false },
            validationDocname: false, validationUsername: false, validationDate: false, btnValid: false
        }
    }

    const history = useHistory();
    //храним значение инпутов
    const [document, setDocument] = useState<IDoc>({ docname: "", username: "", date: "", comment: "" });
    //стейт для ошибок
    const [errors, setErrors] = useState<IDocErrors>(getDefaultErrorsState);
    useEffect(() => {
        const save = JSON.parse(localStorage.getItem('document') || '[]') as IDoc;
        setDocument(save);
    }, []);
    useEffect(() => {
        localStorage.setItem('document', JSON.stringify(document));
    }, [document]) 
    //обрабатываем инпуты
    const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDocument(prev => ({ ...prev, [name]: value }));
        handlerErrors(name, value);
    }
    //обрабатываем текстареа
    const handlerTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setDocument(prev => ({ ...prev, [name]: value }));
    }
    const handlerErrors = (name: string, value: string) => {

        let { errorMessage, touched, validationDocname, validationUsername, validationDate, btnValid } = errors;
        switch (name) {
            case 'docname':
                validationDocname = value.length > 1;
                errorMessage.docname = validationDocname ? "" : "Название документа должно содержать минимум два символа ";
                touched.docname = validationDocname;
                break;
            case 'username':
                validationUsername = value.length > 5;
                errorMessage.username = validationUsername ? "" : "ФИО должно содержать минимум 6 символов";
                touched.username = validationUsername;
                break;
            case 'date':
                let userDate = Date.parse(value);
                let dateNow = Date.now();
                let totalDate = Math.round((userDate - dateNow) / 3600000);
                validationDate = totalDate > 120;
                errorMessage.date = validationDate ? '' : 'Вы ввели некорректную дату, либо до даты начала работ меньше 5 дней. Измените дату на более поздний срок!'
                touched.date = validationDate;
                break;
            default:
                break;
        }
        btnValid = (validationDocname && validationUsername && validationDate);
        setErrors({ errorMessage, touched, validationDocname, validationUsername, validationDate, btnValid, })
    }
    console.log(errors.validationDate);
    console.log(errors.validationDocname);
    console.log(errors.validationUsername);
    // const handlerErrorsOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {

    //     let { errorMessage, touched, validationDocname, validationUsername, validationDate, btnValid } = errors;
    //     switch (event.target.name) {
    //         case 'docname':
    //             validationDocname = event.target.value.length > 1;
    //             errorMessage.docname = validationDocname ? "" : "Название документа должно содержать минимум два символа ";
    //             touched.docname = validationDocname;
    //             break;
    //         case 'username':
    //             validationDocname = event.target.value.length > 5;
    //             errorMessage.username = validationDocname ? "" : "ФИО должно содержать минимум 6 символов"
    //             break;
    //         case 'date':

    //             break;

    //         default:
    //             break;
    //     }
    //     btnValid = (validationDocname && validationUsername && validationDate);
    //     setErrors({ errorMessage, touched, validationDocname, validationUsername, validationDate, btnValid, })
    // }

    return (<>
        <div className={s.document__inner}>
            <div className="input__container mt-4">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="brd__shadow__itput document__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Название документа</span>
                    </div>
                    <input
                        // onBlur={handlerErrorsOnFocus}
                        type="text"
                        value={document.docname}
                        placeholder="Введите название документа"
                        className={`brd__shadow__itput brdr__radius__input form-control data__input `}
                        name="docname"
                        onChange={handlerInput}/>
                    <div className={s.error__text}>{errors.errorMessage.docname}</div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="brd__shadow__itput document__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">ФИО исполнителя</span>
                    </div>
                    <input
                        // onBlur={handlerErrorsOnFocus}
                        type="text"
                        placeholder="Введите ФИО исполнителя"
                        value={document.username}
                        className={`brd__shadow__itput form-control data__input  `}
                        name="username"
                        onChange={handlerInput}/>
                    <div className={s.error__text}>{errors.errorMessage.username}</div>
                </div>
                <div className="input-group mb-3">
                    <div className=" input-group-prepend">
                        <span className="brd__shadow__itput brd_shadow document__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Дата начала работ</span>
                    </div>
                    <input
                        type="date"
                        value={document.date}
                        placeholder="Введите дату"
                        className={`brd__shadow__itput form-control data__input  `}
                        name="date"
                        onChange={handlerInput}/>
                </div>
                <div className={s.error__text}>{errors.errorMessage.date}</div>
                <div className="form-floating">
                    <textarea className="mt-2 form-control"
                        value={document.comment}
                        placeholder="Описание"
                        id="floatingTextarea"
                        name="comment"
                        onChange={handlerTextarea}></textarea>
                    <label htmlFor="floatingTextarea">Описание</label>
                </div>
            </div>
            <div className="mt-2">
                <button onClick={() => { history.push('/data') }} className="brd__shadow__itput m2 btn btn-primary"
                >Назад</button>
                <button disabled={!errors.btnValid} onClick={() => { history.push('/checkpage') }} className="brd__shadow__itput m2 btn btn-primary"
                >Далее</button>
            </div>
        </div>
    </>)
}