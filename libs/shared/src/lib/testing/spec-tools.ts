import { IScreenshot } from '../models';

export const mockScreenshot = (opts?: {
  alpha?: boolean;
  animated?: boolean;
  width?: number;
  height?: number;
  url?: string;
}): IScreenshot => ({
  id: Math.floor(Math.random() * 100),
  alpha_channel: !!opts?.alpha,
  animated: !!opts?.animated,
  game: Math.floor(Math.random() * 100),
  height: opts?.height ?? 1080,
  image_id: String(Math.floor(Math.random() * 100)),
  url: opts?.url ?? `https://picsum.photos/${opts?.width ?? 1920}/${opts?.height ?? 1080}`,
  width: opts?.width ?? 1920,
});
