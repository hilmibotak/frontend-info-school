import React, { useEffect, useState } from "react";
import axios from "axios";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/classes")
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data kelas");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Memuat data kelas...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Daftar Kelas</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Nama Kelas</th>
            <th className="border px-4 py-2">Wali Kelas</th>
          </tr>
        </thead>
        <tbody>
          {classes.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 italic text-gray-500">
                Tidak ada data kelas.
              </td>
            </tr>
          ) : (
            classes.map((kelas, i) => (
              <tr key={kelas._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2">{kelas.name}</td>
                <td className="border px-4 py-2">
                  {kelas.wali_kelas?.name || "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
