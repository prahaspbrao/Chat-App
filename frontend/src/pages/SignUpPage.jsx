import React, { useState } from 'react'
import {useAuthStore} from "../store/useAuthStore.js"

function SignUpPage() {

  const [formData , setFormdata] = useState({fullname : "" , email : "" , password : ""});
  const {signup , isSigningUp} = useAuthStore();

  const handleSubmit = (e) =>{

  }

  return (
    <div>SignUpPage</div>
  )
}

export default SignUpPage