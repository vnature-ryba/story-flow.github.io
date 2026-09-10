import "./Style.scss";

export default function SlateStrip({color}) {
    const style = {}
    if (color) style['--stripe-color'] = color
    return (
        <div className="slate-strip" style={style}></div>
    );
}
