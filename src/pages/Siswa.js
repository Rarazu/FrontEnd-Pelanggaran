import { useState, useEffect } from "react";
import axios from "axios";

export default function Siswa(){
    let [siswa, setSiswa] = useState([])

    // prepare token
    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // get data siswa dari backend
    let getData = () => {
        let endpoint = `http://localhost:8000/siswa`

        // sending data
        axios.get(endpoint, authorization)
        .then(response => {
            // simpan ke state siswa
            setSiswa(response.data)
        })
        .catch(error => console.log(error))
    }

    // memanggil getData
    useEffect(() => {
        getData()
    }, [])

    return(
        <div className="container-fluid">
            <div className="card m-3">
                <div className="card-header" style={{background: `teal`}}>
                    <h3 style={{color: `lightcyan`}}>
                        Daftar Siswa
                    </h3>
                </div>
                <div className="card-body" style={{background: `lightblue`}}>
                    <ul className="list-group">
                        {siswa.map(item => (
                            <li className="list-group-item"
                            key={`key-${item.id_siswa}`}>
                                <div className="row">
                                    {/* gambar */}
                                    <div className="col-lg-4">
                                        <img src={`http://localhost:8000/image/${item.image}`} 
                                        alt="Sabar..gambarnya error"
                                        style={{width: `250px`, height: `250px`, borderRadius: `50%`}} />
                                    </div>
                                    {/* deskripsi */}
                                    <div className="col-lg-4">
                                        <small className="fst-italic" style={{color: `teal`}}>
                                           NIS
                                        </small>
                                        <h5>{item.nis}</h5>
                                        <small className="fst-italic" style={{color: `teal`}}>
                                            Nama Siswa
                                        </small>
                                        <h5>{item.nama}</h5>
                                        <small className="fst-italic" style={{color: `teal`}}>
                                            Kelas
                                        </small>
                                        <h5>{item.kelas}</h5>
                                        <small className="fst-italic" style={{color: `teal`}}>
                                            Poin
                                        </small>
                                        <h5>{item.poin}</h5>
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