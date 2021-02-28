import React from 'react'
import s from './CheckPage.module.css'
export const CheckInfo: React.FC = () => {
    return (<>
        <h3 className="mt-4">Название документа</h3>
        <div className={`mt-4 ${s.id__item}`}>
            <span className="alert alert-dark" role="alert">
                Исполнитель:<span className={` ${s.span__text}`}> ФФФ ИИИИ ООО</span>
            </span>
        </div>
        <div className={`mt-4 ${s.id__item}`}>
            <span className="alert alert-dark" role="alert">
                Дата начала работ:<span className={s.span__text}>24.03.2021</span>
            </span>
        </div>
        <div className={`mt-4 ${s.id__item}`}>
            <span className="alert alert-dark" role="alert">
                Описание:<span className={s.span__text}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error debitis laborum reiciendis minima alias numquam, vitae quis assumenda, repudiandae labore in molestiae esse. Natus laborum consectetur aliquid perspiciatis similique omnis?</span>
            </span>
        </div>
        

    </>)
}