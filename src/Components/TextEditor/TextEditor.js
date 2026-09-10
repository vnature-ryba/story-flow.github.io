import "./Style.scss";

export default function TextEditor({title, placeholder, value, onChange}) {

    return (
        <div className="panel">
            <h2>{title}</h2>
            <textarea
                name=""
                id=""
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
