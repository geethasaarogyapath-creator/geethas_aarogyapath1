import { IonIcon } from '@ionic/react'
import { eye, eyeOff, person } from 'ionicons/icons'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Spinner from './Spinner'
import Swal from 'sweetalert2'

const Login = () => {

  const nav = useNavigate()

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [spass, setSpass] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggle = () => setSpass(!spass)

  const al = (token) => {
    localStorage.setItem("token", token)
    nav('/')
  }

  const hl = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch("https://aarogyapath.onrender.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: user, password: pass })
      })

      const res = await response.json()

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: res.message,
          timer: 1500,
          showConfirmButton: false,
          background: "#f0fdf4",
          color: "#065f46"
        })
        al(res.token)
        setUser("")
        setPass("")
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res.message,
          confirmButtonColor: "#dc2626",
          background: "#fef2f2",
          color: "#7f1d1d"
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    localStorage.removeItem("token")
  }, [])

  return (
    <>
      <Navbar />
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
        <div className='w-[350px] bg-gray-100 rounded-xl shadow-md flex justify-center items-center'>
          <div className='w-full p-10'>

            {loading ? <Spinner /> : (
              <>
                <h2 className='text-center text-2xl font-bold mb-8'>LOGIN</h2>

                <form onSubmit={hl}>
                  <div className='relative border-b-2 mb-8 h-12'>
                    <input
                      className='w-full h-full px-3 bg-transparent outline-none pr-8'
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      type='text'
                      placeholder='Name'
                      required />
                    <span className='absolute right-2 top-1/2 -translate-y-1/2 text-xl'>
                      <IonIcon icon={person} />
                    </span>
                  </div>

                  <div className='relative border-b-2 mb-8 h-12'>
                    <input
                      className='w-full h-full px-3 bg-transparent outline-none pr-8'
                      onChange={(e) => setPass(e.target.value)}
                      value={pass}
                      type={spass ? 'text' : 'password'}
                      placeholder='Password'
                      required />
                    <span
                      className='absolute right-2 top-1/2 -translate-y-1/2 text-xl cursor-pointer'
                      onClick={toggle}>
                      <IonIcon icon={spass ? eyeOff : eye} />
                    </span>
                  </div>

                  <button
                    className='w-full h-10 ring-2 font-medium hover:bg-gray-300'
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "LOGIN"}
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default Login
