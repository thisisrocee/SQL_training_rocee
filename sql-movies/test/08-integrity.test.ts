import _ from "lodash";
import { Database } from "../src/database";
import {
  selectGenreById,
  selectDirectorById,
  selectActorById,
  selectKeywordById,
  selectProductionCompanyById,
  selectMovieById
} from "../src/queries/select";
import { minutes } from "./utils";

describe("Foreign Keys", () => {
  let db: Database;

  beforeAll(async () => {
    db = await Database.fromExisting("07", "08");
    await db.execute("PRAGMA foreign_keys = ON");
  }, minutes(3));

  it(
    "should not be able delete genres if any movie is linked",
    async done => {
      const genreId = 5;
      const query = `DELETE 
      FROM genres 
      WHERE id = ${genreId} 
      AND id NOT IN (SELECT DISTINCT genre_id FROM movie_genres)`;

      try {
        await db.delete(query);
      } catch (e) {}

      const row = await db.selectSingleRow(selectGenreById(genreId));
      expect(row).toBeDefined();

      done();
    },
    minutes(10)
  );

  it(
    "should not be able delete director if any movie is linked",
    async done => {
      const directorId = 7;
      const query = `DELETE 
      FROM directors 
      WHERE id = ${directorId} 
      AND id NOT IN (SELECT DISTINCT director_id FROM movie_directors)`;
      try {
        await db.delete(query);
      } catch (e) {}

      const row = await db.selectSingleRow(selectDirectorById(directorId));
      expect(row).toBeDefined();

      done();
    },
    minutes(10)
  );

  it(
    "should not be able delete actor if any movie is linked",
    async done => {
      const actorId = 10;
      const query = `DELETE 
      FROM actors 
      WHERE id = ${actorId} 
      AND id NOT IN (SELECT DISTINCT actor_id FROM movie_actors)`;
      try {
        await db.delete(query);
      } catch (e) {}

      const row = await db.selectSingleRow(selectActorById(actorId));
      expect(row).toBeDefined();

      done();
    },
    minutes(10)
  );

  it(
    "should not be able delete keyword if any movie is linked",
    async done => {
      const keywordId = 12;
      const query = `DELETE 
      FROM keywords 
      WHERE id = ${keywordId} 
      AND id NOT IN (SELECT DISTINCT keyword_id FROM movie_keywordd)`;
      try {
        await db.delete(query);
      } catch (e) {}

      const row = await db.selectSingleRow(selectKeywordById(keywordId));
      expect(row).toBeDefined();

      done();
    },
    minutes(10)
  );

  it(
    "should not be able delete production company if any movie is linked",
    async done => {
      const companyId = 12;
      const query = `DELETE 
      FROM production_companies 
      WHERE id = ${companyId} 
      AND id NOT IN (SELECT DISTINCT company_id FROM movie_production_companies)`;
      try {
        await db.delete(query);
      } catch (e) {}

      const row = await db.selectSingleRow(
        selectProductionCompanyById(companyId)
      );
      expect(row).toBeDefined();

      done();
    },
    minutes(10)
  );

  it(
    "should not be able delete movie if there are any linked data present",
    async done => {
      const movieId = 100;
      const query = `DELETE 
      FROM movies 
      WHERE id = ${movieId} 
      AND id NOT IN (SELECT DISTINCT movie_id 
        FROM movie_genres, movie_ratings, movie_actors, movie_directors, movie_keywords, movie_production_companies)`;
      try {
        await db.delete(query);
      } catch (e) {}

      const row = await db.selectSingleRow(selectMovieById(movieId));
      expect(row).toBeDefined();

      done();
    },
    minutes(10)
  );

  it(
    "should be able to delete movie",
    async done => {
      const movieId = 5915;
      const query = `DELETE FROM movies
      WHERE id = ${movieId};

      DELETE FROM movie_genres
      WHERE movie_id = ${movieId};

      DELETE FROM movie_ratings
      WHERE movie_id = ${movieId};
      
      DELETE FROM movie_actors
      WHERE movie_id = ${movieId};

      DELETE FROM movie_directors
      WHERE movie_id = ${movieId};
      
      DELETE FROM movie_keywords
      WHERE movie_id = ${movieId};

      DELETE FROM movie_production_companies
      WHERE movie_id = ${movieId};`;

      await db.delete(query);

      const row = await db.selectSingleRow(selectMovieById(movieId));
      expect(row).toBeUndefined();

      done();
    },
    minutes(10)
  );
});
