// styles
import { useEffect, useRef, useState } from 'react'
import './Avatar.css'
import { useAuthContext } from '../hooks/auth/useAuthContext'
import { supabase } from '../supabase/config'

export default function Avatar({ src }) {
  const [photoURL, setPhotoURL] = useState(src)
  const {user} = useAuthContext() 
  const fetchFile = async () => {
    const userId = user.id
    const {data: currUserData, error: errorUserData} = await supabase.from('users').select('*').eq('user_id', userId).limit(1)
    if(errorUserData){
      console.log("Error fetching current user data: ", errorUserData.message)
    }
    setPhotoURL(currUserData[0].photo_url);
  };

  useEffect(()=>{
    if(!Boolean(src))
    fetchFile()
  }, [])

  return(
    <div className='Avatar'>
      <img src={photoURL} alt="User Avatar"/>
    </div>
  )
}