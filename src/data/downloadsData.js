import { sectorsData } from './sectorsData';

// Generate random application
const getRandomApplication = () => {
  const apps = ['APOLO', 'EREPORTING', 'SIPINA'];
  return apps[Math.floor(Math.random() * apps.length)];
};

// Generate random file type 
const getRandomFileType = () => {
  const types = ['pdf', 'excel', 'csv', 'archive'];
  return types[Math.floor(Math.random() * types.length)];
};

// Generate random file size
const getRandomFileSize = () => {
  const sizes = ['1.2 MB', '2.4 MB', '3.6 MB', '4.8 MB', '5.0 MB', '6.2 MB', '7.5 MB', '8.8 MB'];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

// Generate random date within last 30 days
const getRandomDate = () => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - Math.floor(Math.random() * 30));
  
  const year = pastDate.getFullYear();
  const month = String(pastDate.getMonth() + 1).padStart(2, '0');
  const day = String(pastDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// Generate report name based on sector and application 
const generateReportName = (sector, application) => {
  const reportTypes = [
    'Laporan Bulanan',
    'Laporan Triwulanan', 
    'Laporan Tahunan',
    'Data Konsolidasi',
    'Analisis Risiko',
    'Laporan Compliance',
    'Data Transaksi',
    'Laporan Audit',
    'Monitoring Report',
    'Export Data',
    'Ringkasan Laporan',
    'Evaluasi Performa',
    'Dashboard Analisis',
    'Statistik Operasional',
    'Review Kinerja',
    'Insight Data',
    'Tinjauan Strategis',
    'Pemantauan Regulasi'
  ];
  
  const quarter = ['I', 'II', 'III', 'IV'][Math.floor(Math.random() * 4)];
  const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][Math.floor(Math.random() * 12)];
  const year = 2024;
  
  const reportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
  
  if (reportType.includes('Bulanan')) {
    return `${reportType} ${application} - ${month} ${year}`;
  } else if (reportType.includes('Triwulanan')) {
    return `${reportType} ${application} - Triwulan ${quarter} ${year}`;
  } else if (reportType.includes('Tahunan')) {
    return `${reportType} ${application} - Tahun ${year}`;
  } else {
    const sektorName = sector.namaSektor.length > 40 
      ? sector.namaSektor.substring(0, 40) + '...' 
      : sector.namaSektor;
    return `${reportType} ${application} - ${sektorName}`;
  }
};

// Generate downloads data from sectorsData
export const downloadsData = sectorsData.map((sector, index) => {
  const application = getRandomApplication();
  const fileType = getRandomFileType();
  const reportName = generateReportName(sector, application);
  
  return {
    id: index + 1,
    name: reportName, 
    type: fileType, 
    size: getRandomFileSize(),
    date: getRandomDate(),
    status: Math.random() > 0.1 ? 'completed' : 'pending',
    aplikasi: application,
    sektorKode: sector.kodeSektor,
    downloads: Math.floor(Math.random() * 300) + 50 
  };
});

// Add some additional data for variety 
export const additionalDownloadsData = [
  {
    id: downloadsData.length + 1,
    name: 'Laporan Konsolidasi APOLO Q1 2024',
    type: 'pdf',
    size: '8.5 MB',
    date: '2024-03-31',
    status: 'completed',
    aplikasi: 'APOLO',
    sektorKode: '01',
    downloads: 289
  },
  {
    id: downloadsData.length + 2,
    name: 'Data E-Reporting Tahunan 2023',
    type: 'excel',
    size: '12.3 MB',
    date: '2024-01-15',
    status: 'completed',
    aplikasi: 'EREPORTING',
    sektorKode: '03',
    downloads: 156
  },
  {
    id: downloadsData.length + 3,
    name: 'Analisis Risiko SIPINA Final',
    type: 'archive',
    size: '25.8 MB',
    date: '2024-02-28',
    status: 'completed',
    aplikasi: 'SIPINA',
    sektorKode: '02',
    downloads: 198
  },
  {
    id: downloadsData.length + 4,
    name: 'Laporan Harian APOLO - April 2024',
    type: 'csv',
    size: '3.2 MB',
    date: '2024-04-01',
    status: 'completed',
    aplikasi: 'APOLO',
    sektorKode: '010101',
    downloads: 321
  },
  {
    id: downloadsData.length + 5,
    name: 'Monitoring E-Reporting Sektor Perbankan',
    type: 'pdf',
    size: '6.7 MB',
    date: '2024-03-25',
    status: 'completed',
    aplikasi: 'EREPORTING',
    sektorKode: '01',
    downloads: 178
  },
  {
    id: downloadsData.length + 6,
    name: 'Dashboard SIPINA Pasar Modal',
    type: 'excel',
    size: '9.4 MB',
    date: '2024-03-28',
    status: 'completed',
    aplikasi: 'SIPINA',
    sektorKode: '02',
    downloads: 234
  },
  {
    id: downloadsData.length + 7,
    name: 'Audit Internal APOLO Triwulan II',
    type: 'pdf',
    size: '5.8 MB',
    date: '2024-03-20',
    status: 'completed',
    aplikasi: 'APOLO',
    sektorKode: '03',
    downloads: 189
  },
  {
    id: downloadsData.length + 8,
    name: 'Ringkasan E-Reporting Asuransi Syariah',
    type: 'pdf',
    size: '4.3 MB',
    date: '2024-03-22',
    status: 'completed',
    aplikasi: 'EREPORTING',
    sektorKode: '031204',
    downloads: 145
  }
];

// Combine both datasets
export const allDownloadsData = [...downloadsData, ...additionalDownloadsData];

// Format untuk tampilan: mendapatkan label tipe file yang user-friendly
export const getFileTypeLabel = (type) => {
  const labels = {
    pdf: 'PDF Document',
    excel: 'Excel Spreadsheet',
    csv: 'CSV Data',
    archive: 'Archive File'
  };
  return labels[type] || 'File';
};

// Format untuk tampilan: mendapatkan icon berdasarkan tipe file
export const getFileTypeIcon = (type) => {
  const icons = {
    pdf: '📄',
    excel: '📊',
    csv: '📋',
    archive: '📦'
  };
  return icons[type] || '📁';
};