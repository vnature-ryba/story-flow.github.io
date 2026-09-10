import "../Scss/Pages/Scene.scss"
import Sprite from "../Images/Icons/Sprites/SpriteMain.svg";
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Header from "../Components/Header/Header";
import SceneSteps from "../Components/SceneSteps/SceneSteps";
import TextEditor from "../Components/TextEditor/TextEditor";
import TechDetails from "../Components/TechDetails/TextEditor";
import References from "../Components/References/References";
import { useScene, useData } from '../context/DataContext'
import SlateStrip from "../Components/SlateStrip/SlateStrip";

const STRIPE_BY_STATUS = {
    todo: 'var(--muted)',
    prep: 'var(--teal)',
    shoot: 'var(--red)',
    post: 'var(--amber)',
    done: 'var(--green)',
}

function draftFromScene(scene) {
    if (!scene) return null
    return {
        title: scene.title,
        take: scene.take,
        intext: scene.intext,
        daynight: scene.daynight,
        description: scene.description,
        plan: scene.plan,
        notes: scene.notes,
        tech: { ...scene.tech },
    }
}

export default function ScenePage() {
    const { projectId, sceneId } = useParams()
    const { project, scene } = useScene(projectId, sceneId)
    const { updateScene, deleteScene } = useData()

    const [draft, setDraft] = useState(() => draftFromScene(scene))

    useEffect(() => {
        setDraft(draftFromScene(scene))
    }, [sceneId])

    const isDirty = useMemo(() => {
        if (!scene || !draft) return false
        return JSON.stringify(draft) !== JSON.stringify(draftFromScene(scene))
    }, [draft, scene])

    if (!project) return <Navigate to="/" replace />
    if (!scene || !draft) return <Navigate to={`/project/${project.id}`} replace />


    // Черновик — правит только локальное состояние формы.
    function patchDraft(fields) {
        setDraft((d) => ({ ...d, ...fields }))
    }

    function patchDraftTech(field) {
        return (e) => patchDraft({ tech: { ...draft.tech, [field]: e.target.value } })
    }

    // Немедленное изменение — сразу уходит в общее состояние (статус, референсы).
    function patchNow(fields) {
        updateScene(project.id, scene.id, fields)
    }

    function handleSave() {
        if (!isDirty) return
        updateScene(project.id, scene.id, draft)
    }

    function handleDelete() {
        deleteScene(project.id, scene.id)
    }

    return (
        <>
            <Header
                actions={
                    <>
                        {isDirty && (
                            <span
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 11,
                                    color: 'var(--amber)',
                                    letterSpacing: '.03em',
                                    alignSelf: 'center',
                                }}
                            >
                                Есть несохранённые изменения
                            </span>
                        )}
                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            <svg width="14" height="14">
                                <use href={Sprite + "#icon-basket"}></use>
                            </svg>
                            <span>Удалить сцену</span>
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                            disabled={!isDirty}
                        >
                            <svg width="14" height="14">
                                <use href={Sprite + "#icon-save"}></use>
                            </svg>
                            <span>Сохранить</span>
                        </button>
                    </>
                }
            />
            <div className="content-section">
                <div className="scene-slate">
                    <SlateStrip color={STRIPE_BY_STATUS[scene.status]} />

                    <div className="scene-slate-body">
                        <div className="scene-slate-fields">
                            <div className="slate-field title">
                                <label>Заголовок</label>
                                <input
                                    type="text"
                                    className="value"
                                    value={scene.title}
                                    onChange={(e) => patchDraft({ title: e.target.value })}
                                    placeholder="Заголовок"
                                />
                            </div>
                            <div className="slate-field">
                                <label>Место</label>
                                <div className="toggle-pair">
                                    <button className={draft.intext === 'INT' ? 'active' : ''}
                                            onClick={() => patchDraft({ intext: 'INT' })}
                                    >
                                        INT
                                    </button>
                                    <button className={draft.intext === 'EXT' ? 'active' : ''}
                                            onClick={() => patchDraft({ intext: 'EXT' })}
                                    >
                                        EXT
                                    </button>
                                </div>
                            </div>
                            <div className="slate-field">
                                <label>Время</label>
                                <div className="toggle-pair">
                                    <button className={draft.daynight === 'День' ? 'active' : ''}
                                            onClick={() => patchDraft({ daynight: 'День' })}
                                    >
                                        День
                                    </button>
                                    <button className={draft.daynight === 'Ночь' ? 'active' : ''}
                                            onClick={() => patchDraft({ daynight: 'Ночь' })}
                                    >
                                        Ночь
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SceneSteps value={scene.status} onChange={(status) => patchNow({ status })} />

                <div className="detail-grid">
                    <div className="left-column">
                        <TextEditor
                            title="Описание идеи"
                            placeholder="О чём сцена..."
                            value={draft.description}
                            onChange={(text) => patchDraft({description: text})}
                        />
                        <TextEditor
                            title="План съёмки"
                            placeholder="Раскадровка, движение камеры, свет, реквизит..."
                            value={draft.plan}
                            onChange={(text) => patchDraft({plan: text})}
                        />
                    </div>
                    <div className="right-column">
                        <TechDetails
                            tech={draft.tech}
                            onChange={draft.tech}
                            patchDraftTech={patchDraftTech}
                        />
                        <TextEditor
                            title="Заметки"
                            placeholder="Дополнительные сведения..."
                            value={draft.notes}
                            onChange={(text) => patchDraft({notes: text})}
                        />
                    </div>
                </div>

                <References projectId={project.id} sceneId={scene.id} references={scene.references}/>
            </div>
        </>
    )
}