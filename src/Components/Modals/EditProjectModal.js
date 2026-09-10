import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { useData } from '../../context/DataContext'

export default function EditProjectModal({ open, onClose, project }) {
    const [form, setForm] = useState({ title: '', format: '', logline: '' })
    const { updateProject, deleteProject } = useData()
    const navigate = useNavigate()

    useEffect(() => {
        if (project) {
            setForm({ title: project.title, format: project.format, logline: project.logline })
        }
    }, [project, open])

    if (!project) return null

    function set(field) {
        return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
    }

    function handleSave() {
        updateProject(project.id, form)
        onClose()
    }

    function handleDelete() {
        deleteProject(project.id)
        onClose()
        navigate('/')
    }

    return (
        <Modal open={open} onClose={onClose} stripColor="var(--red)" title="Редактировать проект">
            <div className="form-row">
                <label htmlFor="ep-title">Название</label>
                <input type="text" id="ep-title" value={form.title} onChange={set('title')} />
            </div>
            <div className="form-row">
                <label htmlFor="ep-format">Формат</label>
                <input type="text" id="ep-format" value={form.format} onChange={set('format')} />
            </div>
            <div className="form-row">
                <label htmlFor="ep-logline">Логлайн</label>
                <textarea
                    id="ep-logline"
                    style={{ minHeight: 90 }}
                    value={form.logline}
                    onChange={set('logline')}
                />
            </div>
            <div className="modal-actions">
                <button className="btn btn-danger" style={{ marginRight: 'auto' }} onClick={handleDelete}>
                    Удалить проект
                </button>
                <button className="btn" onClick={onClose}>Отмена</button>
                <button className="btn btn-primary" onClick={handleSave}>Сохранить</button>
            </div>
        </Modal>
    )
}
