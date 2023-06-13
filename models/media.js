export class Media {
  constructor(progress, media_id, favorited) {
    this.progress = progress;
    this.media_id = media_id;
    this.favorited = favorited;
  }
}

export class Show extends Media {
  constructor(progress, media_id, favorited, episodes) {
    super(progress, media_id, favorited);
    this.episodes = episodes;
  }
}

export class Movie extends Media {
  constructor(progress, media_id, favorited, started) {
    super(progress, media_id, favorited);
    this.started = this.started;
  }
}

export class Episode {
  constructor(episode_id, progress, started, watched) {
    (this.episode_id = episode_id),
      (this.progress = progress),
      (this.started = started),
      (this.watched = watched);
  }
}
