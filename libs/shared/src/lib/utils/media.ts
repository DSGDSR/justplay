export const convertImageUrl = (url: string, type = 'thumb', resolution = '720p') =>
  `https://${url.slice(2).replace(`t_${type}`, `t_${resolution}`)}`; // TODO use this for all images
