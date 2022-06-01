export interface PokeMonObj {
  name: string;
  url: string;
}

type spritesObj = {
  front_default: string;
};

export interface Profile {
  name: string;
  weight: number;
  height: number;
  sprites: spritesObj;
}
