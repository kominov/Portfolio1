import React, { useEffect, useState } from 'react'
import { IData } from '../../interfaces';
import s from './Data.module.css'
import { useHistory } from 'react-router-dom'
import { InputEditor } from './DataEditor';
export const Data: React.FC = () => {
    const history = useHistory();

    // стейт для отрисовывания 
    const [dataDraw, setDataDraw] = useState<IData[]>([]);

    useEffect(() => {
        let save = JSON.parse(localStorage.getItem('data') || '[]') as IData[];
        setDataDraw(save);
    }, [])
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(dataDraw));
    }, [dataDraw])
    //удаляем данные из таблицы
    const deleteDataHandler = (event: React.MouseEvent, id: number) => {
        setDataDraw(prev => prev.filter(item => item.key !== id))
    }

    return (
        <div className={s.data__inner}>
            <InputEditor onSave={draw => setDataDraw(prev => ([draw, ...prev]))} />
            <div className={s.data__table}>
                <table className="table table-primary ">
                    <thead>
                        <tr>
                            <th scope="col">Название</th>
                            <th scope="col">Количество</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Удалить</th>
                        </tr>
                    </thead>
                    <tbody>

                        {dataDraw.length === 0
                            ? (<tr>
                                <td>—</td>
                                <td>—</td>
                                <td>—</td>
                                <td>—</td>
                            </tr>
                            ) : (dataDraw.map(dataDraw => (
                                <tr key={dataDraw.key}>
                                    <td>{dataDraw.name}</td>
                                    <td>{dataDraw.cost}</td>
                                    <td>{dataDraw.amount}</td>
                                    <td><i className={`material-icons ${s.id__icon}`}
                                        onClick={event => deleteDataHandler(event, dataDraw.key)}>delete</i></td>
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>

            <button onClick={() => { history.push('/') }} className="brd__shadow__itput m2 btn btn-primary"
            >Назад</button>
            <button onClick={() => { history.push('/document') }} className="brd__shadow__itput m2 btn btn-primary"
            >Далее</button>
        </div >
    )
}