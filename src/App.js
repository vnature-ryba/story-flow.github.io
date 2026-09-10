import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { DataProvider } from './context/DataContext';
import './Scss/MainStyles.scss'
import ProjectsPage from "./Pages/ProjectsPage";
import ProjectPage from "./Pages/ProjectPage";
import ScenePage from "./Pages/ScenePage"


export default function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProjectsPage/>}/>
                    <Route path="/project/:projectId" element={<ProjectPage/>}/>
                    <Route path="/project/:projectId/scene/:sceneId" element={<ScenePage/>}/>
                </Routes>
            </BrowserRouter>
        </DataProvider>
    );
}
