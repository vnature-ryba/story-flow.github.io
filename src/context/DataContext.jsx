import { createContext, useContext, useMemo, useReducer } from 'react'
import { seedProjects, emptyProject, emptyScene, nextId } from '../data/seedData'

const DataContext = createContext(null)

function reorder(list, orderedIds) {
    const byId = Object.fromEntries(list.map((item) => [item.id, item]))
    return orderedIds.map((id) => byId[id]).filter(Boolean)
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_PROJECT': {
            const project = emptyProject(action.payload)
            return { ...state, projects: [...state.projects, project] }
        }

        case 'UPDATE_PROJECT': {
            const { projectId, patch } = action.payload
            return {
                ...state,
                projects: state.projects.map((p) =>
                    p.id === projectId ? { ...p, ...patch } : p
                ),
            }
        }

        case 'DELETE_PROJECT': {
            return {
                ...state,
                projects: state.projects.filter((p) => p.id !== action.payload.projectId),
            }
        }

        case 'ADD_SCENE': {
            const { projectId, scene } = action.payload
            const newScene = emptyScene(scene)
            return {
                ...state,
                projects: state.projects.map((p) =>
                    p.id === projectId ? { ...p, scenes: [...p.scenes, newScene] } : p
                ),
            }
        }

        case 'UPDATE_SCENE': {
            const { projectId, sceneId, patch } = action.payload
            return {
                ...state,
                projects: state.projects.map((p) => {
                    if (p.id !== projectId) return p
                    return {
                        ...p,
                        scenes: p.scenes.map((s) =>
                            s.id === sceneId ? { ...s, ...patch } : s
                        ),
                    }
                }),
            }
        }

        case 'DELETE_SCENE': {
            const { projectId, sceneId } = action.payload
            return {
                ...state,
                projects: state.projects.map((p) =>
                    p.id === projectId
                        ? { ...p, scenes: p.scenes.filter((s) => s.id !== sceneId) }
                        : p
                ),
            }
        }

        case 'REORDER_SCENES': {
            const { projectId, orderedIds } = action.payload
            return {
                ...state,
                projects: state.projects.map((p) =>
                    p.id === projectId ? { ...p, scenes: reorder(p.scenes, orderedIds) } : p
                ),
            }
        }

        case 'ADD_REFERENCE': {
            const { projectId, sceneId, reference } = action.payload
            return {
                ...state,
                projects: state.projects.map((p) => {
                    if (p.id !== projectId) return p
                    return {
                        ...p,
                        scenes: p.scenes.map((s) =>
                            s.id === sceneId
                                ? { ...s, references: [...s.references, { id: nextId('ref'), ...reference }] }
                                : s
                        ),
                    }
                }),
            }
        }

        case 'REMOVE_REFERENCE': {
            const { projectId, sceneId, referenceId } = action.payload
            return {
                ...state,
                projects: state.projects.map((p) => {
                    if (p.id !== projectId) return p
                    return {
                        ...p,
                        scenes: p.scenes.map((s) =>
                            s.id === sceneId
                                ? { ...s, references: s.references.filter((r) => r.id !== referenceId) }
                                : s
                        ),
                    }
                }),
            }
        }

        case 'REORDER_REFERENCES': {
            const { projectId, sceneId, orderedIds } = action.payload
            return {
                ...state,
                projects: state.projects.map((p) => {
                    if (p.id !== projectId) return p
                    return {
                        ...p,
                        scenes: p.scenes.map((s) =>
                            s.id === sceneId
                                ? { ...s, references: reorder(s.references, orderedIds) }
                                : s
                        ),
                    }
                }),
            }
        }

        default:
            return state
    }
}

export function DataProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, { projects: seedProjects })

    const actions = useMemo(
        () => ({
            addProject: (payload) => dispatch({ type: 'ADD_PROJECT', payload }),
            updateProject: (projectId, patch) =>
                dispatch({ type: 'UPDATE_PROJECT', payload: { projectId, patch } }),
            deleteProject: (projectId) =>
                dispatch({ type: 'DELETE_PROJECT', payload: { projectId } }),

            addScene: (projectId, scene) =>
                dispatch({ type: 'ADD_SCENE', payload: { projectId, scene } }),
            updateScene: (projectId, sceneId, patch) =>
                dispatch({ type: 'UPDATE_SCENE', payload: { projectId, sceneId, patch } }),
            deleteScene: (projectId, sceneId) =>
                dispatch({ type: 'DELETE_SCENE', payload: { projectId, sceneId } }),
            reorderScenes: (projectId, orderedIds) =>
                dispatch({ type: 'REORDER_SCENES', payload: { projectId, orderedIds } }),

            addReference: (projectId, sceneId, reference) =>
                dispatch({ type: 'ADD_REFERENCE', payload: { projectId, sceneId, reference } }),
            removeReference: (projectId, sceneId, referenceId) =>
                dispatch({
                    type: 'REMOVE_REFERENCE',
                    payload: { projectId, sceneId, referenceId },
                }),
            reorderReferences: (projectId, sceneId, orderedIds) =>
                dispatch({
                    type: 'REORDER_REFERENCES',
                    payload: { projectId, sceneId, orderedIds },
                }),
        }),
        []
    )

    const value = useMemo(() => ({ projects: state.projects, ...actions }), [state, actions])

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
    const ctx = useContext(DataContext)
    if (!ctx) throw new Error('useData должен использоваться внутри <DataProvider>')
    return ctx
}

export function useProject(projectId) {
    const { projects } = useData()
    return projects.find((p) => p.id === projectId) || null
}

export function useScene(projectId, sceneId) {
    const project = useProject(projectId)
    const scene = project?.scenes.find((s) => s.id === sceneId) || null
    return { project, scene }
}
