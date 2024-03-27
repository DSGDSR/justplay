export interface IScreenshot {
  id: number;
  alpha_channel: boolean;
  animated: boolean;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
}

export interface IVideo {
  id: number;
  name: string;
  video_id: string;
  game: number;
}
