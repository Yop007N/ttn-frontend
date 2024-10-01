import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { AlertCircle, Upload, Download, Search, Filter } from 'lucide-react'

interface Dispositivo {
  deviceEUI: string
  applicationEUI: string
  metodoActivacion: 'OTAA' | 'ABP'
  planFrecuencia: string
}

export default function Dispositivos() {
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])
  const [nuevoDispositivo, setNuevoDispositivo] = useState<Partial<Dispositivo>>({})
  const [datosCargaMasiva, setDatosCargaMasiva] = useState<string>('')
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('')
  const [filtroActivacion, setFiltroActivacion] = useState<string>('')
  const [filtroFrecuencia, setFiltroFrecuencia] = useState<string>('')
  const [error, setError] = useState<string>('')

  const manejarCambioInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoDispositivo({ ...nuevoDispositivo, [e.target.name]: e.target.value })
  }

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault()
    if (nuevoDispositivo.deviceEUI && nuevoDispositivo.applicationEUI && nuevoDispositivo.metodoActivacion && nuevoDispositivo.planFrecuencia) {
      setDispositivos([...dispositivos, nuevoDispositivo as Dispositivo])
      setNuevoDispositivo({})
      setError('')
    } else {
      setError('Por favor, complete todos los campos.')
    }
  }

  const manejarCargaMasiva = () => {
    try {
      const datosParsed = JSON.parse(datosCargaMasiva)
      if (Array.isArray(datosParsed)) {
        setDispositivos([...dispositivos, ...datosParsed])
        setDatosCargaMasiva('')
        setError('')
      } else {
        throw new Error('Los datos deben ser un array de dispositivos')
      }
    } catch (error) {
      setError('Datos JSON inválidos. Por favor, verifique el formato.')
    }
  }

  const descargarPlantilla = () => {
    const plantilla = [
      {
        deviceEUI: 'ejemplo-device-eui',
        applicationEUI: 'ejemplo-app-eui',
        metodoActivacion: 'OTAA',
        planFrecuencia: 'EU868'
      }
    ]
    const blob = new Blob([JSON.stringify(plantilla, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plantilla-dispositivo.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const dispositivosFiltrados = dispositivos.filter(dispositivo => 
    dispositivo.deviceEUI.toLowerCase().includes(terminoBusqueda.toLowerCase()) &&
    (filtroActivacion === '' || dispositivo.metodoActivacion === filtroActivacion) &&
    (filtroFrecuencia === '' || dispositivo.planFrecuencia === filtroFrecuencia)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-green-400 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
      
        
        <form onSubmit={manejarEnvio} className="bg-gray-900 p-6 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="deviceEUI" className="block text-sm font-medium text-gray-300">EUI del Dispositivo</label>
              <input
                type="text"
                id="deviceEUI"
                name="deviceEUI"
                value={nuevoDispositivo.deviceEUI || ''}
                onChange={manejarCambioInput}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese el EUI del dispositivo"
                data-tooltip-id="device-eui-tooltip"
                data-tooltip-content="El identificador único del dispositivo proporcionado por el fabricante"
              />
              <Tooltip id="device-eui-tooltip" />
            </div>
            <div>
              <label htmlFor="applicationEUI" className="block text-sm font-medium text-gray-300">EUI de la Aplicación</label>
              <input
                type="text"
                id="applicationEUI"
                name="applicationEUI"
                value={nuevoDispositivo.applicationEUI || ''}
                onChange={manejarCambioInput}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese el EUI de la aplicación"
                data-tooltip-id="application-eui-tooltip"
                data-tooltip-content="El identificador que asocia el dispositivo con una aplicación específica"
              />
              <Tooltip id="application-eui-tooltip" />
            </div>
            <div>
              <label htmlFor="metodoActivacion" className="block text-sm font-medium text-gray-300">Método de Activación</label>
              <select
                id="metodoActivacion"
                name="metodoActivacion"
                value={nuevoDispositivo.metodoActivacion || ''}
                onChange={manejarCambioInput}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-tooltip-id="activation-method-tooltip"
                data-tooltip-content="Elija entre Activación por Aire (OTAA) o Activación por Personalización (ABP)"
              >
                <option value="">Seleccione un método</option>
                <option value="OTAA">OTAA</option>
                <option value="ABP">ABP</option>
              </select>
              <Tooltip id="activation-method-tooltip" />
            </div>
            <div>
              <label htmlFor="planFrecuencia" className="block text-sm font-medium text-gray-300">Plan de Frecuencia</label>
              <select
                id="planFrecuencia"
                name="planFrecuencia"
                value={nuevoDispositivo.planFrecuencia || ''}
                onChange={manejarCambioInput}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-tooltip-id="frequency-plan-tooltip"
                data-tooltip-content="Seleccione el plan de frecuencia basado en la región del dispositivo"
              >
                <option value="">Seleccione un plan</option>
                <option value="EU868">EU868</option>
                <option value="US915">US915</option>
                <option value="AS923">AS923</option>
              </select>
              <Tooltip id="frequency-plan-tooltip" />
            </div>
          </div>
          <button type="submit" className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Agregar Dispositivo
          </button>
        </form>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md flex items-center" role="alert">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-4">Carga Masiva</h3>
          <textarea
            value={datosCargaMasiva}
            onChange={(e) => setDatosCargaMasiva(e.target.value)}
            className="w-full h-32 p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Pegue los datos JSON aquí"
          />
          <div className="mt-4 flex space-x-4">
            <button onClick={manejarCargaMasiva} className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <Upload className="h-5 w-5 mr-2" />
              Cargar
            </button>
            <button onClick={descargarPlantilla} className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <Download className="h-5 w-5 mr-2" />
              Descargar Plantilla
            </button>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-4">Lista de Dispositivos</h3>
          <div className="mb-6 flex flex-wrap items-center space-x-4">
            <div className="flex items-center bg-gray-800 rounded-md">
              <Search className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Buscar dispositivos..."
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                className="p-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
            <select
              value={filtroActivacion}
              onChange={(e) => setFiltroActivacion(e.target.value)}
              className="p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos los Métodos de Activación</option>
              <option value="OTAA">OTAA</option>
              <option value="ABP">ABP</option>
            </select>
            <select
              value={filtroFrecuencia}
              onChange={(e) => setFiltroFrecuencia(e.target.value)}
              className="p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos los Planes de Frecuencia</option>
              <option value="EU868">EU868</option>
              <option value="US915">US915</option>
              <option value="AS923">AS923</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">EUI del Dispositivo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">EUI de la Aplicación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Método de Activación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Plan de Frecuencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {dispositivosFiltrados.map((dispositivo) => (
                  <tr key={dispositivo.deviceEUI}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{dispositivo.deviceEUI}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{dispositivo.applicationEUI}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{dispositivo.metodoActivacion}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{dispositivo.planFrecuencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}