import "./Style.scss";

export default function TechDetails({ tech, patchDraftTech }) {
    return (
        <div className="panel">
            <h2>Технические детали</h2>
            <div className="tech-list">
                <div className="tech-row">
                    <label htmlFor="location">Локация</label>
                    <input
                        type="text"
                        id="location"
                        value={tech.location}
                        onChange={patchDraftTech('location')}
                    />
                </div>
                <div className="tech-row">
                    <label htmlFor="duration">Хронометраж</label>
                    <input
                        type="text"
                        id="duration"
                        value={tech.duration}
                        onChange={patchDraftTech('duration')}
                    />
                </div>
                <div className="tech-row">
                    <label htmlFor="lens">Объектив</label>
                    <input
                        type="text"
                        id="lens"
                        value={tech.lens}
                        onChange={patchDraftTech('lens')}
                    />
                </div>
                <div className="tech-row">
                    <label htmlFor="actors">Актёры</label>
                    <input
                        type="text"
                        id="actors"
                        value={tech.actors}
                        onChange={patchDraftTech('actors')}
                    />
                </div>
                <div className="tech-row">
                    <label htmlFor="props">Реквизит</label>
                    <input
                        type="text"
                        id="props"
                        value={tech.props}
                        onChange={patchDraftTech('props')}
                    />
                </div>
            </div>
        </div>
    );
}
