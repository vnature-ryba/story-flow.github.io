import "./Style.scss";

export default function Filter({options, value, onChange, style}) {
    return (
        <div className="filter-row">
            {options.map((option) => (
                <button
                    key={option.key}
                    className={`filter-chip ${value === option.key ? 'active' : ''}`}
                    onClick={() => onChange(option.key)}>
                    {option.label}
                </button>
            ))}
        </div>
    );
}
