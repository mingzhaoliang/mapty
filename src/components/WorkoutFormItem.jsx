import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import slugify from 'slugify';
import { dataActions } from '../store/data-slice';

export default function WorkoutFormItem({ label, isSelect, onSelect, placeholder, value }) {
    const slug = slugify(label, { lower: true, replacement: "_" });
    const classes = "w-full p-1 rounded bg-[#d6dee0] transition-all text-sm";
    const inputField = useRef();
    const dispatch = useDispatch();

    const inputBlurHandler = () => {
        dispatch(dataActions.setInvalidInput(inputField.current.value <= 0));
    };

    const changeHandler = (e) => {
        onSelect(e);
    };

    useEffect(() => {
        value && (inputField.current.value = value);
    }, [])

    return (
        <div className="flex items-center">
            <label htmlFor={slug} className="flex-grow-0 flex-shrink-0 basis-1/2 flex font-semibold text-white">{label}</label>
            {isSelect && (
                <select id={slug} name={slug} onChange={changeHandler} className={classes} ref={inputField}>
                    <option value="running">Running</option>
                    <option value="cycling">Cycling</option>
                </select>
            )}
            {!isSelect && (
                <input
                    ref={inputField}
                    onBlur={inputBlurHandler}
                    id={slug}
                    name={slug}
                    className={classes}
                    placeholder={placeholder}
                    type="number"
                    min="0"
                    step="0.1"
                    required
                />
            )}
        </div>
    )
}