import {useMemo, useState} from 'react'
import {Navigate, useParams} from 'react-router-dom'
import Header from "../Components/Header/Header";
import StatusPill from "../Components/StatusPill/StatusPill";
import Filter from "../Components/Filter/Filter";
import SceneSingleItem from "../Components/SceneSingleItem/SceneSingleItem";
import Sprite from "../Images/Icons/Sprites/SpriteMain.svg";
import NewSceneModal from "../Components/Modals/NewSceneModal";
import {useProject, useData} from '../context/DataContext'
import {Statuses} from "../data/statuses";
import EditProjectModal from "../Components/Modals/EditProjectModal";
import {useDragReorder} from '../hooks/useDragReorder'

import "../Scss/Pages/Project.scss"

const Filters = [{key: 'all', label: 'Все'}, ...Statuses.map((status) => ({key: status.key, label: status.label}))]

export default function ProjectPage() {
    const {projectId} = useParams()
    const project = useProject(projectId)
    const {reorderScenes} = useData()
    const [filter, setFilter] = useState('all')
    const [editOpen, setEditOpen] = useState(false)
    const [newSceneOpen, setNewSceneOpen] = useState(false)
    const [draggedId, setDraggedId] = useState(null)

    const visibleScenes = useMemo(() => {
        if (!project) return []
        return filter === 'all' ? project.scenes : project.scenes.filter((s) => s.status === filter)
    }, [project, filter])

    const {orderedItems, handleDragStart, handleDragOverItem, handleDragEnd} =
        useDragReorder(visibleScenes, (orderedIds) => {
            // При активном фильтре переставляем внутри всего списка сцен, сохраняя
            // относительный порядок скрытых сцен.
            if (!project) return
            if (filter === 'all') {
                reorderScenes(project.id, orderedIds)
            } else {
                const visibleSet = new Set(orderedIds)
                const merged = []
                let cursor = 0
                project.scenes.forEach((s) => {
                    if (visibleSet.has(s.id)) {
                        merged.push(orderedIds[cursor])
                        cursor += 1
                    } else {
                        merged.push(s.id)
                    }
                })
                reorderScenes(project.id, merged)
            }
        })

    if (!project) return <Navigate to="/" replace/>

    return (
        <>
            <Header
                actions={
                    <>
                        <button
                            className="btn"
                            onClick={() => setEditOpen(true)}
                        >
                            <svg width="14" height="14">
                                <use href={Sprite + "#icon-pen"}></use>
                            </svg>
                            <span>Edit</span>
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => setNewSceneOpen(true)}
                        >
                            <svg width="14" height="14">
                                <use href={Sprite + "#icon-plus"}></use>
                            </svg>
                            <span>Новая сцена</span>
                        </button>
                    </>
                }
            />

            <div className="content-section">
                <div className="page-header">
                    <div className="content-wrapper">
                        <p className="eyebrow">{project.format || 'Без формата'} · {project.createdLabel}</p>
                        <h1>{project.title}</h1>
                        <p>{project.logline}</p>
                    </div>
                    <StatusPill statusKey={project.status}/>
                </div>

                <div className="scene-toolbar">
                    <span className="scene-count">{project.scenes.length} {sceneWord(project.scenes.length)} · перетаскивайте <span>⠿</span> справа, чтобы менять порядок</span>
                    <Filter options={Filters} value={filter} onChange={setFilter}/>
                </div>

                <div className="items-list scene-list">
                    {project.scenes.length === 0 ? (
                        <div className="empty-list">
                            <h4>В этом проекте пока нет сцен <br/> добавьте первую, чтобы начать монтажный лист.</h4>
                        </div>
                    ) : (
                        <>
                            {orderedItems.map((scene, i) => (
                                <SceneSingleItem
                                    key={scene.id}
                                    scene={scene}
                                    index={project.scenes.findIndex((s) => s.id === scene.id)}
                                    projectId={project.id}
                                    isDragged={draggedId === scene.id}
                                    onDragStart={(id) => {
                                        setDraggedId(id)
                                        handleDragStart(id)
                                    }}
                                    onDragOverItem={handleDragOverItem}
                                    onDragEnd={() => {
                                        setDraggedId(null)
                                        handleDragEnd()
                                    }}
                                />
                            ))}
                        </>
                    )}

                    <button
                        className="new-scene-row"
                        onClick={() => setNewSceneOpen(true)}
                    >
                        <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                        Добавить сцену
                    </button>
                </div>
            </div>

            <EditProjectModal open={editOpen} onClose={() => setEditOpen(false)} project={project}/>
            <NewSceneModal open={newSceneOpen} onClose={() => setNewSceneOpen(false)} projectId={project.id}/>
        </>
    )
}

function sceneWord(n) {
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return 'сцена'
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'сцены'
    return 'сцен'
}