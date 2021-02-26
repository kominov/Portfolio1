import React, { useState } from 'react'
import classNames from 'classnames'
import s from './Data.module.css'
import { IData, IDataErrors } from '../../interfaces'

interface DateEditorProps {
    onSave: (data: IData) => void;
}

export const InputEditor: React.FC<DateEditorProps> = ({ onSave }) => {
    //обнуление стейта с ошибками
    function getDefaultErrorsState(): IDataErrors {
        return {
            errorMessage: { name: "", amount: "", cost: "" },
            touched: { name: false, amount: false, cost: false },
            validationName: false,
            validationAmount: false,
            validationCost: false,
            btnValid: false
        }
    }
    //стейт для инпутов
    const [dataInput, setDataInput] = useState<IData>({
        name: "", amount: "", cost: "", key: Date.now()
    });
    //стейт для валидации
    const [errors, setErrors] = useState<IDataErrors>(getDefaultErrorsState);
    const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataInput(prev => ({ ...prev, [name]: value }));
        validateInputValue(name, value);

    }
    //по нажатию на кнопку обнуляем инпуты, а иx значение записываем в стейт
    const addDataHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        onSave(dataInput);
        setDataInput({ name: "", cost: "", amount: "", key: Date.now() });
        setErrors(getDefaultErrorsState);
    }

    //проверяем импуты на соответствие
    const validateInputValue = (inputName: string, inputValue: string) => {
        let { errorMessage, validationName, validationAmount, validationCost, touched, btnValid } = errors;
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
        setErrors({ errorMessage, validationName, validationCost, validationAmount, btnValid, touched, })

    }
    //Устанавливаем css свойства
    const errorClass = (touched: boolean) => {
        return (classNames({
            ["has-error "]: !touched,
            ["is-valid"]: !!touched,
        }))
    }
    
    return <>
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
        <button disabled={!errors.btnValid}
            className=" brd__shadow__itput btn btn-primary"
            onClick={addDataHandler}>Добавить</button>
    </>
}