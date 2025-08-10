import { useEffect, useState } from 'react'
import { useCollection } from '../hooks/useCollection'

// components
import Avatar from './Avatar'

// styles
import './OnlineUsers.css'
import { useFetchUsers } from '../hooks/useFetchUsers'

export default function OnlineUsers() {
  const {userList, fetchError, now, isPending} = useFetchUsers()
  
  return (
    <div className="user-list">
      <h2>All Users</h2>
      <div className="last-updated">Last updated: {new Date(now).toLocaleTimeString()}</div>
      {isPending && !userList && <div>Loading users...</div>}
      {fetchError && <div>{fetchError}</div>}
      {userList ? userList.map(user => (
        <div key={user.id} className="user-list-item">
          {user.is_online && <span className="online-user"></span>}
          <Avatar src={user.photo_url} />
          <span style={{fontSize: '10px'}}>{`${user.user_first_name} ${user.user_last_name}`}</span>
        </div>
      )): []}
    </div>
  )
}