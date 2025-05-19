import React, { useEffect, useState } from "react";
import axios from "axios";
import { School } from "lucide-react";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Ambil data guru dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/teachers");
        if (Array.isArray(response.data)) {
          setTeachers(response.data);
        } else {
          throw new Error("Format data tidak valid");
        }
      } catch (err) {
        console.error("Gagal mengambil data guru:", err);
        setError("Gagal memuat data guru. Pastikan server backend berjalan dan endpoint tersedia.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-100 py-10 px-4">
      <div className="w-full max-w-6xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Judul Halaman */}
        <div className="flex items-center justify-center mb-8">
          <School className="text-indigo-600 w-7 h-7 mr-3" />
          <h1 className="text-3xl font-bold text-indigo-800">Daftar Guru</h1>
        </div>

        {/* Status Loading */}
        {isLoading && (
          <p className="text-indigo-500 text-center text-lg">Memuat data guru...</p>
        )}

        {/* Status Error */}
        {!isLoading && error && (
          <p className="text-red-500 text-center text-lg">{error}</p>
        )}

        {/* Tabel Data */}
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            {teachers.length === 0 ? (
              <div className="text-center text-gray-500 italic py-6 text-lg">
                Belum ada data guru.
              </div>
            ) : (
              <table className="w-full text-base text-left border rounded-xl overflow-hidden">
                <thead className="bg-indigo-300 text-indigo-900 text-lg">
                  <tr>
                    <th className="px-6 py-4 border-b w-1/12">No</th>
                    <th className="px-6 py-4 border-b w-6/12">Nama</th>
                    <th className="px-6 py-4 border-b w-5/12">NIP</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={teacher._id || index} className="hover:bg-indigo-50">
                      <td className="px-6 py-4 border-b">{index + 1}</td>
                      <td className="px-6 py-4 border-b font-medium">{teacher.name}</td>
                      <td className="px-6 py-4 border-b">{teacher.nip}</td>
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

export default TeacherList;
