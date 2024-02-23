export default function WorkoutFormItem({ label, isSelect, onSelect, placeholder }) {
    const classes = "w-full p-1 rounded bg-[#d6dee0] transition-all text-sm";

    const changeHandler = (e) => {
        onSelect(e);
    };

    return (
        <div className="flex items-center">
            <label className="flex-grow-0 flex-shrink-0 basis-1/2 flex font-semibold text-white">{label}</label>
            {isSelect && (
                <select onChange={changeHandler} className={classes}>
                    <option value="running">Running</option>
                    <option value="cycling">Cycling</option>
                </select>
            )}
            {!isSelect && (
                <input
                    className={classes}
                    placeholder={placeholder}
                />
            )}
        </div>
    )
}