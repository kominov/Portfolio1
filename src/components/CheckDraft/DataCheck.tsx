import React from 'react'
import { DraftDocument } from '../../interfaces'
import s from './CheckDraft.module.css'

interface DataCheckProps {
    draft: DraftDocument
}
export const DataCheck: React.FC<DataCheckProps> = ({ draft }) => {
    return (<>
        <div className={` ${s.data__table}`}>
            <table className="table table-primary ">
                <thead>
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Стоимость</th>
                    </tr>
                </thead>
                <tbody>

                    {draft.data.map(dataCheck => (
                        <tr key={dataCheck.key}>
                            <td>{dataCheck.name}</td>
                            <td>{dataCheck.cost}</td>
                            <td>{dataCheck.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>)
}