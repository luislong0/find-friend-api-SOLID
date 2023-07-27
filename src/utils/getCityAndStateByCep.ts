import axios from 'axios'

export async function getCityAndStateByCep(cep: string) {
  const response = await axios.get(
    `https://cdn.apicep.com/file/apicep/${cep}.json`,
  )

  console.log('DATAAAAAAAAAA: ' + JSON.stringify(response.data))

  return response.data
}
