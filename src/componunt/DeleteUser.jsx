import axios from 'axios'
import  { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import { BASE_URL, TOKEN } from '../util/config'


const DeleteUser = () => {
  const {id} = useParams()
  const [message, setMessage] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    deleteUser()
  }, [])

  const deleteUser = async() => {
    const {data} = await axios.delete(`${BASE_URL}/user/deleteuser/${id}`, {
      headers:{
        "Content-Type":"application/json",
        authorization: `Bearer ${TOKEN}`
      }
    })
    setMessage(data)

    setTimeout(()=>{
      navigate("/users")
    }, 1000)
    
  }
  return (
    <div>
      {
        message && message.success && <h2>{message.message}</h2>
      }
    </div>
  )
}

export default DeleteUser;