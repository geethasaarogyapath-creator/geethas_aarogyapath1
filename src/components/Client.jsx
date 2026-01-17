import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Navbar from './Navbar'
import Spinner from './Spinner'
import { IonIcon } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import Swal from 'sweetalert2'

const Client = () => {

  const { id } = useParams()
  const nav = useNavigate()

  const [client, setClient] = useState([])
  const [loading, setLoading] = useState(true)

  const delclient = async () => {

    const result = await Swal.fire({
      title: "Delete Client?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      background: "#f9fafb",
      color: "#111827",
      customClass: {
        popup: 'rounded-xl shadow-lg'
      }
    })

    if (!result.isConfirmed) return

    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) {
        nav("/login")
        return
      }

      const response = await fetch(`https://aarogyapath.onrender.com/admin/delete/${id}`, {
        method: "DELETE",
        headers: { token }
      })

      if (response.ok) {
        await Swal.fire({
          title: "Deleted!",
          text: "Client deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#f0fdf4",
          color: "#065f46"
        })
        nav("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getsingleclient = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) {
        nav("/login")
        return
      }

      const response = await fetch(`https://aarogyapath.onrender.com/admin/single/${id}`, {
        method: "GET",
        headers: { token }
      })

      const res = await response.json()
      if (response.ok) {
        setClient(Array.isArray(res) ? res : [res])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getsingleclient()
  }, [])

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 p-8">

        {loading ? <Spinner /> : client.length === 0 ? (
          <p className="text-gray-700">No Client Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {client.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5 border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-gray-800">{c.name}</h2>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {c.gender}
                    </span>

                    <button
                      onClick={delclient}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete Client"
                    >
                      <IonIcon icon={trashOutline} className="text-xl" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p><b>Email:</b> {c.email}</p>
                  <p><b>Phone:</b> {c.phone}</p>
                  <p><b>Age:</b> {c.age}</p>
                  <p><b>Profession:</b> {c.proffession}</p>
                  <p><b>Height:</b> {c.height}</p>
                  <p><b>Weight:</b> {c.weight}</p>
                  <p><b>Address:</b> {c.address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Client
