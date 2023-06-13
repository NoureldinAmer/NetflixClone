import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { result } from "lodash";

const db = SQLite.openDatabase("netflix.db");
const dbFileUri = `${FileSystem.documentDirectory}SQLite/netflix.db`;

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS media
        (
          favorited BOOLEAN,
          media_id TEXT,
          progress INT,
          media_type TEXT NOT NULL,
          poster_path TEXT,
          title TEXT,
          PRIMARY KEY (media_id)
        );`
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS movie
        (
          media_id TEXT NOT NULL,
          PRIMARY KEY (media_id),
          FOREIGN KEY (media_id) REFERENCES media(media_id)
        );`
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS show
        (
          media_id TEXT NOT NULL,
          PRIMARY KEY (media_id),
          FOREIGN KEY (media_id) REFERENCES media(media_id)
        );`
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS actor
        (
          actor_id TEXT NOT NULL,
          actor_name TEXT,
          PRIMARY KEY (actor_id)
        );`
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS genre
        (
          genre_id TEXT NOT NULL,
          name TEXT,
          PRIMARY KEY (genre_id)
        );`
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS episode
        (
          seasonNumber INT NOT NULL,
          episodeNumber INT NOT NULL,
          progress INT,
          media_id TEXT NOT NULL,
          PRIMARY KEY (seasonNumber, episodeNumber),
          FOREIGN KEY (media_id) REFERENCES show(media_id)
        );`
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS starred_in
        (
          media_id TEXT NOT NULL,
          actor_id TEXT NOT NULL,
          PRIMARY KEY (media_id, actor_id),
          FOREIGN KEY (media_id) REFERENCES media(media_id),
          FOREIGN KEY (actor_id) REFERENCES actor(actor_id)
        );`
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS belongs_to
        (
          genre_id TEXT,
          id TEXT,
          PRIMARY KEY (genre_id, id),
          FOREIGN KEY (genre_id) REFERENCES genre(genre_id),
          FOREIGN KEY (id) REFERENCES media(id)
        );`
        );
      },
      (t, error) => {
        console.log("db error create tables");
        reject(error);
      },
      () => {
        resolve("all tables created or already exist");
      }
    );
  });

  return promise;
}

export function verifyDbExists() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table';",
        [],
        (_, { rows }) => {
          console.log("Tables in the database:");
          for (let i = 0; i < rows.length; i++) {
            console.log(rows.item(i).name);
          }
          resolve({ rows });
        },
        (_, error) => {
          console.log("Error: " + error);
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function addMedia(media) {
  const promise = new Promise((resolve, reject) => {
    if (media.contentType === "movie") {
      addMovie(media)
        .then(resolve())
        .catch((error) => {
          reject(error);
        });
    } else {
      addShow(media)
        .then(resolve())
        .catch((error) => {
          reject(error);
        });
    }
  });

  return promise;
}

// favorited BOOLEAN,
// id TEXT,
// progress INT,
// media_type TEXT NOT NULL,
// poster_path TEXT,
// PRIMARY KEY (id)

function addMovie(media) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM media WHERE media_id = ?",
        [String(media.contentID)],
        (_, { rows }) => {
          if (rows.length === 0) {
            // if movie does not exist
            //insert into media db
            tx.executeSql(
              `INSERT INTO 
              media (favorited, media_id, progress, media_type, poster_path, title) 
              VALUES (?, ?, ?, ?, ?, ?)`,
              [
                "false",
                String(media.contentID),
                0,
                media.contentType,
                media.poster_path,
                media.title,
              ],
              (_, result) => {
                console.log(result);
                resolve(result);
              },
              (_, error) => {
                console.log(error);
                reject(error);
              }
            );

            //insert into movie db
            tx.executeSql(
              "INSERT INTO movie (media_id) VALUES (?)",
              [String(media.contentID)],
              (_, result) => {
                console.log(result);
                resolve(result);
              },
              (_, error) => {
                console.log(error);
                reject(error);
              }
            );
          } else {
            console.log("The movie already exists in the database.");
          }
        },
        (_, error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });

  return promise;
}

function addShow(media) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM media WHERE media_id = ?",
        [String(media.contentID)],
        (_, { rows }) => {
          if (rows.length === 0) {
            // if movie does not exist
            //insert into media db
            tx.executeSql(
              `INSERT INTO 
              media (favorited, media_id, progress, media_type, poster_path, title) 
              VALUES (?, ?, ?, ?, ?, ?)`,
              [
                "false",
                String(media.contentID),
                0,
                media.contentType,
                media.poster_path,
                media.title,
              ],
              (_, result) => {
                console.log(result);
                resolve(result);
              },
              (_, error) => {
                console.log(error);
                reject(error);
              }
            );

            //insert into show table
            tx.executeSql(
              "INSERT INTO show (media_id) VALUES (?)",
              [String(media.contentID)],
              (_, result) => {
                console.log(result);
                resolve(result);
              },
              (_, error) => {
                console.log(error);
                reject(error);
              }
            );
          } else {
            console.log("The show already exists in the database.");
          }
        },
        (_, error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });

  return promise;
}

//return a list of watched media
export function getWatchList() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * from media`,
        [],
        (_, result) => {
          // console.log(result.rows._array);
          resolve(result.rows._array);
        },
        (_, error) => {
          // console.log(error);
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function getWatchedEpisodes(showID) {
  const promise = new Promise((resolve, reject) => {
    console.log(showID);
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * from episode
        WHERE media_id = ?
        `,
        [String(showID)],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          // console.log(error);
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function updateProgress(
  selectedMedia,
  newProgress,
  episodeDetails = null
) {
  const promise = new Promise(async (resolve, reject) => {
    console.log("updating progress ");
    try {
      const result =
        (await selectedMedia.contentType) === "movie"
          ? updateMovieProgress(newProgress, String(selectedMedia.contentID))
          : updateEpisodeProgress(
              String(selectedMedia.contentID),
              episodeDetails.seasonNumber,
              episodeDetails.episodeNumber,
              newProgress
            );
      resolve(result);
    } catch (error) {
      reject(error);
    }

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "SELECT * FROM media WHERE id = ?",
    //     [String(selectedMedia.contentID)],
    //     async (_, { row }) => {
    //       if (rows.length === 0) {
    //         const result =
    //           (await selectedMedia.contentType) === "movie"
    //             ? addMovie(selectedMedia)
    //             : addShow(selectedMedia);
    //       }
    //     },
    //     (_, error) => {
    //       console.log(error);
    //       reject(error);
    //     }
    //   );
    // });
  });
  return promise;
}

function updateMovieProgress(newProgress, contentID) {
  const promise = new Promise((resolve, reject) => {
    console.log("updating progress movie", newProgress, contentID);
    db.transaction((tx) => {
      tx.executeSql(
        `
        UPDATE media
        SET progress = progress + ?
        WHERE media_id = ?;
        `,
        [newProgress, contentID],
        (_, result) => {
          console.log(result);
          console.log("done");
          resolve(result);
        },
        (_, error) => {
          console.log("update error :", error);
          reject(error);
        }
      );
    });
  });
  return promise;
}

function updateEpisodeProgress(
  contentID,
  seasonNumber,
  episodeNumber,
  newProgress
) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        UPDATE episode
        SET progress = progress + ?
        WHERE seasonNumber = ? 
        AND episodeNumber = ?
        AND media_id = ?;
        `,
        [newProgress, seasonNumber, episodeNumber, contentID],
        (_, result) => {
          // if no rows were affected, insert the new episode
          if (result.rowsAffected === 0) {
            tx.executeSql(
              `
              INSERT INTO episode (seasonNumber, episodeNumber, progress, media_id)
              VALUES (?, ?, ?, ?);
              `,
              [seasonNumber, episodeNumber, newProgress, contentID]
            );
          }
          console.log(result);
          console.log("updatedEP");
          resolve(result);
        },
        (_, error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function deleteDB() {
  const promise = new Promise((resolve, reject) => {
    FileSystem.deleteAsync(dbFileUri, { idempotent: true })
      .then(() => {
        console.log("Database file deleted!");
        resolve();
      })
      .catch((error) => {
        console.error("Error deleting database file:", error);
        reject(error);
      });
  });

  return promise;
}
