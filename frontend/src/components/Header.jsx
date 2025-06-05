import { Link } from 'react-router-dom';

function Header(){
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>First-Gen First Step</h1>
                <p>Personalized guidance for first-gen students</p>
            </div>
            <div className="navbar-links">
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/roadmap" className="nav-link">Roadmap</Link>
                <Link to="/scholarship" className="nav-link">Scholarship</Link>
                <Link to="/essay" className="nav-link">Essay Grader</Link>
            </div>
        </nav>
    )
}

export default Header