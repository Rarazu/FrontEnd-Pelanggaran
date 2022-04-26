import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Toast } from "bootstrap";

export default function Siswa() {
    let [siswa, setSiswa] = useState([])
    let [idSiswa, setIdSiswa] = useState(0)
    let [nis, setNis] = useState(0)
    let [nama, setNama] = useState("")
    let [kelas, setKelas] = useState("")
    let [poin, setPoin] = useState(0)
    let [image, setImage] = useState(null)
    let [action, setAction] = useState("")

    let [message, setMessage] = useState("")
    let [modal, setModal] = useState(null)
    let [uploadImage, setUploadImage] = useState(true)

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

    /** create function to show Toast */
    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah untuk mengisi state 'message' */
        setMessage(message)
        /** tampilkan toast */
        myToast.show()
    }

    let addSiswa = () => {
        // open modal
        modal.show()
        setIdSiswa(0)
        setNis(0)
        setNama("")
        setKelas("")
        setPoin(0)
        setImage(null)
        setAction("insert")
        setUploadImage(true)
    }

    let editSiswa = item => {
        modal.show()
        setIdSiswa(item.id_siswa)
        setNis(item.nis)
        setNama(item.nama)
        setKelas(item.kelas)
        setPoin(item.poin)
        setImage(null)
        setAction("edit")
        setUploadImage(false)
    }

    let saveSiswa = ev => {
        ev.preventDefault()

        // close modal
        modal.hide()

        if (action === `insert`) {
            /** 
             * 1. mengirimkan ke backend
             * 2. isi request
             * 3. sisipkan data menggunankan formData
             */
            let endpoint = `http://localhost:8000/siswa`
            let request = new FormData()
            request.append(`nis`, nis)
            request.append(`nama`, nama)
            request.append(`kelas`, kelas)
            request.append(`poin`, poin)
            request.append(`image`, image)

            // sending data
            axios.post(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    // refresh newest data
                    getData()
                })
                .catch(error => console.log(error))
        } else if (action === `edit`) {
            let endpoint = `http://localhost:8000/siswa/${idSiswa}`
            let request = new FormData()
            request.append(`nis`, nis)
            request.append(`nama`, nama)
            request.append(`kelas`, kelas)
            request.append(`poin`, poin)
            
            if (uploadImage === true) {
                request.append(`image`, image)
            }

            // sending data
            axios.put(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    let deleteSiswa = item => {
        if (window.confirm(`Reolly?? You Want to Delete THIS?`)) {
            let endpoint = `http://localhost:8000/siswa/${item.id_siswa}`
            // sending data
            axios.delete(endpoint, authorization)
                .then(response => {
                    showToast(response.data.message)
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    // memanggil getData
    useEffect(() => {
        let myModal = new Modal(
            document.getElementById("modal_siswa")
        )
        setModal(myModal)
        getData()
    }, [])

    return (
        <div className="container-fluid">

            {/* Start Toast Component */}
            <div className="position-fixed top-0 end-0 p-3"
                style={{ zIndex: 11 }}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header text-white" style={{ background: `teal` }}>
                        <strong>Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/* End Toast Component */}

            <div className="card m-3">
                <div className="card-header" style={{ background: `teal` }}>
                    <h3 style={{ color: `lightcyan` }}>
                        Daftar Siswa
                    </h3>
                </div>
                <div className="card-body" style={{ background: `lightblue` }}>
                    <ul className="list-group">
                        {siswa.map(item => (
                            <li className="list-group-item"
                                key={`key-${item.id_siswa}`}>
                                <div className="row">
                                    {/* gambar */}
                                    <div className="col-lg-4">
                                        <img src={`http://localhost:8000/image/${item.image}`}
                                            alt="Sabar..gambarnya error"
                                            style={{ width: `250px`, height: `250px`, borderRadius: `50%` }} />
                                    </div>
                                    {/* deskripsi */}
                                    <div className="col-lg-5">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            NIS
                                        </small>
                                        <h5>{item.nis}</h5>
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Nama Siswa
                                        </small>
                                        <h5>{item.nama}</h5>
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Kelas
                                        </small>
                                        <h5>{item.kelas}</h5>
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Poin
                                        </small>
                                        <h5>{item.poin}</h5>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="d-grid gap-2">
                                            <small className="fst-italic text-center" style={{ color: `teal` }}>
                                                Option
                                            </small>
                                            <button className="btn btn-info btn-sm m-2"
                                                onClick={() => editSiswa(item)}>
                                                <span className="fa fa-edit"></span> Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm m-2"
                                            onClick={() => deleteSiswa(item)}>
                                                <span className="fa fa-trash"></span> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* button add data siswa */}
                    <button className="btn btn-success btn-sm m-2"
                        onClick={() => addSiswa()}>
                        <span className="fa fa-plus"></span> Add Data
                    </button>

                    {/* modal (form siswa) */}
                    <div className="modal" id="modal_siswa">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{ background: `lightblue` }}>
                                    <h4 className="text-secondary">
                                        Form Siswa
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(ev) => saveSiswa(ev)}>
                                        {/* input data */}
                                        NIS
                                        <input type="number" className="form-control mb-2" required
                                            value={nis} onChange={ev => setNis(ev.target.value)} />

                                        Nama
                                        <input type="text" className="form-control mb-2" required
                                            value={nama} onChange={ev => setNama(ev.target.value)} />

                                        Kelas
                                        <input type="text" className="form-control mb-2" required
                                            value={kelas} onChange={ev => setKelas(ev.target.value)} />

                                        Poin
                                        <input type="number" className="form-control mb-2" required
                                            value={poin} onChange={ev => setPoin(ev.target.value)} />

                                        Gambar
                                        <input type="file" 
                                            className={`form-control mb-2 ${uploadImage ? `` : `d-none`}`}
                                            required={uploadImage}
                                            accept="image/*"
                                            onChange={ev => setImage(ev.target.files[0])} />

                                        <br/>
                                        <button className={`btn btn-sm my-2 ${uploadImage ? `d-none` : ``}`}
                                        type="button"
                                        style={{background: `lightgray`}}
                                        onClick={() => setUploadImage(true)}>
                                            Click to re-upload image
                                        </button>

                                        <br/>
                                        {/* button  */}
                                        <button className="btn btn-success mx-1" type="submit">
                                            <span className="fa fa-check"></span> Save
                                        </button>
                                        <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">
                                            <span className="fa fa-times"></span> Cancel
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end of modal */}
                </div>
            </div>
        </div>
    )
}