import "./Style.scss";
import {Statuses, statusIndex} from "../../data/statuses";

export default function SceneSteps({ value, onChange }) {
    const currentId = statusIndex(value)
    return (
        <div className="panel">
            <h2>Статус сцены</h2>
            <div className="status-stepper">
                {Statuses.map((status, i) => (
                    <button
                        key={status.key}
                        type="button"
                        data-key={status.key}
                        onClick={() => onChange(status.key)}
                        className={`status-step ${i < currentId ? 'done' : ''} ${i === currentId ? 'current' : ''}`}
                    >
                        <div className="dot-wrapper">
                            <span className="dot"></span>
                        </div>
                        <span className="label">{status.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
