import "./navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar({ userRole }) {
    console.log("iz navbar " + userRole);
    return (
        <nav className="nav">
            <Link to="/" className="site-title">Incident Reporting System</Link>
            {userRole === 'ADMIN' && (
                <ul>
                    <CustomLink to="/viewing">Incidents</CustomLink>
                    <CustomLink to="/requesting">Requests</CustomLink>
                    <CustomLink to="/analysing">Analysis</CustomLink>
                    <CustomLink to="/danger">Danger</CustomLink>
                </ul>
            )}
            {userRole === 'user' && (
                <ul>
                    <CustomLink to="/viewing">Incidents</CustomLink>
                    <CustomLink to="/login">Login</CustomLink>
                </ul>
            )}
            {userRole === 'USER_WITH_ACCOUNT' && (
                <ul>
                    <CustomLink to="/adding">Add</CustomLink>
                    <CustomLink to="/viewing">Incidents</CustomLink>
                    <CustomLink to="/analysing">Analysis</CustomLink>
                </ul>
            )}
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""} >
            <Link to={to}{...props}>
                {children}
            </Link>
        </li>
    )
}
