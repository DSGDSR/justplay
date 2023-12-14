import { IGenre } from '@/lib/models/genre';

export const useGenres = (genres: IGenre[]): string[] => {
    const genresMapping = [
        [2, 'Point & click'],
        [4, 'Fighting'],
        [5, 'Shooter'],
        [7, 'Music'],
        [8, 'Platform'],
        [9, 'Puzzle'],
        [10, 'Racing'],
        [11, 'RTS'],
        [12, 'RPG'],
        [13, 'Simulator'],
        [14, 'Sport'],
        [15, 'Strategy'],
        [16, 'Turn-based'],
        [24, 'Tactical'],
        [26, 'Quiz/Trivia'],
        [25, 'Hack and slash'],
        [30, 'Pinball'],
        [31, 'Adventure'],
        [33, 'Arcade'],
        [34, 'Visual novel'],
        [32, 'Indie'],
        [35, 'Card game'],
        [36, 'MOBA']
    ]

    const parsedGenres = genres.map((genre) => {
        const genreName = genresMapping.find((genreMapping) => genreMapping[0] === genre.id);
        return genreName ? genreName[1] : genre.name;
    });

    return parsedGenres as string[];
};