import React from 'react'
import { DraftDocument } from '../../interfaces'
import s from './CheckDraft.module.css'
interface IdCheckProps {
    draft: DraftDocument
}
export const IdCheck: React.FC<IdCheckProps> = ({ draft }) => {
    return (<>

        <div className={` ${s.data__table}`}>
            <table className="table table-primary ">
                <thead>
                    <tr>
                        <th scope="col">Идентификатор</th>
                    </tr>
                </thead>
                <tbody>

                    {draft.ids.map(IdCheck => (
                        <tr key={IdCheck.key}>
                            <td>{IdCheck.identificator}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* <div className={s.idcheck__inner}>
            {draft.ids.map(items => {
                return (
                    <div className={s.id__item} key={items.key}>
                        <span className="alert alert-primary" role="alert">
                            Идентификатор:<span className={s.span__text}> {items.identificator}</span>
                        </span>
                    </div>
                )})}
        </div> */}
    </>)
}