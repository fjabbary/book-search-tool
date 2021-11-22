import axios from 'axios'

export const FetchDocs = async (q) => {
  const response = await axios.get(
    'https://openlibrary.org/search.json',
    {
      params: {
        q,
      }
    }
  )

  return response.data.docs
}
