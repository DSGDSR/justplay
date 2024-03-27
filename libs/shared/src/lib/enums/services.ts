export enum Service {
  Steam = 1,
  GOG = 5,
  // Youtube = 10,
  Microsoft = 11,
  Apple = 13,
  Twitch = 14,
  Android = 15,
  AmazonAsin = 20,
  AmazonLuna = 22,
  // AmazonAdg = 23,
  EpicGame = 26,
  Oculus = 28,
  Utomik = 29,
  ItchIo = 30,
  // Xbox = 31,
  // Kartridge = 32,
  PSStore = 36,
  FocusEntertainment = 37,
  XboxGamePass = 54,
  // Gamejolt = 55,
  EShop = 99,
}

export enum ServiceType {
  Buy = 'buy',
  Subscription = 'sub',
  Streaming = 'stream',
}

export const ServiceByType: Partial<Record<Service, ServiceType>> = {
  [Service.Steam]: ServiceType.Buy,
  [Service.GOG]: ServiceType.Buy,
  [Service.Microsoft]: ServiceType.Buy,
  [Service.Apple]: ServiceType.Buy,
  [Service.Android]: ServiceType.Buy,
  [Service.AmazonAsin]: ServiceType.Buy,
  [Service.AmazonLuna]: ServiceType.Streaming,
  [Service.EpicGame]: ServiceType.Buy,
  [Service.Oculus]: ServiceType.Buy,
  [Service.Utomik]: ServiceType.Streaming,
  [Service.ItchIo]: ServiceType.Buy,
  [Service.PSStore]: ServiceType.Buy,
  [Service.FocusEntertainment]: ServiceType.Buy,
  [Service.EShop]: ServiceType.Buy,
  [Service.XboxGamePass]: ServiceType.Subscription,
};

export const ServiceTypeNames: Partial<Record<Service, string>> = {
  [Service.Steam]: 'Steam',
  [Service.GOG]: 'GOG',
  [Service.Microsoft]: 'Microsoft Xbox',
  [Service.Apple]: 'Apple',
  [Service.Android]: 'Android',
  [Service.AmazonAsin]: 'Amazon',
  [Service.AmazonLuna]: 'Amazon Luna',
  [Service.EpicGame]: 'Epic Games',
  [Service.Oculus]: 'Oculus',
  [Service.Utomik]: 'Utomik',
  [Service.ItchIo]: 'ItchIo',
  [Service.PSStore]: 'PlayStation Store',
  [Service.FocusEntertainment]: 'Focus Entertainment',
  [Service.EShop]: 'Nintendo eShop',
  [Service.XboxGamePass]: 'Xbox Game Pass',
};
