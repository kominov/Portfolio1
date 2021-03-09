import React from 'react'
import { DraftDocument } from '../../interfaces/interfaces'
import s from './CheckDraft.module.css'
interface InfoDocProps {
    draft: DraftDocument | undefined
}

export const InfoAboutDoc: React.FC<InfoDocProps> = ({ draft }) => {
    return (
    <>
            <h3 className="mt-4">{draft?.document.docname}</h3>
        <div className={`mt-4 ${s.id__item}`}>
            <span className="alert alert-dark" role="alert">
                Исполнитель:<span className={` ${s.span__text}`}>{draft?.document.username}</span>
            </span>
        </div>
        <div className={`mt-4 ${s.id__item}`}>
            <span className="alert alert-dark" role="alert">
                Дата начала работ:<span className={s.span__text}>{draft?.document.date}</span>
            </span>
        </div>
        {draft!.document.comment.length > 1 ?
            (<div className={`mt-4 ${s.id__item}`}>
                <span className="alert alert-dark" role="alert">
                    Описание:<span className={s.span__text}>{draft?.document.comment}</span>
                </span>
            </div>) : ""}



    </>)
}