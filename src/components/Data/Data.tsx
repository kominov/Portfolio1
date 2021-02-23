import React, { useEffect, useRef, useState } from 'react'
import { IData, IDataErrors } from '../../interfaces';
import s from './Data.module.css'
import classNames from 'classnames'
export const Data: React.FC = () => {

    //стейт для инпутов
    const [dataInput, setDataInput] = useState<IData>({
        name: "", amount: "", cost: "", key: Date.now()
    });

    // стейт для отрисовывания 
    const [dataDraw, setDataDraw] = useState<IData[]>([]);

    //стейт для валидации
    const [errors, setErrors] = useState<IDataErrors>({
        errorMessage: { name: "", amount: "", cost: "" },
        touched: { name: false, amount: false, cost: false },
        validationName: false,
        validationAmount: false,
        validationCost: false,
        btnValid: false
    })

    // обрабатываем инпуты
    const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataInput({ ...dataInput, [name]: value });
        validateInputValue(name, value);

    }

    //по нажатию на кнопку обнуляем инпуты, а иx значение записываем в стейт
    const addDataHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDataDraw(prev => [dataInput, ...prev]);
        setDataInput({
            name: "", cost: "", amount: "", key: Date.now(),
        });
    }

    const validateInputValue = (inputName: string, inputValue: string) => {
        let errorMessage = errors.errorMessage;
        let validationName = errors.validationName;
        let validationAmount = errors.validationAmount;
        let validationCost = errors.validationCost;
        let touched = errors.touched;
        let btnValid = errors.btnValid
        switch (inputName) {
            case 'name':
                validationName = inputValue.length >= 2;
                errorMessage.name = validationName ? "" : "Название должно содержать минимум 2 знака";
                touched.name = validationName;
                break;
            case 'amount':
                validationAmount = inputValue.length >= 1;
                errorMessage.amount = validationAmount ? "" : "Минимальное количество 1"
                touched.amount = validationAmount;
                break;
            case 'cost':
                validationCost = inputValue.length >= 1;
                errorMessage.cost = validationCost ? "" : "Минимальное количество 1"
                touched.cost = validationCost;
                break;
            default:
                break;
        }
        btnValid = validationName && validationAmount && validationCost;
        setErrors({
            errorMessage: errorMessage,
            validationName: validationName,
            validationCost: validationCost,
            validationAmount: validationAmount,
            btnValid: btnValid,
            touched: touched,
        })

    }


    const errorClass = (touched: boolean) => {
        return (classNames({
            ["has-error "]: !touched,
            ["is-valid"]: !!touched,
        }))
    }
    console.log(errors.errorMessage.name)
    console.log(errors.errorMessage.amount)
    console.log(errors.errorMessage.cost)

    return (
        <div className={s.data__inner}>
            <h3>Черновик</h3>
            <div className="s data__information">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Название</span>
                    </div>
                    <input type="text"
                        value={dataInput.name}
                        placeholder="Введите название"
                        required
                        className={`form-control ${errorClass(errors.touched.name)}`}
                        name="name"
                        onChange={handlerInput} />
                    <div className={s.error__text}>{errors.errorMessage.name}</div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Количество</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Введите количество"
                        value={dataInput.amount}
                        className={`form-control data__input  ${errorClass(errors.touched.amount)}`}
                        name="amount"
                        onChange={handlerInput} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Cтоимость</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        value={dataInput.cost}
                        className={`form-control data__input  ${errorClass(errors.touched.cost)}`}
                        name="cost"
                        onChange={handlerInput} />

                </div>
            </div>
            <button
                disabled={!errors.btnValid}
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
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}