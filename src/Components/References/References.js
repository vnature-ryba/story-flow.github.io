import { useRef, useState } from 'react'
import { useData } from '../../context/DataContext'
// import ReferenceCard from "./ReferenceCard";
import { useDragReorder } from "../../hooks/useDragReorder";
import "./Style.scss";

export default function References({ projectId, sceneId, references }) {
    const { addReference, removeReference, reorderReferences } = useData()
    const fileInputRef = useRef(null)
    const [draggedId, setDraggedId] = useState(null)

    const { orderedItems, handleDragStart, handleDragOverItem, handleDragEnd } =
        useDragReorder(references, (orderedIds) =>
            reorderReferences(projectId, sceneId, orderedIds)
        )

    function handleFiles(fileList) {
        Array.from(fileList).forEach((file) => {
            const url = URL.createObjectURL(file)
            addReference(projectId, sceneId, { url, caption: file.name })
        })
    }

    return (
        <div className="panel references">
            <div className="panel-header">
                <h2>Референсы</h2>
                <span>{references.length} {refWord(references.length)}</span>
            </div>

            <div className="ref-strip">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    ref={fileInputRef}
                    onChange={(e) => {
                        if (e.target.files?.length) handleFiles(e.target.files)
                        e.target.value = ''
                    }}
                />
                {orderedItems.map((ref, i) => (
                    <div
                        key={ref.id}
                        className={`ref-card ${draggedId === ref.id ? 'dragging' : ''}`}
                        draggable
                        onDragStart={() => {
                            setDraggedId(ref.id)
                            handleDragStart(ref.id)
                        }}
                        onDragOver={(e) => {
                            e.preventDefault()
                            handleDragOverItem(ref.id)
                        }}
                        onDragEnd={() => {
                            setDraggedId(null)
                            handleDragEnd()
                        }}
                    >
                        <div className="img-wrapper">
                            <span className="ref-order" />
                            <button
                                className="ref-remove"
                                title="Удалить"
                                onClick={() => removeReference(projectId, sceneId, ref.id)}
                            >
                                ×
                            </button>
                            <img src={ref.url} alt={ref.caption}/>
                        </div>
                        <div className="ref-caption">
                            {ref.caption}
                        </div>
                    </div>
                ))}

                <button
                    className="ref-upload"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <span className="plus">+</span>
                    Загрузить
                </button>
            </div>
        </div>
    );
}

function refWord(n) {
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return 'изображение'
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'изображения'
    return 'изображений'
}