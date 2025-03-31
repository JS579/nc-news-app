import {Link} from 'react-router'

function NavBar (){
    return (
    <nav>
        <ul className="nav-bar">
            <li key="home" className="nav-item"><Link to="/">Home</Link></li>
            <li key="topics" className="nav-item"><Link to="/articles">Articles</Link></li>
            <li key="list-item" className="nav-item">Topics</li>
            <li key="view-basket" className="nav-item">Users</li>
        </ul>
    </nav>
    )
}

export default NavBar