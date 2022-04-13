import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";
import { Modal } from "bootstrap";

export default function User() {
    let [user, setUser] = useState([])
    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = `http://localhost:8000/user`

        axios.get(endpoint, authorization)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card m-3">
                <div className="card-header" style={{ background: `lightgray` }}>
                    <h3 style={{ color: `teal` }}>
                        Daftar User
                    </h3>
                </div>
                <div className="card-body" style={{ background: `lightblue` }}>
                    <ul className="list-group">
                        {user.map(item => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Id User
                                        </small>
                                        <h5>{item.id_user}</h5>
                                    </div>
                                    <div className="col-lg-4">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Nama User
                                        </small>
                                        <h5>{item.nama_user}</h5>
                                    </div>
                                    <div className="col-lg-4">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Username
                                        </small>
                                        <h5>{item.username}</h5>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Option
                                        </small>
                                        <br/>
                                        <button className="btn btn-sm btn-info mx-1">
                                            <span className="fa fa-edit"></span> Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger mx-1">
                                            <span className="fa fa-trash"></span> Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* button add user */}
                    <button className="btn btn-sm btn-success my-3">
                        <span className="fa fa-plus"></span>
                        Add User
                    </button>

                </div>
            </div>
        </div>
    )
}