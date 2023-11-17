export enum Services {
    Steam = 1,
    GOG = 5,
    // Youtube = 10,
    Microsoft = 11,
    Apple = 13,
    // Twitch = 14,
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

export const ServiceByType: Record<Services, ServiceType> = {
    [Services.Steam]: ServiceType.Buy,
    [Services.GOG]: ServiceType.Buy,
    [Services.Microsoft]: ServiceType.Buy,
    [Services.Apple]: ServiceType.Buy,
    [Services.Android]: ServiceType.Buy,
    [Services.AmazonAsin]: ServiceType.Buy,
    [Services.AmazonLuna]: ServiceType.Streaming,
    [Services.EpicGame]: ServiceType.Buy,
    [Services.Oculus]: ServiceType.Buy,
    [Services.Utomik]: ServiceType.Streaming,
    [Services.ItchIo]: ServiceType.Buy,
    [Services.PSStore]: ServiceType.Buy,
    [Services.FocusEntertainment]: ServiceType.Buy,
    [Services.EShop]: ServiceType.Buy,
    [Services.XboxGamePass]: ServiceType.Subscription,
}

export const ServiceTypeNames: Record<Services, string> = {
    [Services.Steam]: 'Steam',
    [Services.GOG]: 'GOG',
    [Services.Microsoft]: 'Microsoft Xbox',
    [Services.Apple]: 'Apple',
    [Services.Android]: 'Android',
    [Services.AmazonAsin]: 'Amazon',
    [Services.AmazonLuna]: 'Amazon Luna',
    [Services.EpicGame]: 'Epic Games',
    [Services.Oculus]: 'Oculus',
    [Services.Utomik]: 'Utomik',
    [Services.ItchIo]: 'ItchIo',
    [Services.PSStore]: 'PlayStation Store',
    [Services.FocusEntertainment]: 'Focus Entertainment',
    [Services.EShop]: 'Nintendo eShop',
    [Services.XboxGamePass]: 'Xbox Game Pass',
}
