import AppProfile from '@/components/appProfile'

function UserProfile({ info }) {
  return (
    <div className='w-full justify-center'>
      <div className='h-32' />
      <AppProfile user={info} />
    </div>
  )
}

export default UserProfile
