import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen } from "lucide-react";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/subjects")
      .then((res) => {
        setSubjects(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Gagal mengambil data mata pelajaran");
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 py-10 px-4">
      <div className="w-full max-w-5xl p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <BookOpen className="text-indigo-600 w-7 h-7 mr-3" />
          <h1 className="text-3xl font-bold text-indigo-800">
            Daftar Mata Pelajaran
          </h1>
        </div>

        {isLoading && (
          <div className="text-center text-indigo-600 font-semibold py-4 text-lg">
            Memuat data...
          </div>
        )}

        {error && (
          <p className="text-red-600 text-center py-4 text-lg">{error}</p>
        )}

        {!isLoading && !error && (
          <div className="overflow-x-auto">
            {subjects.length === 0 ? (
              <div className="text-center text-gray-500 py-6 italic text-lg">
                Tidak ada mata pelajaran yang tersedia.
              </div>
            ) : (
              <table className="w-full text-base text-left border rounded-xl overflow-hidden">
                <thead className="bg-indigo-300 text-indigo-900 text-lg">
                  <tr>
                    <th className="px-6 py-4 border-b w-1/12">No</th>
                    <th className="px-6 py-4 border-b w-7/12">Nama Mata Pelajaran</th>
                    <th className="px-6 py-4 border-b w-4/12">Kode</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr
                      key={subject._id}
                      className="hover:bg-indigo-50 transition duration-200"
                    >
                      <td className="px-6 py-4 border-b">{index + 1}</td>
                      <td className="px-6 py-4 border-b font-medium">
                        {subject.name}
                      </td>
                      <td className="px-6 py-4 border-b">{subject.code}</td>
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

export default SubjectList;
