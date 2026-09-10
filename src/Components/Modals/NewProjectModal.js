import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { useData } from '../../context/DataContext'
import { useRequiredFields, errorFieldStyle } from "../../hooks/useRequiredFields";
import FieldError from "../Common/FieldError";
import "./Style.scss"

const initial = { title: '', format: '', logline: '' }

export default function NewProjectModal({ open, onClose }) {
    const [form, setForm] = useState(initial)
    const { addProject } = useData()
    const navigate = useNavigate()
    const { isValid, markTouched, touchAll, resetTouched, showError } = useRequiredFields(form, ['title', 'format', 'logline'])

    function set(field) {
        return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
    }

    function handleCreate() {
        if (!isValid) {
            touchAll()
            return
        } else if (!form.title.trim()) return
        addProject(form)
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
        <Modal open={open} onClose={handleClose} title="Новый проект">
            <div className="form-row">
                <label htmlFor="np-title">Название</label>
                <input
                    type="text"
                    id="np-title"
                    placeholder="Например, «Тени над рекой»"
                    value={form.title}
                    required
                    onChange={set('title')}
                    onBlur={markTouched('title')}
                    style={showError('title') ? errorFieldStyle : undefined}
                />
                <FieldError show={showError("title")} />
            </div>
            <div className="form-row">
                <label htmlFor="np-format">Формат</label>
                <input
                    type="text"
                    id="np-format"
                    placeholder="Короткий метр / реклама / клип…"
                    value={form.format}
                    required
                    onChange={set('format')}
                    onBlur={markTouched('format')}
                    style={showError('format') ? errorFieldStyle : undefined}
                />
                <FieldError show={showError("format")} />
            </div>
            <div className="form-row">
                <label htmlFor="np-logline">Логлайн</label>
                <textarea
                    id="np-logline"
                    placeholder="Одним-двумя предложениями — суть идеи"
                    value={form.logline}
                    required
                    onChange={set('logline')}
                    onBlur={markTouched('logline')}
                    style={showError('logline') ? errorFieldStyle : undefined}
                />
                <FieldError show={showError("logline")} />
            </div>
            <div className="modal-actions">
                <button className="btn" onClick={handleClose}>Отмена</button>
                <button className="btn btn-primary" disabled={!isValid} onClick={handleCreate}>Создать проект</button>
            </div>
        </Modal>
    )
}
