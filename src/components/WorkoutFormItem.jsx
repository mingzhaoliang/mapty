import slugify from 'slugify';

export default function WorkoutFormItem({ label, isSelect, onSelect, placeholder }) {
    const slug = slugify(label, { lower: true, replacement: "_" });
    const classes = "w-full p-1 rounded bg-[#d6dee0] transition-all text-sm";

    const changeHandler = (e) => {
        onSelect(e);
    };

    return (
        <div className="flex items-center">
            <label htmlFor={slug} className="flex-grow-0 flex-shrink-0 basis-1/2 flex font-semibold text-white">{label}</label>
            {isSelect && (
                <select id={slug} name={slug} onChange={changeHandler} className={classes}>
                    <option value="running">Running</option>
                    <option value="cycling">Cycling</option>
                </select>
            )}
            {!isSelect && (
                <input
                    id={slug}
                    name={slug}
                    className={classes}
                    placeholder={placeholder}
                    type="number"
                    min="0"
                    step="0.1"
                />
            )}
        </div>
    )
}