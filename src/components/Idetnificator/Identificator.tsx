
import React, { useEffect, useRef, useState } from 'react'
import { IId } from '../../interfaces';
import classNames from 'classnames';
import s from './Identificator.module.css'
import { useHistory } from 'react-router-dom';
interface InterfaceProps {
    onSaveState: (idState: IId[]) => void;
}

export const Identificator: React.FC<InterfaceProps> = ({ onSaveState }) => {
    const history = useHistory();
    const refId = useRef<HTMLInputElement>(null);
    const [id, setId] = useState<IId[]>([])


    //проверяем есть ли что-то в сторедже, если есть, добавляем в стейт
    // useEffect(() => {
    //     const saveId = JSON.parse(localStorage.getItem('identificator') || '[]') as IId[];
    //     setId(saveId);
    // }, [])
    // //записываем в сторедж стейт, при добавление в него айди
    // useEffect(() => {
    //     localStorage.setItem('identificator', JSON.stringify(id))
    // }, [id])
    //добавляем ид 
    const addHandlerId = (identificator: string) => {
        const newId = {
            identificator: identificator,
            key: Date.now(),
        }
        setId(prev => [newId, ...id]);
    }
    //удаляем ид
    const delHandlerId = (id: number, event: React.MouseEvent) => {
        setId(prev => prev.filter(item => item.key !== id))
    }

    //обрабатываем нажатие интера, и вызываем функцию для добавления ид
    const KeyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key == "Enter") {
            addHandlerId(refId.current!.value);
            refId.current!.value = "";
        }
    }
    return (<>
        <div className={s.id__inner}>
            <div className={s.id}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="brd__shadow__itput input-group-text bg-primary text-white" id="inputGroup-sizing-default">Идентификатор</span>
                    </div>
                    <input type="text"
                        ref={refId}
                        className="brd__shadow__itput form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Введите идентификатор"
                        onKeyPress={KeyPressHandler} />
                </div>
            </div>
            {id.map(items => {
                return (
                    <div className={s.id__item} key={items.key}>
                        <span className="alert alert-dark" role="alert">
                            <span className={s.span__text}>Идентификатор:</span> {items.identificator}
                        </span>
                        <i className={`material-icons ${s.id__icon}`}
                            onClick={event => delHandlerId(items.key, event)}
                        >delete</i>
                    </div>

                )
            })}
        </div>
        <div className="mt-2">
            <button onClick={() => { history.push('/') }} className="brd__shadow__itput m2 btn btn-primary"
            >Назад</button>
            <button disabled={id.length < 1} onClick={() => {
                onSaveState(id)
                history.push('/document')
            }} className="brd__shadow__itput m2 btn btn-primary"
            >Далее</button>
        </div>
    </>)
}