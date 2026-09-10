import { useState } from 'react'
import Modal from './Modal'
import { useData } from '../../context/DataContext'
import { useRequiredFields, errorFieldStyle } from "../../hooks/useRequiredFields";
import FieldError from "../Common/FieldError";

const initial = { title: '', description: '' }

export default function NewSceneModal({ open, onClose, projectId }) {
    const [form, setForm] = useState(initial)
    const { addScene } = useData()
    const { isValid, markTouched, touchAll, resetTouched, showError } = useRequiredFields(form, ['title', 'description'])

    function set(field) {
        return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
    }

    function handleCreate() {
        if (!isValid) {
            touchAll()
            return
        } else if (!form.title.trim()) return
        addScene(projectId, form)
        setForm(initial)
        resetTouched()
        onClose()
    }

    function handleClose() {
        setForm(initial)
        resetTouched()
        onClose()
    }

    return (
        <Modal open={open} onClose={handleClose} title="Новая сцена">
            <div className="form-row">
                <label htmlFor="ns-title">Заголовок</label>
                <input
                    type="text"
                    id="ns-title"
                    placeholder="Например, «Крыша вагона. Ночь»"
                    value={form.title}
                    onChange={set('title')}
                    onBlur={markTouched('title')}
                    style={showError('title') ? errorFieldStyle : undefined}
                />
                <FieldError show={showError("title")} />
            </div>
            <div className="form-row">
                <label htmlFor="ns-desc">Краткое описание</label>
                <textarea
                    id="ns-desc"
                    placeholder="О чём сцена, в двух-трёх предложениях"
                    value={form.description}
                    onChange={set('description')}
                    onBlur={markTouched('description')}
                    style={showError('description') ? errorFieldStyle : undefined}
                />
                <FieldError show={showError("description")} />
            </div>
            <div className="modal-actions">
                <button className="btn" onClick={handleClose}>Отмена</button>
                <button className="btn btn-primary" disabled={!isValid} onClick={handleCreate}>Добавить сцену</button>
            </div>
        </Modal>
    )
}
