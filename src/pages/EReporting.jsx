import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  Download, 
  Search, 
  FileText, 
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Calendar,
  AlertCircle,
  Eye,
  RefreshCw,
  Shield,
  Building,
  FileCheck,
  AlertTriangle,
  CalendarCheck,
  CalendarDays,
  ClockAlert,
  Calendar as CalendarIcon,
  Clock4,
  CheckSquare,
  Hourglass,
  AlertOctagon
} from 'lucide-react';

const Ereporting = () => {
  // Fungsi untuk mendapatkan waktu saat ini di WIB (menggunakan local time Indonesia)
  const getCurrentWIBTime = () => {
    const now = new Date();
    return now;
  };

  // State untuk waktu real-time
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentWIBTime());
  const [reportsWithPeriod, setReportsWithPeriod] = useState([]);
  
  // State untuk periode tanggal - default 1 tahun kebelakang dari hari ini
  const [dateRange, setDateRange] = useState(() => {
    const currentDate = getCurrentWIBTime();
    const currentYear = currentDate.getFullYear();
    
    return {
      startDate: `${currentYear - 1}-01-01`, // 1 tahun ke belakang
      endDate: `${currentYear}-12-31`        // tahun berjalan
    };
  });
  
  // State untuk filter - DIPERBAHARUI untuk struktur baru
  const [filters, setFilters] = useState({
    periodeStatus: 'aktif',
    subFilters: {
      statusDetail: 'all',
      jenisLJK: 'all',
      periode: 'all',
      searchTerm: '',
      reviewStatus: 'all' // Status review untuk filter level 3
    }
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showSubFilters, setShowSubFilters] = useState(true);

  // Update waktu real-time WIB setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentWIBTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Data reports Ereporting dengan tanggal real-time
  const initialReports = useMemo(() => {
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1; // 1-indexed
    const currentDay = currentDateTime.getDate();
    
    // Fungsi untuk mendapatkan tanggal yang aman
    const getSafeDate = (year, month, day) => {
      let safeMonth = month;
      let safeYear = year;
      
      if (safeMonth <= 0) {
        safeMonth += 12;
        safeYear -= 1;
      } else if (safeMonth > 12) {
        safeMonth -= 12;
        safeYear += 1;
      }
      
      const lastDayOfMonth = new Date(safeYear, safeMonth, 0).getDate();
      const safeDay = Math.min(day, lastDayOfMonth);
      
      return { year: safeYear, month: safeMonth, day: safeDay };
    };
    
    // Hitung tanggal yang aman untuk semua variabel yang dibutuhkan
    const prevMonth5 = getSafeDate(currentYear, currentMonth - 1, 5);
    const prevMonth10 = getSafeDate(currentYear, currentMonth - 1, 10);
    const prevMonth15 = getSafeDate(currentYear, currentMonth - 1, 15);
    const prevMonth20 = getSafeDate(currentYear, currentMonth - 1, 20);
    const prevMonth25 = getSafeDate(currentYear, currentMonth - 1, 25);
    const prevMonth30 = getSafeDate(currentYear, currentMonth - 1, 30);
    const prevMonth31 = getSafeDate(currentYear, currentMonth - 1, 31);
    
    const currentMonth5 = getSafeDate(currentYear, currentMonth, 5);
    const currentMonth7 = getSafeDate(currentYear, currentMonth, 7);
    const currentMonth10 = getSafeDate(currentYear, currentMonth, 10);
    const currentMonth15 = getSafeDate(currentYear, currentMonth, 15);
    const currentMonth20 = getSafeDate(currentYear, currentMonth, 20);
    const currentMonth25 = getSafeDate(currentYear, currentMonth, 25);
    const currentMonth28 = getSafeDate(currentYear, currentMonth, 28);
    const currentMonth30 = getSafeDate(currentYear, currentMonth, 30);
    const currentMonth31 = getSafeDate(currentYear, currentMonth, 31);
    
    const nextMonth5 = getSafeDate(currentYear, currentMonth + 1, 5);
    const nextMonth10 = getSafeDate(currentYear, currentMonth + 1, 10);
    const nextMonth15 = getSafeDate(currentYear, currentMonth + 1, 15);
    const nextMonth20 = getSafeDate(currentYear, currentMonth + 1, 20);
    const nextMonth25 = getSafeDate(currentYear, currentMonth + 1, 25);
    const nextMonth30 = getSafeDate(currentYear, currentMonth + 1, 30);
    
    return [
      {
  "id": 1,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE",
  "namaLaporan": "Laporan Kegiatan Penjamin Emisi Efek",
  "periodeLaporan": "Semesteran",
  "batasWaktu": "HK 12 bulan berikutnya (Juli dan Januari)",
  "deadlineDate": "2024-07-15T23:59:59",
  "submissionDate": "2024-07-10T14:30:00",
  "waktuSubmit": "2024-07-10T14:30:00",
  "waktuDeadline": "2024-07-15T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Tepat Waktu",
  "statusReview": "belum-review",
  "jenisData": "Reguler",
  "versiLaporan": "v2.1.5",
  "kategoriPrioritas": "Medium",
  "jumlahRevisi": 0,
  "terakhirDiperbarui": "2024-07-10T15:45:00"
},
{
  "id": 2,
  "aplikasi": "Ereporting",
  "jenisLJK": "PPE AB, PPE Non AB",
  "namaLaporan": "Laporan Kegiatan Perantara Perdagangan Efek",
  "periodeLaporan": "Bulanan",
  "batasWaktu": "HK 12 bulan berikutnya",
  "deadlineDate": "2024-08-10T23:59:59",
  "submissionDate": "2024-08-05T09:15:00",
  "waktuSubmit": "2024-08-05T09:15:00",
  "waktuDeadline": "2024-08-10T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Tepat Waktu",
  "statusReview": "belum-review",
  "jenisData": "Rutin",
  "versiLaporan": "v3.0.2",
  "kategoriPrioritas": "High",
  "jumlahRevisi": 1,
  "terakhirDiperbarui": "2024-08-05T10:20:00"
},
{
  "id": 3,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB, PPE Non AB",
  "namaLaporan": "Laporan Keuangan Tahunan (Audited)",
  "periodeLaporan": "Tahunan",
  "batasWaktu": "31 Maret tahun berikutnya",
  "deadlineDate": "2025-03-31T23:59:59",
  "submissionDate": "2025-03-25T14:20:00",
  "waktuSubmit": "2025-03-25T14:20:00",
  "waktuDeadline": "2025-03-31T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Tepat Waktu",
  "statusReview": "sedang-review",
  "jenisData": "Audit",
  "versiLaporan": "v1.8.3",
  "kategoriPrioritas": "Critical",
  "jumlahRevisi": 2,
  "terakhirDiperbarui": "2025-03-25T16:10:00"
},
{
  "id": 4,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB, PPE Non AB",
  "namaLaporan": "Laporan Keuangan Tengah Tahunan",
  "periodeLaporan": "Tahunan",
  "batasWaktu": "1, 2 atau 3 bulan sejak tengah tahun buku (sesuai jenis LKTT)",
  "deadlineDate": "2024-09-30T23:59:59",
  "submissionDate": "2024-09-15T11:45:00",
  "waktuSubmit": "2024-09-15T11:45:00",
  "waktuDeadline": "2024-09-30T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Tepat Waktu",
  "statusReview": "sudah-review",
  "jenisData": "Intermediate",
  "versiLaporan": "v2.4.1",
  "kategoriPrioritas": "Medium",
  "jumlahRevisi": 0,
  "terakhirDiperbarui": "2024-09-15T13:30:00"
},
{
  "id": 5,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB, PPE Non AB",
  "namaLaporan": "Laporan Akuntan atas Modal Kerja Bersih Disesuaikan",
  "periodeLaporan": "Tahunan",
  "batasWaktu": "31 Maret tahun berikutnya",
  "deadlineDate": "2025-03-31T23:59:59",
  "submissionDate": "2025-03-20T10:30:00",
  "waktuSubmit": "2025-03-20T10:30:00",
  "waktuDeadline": "2025-03-31T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Tepat Waktu",
  "statusReview": "belum-review",
  "jenisData": "Akuntansi",
  "versiLaporan": "v1.5.2",
  "kategoriPrioritas": "High",
  "jumlahRevisi": 1,
  "terakhirDiperbarui": "2025-03-20T11:45:00"
},
{
  "id": 6,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB, PPE Non AB",
  "namaLaporan": "Laporan Kegiatan di Lokasi Lain selain Kantor Pusat",
  "periodeLaporan": "Semesteran",
  "batasWaktu": "7 Hari setelah periode laporan (7 juli dan 7 Januari)",
  "deadlineDate": "2024-07-07T23:59:59",
  "submissionDate": "2024-07-05T15:40:00",
  "waktuSubmit": "2024-07-05T15:40:00",
  "waktuDeadline": "2024-07-07T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Tepat Waktu",
  "statusReview": "sedang-review",
  "jenisData": "Operasional",
  "versiLaporan": "v3.2.0",
  "kategoriPrioritas": "Medium",
  "jumlahRevisi": 0,
  "terakhirDiperbarui": "2024-07-05T16:55:00"
},
{
  "id": 7,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB, PPE Non AB",
  "namaLaporan": "Laporan penunjukan AP dan/atau KAP",
  "periodeLaporan": "Tahunan",
  "batasWaktu": "10 HK setelah penunjukan",
  "deadlineDate": "2024-04-20T23:59:59",
  "submissionDate": "2024-04-15T09:25:00",
  "waktuSubmit": "2024-04-15T09:25:00",
  "waktuDeadline": "2024-04-20T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Tepat Waktu",
  "statusReview": "sudah-review",
  "jenisData": "Penunjukan",
  "versiLaporan": "v2.0.1",
  "kategoriPrioritas": "Low",
  "jumlahRevisi": 0,
  "terakhirDiperbarui": "2024-04-15T10:40:00"
},
{
  "id": 8,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB, PPE Non AB",
  "namaLaporan": "Laporan hasil evaluasi Komite Audit",
  "periodeLaporan": "Tahunan",
  "batasWaktu": "30 Juni tahun berikutnya",
  "deadlineDate": "2023-06-30T23:59:59",
  "submissionDate": "2023-07-02T13:10:00",
  "waktuSubmit": "2023-07-02T13:10:00",
  "waktuDeadline": "2023-06-30T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Terlambat",
  "statusReview": "sedang-review",
  "jenisData": "Evaluasi",
  "versiLaporan": "v1.9.4",
  "kategoriPrioritas": "High",
  "jumlahRevisi": 3,
  "terakhirDiperbarui": "2023-07-02T14:25:00"
},
{
  "id": 9,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB",
  "namaLaporan": "Laporan penerapan Tata Kelola tahunan",
  "periodeLaporan": "Tahunan",
  "batasWaktu": "15 Februari tahun berikutnya",
  "deadlineDate": "2023-02-15T23:59:59",
  "submissionDate": "2023-02-20T08:45:00",
  "waktuSubmit": "2023-02-20T08:45:00",
  "waktuDeadline": "2023-02-15T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Terlambat",
  "statusReview": "sudah-review",
  "jenisData": "Tata Kelola",
  "versiLaporan": "v2.7.3",
  "kategoriPrioritas": "Critical",
  "jumlahRevisi": 2,
  "terakhirDiperbarui": "2023-02-20T10:00:00"
},
{
  "id": 10,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB",
  "namaLaporan": "Revisi laporan penerapan Tata Kelola",
  "periodeLaporan": "setiap perubahan",
  "batasWaktu": "insidental",
  "deadlineDate": "2024-06-25T23:59:59",
  "submissionDate": "2024-06-28T14:30:00",
  "waktuSubmit": "2024-06-28T14:30:00",
  "waktuDeadline": "2024-06-25T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Terlambat",
  "statusReview": "belum-review",
  "jenisData": "Revisi",
  "versiLaporan": "v2.7.4",
  "kategoriPrioritas": "Medium",
  "jumlahRevisi": 1,
  "terakhirDiperbarui": "2024-06-28T15:45:00"
},
{
  "id": 11,
  "aplikasi": "Ereporting",
  "jenisLJK": "PPE AB, PPE Non AB",
  "namaLaporan": "Laporan Monitoring Transaksi Mencurigakan",
  "periodeLaporan": "Bulanan",
  "batasWaktu": "HK 10 bulan berikutnya",
  "deadlineDate": "2024-08-10T23:59:59",
  "submissionDate": null,
  "waktuSubmit": null,
  "waktuDeadline": "2024-08-10T23:59:59",
  "statusPengiriman": "Belum Lapor",
  "statusKetepatan": "Belum Submit",
  "statusReview": null,
  "jenisData": "Monitoring",
  "versiLaporan": "v4.1.0",
  "kategoriPrioritas": "Critical",
  "jumlahRevisi": 0,
  "terakhirDiperbarui": "2024-07-01T09:00:00"
},
{
  "id": 12,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE",
  "namaLaporan": "Laporan Insidentil Khusus",
  "periodeLaporan": "Insidentil",
  "batasWaktu": "24 jam setelah kejadian",
  "deadlineDate": "2024-05-05T23:59:59",
  "submissionDate": "2024-05-07T10:30:00",
  "waktuSubmit": "2024-05-07T10:30:00",
  "waktuDeadline": "2024-05-05T23:59:59",
  "statusPengiriman": "Gagal",
  "statusKetepatan": "Gagal Kirim",
  "statusReview": null,
  "jenisData": "Insidentil",
  "versiLaporan": "v1.2.3",
  "kategoriPrioritas": "High",
  "jumlahRevisi": 0,
  "terakhirDiperbarui": "2024-05-07T11:45:00"
},
{
  "id": 13,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB",
  "namaLaporan": "Laporan Evaluasi Mandiri",
  "periodeLaporan": "Semesteran",
  "batasWaktu": "30 Juni dan 31 Desember",
  "deadlineDate": "2023-06-30T23:59:59",
  "submissionDate": "2023-07-05T14:00:00",
  "waktuSubmit": "2023-07-05T14:00:00",
  "waktuDeadline": "2023-06-30T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Terlambat",
  "statusReview": "sedang-review",
  "jenisData": "Evaluasi",
  "versiLaporan": "v3.1.2",
  "kategoriPrioritas": "Medium",
  "jumlahRevisi": 1,
  "terakhirDiperbarui": "2023-07-05T15:15:00"
},
{
  "id": 14,
  "aplikasi": "Ereporting",
  "jenisLJK": "PPE AB",
  "namaLaporan": "Laporan Rencana Pengkinian Data (APU PPT)",
  "periodeLaporan": "Tahunan",
  "batasWaktu": "31 Desember tahun sebelumnya",
  "deadlineDate": "2023-12-31T23:59:59",
  "submissionDate": "2024-01-10T14:10:00",
  "waktuSubmit": "2024-01-10T14:10:00",
  "waktuDeadline": "2023-12-31T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Terlambat",
  "statusReview": "sudah-review",
  "jenisData": "Data Update",
  "versiLaporan": "v2.3.7",
  "kategoriPrioritas": "High",
  "jumlahRevisi": 2,
  "terakhirDiperbarui": "2024-01-10T15:25:00"
},
{
  "id": 15,
  "aplikasi": "Ereporting",
  "jenisLJK": "PPE AB, PPE Non AB",
  "namaLaporan": "Laporan Audit Internal",
  "periodeLaporan": "Tahunan",
  "batasWaktu": "31 Maret tahun berikutnya",
  "deadlineDate": "2023-03-31T23:59:59",
  "submissionDate": "2023-04-15T16:45:00",
  "waktuSubmit": "2023-04-15T16:45:00",
  "waktuDeadline": "2023-03-31T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Terlambat",
  "statusReview": "belum-review",
  "jenisData": "Audit",
  "versiLaporan": "v2.0.8",
  "kategoriPrioritas": "Critical",
  "jumlahRevisi": 3,
  "terakhirDiperbarui": "2023-04-15T18:00:00"
},
{
  "id": 16,
  "aplikasi": "Ereporting",
  "jenisLJK": "PEE, PPE AB",
  "namaLaporan": "Laporan Compliance Officer",
  "periodeLaporan": "Bulanan",
  "batasWaktu": "HK 15 bulan berikutnya",
  "deadlineDate": "2024-07-15T23:59:59",
  "submissionDate": null,
  "waktuSubmit": null,
  "waktuDeadline": "2024-07-15T23:59:59",
  "statusPengiriman": "Belum Lapor",
  "statusKetepatan": "Belum Submit",
  "statusReview": null,
  "jenisData": "Compliance",
  "versiLaporan": "v3.5.1",
  "kategoriPrioritas": "High",
  "jumlahRevisi": 0,
  "terakhirDiperbarui": "2024-06-01T08:30:00"
},
{
  "id": 17,
  "aplikasi": "Ereporting",
  "jenisLJK": "PPE AB, PPE Non AB",
  "namaLaporan": "Laporan Transaksi Afiliasi",
  "periodeLaporan": "Triwulanan",
  "batasWaktu": "HK 30 hari setelah triwulan",
  "deadlineDate": "2024-06-30T23:59:59",
  "submissionDate": "2024-06-28T10:15:00",
  "waktuSubmit": "2024-06-28T10:15:00",
  "waktuDeadline": "2024-06-30T23:59:59",
  "statusPengiriman": "Berhasil",
  "statusKetepatan": "Tepat Waktu",
  "statusReview": "belum-review",
  "jenisData": "Transaksi",
  "versiLaporan": "v2.9.3",
  "kategoriPrioritas": "Medium",
  "jumlahRevisi": 0,
  "terakhirDiperbarui": "2024-06-28T11:30:00"
}
    ];
  }, [currentDateTime]);

  // Fungsi untuk menghitung hari terlambat
  const calculateLateDays = (deadlineDate, submissionDate) => {
    if (!submissionDate) return null;
    
    const deadline = new Date(deadlineDate);
    const submission = new Date(submissionDate);
    
    // PERBAIKAN: Cek apakah tanggal valid
    if (isNaN(deadline.getTime()) || isNaN(submission.getTime())) {
      return null;
    }
    
    const diffMs = submission - deadline;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  // Proses data reports dengan tanggal dan hitung status
  useEffect(() => {
    const startDate = new Date(dateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(dateRange.endDate);
    endDate.setHours(23, 59, 59, 999);

    const now = currentDateTime;
    
    const updatedReports = initialReports.map(report => {
      const deadlineDate = new Date(report.deadlineDate);
      const submissionDate = report.submissionDate ? new Date(report.submissionDate) : null;
      
      // Cek apakah deadline dalam range tanggal yang dipilih
      const isInDateRange = deadlineDate >= startDate && deadlineDate <= endDate;
      
      if (!isInDateRange) {
        return null;
      }
      
      // Hitung hari terlambat jika ada submission
      const lateDays = calculateLateDays(report.deadlineDate, report.submissionDate);
      
      // Tentukan periodeStatus berdasarkan aturan
      let periodeStatus = '';
      let isDeadlinePassed = false;
      let hoursRemaining = 0;
      let hoursLate = 0;
      
      if (submissionDate) {
        // Sudah ada submission
        const daysLate = lateDays || 0;
        
        if (report.statusPengiriman === 'Gagal') {
          periodeStatus = 'aktif';
          const timeDiffMs = deadlineDate - now;
          if (timeDiffMs > 0) {
            hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60));
          } else {
            hoursLate = Math.floor(Math.abs(timeDiffMs) / (1000 * 60 * 60));
            isDeadlinePassed = true;
          }
        } else {
          if (daysLate > 0) {
            periodeStatus = 'terlambat';
            hoursLate = daysLate * 24;
            isDeadlinePassed = true;
          } else {
            periodeStatus = 'aktif';
            const timeDiffMs = deadlineDate - now;
            if (timeDiffMs > 0) {
              hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60));
            } else {
              hoursLate = Math.floor(Math.abs(timeDiffMs) / (1000 * 60 * 60));
              isDeadlinePassed = true;
            }
          }
        }
      } else {
        // Belum submit
        const timeDiffMs = deadlineDate - now;
        if (timeDiffMs > 0) {
          periodeStatus = 'aktif';
          hoursRemaining = Math.floor(timeDiffMs / (1000 * 60 * 60));
        } else {
          periodeStatus = 'terlambat';
          hoursLate = Math.floor(Math.abs(timeDiffMs) / (1000 * 60 * 60));
          isDeadlinePassed = true;
        }
      }
      
      // Tentukan status pengiriman dan ketepatan waktu
      let status = 'belum-lapor';
      let statusPengiriman = 'Belum Lapor';
      let statusKetepatanWaktu = 'Belum Submit';
      
      if (submissionDate) {
        const isSubmittedOnTime = lateDays === 0 || lateDays === null;
        
        if (report.statusPengiriman === 'Gagal') {
          status = 'gagal';
          statusPengiriman = 'Gagal';
          statusKetepatanWaktu = 'Gagal Kirim';
        } else {
          status = 'berhasil';
          statusPengiriman = 'Berhasil';
          
          // Jika periode terlambat, tampilkan status review
          if (periodeStatus === 'terlambat' && report.statusReview) {
            const reviewStatusMap = {
              'sedang-review': 'Sedang Direview',
              'sudah-review': 'Sudah Direview',
              'belum-review': 'Belum Direview'
            };
            statusPengiriman = `Berhasil - ${reviewStatusMap[report.statusReview]}`;
          }
          
          statusKetepatanWaktu = isSubmittedOnTime ? 'Tepat Waktu' : `${lateDays} Hari Terlambat`;
        }
      } else {
        // Belum submit
        if (isDeadlinePassed) {
          const daysLate = Math.ceil(hoursLate / 24);
          statusKetepatanWaktu = `${daysLate} Hari Terlambat`;
        } else {
          statusKetepatanWaktu = 'Belum Submit';
        }
      }
      
      // Format tanggal untuk display
      const formatDateOnly = (date) => {
        if (!date) return 'Belum ada';
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      };
      
      // PERBAIKAN: Pastikan tanggal valid sebelum konversi ke ISO
      const safeDateToISO = (date) => {
        if (!date || isNaN(date.getTime())) return null;
        return date.toISOString();
      };
      
      return {
        ...report,
        deadlineDate: safeDateToISO(deadlineDate),
        submissionDate: safeDateToISO(submissionDate),
        status,
        statusPengiriman,
        statusKetepatanWaktu,
        periodeStatus,
        isDeadlinePassed,
        hoursRemaining,
        hoursLate,
        lateDays: lateDays || 0,
        displayDeadline: formatDateOnly(deadlineDate),
        displaySubmit: submissionDate ? formatDateOnly(submissionDate) : 'Belum submit',
        deadlineObj: deadlineDate,
        submitObj: submissionDate,
        waktuSubmit: safeDateToISO(submissionDate),
        waktuDeadline: safeDateToISO(deadlineDate),
        statusReview: report.statusReview
      };
    }).filter(report => report !== null);
    
    setReportsWithPeriod(updatedReports);
  }, [dateRange, initialReports, currentDateTime]);

  // Sub-filter options - STRUKTUR BARU
  const getSubFilterOptions = () => {
    if (filters.periodeStatus === 'aktif') {
      return [
        { value: 'all', label: 'Semua Status' },
        { value: 'berhasil-sesuai-waktu', label: 'Berhasil Sesuai Waktu' },
        { value: 'belum-lapor', label: 'Belum Lapor' },
        { value: 'gagal', label: 'Gagal' }
      ];
    } else if (filters.periodeStatus === 'terlambat') {
      return [
        { value: 'all', label: 'Semua Status' },
        { value: 'sudah-lapor', label: 'Sudah Lapor' },
        { value: 'belum-lapor-terlambat', label: 'Belum Lapor' }
      ];
    }
    return [];
  };

  // Status review options untuk filter level 3
  const getReviewStatusOptions = () => {
    if (filters.subFilters.statusDetail === 'sudah-lapor') {
      return [
        { value: 'all', label: 'Semua Status Review' },
        { value: 'belum-direview', label: 'Belum Direview' },
        { value: 'sedang-direview', label: 'Sedang Direview' },
        { value: 'sudah-direview', label: 'Sudah Direview' }
      ];
    }
    return [];
  };

  // Handle sub filter change - DIPERBAHARUI untuk reset review status ketika mengganti status detail
  const handleSubFilterChange = (key, value) => {
    setFilters(prev => {
      // Jika mengubah statusDetail, reset reviewStatus ke 'all'
      if (key === 'statusDetail') {
        return {
          ...prev,
          subFilters: {
            ...prev.subFilters,
            [key]: value,
            reviewStatus: value === 'sudah-lapor' ? 'all' : ''
          }
        };
      }
      
      return {
        ...prev,
        subFilters: {
          ...prev.subFilters,
          [key]: value
        }
      };
    });
  };

  // Hitung filteredReports berdasarkan filter - STRUKTUR BARU
  const filteredReports = useMemo(() => {
    let filtered = [...reportsWithPeriod];

    // Filter berdasarkan periode status
    if (filters.periodeStatus !== 'all') {
      filtered = filtered.filter(report => report.periodeStatus === filters.periodeStatus);
    }
    
    // Filter sub-filters - STRUKTUR BARU
    if (filters.subFilters.statusDetail !== 'all') {
      filtered = filtered.filter(report => {
        switch(filters.subFilters.statusDetail) {
          case 'berhasil-sesuai-waktu':
            return report.status === 'berhasil' && report.statusKetepatanWaktu === 'Tepat Waktu';
          case 'belum-lapor':
            return report.status === 'belum-lapor';
          case 'gagal':
            return report.status === 'gagal';
          // Filter untuk periode terlambat - Struktur baru
          case 'sudah-lapor':
            return report.status === 'berhasil' && report.periodeStatus === 'terlambat';
          case 'belum-lapor-terlambat':
            return report.status === 'belum-lapor' && report.periodeStatus === 'terlambat';
          default:
            return true;
        }
      });

      // Filter tambahan untuk review status jika memilih "Sudah Lapor"
      if (filters.subFilters.statusDetail === 'sudah-lapor' && filters.subFilters.reviewStatus && filters.subFilters.reviewStatus !== 'all') {
        filtered = filtered.filter(report => {
          const reviewMap = {
            'belum-direview': 'Belum Direview',
            'sedang-direview': 'Sedang Direview',
            'sudah-direview': 'Sudah Direview'
          };
          return report.statusPengiriman === `Berhasil - ${reviewMap[filters.subFilters.reviewStatus]}`;
        });
      }
    }

    if (filters.subFilters.jenisLJK !== 'all') {
      filtered = filtered.filter(report => report.jenisLJK === filters.subFilters.jenisLJK);
    }

    if (filters.subFilters.periode !== 'all') {
      filtered = filtered.filter(report => {
        const periode = report.periodeLaporan.toLowerCase();
        const filterPeriode = filters.subFilters.periode.toLowerCase();
        return periode.includes(filterPeriode);
      });
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.namaLaporan.toLowerCase().includes(term) ||
        report.jenisLJK.toLowerCase().includes(term) ||
        report.periodeLaporan.toLowerCase().includes(term) ||
        report.batasWaktu.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [filters, searchTerm, reportsWithPeriod]);

  // Get unique jenisLJK
  const uniqueJenisLJK = useMemo(() => {
    const jenisLJK = [...new Set(reportsWithPeriod.map(report => report.jenisLJK))];
    return jenisLJK.map(j => ({
      value: j,
      label: j
    }));
  }, [reportsWithPeriod]);

  // Get unique periode
  const uniquePeriode = useMemo(() => {
    const periode = [...new Set(reportsWithPeriod.map(report => report.periodeLaporan))];
    return periode.map(p => ({
      value: p,
      label: p
    }));
  }, [reportsWithPeriod]);

  // Hitung stats - DIPERBAHARUI untuk statistik baru
  const stats = useMemo(() => {
    const activeReports = reportsWithPeriod.filter(r => r.periodeStatus === 'aktif');
    const lateReports = reportsWithPeriod.filter(r => r.periodeStatus === 'terlambat');
    
    // Hitung status review untuk periode terlambat
    const sedangReviewTerlambat = lateReports.filter(r => 
      r.status === 'berhasil' && r.statusPengiriman === 'Berhasil - Sedang Direview'
    ).length;
    
    const sudahReviewTerlambat = lateReports.filter(r => 
      r.status === 'berhasil' && r.statusPengiriman === 'Berhasil - Sudah Direview'
    ).length;
    
    const belumReviewTerlambat = lateReports.filter(r => 
      r.status === 'berhasil' && r.statusPengiriman === 'Berhasil - Belum Direview'
    ).length;
    
    return {
      total: reportsWithPeriod.length,
      aktif: activeReports.length,
      terlambat: lateReports.length,
      berhasilTepatWaktu: activeReports.filter(r => r.status === 'berhasil' && r.statusKetepatanWaktu === 'Tepat Waktu').length,
      belumLaporAktif: activeReports.filter(r => r.status === 'belum-lapor').length,
      gagal: activeReports.filter(r => r.status === 'gagal').length,
      // Statistik untuk periode terlambat
      berhasilSedangReviewTerlambat: sedangReviewTerlambat,
      berhasilSudahReviewTerlambat: sudahReviewTerlambat,
      berhasilBelumReviewTerlambat: belumReviewTerlambat,
      belumLaporTerlambat: lateReports.filter(r => r.status === 'belum-lapor').length,
    };
  }, [reportsWithPeriod]);

  // Status summary
  const periodeStatusSummary = useMemo(() => {
    const summary = {};
    const allStatus = ['aktif', 'terlambat'];
    
    allStatus.forEach(status => {
      summary[status] = reportsWithPeriod.filter(r => r.periodeStatus === status).length;
    });
    
    return summary;
  }, [reportsWithPeriod]);

  const resetFilters = () => {
    const currentYear = currentDateTime.getFullYear();
    
    setDateRange({
      startDate: `${currentYear - 1}-01-01`,
      endDate: `${currentYear}-12-31`
    });
    
    setFilters({
      periodeStatus: 'aktif',
      subFilters: {
        statusDetail: 'all',
        jenisLJK: 'all',
        periode: 'all',
        searchTerm: '',
        reviewStatus: 'all'
      }
    });
    setSearchTerm('');
    setSelectedReport(null);
    setShowSubFilters(true);
  };

  const handlePeriodeStatusChange = (periodeStatus) => {
    setFilters(prev => ({ 
      periodeStatus,
      subFilters: {
        statusDetail: 'all',
        jenisLJK: 'all',
        periode: 'all',
        searchTerm: '',
        reviewStatus: 'all'
      }
    }));
    
    setShowSubFilters(true);
  };

  const getStatusBadge = (status, statusPengiriman) => {
    const styles = {
      'berhasil': 'bg-green-100 text-green-800 border-green-200',
      'belum-lapor': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'gagal': 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      'berhasil': statusPengiriman || 'Berhasil',
      'belum-lapor': 'Belum Lapor',
      'gagal': 'Gagal',
    };

    // Custom styling untuk status Berhasil dengan review pada periode terlambat
    if (statusPengiriman) {
      if (statusPengiriman.includes('Sedang Direview')) {
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            {statusPengiriman}
          </span>
        );
      } else if (statusPengiriman.includes('Sudah Direview')) {
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            {statusPengiriman}
          </span>
        );
      } else if (statusPengiriman.includes('Belum Direview')) {
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            {statusPengiriman}
          </span>
        );
      }
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getKetepatanBadge = (status) => {
    if (status === 'Tepat Waktu') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Tepat Waktu</span>;
    } else if (status.includes('Hari Terlambat')) {
      const days = status.split(' ')[0];
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">{status}</span>;
    } else if (status === 'Gagal Kirim') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">Gagal Kirim</span>;
    } else {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{status}</span>;
    }
  };

  const getPeriodeStatusBadge = (status) => {
    const styles = {
      'aktif': 'bg-green-100 text-green-800 border-green-200',
      'terlambat': 'bg-red-100 text-red-800 border-red-200',
    };

    const labels = {
      'aktif': 'Periode Aktif',
      'terlambat': 'Terlambat',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getJenisLKJBadge = (jenis) => {
    const colorMap = {
      'PEE': 'bg-red-100 text-red-800 border-red-200',
      'PPE AB, PPE Non AB': 'bg-blue-100 text-blue-800 border-blue-200',
      'PEE, PPE AB, PPE Non AB': 'bg-purple-100 text-purple-800 border-purple-200',
      'PEE, PPE AB': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'PPE AB': 'bg-pink-100 text-pink-800 border-pink-200',
    };

    const defaultStyle = 'bg-gray-100 text-gray-800 border-gray-200';
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colorMap[jenis] || defaultStyle}`}>
        {jenis}
      </span>
    );
  };

  const getTimeDisplay = (report) => {
    if (report.periodeStatus === 'aktif') {
      const daysRemaining = Math.floor(report.hoursRemaining / 24);
      
      if (report.status === 'berhasil') {
        return (
          <div className="space-y-1">
            <div className="text-xs text-green-600">
              <span>Submit: {report.displaySubmit}</span>
            </div>
            <div className="text-xs text-blue-600">
              <span>Deadline: {report.displayDeadline}</span>
            </div>
          </div>
        );
      } else if (report.status === 'gagal') {
        return (
          <div className="space-y-1">
            <div className="text-xs text-red-600">
              <span>Deadline: {report.displayDeadline}</span>
            </div>
            <div className="text-xs text-yellow-600">
              <span>
                {report.hoursRemaining > 0 ? (
                  <>
                    Sisa waktu: {daysRemaining > 0 ? `${daysRemaining} hari` : 'Kurang dari 1 hari'}
                  </>
                ) : 'Sisa waktu: Segera!'}
              </span>
            </div>
          </div>
        );
      } else {
        // Belum lapor
        return (
          <div className="space-y-1">
            <div className="text-xs text-blue-600">
              <span>Deadline: {report.displayDeadline}</span>
            </div>
            <div className="text-xs text-yellow-600">
              <span>
                {report.hoursRemaining > 0 ? (
                  <>
                    Sisa waktu: {daysRemaining > 0 ? `${daysRemaining} hari` : 'Kurang dari 1 hari'}
                  </>
                ) : 'Sisa waktu: Segera!'}
              </span>
            </div>
          </div>
        );
      }
    } else {
      // Terlambat
      const daysLate = Math.ceil(report.hoursLate / 24);
      
      return (
        <div className="space-y-1">
          <div className="text-xs text-blue-600">
            {report.status === 'berhasil' && report.displaySubmit !== 'Belum submit' && (
              <div>
                <span>Submit: {report.displaySubmit}</span>
              </div>
            )}
            {report.status === 'belum-lapor' && (
              <div className="text-yellow-600">
                <span>Belum submit</span>
              </div>
            )}
          </div>
          {report.lateDays > 0 && (
            <div className="text-xs text-red-600">
              Terlambat: {report.lateDays} hari
            </div>
          )}
          <div className="text-xs text-red-600">
            <span>Deadline: {report.displayDeadline}</span>
          </div>
        </div>
      );
    }
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleExportData = () => {
    const exportData = filteredReports.map(report => ({
      'No': report.id,
      'Nama Laporan': report.namaLaporan,
      'Deadline': report.displayDeadline,
      'Submit': report.displaySubmit,
      'Status Periode': report.periodeStatus === 'aktif' ? 'Periode Aktif' : 'Terlambat',
      'Status Pengiriman': report.statusPengiriman,
      'Status Ketepatan Waktu': report.statusKetepatanWaktu,
      'Hari Terlambat': report.lateDays > 0 ? report.lateDays : 0
    }));

    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apolo-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${String(row[header] || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    return csv;
  };

  // Format date for display
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format current date display
  const getCurrentDateDisplay = () => {
    return currentDateTime.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format current time display
  const getCurrentTimeDisplay = () => {
    return currentDateTime.toLocaleTimeString('id-ID', { 
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-blue-50/20 to-white min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-xl shadow-lg">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Sistem Ereporting {currentDateTime.getFullYear()}</h1>
            <p className="text-gray-600 mt-1">Monitoring Laporan Ereporting - Total {stats.total} Laporan (Periode 1 Tahun)</p>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
                <Clock className="w-3 h-3 inline mr-1" />
                Waktu Real-time: {getCurrentTimeDisplay()}
              </p>
              <p className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
                <Calendar className="w-3 h-3 inline mr-1" />
                {getCurrentDateDisplay()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportData}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="p-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all duration-200 shadow hover:shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Filter Periode Laporan {currentDateTime.getFullYear()}</h3>
                  <p className="text-sm text-gray-600">Pilih rentang tanggal deadline terlebih dahulu (Maksimal 1 Tahun: {currentDateTime.getFullYear() - 1} - {currentDateTime.getFullYear()})</p>
                </div>
              </div>
              <button
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Level 0: Periode Tanggal Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Level 0: Pilih Rentang Tanggal Deadline ({currentDateTime.getFullYear() - 1} - {currentDateTime.getFullYear()})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Mulai ({currentDateTime.getFullYear() - 1})
                  </label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    min={`${currentDateTime.getFullYear() - 1}-01-01`}
                    max={`${currentDateTime.getFullYear()}-12-31`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Tanggal Akhir ({currentDateTime.getFullYear()})
                  </label>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    min={`${currentDateTime.getFullYear() - 1}-01-01`}
                    max={`${currentDateTime.getFullYear()}-12-31`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Periode Terpilih
                  </label>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-sm font-medium text-blue-900">
                      {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      {stats.total} laporan ditemukan • 
                      Aktif: {stats.aktif} • Terlambat: {stats.terlambat}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Rentang: {currentDateTime.getFullYear() - 1} - {currentDateTime.getFullYear()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 1: Periode Status Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Level 1: Pilih Status Periode</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => handlePeriodeStatusChange('aktif')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.periodeStatus === 'aktif' 
                      ? 'border-green-500 bg-green-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CalendarCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Periode Aktif</div>
                      <div className="text-sm text-gray-600">{periodeStatusSummary.aktif || 0} laporan</div>
                      <div className="text-xs text-green-600">
                        Status: Berhasil Tepat Waktu, Belum Lapor, Gagal
                      </div>
                    </div>
                  </div>
                  {filters.periodeStatus === 'aktif' && <ChevronDown className="w-5 h-5 text-green-500" />}
                </button>

                <button
                  onClick={() => handlePeriodeStatusChange('terlambat')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                    filters.periodeStatus === 'terlambat' 
                      ? 'border-red-500 bg-red-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <ClockAlert className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Terlambat</div>
                      <div className="text-sm text-gray-600">{periodeStatusSummary.terlambat || 0} laporan</div>
                      <div className="text-xs text-red-600">
                        Status: Sudah Lapor atau Belum Lapor
                      </div>
                    </div>
                  </div>
                  {filters.periodeStatus === 'terlambat' && <ChevronDown className="w-5 h-5 text-red-500" />}
                </button>

              
              </div>
            </div>

            {/* Level 2: Sub Filters */}
            {(filters.periodeStatus !== 'all' || showSubFilters) && (
              <div className="mb-6 animate-slide-down">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Level 2: Filter Detail Status</h4>
                  <button
                    onClick={() => setShowSubFilters(!showSubFilters)}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
                  >
                    {showSubFilters ? (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Sembunyikan</span>
                      </>
                    ) : (
                      <>
                        <ChevronRight className="w-4 h-4" />
                        <span>Tampilkan</span>
                      </>
                    )}
                  </button>
                </div>
                
                {showSubFilters && (
                  <div className="space-y-6">
                    {/* Status Detail Filter */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <Filter className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-900">Detail Status dalam {filters.periodeStatus === 'aktif' ? 'Periode Aktif' : 'Terlambat'}</h5>
                          <p className="text-sm text-blue-700">
                            {filters.periodeStatus === 'terlambat' 
                              ? 'Pilih status laporan yang terlambat' 
                              : 'Pilih status detail untuk memfilter lebih spesifik'}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {getSubFilterOptions().map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSubFilterChange('statusDetail', option.value)}
                            className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                              filters.subFilters.statusDetail === option.value
                                ? 'border-blue-500 bg-blue-50 shadow-sm'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium text-gray-900">
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {option.value === 'all' 
                                ? 'Tampilkan semua' 
                                : option.value === 'berhasil-sesuai-waktu'
                                ? 'Laporan berhasil submit tepat waktu'
                                : option.value === 'belum-lapor'
                                ? 'Belum melakukan pelaporan'
                                : option.value === 'gagal'
                                ? 'Gagal dalam pelaporan'
                                : option.value === 'sudah-lapor'
                                ? 'Sudah melakukan pelaporan namun terlambat'
                                : 'Belum lapor dan terlambat'}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Level 3: Review Status Filter (hanya muncul jika memilih Sudah Lapor pada periode terlambat) */}
                      {filters.periodeStatus === 'terlambat' && filters.subFilters.statusDetail === 'sudah-lapor' && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                          <div className="flex items-center mb-3">
                            <div className="p-2 bg-purple-100 rounded-lg mr-3">
                              <FileCheck className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="font-medium text-blue-900">Level 3: Status Review</h5>
                              <p className="text-sm text-blue-700">
                                Pilih status review untuk laporan yang sudah submit tapi terlambat
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {getReviewStatusOptions().map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleSubFilterChange('reviewStatus', option.value)}
                                className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                                  filters.subFilters.reviewStatus === option.value
                                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                              >
                                <div className="font-medium text-gray-900">
                                  {option.label}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {option.value === 'all' 
                                    ? 'Semua status review' 
                                    : option.value === 'belum-direview'
                                    ? 'Laporan terlambat belum direview'
                                    : option.value === 'sedang-direview'
                                    ? 'Laporan terlambat sedang direview'
                                    : 'Laporan terlambat sudah direview'}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Additional Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Building className="w-4 h-4 inline mr-2" />
                          Jenis LJK
                          <span className="ml-1 text-xs text-gray-500">
                            ({uniqueJenisLJK.length} tersedia)
                          </span>
                        </label>
                        <select
                          value={filters.subFilters.jenisLJK}
                          onChange={(e) => handleSubFilterChange('jenisLJK', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                          disabled={uniqueJenisLJK.length === 0}
                        >
                          <option value="all">
                            {uniqueJenisLJK.length === 0 ? 'Tidak tersedia' : 'Semua Jenis LJK'}
                          </option>
                          {uniqueJenisLJK.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Periode Laporan
                          <span className="ml-1 text-xs text-gray-500">
                            ({uniquePeriode.length} tersedia)
                          </span>
                        </label>
                        <select
                          value={filters.subFilters.periode}
                          onChange={(e) => handleSubFilterChange('periode', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                          disabled={uniquePeriode.length === 0}
                        >
                          <option value="all">
                            {uniquePeriode.length === 0 ? 'Tidak tersedia' : 'Semua Periode'}
                          </option>
                          {uniquePeriode.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Search className="w-4 h-4 inline mr-2" />
                          Cari Laporan
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            placeholder="Cari nama laporan..."
                            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Filter Info Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Filter className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900">Filter Aktif Tahun {currentDateTime.getFullYear()}:</h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        Periode: {formatDateDisplay(dateRange.startDate)} - {formatDateDisplay(dateRange.endDate)}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        filters.periodeStatus === 'aktif' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {filters.periodeStatus === 'aktif' ? 'Periode Aktif' : 'Terlambat'}
                      </span>
                      {filters.subFilters.statusDetail !== 'all' && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          filters.subFilters.statusDetail === 'sudah-lapor'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : filters.subFilters.statusDetail === 'berhasil-sesuai-waktu'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : filters.subFilters.statusDetail === 'belum-lapor' || filters.subFilters.statusDetail === 'belum-lapor-terlambat'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : filters.subFilters.statusDetail === 'gagal'
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                          Detail: {getSubFilterOptions().find(opt => opt.value === filters.subFilters.statusDetail)?.label}
                          <button 
                            onClick={() => handleSubFilterChange('statusDetail', 'all')}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.periodeStatus === 'terlambat' && filters.subFilters.statusDetail === 'sudah-lapor' && filters.subFilters.reviewStatus !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                          Review: {getReviewStatusOptions().find(opt => opt.value === filters.subFilters.reviewStatus)?.label}
                          <button 
                            onClick={() => handleSubFilterChange('reviewStatus', 'all')}
                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.jenisLJK !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          LJK: {filters.subFilters.jenisLJK}
                          <button 
                            onClick={() => handleSubFilterChange('jenisLJK', 'all')}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.subFilters.periode !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Periode: {filters.subFilters.periode}
                          <button 
                            onClick={() => handleSubFilterChange('periode', 'all')}
                            className="ml-2 text-yellow-600 hover:text-yellow-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {searchTerm && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          Pencarian: "{searchTerm}"
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="ml-2 text-gray-600 hover:text-gray-800"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-blue-700">
                  {filteredReports.length} laporan ditemukan
                  {filters.periodeStatus === 'terlambat' && filters.subFilters.statusDetail === 'sudah-lapor' && filters.subFilters.reviewStatus !== 'all' && (
                    <span className="ml-2">
                      • {getReviewStatusOptions().find(opt => opt.value === filters.subFilters.reviewStatus)?.label}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Reports Table Header */}
<div className="px-6 pb-6">
  <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm flex-shrink-0">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-red-900 truncate">
                Daftar Laporan Ereporting {currentDateTime.getFullYear()}
              </h3>
              <div className="mt-2 space-y-1">
                {/* Baris 1: Informasi periode */}
                <p className="text-sm text-gray-600 truncate">
                  Periode: <span className="font-medium">{formatDateDisplay(dateRange.startDate)}</span> - <span className="font-medium">{formatDateDisplay(dateRange.endDate)}</span>
                </p>
                {/* Baris 2: Informasi tanggal dan tahun data */}
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Tanggal:</span> {getCurrentDateDisplay()}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Data:</span> {currentDateTime.getFullYear() - 1} - {currentDateTime.getFullYear()}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {filteredReports.length} dari {stats.total} laporan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Container */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200 min-w-0">
            <div className="text-sm font-medium text-gray-700 mb-1">
              Menampilkan: <span className="font-bold">{filteredReports.length}</span> dari <span className="font-bold">{stats.total}</span>
            </div>
            {filters.periodeStatus === 'terlambat' && (
              <div className="text-xs text-blue-700">
                <div className="font-medium mb-1">Sudah Lapor Review:</div>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <span className="inline-flex items-center">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
                    Belum: {stats.berhasilBelumReviewTerlambat}
                  </span>
                  <span className="inline-flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                    Sedang: {stats.berhasilSedangReviewTerlambat}
                  </span>
                  <span className="inline-flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                    Sudah: {stats.berhasilSudahReviewTerlambat}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Periode</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Jenis LJK</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nama Laporan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Pengiriman</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status Ketepatan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Deadline & Sisa Waktu</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                    report.periodeStatus === 'terlambat' ? 'bg-red-50/30' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPeriodeStatusBadge(report.periodeStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getJenisLKJBadge(report.jenisLJK)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-md">
                        {report.namaLaporan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status, report.statusPengiriman)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getKetepatanBadge(report.statusKetepatanWaktu)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-1 min-w-[200px]">
                        {getTimeDisplay(report)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(report)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak ada laporan ditemukan</h3>
              <p className="text-gray-600">Tidak ada laporan yang sesuai dengan kriteria pencarian atau filter</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Table Footer */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Bagian kiri */}
        <div className="flex-1 min-w-0">
          <div className="text-xs md:text-sm text-gray-600">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Data diperbarui real-time
              </span>
              <span className="hidden md:inline">•</span>
              <span className="font-medium">
                Periode: {currentDateTime.getFullYear() - 1} - {currentDateTime.getFullYear()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Bagian kanan */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {/* Pagination Info */}
          <div className="text-xs md:text-sm text-gray-600">
            <span className="font-medium">
              Halaman 1 dari {Math.ceil(filteredReports.length / 10)}
            </span>
          </div>
          
          {/* Review Stats (hanya untuk periode terlambat) */}
          {filters.periodeStatus === 'terlambat' && (
            <div className="hidden sm:block">
              <div className="h-4 w-px bg-gray-300 mx-2"></div>
            </div>
          )}
          
          {filters.periodeStatus === 'terlambat' && (
            <div className="text-xs md:text-sm">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium text-blue-600">Sudah Lapor:</span>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1"></span>
                    Belum {stats.berhasilBelumReviewTerlambat}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1"></span>
                    Sedang {stats.berhasilSedangReviewTerlambat}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                    Sudah {stats.berhasilSudahReviewTerlambat}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
</div>
</div>
      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">Detail Laporan Ereporting {currentDateTime.getFullYear()}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getPeriodeStatusBadge(selectedReport.periodeStatus)}
                      {selectedReport.statusPengiriman && selectedReport.statusPengiriman.includes('Direview') && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          selectedReport.statusPengiriman.includes('Sedang') 
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : selectedReport.statusPengiriman.includes('Sudah')
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-purple-100 text-purple-800 border-purple-200'
                        }`}>
                          {selectedReport.statusPengiriman}
                        </span>
                      )}
                      <span className="text-gray-600">• ID: {selectedReport.id}</span>
                      {selectedReport.lateDays > 0 && (
                        <span className="text-red-600 font-medium">
                          • Terlambat: {selectedReport.lateDays} hari
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Jenis LJK</h4>
                  {getJenisLKJBadge(selectedReport.jenisLJK)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Periode</h4>
                  <div className="flex items-center space-x-2">
                    {getPeriodeStatusBadge(selectedReport.periodeStatus)}
                    <span className="text-sm text-gray-600">
                      Deadline: {selectedReport.displayDeadline}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Tanggal Saat Ini</h4>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-lg font-medium text-blue-900">
                      {getCurrentDateDisplay()}
                    </p>
                    <p className="text-sm text-blue-700">
                      {getCurrentTimeDisplay()}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Nama Laporan</h4>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 p-4 rounded-lg">
                    {selectedReport.namaLaporan}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Waktu Submit</h4>
                  <div className={`p-3 rounded-lg ${
                    selectedReport.status === 'berhasil' 
                      ? selectedReport.statusPengiriman?.includes('Sudah') 
                        ? 'bg-green-50' 
                        : selectedReport.statusPengiriman?.includes('Sedang')
                        ? 'bg-blue-50'
                        : selectedReport.statusPengiriman?.includes('Belum')
                        ? 'bg-purple-50'
                        : 'bg-green-50'
                      : selectedReport.status === 'belum-lapor' 
                      ? 'bg-yellow-50' 
                      : 'bg-red-50'
                  }`}>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedReport.displaySubmit}
                    </p>
                    <div className="mt-2 text-sm text-gray-600">
                      {selectedReport.status === 'berhasil' 
                        ? selectedReport.statusPengiriman?.includes('Sudah') 
                          ? '✅ Sudah direview' 
                          : selectedReport.statusPengiriman?.includes('Sedang')
                          ? '🔄 Sedang direview'
                          : selectedReport.statusPengiriman?.includes('Belum')
                          ? '⏳ Belum direview'
                          : '✅ Berhasil submit'
                        : selectedReport.status === 'belum-lapor' 
                        ? '⏳ Belum submit' 
                        : '❌ Gagal submit'}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Ketepatan Waktu</h4>
                  {getKetepatanBadge(selectedReport.statusKetepatanWaktu)}
                  <div className="mt-2 text-sm text-gray-600">
                    {selectedReport.periodeStatus === 'aktif' ? (
                      selectedReport.status === 'berhasil' ? (
                        <div className="text-green-600">
                          Submit: {selectedReport.displaySubmit}
                        </div>
                      ) : (
                        <div className="text-blue-600">
                          Sisa waktu: {selectedReport.hoursRemaining > 0 ? 
                            `${Math.floor(selectedReport.hoursRemaining / 24)} hari` : 
                            'Segera!'}
                        </div>
                      )
                    ) : (
                      <div className="text-red-600">
                        Terlambat: {selectedReport.lateDays > 0 ? `${selectedReport.lateDays} hari` : '0 hari'}
                        {selectedReport.statusPengiriman && selectedReport.statusPengiriman.includes('Direview') && (
                          <div className={`mt-1 ${
                            selectedReport.statusPengiriman.includes('Sedang') 
                              ? 'text-blue-600'
                              : selectedReport.statusPengiriman.includes('Sudah')
                              ? 'text-green-600'
                              : 'text-purple-600'
                          }`}>
                            {selectedReport.statusPengiriman}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status Pengiriman</h4>
                  {getStatusBadge(selectedReport.status, selectedReport.statusPengiriman)}
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedReport.status === 'berhasil' 
                      ? selectedReport.statusPengiriman?.includes('Direview')
                        ? 'Laporan terlambat dengan status review'
                        : 'Laporan berhasil dikirim'
                      : selectedReport.status === 'belum-lapor'
                      ? 'Belum melakukan pengiriman'
                      : 'Gagal dalam pengiriman'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ereporting;