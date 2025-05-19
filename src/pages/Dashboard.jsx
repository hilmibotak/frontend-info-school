import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, School, BookOpen, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

// Komponen Kartu Info
const CardInfo = ({ title, value, icon, bgColor, className }) => {
  return (
    <div className={`rounded-2xl p-6 shadow-md ${bgColor} ${className}`}>
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
};

// Hook animasi naik angka
const useCountUp = (end, duration = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    if (end === 0) {
      setCount(0);
      return;
    }
    const increment = end / (duration / 16);
    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(handle);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(handle);
  }, [end, duration]);

  return count;
};

const Dashboard = () => {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    subjects: 0,
    schedules: 0,
  });
  const [loading, setLoading] = useState(true);

  // Ambil data dari backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resStudents, resTeachers, resSubjects, resSchedules] = await Promise.all([
        axios.get("http://localhost:3000/api/students"),
        axios.get("http://localhost:3000/api/teachers"),
        axios.get("http://localhost:3000/api/subjects"),
        axios.get("http://localhost:3000/api/schedules"),
      ]);
      setCounts({
        students: resStudents.data.length || 0,
        teachers: resTeachers.data.length || 0,
        subjects: resSubjects.data.length || 0,
        schedules: resSchedules.data.length || 0,
      });
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Animasi angka
  const studentsCount = useCountUp(counts.students);
  const teachersCount = useCountUp(counts.teachers);
  const subjectsCount = useCountUp(counts.subjects);
  const schedulesCount = useCountUp(counts.schedules);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-r from-indigo-100 to-purple-100">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 text-center drop-shadow-md">
        Dashboard Sistem Informasi Sekolah
      </h1>

      {loading ? (
        <p className="text-center text-indigo-600 text-lg font-semibold">Memuat data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/students">
            <CardInfo
              title="Siswa"
              value={studentsCount}
              icon={<Users className="text-indigo-500 w-10 h-10" />}
              className="hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              bgColor="bg-indigo-50"
            />
          </Link>

          <Link to="/teachers">
            <CardInfo
              title="Guru"
              value={teachersCount}
              icon={<School className="text-green-500 w-10 h-10" />}
              className="hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              bgColor="bg-green-50"
            />
          </Link>

          <Link to="/subjects">
            <CardInfo
              title="Daftar Mata Pelajaran"
              value={subjectsCount}
              icon={<BookOpen className="text-yellow-500 w-10 h-10" />}
              className="hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              bgColor="bg-yellow-50"
            />
          </Link>

          <Link to="/schedules">
            <CardInfo
              title="Jadwal"
              value={schedulesCount}
              icon={<CalendarDays className="text-pink-500 w-10 h-10" />}
              className="hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              bgColor="bg-pink-50"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
