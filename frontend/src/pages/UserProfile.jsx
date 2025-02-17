import AppProfile from '@/components/appProfile'
import { useParams } from 'react-router-dom'
import { getProfileDetails } from "@/backend/listings";

function UserProfile() {
  const { id } = useParams()
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const info = await getProfileDetails(id)
        setInfo(info)
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (<p>Loading...</p>);
  }
  if (error) {
    return (<p>Error: ${error}</p>);
  }

  if (!listing) {
    return (<p>Not Found</p>);
  }

  return (
    <div className='w-full justify-center'>
      <div className='h-32' />
      <AppProfile user={info} />
    </div>
  )
}

export default UserProfile
