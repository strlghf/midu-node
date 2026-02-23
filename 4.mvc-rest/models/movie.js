import { randomUUID } from 'node:crypto'
import jsonMovies from '../movies.json' with { type: 'json' }

const movies = jsonMovies

export class MovieModel { // PREV CODE ROUTE
  static async getAll ({ genre }) { // GET '/'
    if (genre) {
      return movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    }

    return movies
  }

  static async getById ({ id }) { // GET '/:id'
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) { // POST '/'
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) { // DELETE '/:id'
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) { // PATCH '/:id'
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}
