export interface ProfileImg {
  el: HTMLImageElement;
  loaded?: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
  pos?: {
    x: {
      current: number;
      last: number;
      max: number;
    };
    y: {
      current: number;
      last: number;
      max: number;
    };
  };
}
