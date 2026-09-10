import SlateStrip from "../SlateStrip/SlateStrip";

export default function Modal({ open, onClose, stripColor, title, children }) {
    if (!open) return null

    return (
        <div
            className="modal-overlay open"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div className="modal">
                <SlateStrip color={stripColor} height="6px" />
                <div className="modal-body">
                    {title && <h3>{title}</h3>}
                    {children}
                </div>
            </div>
        </div>
    )
}
