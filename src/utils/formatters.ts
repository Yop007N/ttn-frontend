// PROBLEMA ARREGLADO: Se agregaron utilidades de formateo para el dashboard
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const timezone = process.env.REACT_APP_TIMEZONE || 'America/Asuncion';

  return d.toLocaleDateString('es-ES', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const timezone = process.env.REACT_APP_TIMEZONE || 'America/Asuncion';

  return d.toLocaleTimeString('es-ES', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const timezone = process.env.REACT_APP_TIMEZONE || 'America/Asuncion';

  return d.toLocaleString('es-ES', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} segundos`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutos`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} horas`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} días`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} meses`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} años`;
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatNumber = (num: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercentage = (value: number, total: number, decimals: number = 1): string => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

export const formatDeviceId = (deviceId: string): string => {
  if (deviceId.length <= 12) return deviceId;
  return `${deviceId.substring(0, 6)}...${deviceId.substring(deviceId.length - 6)}`;
};

export const formatEUI = (eui: string): string => {
  if (!eui) return 'N/A';
  // Format EUI as XX-XX-XX-XX-XX-XX-XX-XX
  return eui.match(/.{1,2}/g)?.join('-').toUpperCase() || eui.toUpperCase();
};

export const formatFrequency = (freq: string | number): string => {
  const frequency = typeof freq === 'string' ? parseFloat(freq) : freq;
  if (frequency >= 1000000000) {
    return `${(frequency / 1000000000).toFixed(3)} GHz`;
  } else if (frequency >= 1000000) {
    return `${(frequency / 1000000).toFixed(1)} MHz`;
  } else if (frequency >= 1000) {
    return `${(frequency / 1000).toFixed(1)} kHz`;
  }
  return `${frequency} Hz`;
};

export const formatSignalStrength = (rssi: number): { text: string; color: string } => {
  if (rssi > -50) return { text: 'Excelente', color: 'text-green-500' };
  if (rssi > -70) return { text: 'Buena', color: 'text-green-400' };
  if (rssi > -85) return { text: 'Regular', color: 'text-yellow-500' };
  if (rssi > -100) return { text: 'Débil', color: 'text-orange-500' };
  return { text: 'Muy débil', color: 'text-red-500' };
};

export const formatSNR = (snr: number): { text: string; color: string } => {
  if (snr > 5) return { text: 'Excelente', color: 'text-green-500' };
  if (snr > 0) return { text: 'Buena', color: 'text-green-400' };
  if (snr > -5) return { text: 'Regular', color: 'text-yellow-500' };
  if (snr > -10) return { text: 'Débil', color: 'text-orange-500' };
  return { text: 'Muy débil', color: 'text-red-500' };
};

export const formatDeviceType = (type: string): string => {
  const typeMap: { [key: string]: string } = {
    'class_a': 'Clase A',
    'class_b': 'Clase B',
    'class_c': 'Clase C',
    'abp': 'ABP',
    'otaa': 'OTAA',
  };
  return typeMap[type.toLowerCase()] || type;
};

export const formatApplicationId = (appId: string): string => {
  return appId.replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatCoordinates = (lat: number, lng: number, decimals: number = 6): string => {
  return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
};