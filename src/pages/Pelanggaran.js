import { useState, useEffect } from "react";
import axios from "axios";

export default function Pelanggaran() {
    let [pelanggaran, setPelanggaran] = useState([])

    // proses get token from local storage
    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // create function to get data pelanggaran from backend
    let getData = () => {
        /**
         * proses inisiasi data pelanggaran
         * endpoint = http://localhost:8000/pelanggaran
         * method = get
         * request = NONE
         * response = array data pelanggaran
         * authorization = Bearer Token
         */
        let endpoint = `http://localhost:8000/pelanggaran`

        // sending data
        axios.get(endpoint, authorization)
            .then(response => {
                // simpan di state pelanggaran
                setPelanggaran(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card m-3">
                <div className="card-header" style={{ background: `lightblue` }}>
                    <h3 style={{ color: `teal` }}>
                        Daftar Jenis Pelanggaran
                    </h3>
                </div>
                <div className="card-body" style={{ background: `lightgrey` }}>
                    <ul className="list-group">
                        {pelanggaran.map(item => (
                            <li className="list-group-item">
                                <div className="row" >
                                    <div className="col-lg-4">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            ID Pelanggaran
                                        </small>
                                        <h5>{item.id_pelanggaran}</h5>
                                    </div>
                                    <div className="col-lg-6">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Nama Pelanggaran
                                        </small>
                                        <h5>{item.nama_pelanggaran}</h5>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Poin
                                        </small>
                                        <h5>
                                            <span class="badge text-danger" style={{ background: `lightblue` }}>
                                                {item.poin}
                                            </span>
                                        </h5>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}