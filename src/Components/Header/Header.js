import "./Style.scss";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";

export default function Header({ actions = null }) {
    const [isSticky, setIsSticky] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        };

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    return (
        <header className={`app-header ${isSticky ? 'sticky' : ''}`}>
            <Link className="logo" to={`/`}>
                <svg width="55" height="55" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor">
                    <path
                        d="m133.64 411.56-17.25-64.453c-5.0156-18.75 6.0938-38.016 24.844-43.031l65.531-17.578 122.9 72.516zm0 0h202.97l-99.938 101.86h-103.03zm950.86 148.74v529.26c0 9.3281-3.7031 18.281-10.312 24.844-6.6094 6.6094-15.516 10.312-24.844 10.312h-880.55c-9.3281 0-18.281-3.7031-24.844-10.312-6.6094-6.6094-10.312-15.516-10.312-24.844v-529.26zm-401.02 253.6-108.05-77.016c-10.734-7.6406-24.797-8.6719-36.516-2.625-11.719 6.0469-19.031 18.094-19.031 31.219v154.03c0 13.172 7.3594 25.219 19.031 31.219 11.719 6.0469 25.781 5.0156 36.516-2.625l108.05-77.016c9.2344-6.6094 14.766-17.25 14.766-28.641 0-11.344-5.4844-22.031-14.766-28.641zm-77.484-402.32h138.1l-99.938 101.86h-138.1zm407.48 0h70.969v101.86h-170.95l99.938-101.86zm-546.52-194.81 133.4-35.766 122.9 72.516-133.4 35.766zm393.61-105.47 131.16-35.156c18.75-5.0156 38.016 6.0938 43.031 24.844l17.25 64.453-68.578 18.375-122.9-72.516zm-590.44 158.21 133.4-35.766 122.9 72.516-133.4 35.766zm393.61-105.47 133.4-35.766 122.9 72.516-133.4 35.766zm-261.56 247.55h138.1l-99.938 101.86h-138.1zm407.48 0h138.1l-99.938 101.86h-138.1z"
                        fill-rule="evenodd"/>
                </svg>
                <div>
                    <h3>Story Flow</h3>
                    <p>Блокнот Режиссёра</p>
                </div>
            </Link>
            <div className="header-actions">
                {actions}
            </div>
        </header>
    );
}
