export enum IGDBEndpoint {
  Games = 'games',
  Search = 'search',
  Companies = 'companies',
}

export enum Endpoint {
  // GAMES
  GameById = '/games/:id',
  GameBySlug = '/games/slug/:slug',
  GamesListByIds = '/games/list/:ids',
  SearchGames = '/games/search',

  // COMPANIES
  CompanyById = '/companies/:id',

  // LISTS
  Lists = '/lists',

  // TWITCH
  TopGameStreamings = '/twitch/game/:gameId',
}
