import React, { useEffect, useState } from "react";
import axios from "axios";
import CardInfo from "../components/molecules/CardInfo";
import { Users, BookOpen, CalendarDays, School } from "lucide-react";

// Simple count-up animation hook
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
    classes: 0,
    schedules: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resStudents, resTeachers, resClasses, resSchedules] = await Promise.all([
        axios.get("http://localhost:3000/api/students"),
        axios.get("http://localhost:3000/api/teachers"),
        axios.get("http://localhost:3000/api/classes"),
        axios.get("http://localhost:3000/api/schedules"),
      ]);
      setCounts({
        students: resStudents.data.length,
        teachers: resTeachers.data.length,
        classes: resClasses.data.length,
        schedules: resSchedules.data.length,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pakai hook count up supaya angka animasi naik
  const studentsCount = useCountUp(counts.students);
  const teachersCount = useCountUp(counts.teachers);
  const classesCount = useCountUp(counts.classes);
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
          <CardInfo
            title="Siswa"
            value={studentsCount}
            icon={<Users className="text-indigo-500 w-10 h-10" />}
            className="hover:shadow-xl transition-shadow duration-300"
            bgColor="bg-indigo-50"
          />
          <CardInfo
            title="Guru"
            value={teachersCount}
            icon={<School className="text-green-500 w-10 h-10" />}
            className="hover:shadow-xl transition-shadow duration-300"
            bgColor="bg-green-50"
          />
          <CardInfo
            title="Kelas"
            value={classesCount}
            icon={<BookOpen className="text-yellow-500 w-10 h-10" />}
            className="hover:shadow-xl transition-shadow duration-300"
            bgColor="bg-yellow-50"
          />
          <CardInfo
            title="Jadwal"
            value={schedulesCount}
            icon={<CalendarDays className="text-pink-500 w-10 h-10" />}
            className="hover:shadow-xl transition-shadow duration-300"
            bgColor="bg-pink-50"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
