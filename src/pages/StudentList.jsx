import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Users } from "lucide-react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", nisn: "", class: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      const fetchedStudents = res.data?.data || res.data || [];
      setStudents(Array.isArray(fetchedStudents) ? fetchedStudents : []);
      setIsLoading(false);
    } catch (err) {
      setError("Gagal mengambil data siswa");
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/students/${editId}`, {
          name: formData.name,
          nisn: formData.nisn,
          class_id: parseInt(formData.class) || 0,
        });
        await fetchStudents(); // 👈 pindah ke sini
        setEditId(null);
      } else {
        await api.post("/students", {
          name: formData.name,
          nisn: formData.nisn,
          class_id: parseInt(formData.class) || 0,
        });
        await fetchStudents(); // 👈 sama di sini
      }
      setFormData({ name: "", nisn: "", class: "" });
    } catch (err) {
      console.error("Gagal menyimpan data siswa", err);
    }
  };


  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      nisn: student.nisn,
      class: student.class,
    });
    setEditId(student._id);
  };

  const handleCancelEdit = () => {
    setFormData({ name: "", nisn: "", class: "" });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Gagal menghapus siswa", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-sky-100 py-10 px-4">
      <div className="w-full max-w-6xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <Users className="text-blue-600 w-7 h-7 mr-3" />
          <h1 className="text-3xl font-bold text-blue-800">Daftar Siswa</h1>
        </div>

        {/* FORM INPUT */}
        <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded col-span-1"
            required
          />
          <input
            type="text"
            name="nisn"
            placeholder="NISN"
            value={formData.nisn}
            onChange={handleChange}
            className="p-2 border rounded col-span-1"
            required
          />
          <input
            type="text"
            name="class"
            placeholder="Kelas"
            value={formData.class}
            onChange={handleChange}
            className="p-2 border rounded col-span-1"
            required
          />
          <div className="col-span-1 flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editId ? "Update" : "Tambah"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Batal
              </button>
            )}
          </div>
        </form>

        {/* LOADING / ERROR */}
        {isLoading && (
          <p className="text-center text-blue-600 font-semibold py-4 text-lg">
            Memuat data siswa...
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 py-4 text-lg">{error}</p>
        )}

        {/* TABLE DATA */}
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            {students.length === 0 ? (
              <div className="text-center text-gray-500 py-6 italic text-lg">
                Belum ada data siswa.
              </div>
            ) : (
              <table className="w-full text-base text-left border rounded-xl overflow-hidden">
                <thead className="bg-blue-300 text-blue-900 text-lg">
                  <tr>
                    <th className="px-6 py-4 border-b w-1/12">No</th>
                    <th className="px-6 py-4 border-b w-4/12">Nama</th>
                    <th className="px-6 py-4 border-b w-3/12">NISN</th>
                    <th className="px-6 py-4 border-b w-2/12">Kelas</th>
                    <th className="px-6 py-4 border-b w-2/12">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student._id}
                      className="hover:bg-blue-50 transition duration-200"
                    >
                      <td className="px-6 py-4 border-b">{index + 1}</td>
                      <td className="px-6 py-4 border-b font-medium">{student.name}</td>
                      <td className="px-6 py-4 border-b">{student.nisn}</td>
                      <td className="px-6 py-4 border-b">{student.class}</td>
                      <td className="px-6 py-4 border-b">
                        <button
                          onClick={() => handleEdit(student)}
                          className="text-blue-600 hover:underline mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
