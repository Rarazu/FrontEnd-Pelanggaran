import { Link } from "react-router-dom";
// import { Dropdown} from "bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from "react-bootstrap";     
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm bg-secondary navbar-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/pelanggaran">Pelanggaran</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/user">User</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/siswa">Siswa</Link>
                        </li>
                        <Dropdown>
                            <DropdownToggle className="text-dark" style={{background: `lightblue`, border: `gray`}}>Pelanggaran Siswa</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/pelanggaran-siswa">Add Data</DropdownItem>
                                <DropdownItem href="/list-pelanggaran-siswa">List Data</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ul>
                </div>
            </div>
        </nav>
    )
}