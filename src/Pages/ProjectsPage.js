import { useMemo, useState } from 'react'
import Header from "../Components/Header/Header";
import Filter from "../Components/Filter/Filter";
import ProjectCard from "../Components/ProjectCard/ProjectCard";
import Sprite from "../Images/Icons/Sprites/SpriteMain.svg";
import { seedProjects } from "../data/seedData.js"
import { useData } from '../context/DataContext'
import { Statuses } from "../data/statuses";
import NewProjectModal from "../Components/Modals/NewProjectModal";

const Filters = [{key: 'all', label: 'Все'}, ...Statuses.map((status) => ({ key: status.key, label: status.label }))]

export default function ProjectsPage() {
    const { projects } = useData()
    const [filter, setFilter] = useState('all')
    const [modalOpen, setModalOpen] = useState(false)

    const filtered = useMemo(
        () => (filter === 'all' ? projects : projects.filter((p) => p.status === filter)),
        [projects, filter]
    )

    return (
        <>
            <Header
                actions={
                    <>
                        <button
                            className="btn btn-primary"
                            onClick={() => setModalOpen(true)}
                        >
                            <svg width="14" height="14">
                                <use href={Sprite + "#icon-plus"}></use>
                            </svg>
                            <span>Новый проект</span>
                        </button>
                    </>
                }
            />

            <div className="content-section">
                <div className="page-header">
                    <div className="content-wrapper">
                        <p className="eyebrow">Все проекты · {seedProjects.length}</p>
                        <h1>Проекты</h1>
                        <p>Замыслы, раскадровки и монтажные листы. Каждый проект хранит сцены с их статусом, описанием и
                            референсами.</p>
                    </div>
                </div>

                <Filter options={Filters} value={filter} onChange={setFilter} />

                <div className="projects-list">
                    {filtered.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    <button className="new-project-card" onClick={() => setModalOpen(true)}>
                        <span className="plus">+</span>
                        Добавить проект
                    </button>
                </div>
            </div>

            <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}