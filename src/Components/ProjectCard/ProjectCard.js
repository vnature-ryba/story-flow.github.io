import {Link} from 'react-router-dom';
import "./Style.scss";
import SlateStrip from "../SlateStrip/SlateStrip";
import StatusPill from "../StatusPill/StatusPill";
import {statusIndex } from "../../data/statuses";

const STRIPE_BY_STATUS = {
    todo: 'var(--muted)',
    prep: 'var(--teal)',
    shoot: 'var(--red)',
    post: 'var(--amber)',
    done: 'var(--green)',
}

const DOT_BY_STATUS = {
    todo: 'var(--muted)',
    prep: 'var(--teal)',
    shoot: 'var(--red)',
    post: 'var(--amber)',
    done: 'var(--green)',
}

export default function ProjectCard({project}) {
    const scenes = project.scenes
    const currentId = statusIndex(project.status)

    return (
        <Link className="project-card" to={`/project/${project.id}`}>
            <SlateStrip color={STRIPE_BY_STATUS[project.status]}/>
            <div className="project-card-body">
                <div className="project-card-top">
                    <span className="project-format">{project.format || "Без формата"}</span>
                    <StatusPill statusKey={project.status} />
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-logline">{project.logline}</p>
                <div className="project-meta">
                    <span>{scenes.length} {sceneWord(scenes.length)}</span>
                    <span>{project.updatedLabel}</span>
                </div>
            </div>
            <div className="project-filmstrip">
                {Array.from({ length: 6 }).map((_, i) => (
                    <i
                        key={i}
                        className={i <= currentId && scenes.length > 0 ? 'on' : ''}
                        style={{ '--dot-color': DOT_BY_STATUS[project.status] }}
                    />
                ))}
            </div>
        </Link>
    )
}

function sceneWord(n) {
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return 'сцена'
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'сцены'
    return 'сцен'
}