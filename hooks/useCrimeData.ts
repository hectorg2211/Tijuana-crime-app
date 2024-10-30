import { fetchAllCrimeData } from '@/utils/requests'
import { useQuery } from '@tanstack/react-query'

const useCrimeData = () => {
  return useQuery({
    queryKey: ['crimeData'],
    queryFn: fetchAllCrimeData,
  })
}

export default useCrimeData
