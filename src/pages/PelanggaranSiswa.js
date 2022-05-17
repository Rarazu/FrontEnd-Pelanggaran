import { useState, useEffect } from "react"
import axios from "axios"

export default function PelanggaranSiswa() {
    if(!localStorage.getItem(`token-pelanggaran`)){
        window.location.href = "/login"
    }
    let [siswa, setSiswa] = useState([])
    let [pelanggaran, setPelanggaran] = useState([])
    let [selectedSiswa, setSelectedSiswa] = useState("")
    let [selectedDate, setSelectedDate] = useState("")
    let [selectedPelanggaran, setSelectedPelanggaran] = useState([])

    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getSiswa = () => {
        let endpoint = "http://localhost:8000/siswa"
        axios.get(endpoint, authorization)
            .then(result => {
                // store data to state siswa
                setSiswa(result.data)
            })
            .catch(error => console.log(error))
    }

    let getPelanggaran = () => {
        let endpoint = "http://localhost:8000/pelanggaran"
        axios.get(endpoint, authorization)
            .then(result => {
                // store data to state pelanggaran
                setPelanggaran(result.data)
            })
            .catch(error => console.log(error))
    }

    let addPelanggaran = (id_pelanggaran) => {
        // cek keberadaan id_pelanggaran di dalam selectedPelanggaran
        let temp = [...selectedPelanggaran]
        let found = temp.find(
            item => item.id_pelanggaran === id_pelanggaran
        )

        // jika ditemukan data yg sama = dihapus
        // jika tidak menemukan = ditambahkan
        if (found) {
            let index = temp.findIndex(
                item => item.id_pelanggaran === id_pelanggaran
            )
            temp.splice(index, 1)
        } else {
            temp.push({
                id_pelanggaran: id_pelanggaran
            })
        }
        // memasukkan id pelanggaran yg dipilih
        // ke selectedPelanggaran
        setSelectedPelanggaran(temp)
    }

    let savePelanggaranSiswa = () => {
        if (window.confirm(`Sure to save this data?`)) {
            // ambil id_user
            let user = JSON.parse(localStorage.getItem(`user-pelanggaran`))
            let id = user.id_user

            let endpoint = `http://localhost:8000/pelanggaran_siswa`
            let request = {
                waktu: selectedDate,
                id_user: id,
                id_siswa: selectedSiswa,
                detail_pelanggaran_siswa: selectedPelanggaran
            }

            // sending data
            axios.post(endpoint, request, authorization)
                .then(result => {
                    alert(result.data.message)
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        getSiswa()
        getPelanggaran()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card m-3">
                <div className="card-header" style={{ background: `pink` }}>
                    <h4 style={{color: `teal`}}>Form Pelanggaran Siswa</h4>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-2">
                            Pilih Siswa
                        </div>
                        <div className="col-10">
                            <select className="form-control"
                                onChange={ev => setSelectedSiswa(ev.target.value)}
                                value={selectedSiswa}>
                                <option value="">
                                    --- List Siswa ---
                                </option>
                                {siswa.map(item => (
                                    <option
                                        value={item.id_siswa}
                                        key={`key${item.id_siswa}`}>
                                        {item.nama}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-2 my-2">
                            Tanggal Pelanggaran
                        </div>
                        <div className="col-10 my-2">
                            <input type="date"
                                className="form-control"
                                onChange={ev => setSelectedDate(ev.target.value)}
                                value={selectedDate} />
                        </div>

                        <div className="col-2 my-2">
                            Jenis Pelanggaran
                        </div>
                        <div className="col-10 my-2">
                            {pelanggaran.map(item => (
                                <div key={`ppp${item.id_pelanggaran}`} >
                                    <input type={"checkbox"}
                                        value={item.id_pelanggaran}
                                        className="me-2"
                                        onClick={() => addPelanggaran(item.id_pelanggaran)}
                                    />
                                    {item.nama_pelanggaran}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-success"
                        onClick={() => savePelanggaranSiswa()}>
                        <span className="fa fa-check"></span> Save
                    </button>

                    {/* isi dari selected Siswa : {selectedSiswa} <br/>
                    isi dari selected Date : {selectedDate} <br/>
                    isi dari selected Pelanggaran : {selectedPelanggaran.map(item => `${item.id_pelanggaran},`)}  */}
                </div>
            </div>
        </div>
    )
}