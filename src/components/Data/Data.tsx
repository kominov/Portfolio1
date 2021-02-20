import React, { useRef, useState } from 'react'
// import { IData } from '../../interfaces'
import s from './Data.module.css'
export const Data: React.FC = () => {
    const [data, setData] = useState({
        name: "",
        amount: "",
        cost: ""
    });

    const changeDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
    }
    console.log(data);


    return (
        <div className={s.data__inner}>
            {data?<button onClick ={()=> setData({name: "", cost: "", amount: ""} )} > добавить</button> : <s.data__inner/>}
            <h3>Черновик</h3>
            <div className="s data__information">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Название</span>
                    </div>
                    <input type="text"
                        value={data.name}
                        placeholder="Введите название"
                        className="form-control data__input"
                        name="name"
                        onChange={changeDataHandler} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Количество</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Введите количество"
                        value={data.amount}
                        className="form-control data__input"
                        name="amount"
                        onChange={changeDataHandler} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Cтоимость</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        value={data.cost}
                        className="form-control data__input"
                        name="cost"
                        onChange={changeDataHandler} />
                </div>
            </div>

        </div>
    )
}