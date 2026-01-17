import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { IonIcon } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import Swal from 'sweetalert2'
import Navbar from './Navbar'
import Spinner from './Spinner'

const Clients = () => {

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()

  const getClients = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) {
        nav("/login")
        return
      }

      const response = await fetch('https://aarogyapath.onrender.com/admin/getclients', {
        method: "GET",
        headers: { token }
      })

      const res = await response.json()
      if (response.ok) {
        setClients(Array.isArray(res) ? res : [])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteClient = async (id) => {
    const result = await Swal.fire({
      title: "Delete Client?",
      text: "Are you sure.You want to delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      background: "#f9fafb",
      color: "#111827",
    })

    if (!result.isConfirmed) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`https://aarogyapath.onrender.com/admin/delete/${id}`, {
        method: "DELETE",
        headers: { token }
      })

      if (response.ok) {
        setClients(clients.filter(c => c._id !== id))

        Swal.fire({
          title: "Deleted!",
          text: "Client has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getClients()
  }, [])

  const sortedClients = [...clients].sort((a, b) => {
    return (a.isvisited === true) - (b.isvisited === true)
  })

  return (
    <>
      <Navbar />
      <div className="w-full pl-[5%] min-h-screen bg-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Clients</h1>

        {loading ? <Spinner /> : sortedClients.length === 0 ? (
          <p className="text-gray-700">No Clients</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedClients.map((client) => (
              <div
                key={client._id}
                className={`
                  cursor-pointer bg-white rounded-xl shadow-lg p-5 transition-all duration-300
                  ${client.isvisited === false
                    ? "scale-105 sm:scale-100 border-l-4 border-red-500"
                    : "opacity-60 border-l-4 border-green-500"}
                `}
                onClick={() => nav(`/client/${client._id}`)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">{client.name}</h2>

                  <div className="flex items-center gap-2">
                    <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {client.gender}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteClient(client._id)
                      }}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete Client"
                    >
                      <IonIcon icon={trashOutline} className="text-xl" />
                    </button>
                  </div>
                </div>

                <p><b>Profession:</b> {client.proffession}</p>
                <p><b>Height:</b> {client.height}</p>
                <p><b>Weight:</b> {client.weight}</p>

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Clients
