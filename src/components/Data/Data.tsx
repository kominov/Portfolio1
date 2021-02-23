import React, { useEffect, useRef, useState } from 'react'
import { IData, IDataErrors } from '../../interfaces';
import s from './Data.module.css'
import classNames from 'classnames'
export const Data: React.FC = () => {

    //стейт для инпутов
    const [dataInput, setDataInput] = useState<IData>({
        name: "", amount: "", cost: "", key: Date.now(),
    });

    // стейт для отрисовывания 
    const [dataDraw, setDataDraw] = useState<IData[]>([]);

    //стейт для валидации
    const [errors, setErrors] = useState<IDataErrors>({
        errorMessage: "", validation: false
    })

    // обрабатываем инпуты
    const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataInput({ ...dataInput, [name]: value });
        validateInputValue(name, value);
    }

    //по нажатию на кнопку обнуляем инпуты, а из значение записываем в стейт
    const addDataHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDataDraw(prev => [dataInput, ...prev]);
        setDataInput({ name: "", cost: "", amount: "", key: Date.now() });
    }

    const validateInputValue = (inputName: string, inputValue: string) => {
        let errorMessage = errors.errorMessage;
        let validationValue = errors.validation;

        validationValue = inputValue.length > 6;
        errorMessage = validationValue ? '' : 'слишком короткое значение';
        setErrors({
            errorMessage: errorMessage,
            validation: validationValue,
        });
    }
    const classError = classNames("form-control data__input",{
        ["is-invalid"]: !errors.validation,
        ["is-valid"]: !!errors.validation

    })
    // console.log(errors.validation);

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
                        className={classError}
                        name="name"
                        onChange={handlerInput} />
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
                        className="form-control data__input"
                        name="cost"
                        onChange={handlerInput} />
                </div>
            </div>
            <button
                disabled={dataInput.name.length <= 4}
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