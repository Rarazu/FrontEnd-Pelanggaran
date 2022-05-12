import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Pelanggaran from "./pages/Pelanggaran";
import User from "./pages/User";
import Navbar from "./pages/Navbar";
import Siswa from "./pages/Siswa";
import PelanggaranSiswa from "./pages/PelanggaranSiswa";
import ListPelanggaranSiswa from "./pages/ListPelanggaranSiswa";
export default function App(){
  return(
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pelanggaran" element={<Pelanggaran />} />
        <Route path="/user" element={<User />} />
        <Route path="/siswa" element={<Siswa />} />
        <Route path="/pelanggaran-siswa" element={<PelanggaranSiswa />} />
        <Route path="/list-pelanggaran-siswa" element={<ListPelanggaranSiswa />} />
      </Routes>
    </BrowserRouter>
  )
}