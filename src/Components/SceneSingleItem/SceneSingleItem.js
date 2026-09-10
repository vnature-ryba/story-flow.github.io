import {Link} from "react-router-dom";
import StatusPill from "../StatusPill/StatusPill";
import "./Style.scss";

const ROW_COLOR = {
    todo: 'var(--status-todo)',
    prep: 'var(--status-prep)',
    shoot: 'var(--status-shoot)',
    post: 'var(--status-post)',
    done: 'var(--status-done)',
}

export default function SceneSingleItem({ scene, projectId, isDragged, onDragStart, onDragOverItem, onDragEnd}) {
    return (
        <Link
            className="scene-row"
            to={`/project/${projectId}/scene/${scene.id}`}
            style={{
                '--row-color': ROW_COLOR[scene.status],
                opacity: isDragged ? 0.4 : 1,
            }}
            draggable
            onDragStart={(e) => {
                e.stopPropagation()
                onDragStart(scene.id)
            }}
            onDragOver={(e) => {
                e.preventDefault()
                onDragOverItem(scene.id)
            }}
            onDragEnd={onDragEnd}
        >
            <div className="scene-num"></div>
            <div className={`scene-thumb ${!scene.thumbnail ? "empty" : ""}`}>
                {scene.thumbnail ? (
                    <img src={scene.thumbnail} alt=""/>
                ) : (
                    <>
                        нет<br/>кадра
                    </>
                )}
            </div>
            <div className="scene-info">
                <h3>{scene.title}</h3>
                <p>{scene.description || 'Описание ещё не добавлено'}</p>
            </div>
            <div className="scene-tags">
                <span>{scene.intext}</span>
                <span>{scene.daynight}</span>
            </div>
            <StatusPill statusKey={scene.status} />
            <div className="scene-drag" title="Перетащить">⠿</div>
        </Link>
    );
}
