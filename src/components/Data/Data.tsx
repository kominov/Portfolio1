import React, { useEffect, useRef, useState } from 'react'
import { IData, IDataErrors } from '../../interfaces';
import s from './Data.module.css'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
export const Data: React.FC = () => {
    const history = useHistory();
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
    useEffect(() => {
        let save = JSON.parse(localStorage.getItem('data') || '[]') as IData[];
        setDataDraw(save);
    }, [])

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(dataDraw));
    }, [dataDraw])
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
            name: "", cost: "", amount: "", key: Date.now()
        });
        setErrors({
            errorMessage: { name: "", amount: "", cost: "" },
            touched: { name: false, amount: false, cost: false },
            validationName: false,
            validationAmount: false,
            validationCost: false,
            btnValid: false
        })
    }
    //удаляем данные из таблицы
    const deleteDataHandler = (event: React.MouseEvent, id: number) => {
        setDataDraw(prev => prev.filter(item => item.key !== id))
    }

    //проверяем импуты на соответствие
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
    //Устанавливаем css свойства
    const errorClass = (touched: boolean) => {
        return (classNames({
            ["has-error "]: !touched,
            ["is-valid"]: !!touched,
        }))
    }

    return (
        <div className={s.data__inner}>
            <div className={s.data__information}>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="brd__shadow__itput data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Название</span>
                    </div>
                    <input
                        type="text"
                        value={dataInput.name}
                        placeholder="Введите название"
                        className={`brd__shadow__itput brdr__radius__input form-control data__input ${errorClass(errors.touched.name)}`}
                        name="name"
                        onChange={handlerInput} />
                    <div className={s.error__text}>{errors.errorMessage.name}</div>
                </div>


                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="brd__shadow__itput data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Количество</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Введите количество"
                        value={dataInput.amount}
                        className={`brd__shadow__itput form-control data__input  ${errorClass(errors.touched.amount)}`}
                        name="amount"
                        onChange={handlerInput} />
                </div>
                <div className="input-group mb-3">
                    <div className=" input-group-prepend">
                        <span className="brd__shadow__itput brd_shadow data__span input-group-text bg-primary text-white" id="inputGroup-sizing-default">Cтоимость</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Введите сумму"
                        value={dataInput.cost}
                        className={`brd__shadow__itput form-control data__input  ${errorClass(errors.touched.cost)}`}
                        name="cost"
                        onChange={handlerInput} />

                </div>
            </div>
            <button
                disabled={!errors.btnValid}
                className=" brd__shadow__itput btn btn-primary"
                onClick={addDataHandler}>Добавить</button>

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
            <button className="brd__shadow__itput m2 btn btn-primary"
            >Далее</button>
        </div >
    )
}