import axios from 'axios'
import laraclient from '../laraclient'


const GIVEAWY_PATH = 'api/protected-endpoint'



export const fetchData = async () => {
 
  try {
    const data = await laraclient.get(`${GIVEAWY_PATH}`)

    return data?.data
  } catch (error) {
    console.error(error)
    return error
  }
}


