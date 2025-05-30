import { Link } from 'react-router-dom';

function Header(){
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>College Roadmap Generator</h1>
                <p>Personalized guidance for first-gen students</p>
            </div>
            <div className="navbar-links">
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/roadmap" className="nav-link">Roadmap</Link>
                <Link to="/scholarship" className="nav-link">Scholarship</Link>
            </div>
        </nav>
    )
}

export default Header