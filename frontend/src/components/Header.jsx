import { Link } from 'react-router-dom';

function Header(){
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>College Express</h1>
                <p>Personalized guidance for Everyone wanting college</p>
            </div>
            <div className="navbar-links">
                <Link to="/about" className="nav-link">Home</Link>
                <Link to="/basicInfo" className="nav-link">Basic Info</Link>
                <Link to="/career-quiz" className="nav-link">Career Quiz</Link>
                <Link to="/roadmap" className="nav-link">Roadmap</Link>
                <Link to="/scholarship" className="nav-link">Scholarship</Link>
                <Link to="/essay" className="nav-link">Essay Grader</Link>
            </div>
        </nav>
    )
}

export default Header