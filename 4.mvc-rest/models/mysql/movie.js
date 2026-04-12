import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'R4Z3RTTV2G502HS10LANIX123$',
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      // NO implicito, SQL INYECTION
      const [genres] = await connection.query(
        "SELECT id, name FROM genre WHERE LOWER(name) = ?;", [lowerCaseGenre] // <- SIEMPRE ASÍ
      )

      if (genres.length === 0) return []

      const [{ id }] = genres;

      // get all movies id from db table, query to movie_genres join and return results
      return []
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, poster, rate, BIN_TO_UUID(id ) id FROM movie'
    )

    return movies;
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie
        WHERE id = UUID_TO_BIN(?);`, [id]
    )

    if (movies.length === 0) return null;

    return movies[0];
  }

  static async create ({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    // create connection to genre

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO movie(id, title, year, director, duration, poster, rate)
          VALUES(UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?)`,
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      throw new Error("Error creating movie")
    }
    

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    const [movies] = await connection.query(
      `DELETE FROM movies
        WHERE id = `, [id]
    )
  }

  static async update ({ id, input }) {

  }
}