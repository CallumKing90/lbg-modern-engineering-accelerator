import React, { useEffect, useState } from 'react'
import axios from 'axios'

const StarWars = () => {
  const [films, setFilms] = useState([])

  useEffect(() => {
    const source = axios.CancelToken.source()
    axios
      .get('https://swapi.dev/api/films/', { cancelToken: source.token })
      .then(({ data }) => {
        setFilms(data.results)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`)
        } else {
          console.error(error)
        }
      })

    return () => {
      source.cancel('Cancelling axios in cleanup')
    }
  }, [])

  return (
    <main>
      <ul>
        {films.map(({ episode_id, title, opening_crawl }) => (
          <li key={episode_id}>
            <h2>{title}</h2>
            <p>{opening_crawl}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default StarWars
