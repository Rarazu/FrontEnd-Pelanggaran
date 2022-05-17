import { useState, useEffect } from "react";
import axios from "axios";

export default function ListPelanggaranSiswa() {
    if(!localStorage.getItem(`token-pelanggaran`)){
        window.location.href = "/login"
    }
    let [list, setList] = useState([])
    let [pelanggaran, setPelanggaran] = useState([])
    let [user, setUser] = useState([])

    let token = localStorage.getItem("token-pelanggaran")
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = "http://localhost:8000/pelanggaran_siswa"
        // sending data

        axios.get(endpoint, authorization)
            .then(result => {
                setList(result.data)
            })
            .catch(error => console.log(error))
    }

    let deleteData = item => {
        if (window.confirm(`Reolly?? You Want to Delete THIS?`)) {
            let endpoint = `http://localhost:8000/pelanggaran_siswa/${item.id_pelanggaran_siswa}`

            axios.delete(endpoint, authorization)
            .then(result => {
                alert(result.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    let getPelanggaran = () => {
        let endpoint = "http://localhost:8000/pelanggaran"

        axios.get(endpoint, authorization)
            .then(result => {
                setPelanggaran(result.data)
            })
            .catch(error => console.log(error))
    }
    let getUser = () => {
        let endpoint = "http://localhost:8000/user"

        axios.get(endpoint, authorization)
            .then(result => {
                setUser(result.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
        getUser()
        getPelanggaran()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card m-3">
                <div className="card-header"
                    style={{ background: `teal` }}>
                    <h4 className="text-white">
                        List Pelanggaran Siswa
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {list.map(item => (
                            <li className="list-group-item"
                                key={`idPS${item.id_pelanggaran_siswa}`}>
                                <div className="row">
                                    <div className="col-3">
                                        <small>Nama Siswa</small>
                                        <h5>{item.siswa.nama} ({item.siswa.kelas})</h5>
                                    </div>
                                    <div className="col-2">
                                        <small>Poin Siswa</small>
                                        <h5>{item.siswa.poin}</h5>
                                    </div>
                                    <div className="col-4">
                                        <small>Waktu Pelanggaran</small>
                                        <h5>{item.waktu}</h5>
                                    </div>
                                    <div className="col-3">
                                        <div className="d-grip gap-2">
                                            <button className="btn btn-danger my-3"
                                            onClick={() => deleteData(item)}>
                                                <span className="fa fa-trash"></span> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="fst-italic" style={{color: `teal`}}>Detail Pelanggaran :</h6>
                                {item.detail_pelanggaran_siswa.map(detail => (
                                    <ul>
                                        <li>
                                            <h6 key={`idDetail${detail.id_pelanggaran}`}>
                                                {detail.pelanggaran.nama_pelanggaran}
                                            </h6>
                                        </li>
                                    </ul>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        // --- challenge ---
        // <div className="container-fluid">
        //     <div className="card">
        //         <div className="card-header" style={{ background: `teal` }}>
        //             <h4 style={{ color: `pink` }}>List Pelanggaran Siswa</h4>
        //         </div>
        //         <div className="card-body">
        //             <ul className="list-group">
        //                 {list.map(item => (
        //                     <li className="list-group-item"
        //                         key={`key-${item.id_pelanggaran_siswa}`}>
        //                         <div className="col-lg-3">
        //                             <h4 className="fw-light" style={{ color: `black`}}>
        //                                 ID : {item.id_pelanggaran_siswa}
        //                             </h4>
        //                             <small className="fst-italic" style={{ color: `teal` }}>
        //                                 Waktu
        //                             </small>
        //                             <h5>{item.waktu}</h5>
        //                         </div>
        //                         <div className="row">
        //                             {/* siswa */}

        //                             <div className="col-lg-4 p-2">
        //                                 <div className="p-2" style={{ border: `1px solid gray` }}>
        //                                     <div className="row">
        //                                         <div className="col-lg-4">
        //                                             <img src={`http://localhost:8000/image/${item.siswa.image}`}
        //                                                 alt="Pict"
        //                                                 style={{ width: `100px`, height: `100px`, borderRadius: `50%` }} />
        //                                         </div>
        //                                         <div className="col-lg-6">
        //                                             <h6 style={{ color: `teal` }}>
        //                                                 Siswa yang Melanggar
        //                                             </h6>
        //                                             <small>ID Siswa : {item.siswa.id_siswa}</small> <br />
        //                                             <small>NIS : {item.siswa.nis}</small> <br />
        //                                             <small>Nama : {item.siswa.nama}</small> <br />
        //                                             <small>Kelas : {item.siswa.kelas}</small> <br />
        //                                             <small>Poin : {item.siswa.poin}</small>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             {/* item.detail_pelanggaran_siswa[0].id */}
        //                             {pelanggaran.filter(pel => item.detail_pelanggaran_siswa[0].id_pelanggaran === pel.id_pelanggaran).map(pel => (
        //                                 //pelanggaran
        //                                 < div className="col-lg-4 p-2" >
        //                                     <div className="p-2" style={{ border: `1px solid gray` }}>
        //                                         <div className="col-lg-6">
        //                                             <h6 style={{ color: `teal` }}>
        //                                                 Melanggar
        //                                             </h6>
        //                                             <small>ID Pelanggaran : {pel.id_pelanggaran}</small> <br />
        //                                             <small>Jenis : {pel.nama_pelanggaran}</small> <br />
        //                                             <small>Poin : {pel.poin}</small> <br />
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             ))}

        //                             {user.filter(use => item.id_user === use.id_user).map(use => (
        //                                 //user
        //                                 < div className="col-lg-4 p-2" >
        //                                     <div className="p-2" style={{ border: `1px solid gray` }}>
        //                                         <div className="col-lg-6">
        //                                             <h6 style={{ color: `teal` }}>
        //                                                 User yang Menangani
        //                                             </h6>
        //                                             <small>ID User: {use.id_user}</small> <br />
        //                                             <small>Nama : {use.nama_user}</small> <br />
        //                                             <small>Username : {use.username}</small> <br />
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             ))}

        //                         </div>
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //     </div>
        // </div >

    )
}