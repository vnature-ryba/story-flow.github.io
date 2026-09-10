import "./Style.scss";
import { statusByKey } from "../../data/statuses";

export default function StatusPill( { statusKey } ) {
    const status = statusByKey(statusKey)
    return (
        <span className={`status-pill ${status.className}`}>
            {status.label}
        </span>
    );
}
