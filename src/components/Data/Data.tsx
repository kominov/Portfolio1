import React, { useEffect, useRef, useState } from 'react'
import { IData } from '../../interfaces';
import s from './Data.module.css'
export const Data: React.FC = () => {
    //стейт для инпутов
    const [dataInput, setDataInput] = useState({
        name: "",
        amount: "",
        cost: ""
    });
    // стейт для отрисовывания 
    const [dataDraw, setDataDraw] = useState<IData[]>([])

    const HandlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataInput({ ...dataInput, [name]: value })
    }


    const addDataHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newDataDraw = {
            name: dataInput.name,
            amount: dataInput.amount,
            cost: dataInput.cost,
            key: Date.now()
        }
        setDataDraw(pref => [newDataDraw, ...dataDraw]);
        setDataInput({ name: "", cost: "", amount: "" });
    }

    return (
        <div className={s.data__inner}>
            {/* {data?<button onClick ={()=> setData({name: "", cost: "", amount: ""} )} > добавить</button> : <s.data__inner/>} */}
            <h3>Черновик</h3>
            <div className="s data__information">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Название</span>
                    </div>
                    <input type="text"
                        value={dataInput.name}
                        placeholder="Введите название"
                        className="form-control data__input"
                        name="name"
                        onChange={HandlerInput} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Количество</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Введите количество"
                        value={dataInput.amount}
                        className="form-control data__input"
                        name="amount"
                        onChange={HandlerInput} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Cтоимость</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        value={dataInput.cost}
                        className="form-control data__input"
                        name="cost"
                        onChange={HandlerInput} />
                </div>
            </div>
            <button
                disabled={dataInput.name.length === 0}
                className="btn btn-primary"
                onClick={addDataHandler}>Добавить</button>

            <div className={s.data__table}>
                <table className="table table-primary">
                    <thead>
                        <tr>
                            <th scope="col">Название</th>
                            <th scope="col">Количество</th>
                            <th scope="col">Стоимость</th>
                        </tr>
                    </thead>
                    <tbody>

                        {dataDraw.length === 0
                            ? (<tr>
                                <td>—</td>
                                <td>—</td>
                                <td>—</td>
                            </tr>
                            ) : (dataDraw.map(dataDraw => (
                                <tr key={dataDraw.key}>
                                    <td>{dataDraw.name}</td>
                                    <td>{dataDraw.cost}</td>
                                    <td>{dataDraw.amount}</td>
                                    {console.log(dataDraw)}
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}