export interface Game1TypeBody {
  sentence: string,
  wordVariants: {
    word: string
  }[],
  correctWord: string
}

export interface Game1Type {
  name: string,
  list: Game1TypeBody[]
}

export interface Game1TypeApi extends Omit<Game1Type, 'name'> {
  acf_fc_layout: string;
}

export interface Game2TypeBody {
  sentence: string
}

export interface Game2Type {
  name: string,
  list: Game2TypeBody[]
}

export interface Game2TypeApi extends Omit<Game2Type, 'name'> {
  acf_fc_layout: string;
}

export type GameBlock = Game1Type | Game2Type

export type GameBlockApi = Game1TypeApi | Game2TypeApi