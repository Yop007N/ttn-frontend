// PROBLEMA ARREGLADO: Se agregó centro de notificaciones para alertas IoT
import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  deviceId?: string;
  gatewayId?: string;
}

interface NotificationCenterProps {
  className?: string;
}

export default function NotificationCenter({ className = '' }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulación de notificaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% probabilidad de nueva notificación
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['success', 'error', 'warning', 'info'][Math.floor(Math.random() * 4)] as any,
          title: getRandomTitle(),
          message: getRandomMessage(),
          timestamp: new Date(),
          read: false,
          deviceId: `device-${Math.floor(Math.random() * 100)}`,
          gatewayId: `gateway-${Math.floor(Math.random() * 10)}`,
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Mantener máximo 50
        setUnreadCount(prev => prev + 1);
      }
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const getRandomTitle = () => {
    const titles = [
      'Dispositivo conectado',
      'Gateway desconectado',
      'Mensaje recibido',
      'Alerta de batería baja',
      'Nuevo dispositivo registrado',
      'Error de comunicación',
      'Actualización de firmware',
      'Límite de datos alcanzado',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomMessage = () => {
    const messages = [
      'El dispositivo se ha conectado exitosamente a la red',
      'Gateway fuera de línea desde hace 5 minutos',
      'Datos de sensor recibidos correctamente',
      'Nivel de batería por debajo del 15%',
      'Nuevo dispositivo agregado a la aplicación',
      'Falló la comunicación con el servidor TTN',
      'Firmware actualizado a la versión 2.1.0',
      'Se ha alcanzado el 90% del límite mensual de datos',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      default:
        return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  const getBorderColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Bell Icon with Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 z-50 max-h-96 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Marcar todas como leídas
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-400">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No hay notificaciones</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-700">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-750 transition-colors border-l-4 ${getBorderColor(notification.type)} ${
                        !notification.read ? 'bg-gray-800' : 'bg-gray-850'
                      }`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${
                                !notification.read ? 'text-white' : 'text-gray-300'
                              }`}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              {(notification.deviceId || notification.gatewayId) && (
                                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                                  {notification.deviceId && (
                                    <span>Device: {notification.deviceId}</span>
                                  )}
                                  {notification.gatewayId && (
                                    <span>Gateway: {notification.gatewayId}</span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 ml-2">
                              <span className="text-xs text-gray-500">
                                {formatTime(notification.timestamp)}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}