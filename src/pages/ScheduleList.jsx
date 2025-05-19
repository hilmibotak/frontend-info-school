import React, { useEffect, useState } from "react";
import axios from "axios";

const ScheduleList = () => {
const [schedules, setSchedules] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
axios
.get("http://localhost:3000/api/schedules")
.then((res) => {
setSchedules(res.data);
setLoading(false);
})
.catch(() => {
setError("Gagal memuat data jadwal");
setLoading(false);
});
}, []);

return (
<div className="min-h-screen flex items-center justify-center bg-slate-100">
<div className="w-full max-w-5xl p-6 bg-white rounded-xl shadow-lg border border-gray-200">
<h1 className="text-2xl font-bold mb-5 text-indigo-800 text-center">
Daftar Jadwal
</h1>

    {loading && <p className="text-center text-gray-500">Memuat data...</p>}
    {error && <p className="text-center text-red-500">{error}</p>}

    {!loading && !error && (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-indigo-100 text-indigo-900">
            <tr>
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">Hari</th>
              <th className="px-4 py-2 border-b">Jam</th>
              <th className="px-4 py-2 border-b">Guru</th>
              <th className="px-4 py-2 border-b">Kelas</th>
              <th className="px-4 py-2 border-b">Mata Pelajaran</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((item, index) => (
                <tr key={item._id}>
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{item.day}</td>
                  <td className="px-4 py-2 border-b">{item.time}</td>
                  <td className="px-4 py-2 border-b">{item.teacher?.name || "-"}</td>
                  <td className="px-4 py-2 border-b">{item.class?.name || "-"}</td>
                  <td className="px-4 py-2 border-b">{item.subject?.name || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  Tidak ada data jadwal.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </div>
</div>
);
};

export default ScheduleList;