export namespace SPK {
  export type SpkFile = {
    _type: string;
    data: SpkFileData;
  };

  export type SpkFileData = {
    id: string;
    version: string;
    meta: Meta;
    token: any[];
    samples: any[];
    refs: Ref[];
    train_info: null;
    recommend_config: RecommendConfig;
  };

  export type Meta = {
    _type: string;
    data: MetaData;
  };

  export type MetaData = {
    name: string;
    desc: string;
    gender: string;
    author: string;
    version: string;
  };

  export type RecommendConfig = {
    _type: string;
    data: RecommendConfigData;
  };

  export type RecommendConfigData = {
    tempature: number;
    top_k: number;
    top_p: number;
    max_tokens: number;
    repetition_penalty: number;
    emotion: string;
  };

  export type Ref = {
    _type: string;
    data: RefData;
  };

  export type RefData = {
    text: string;
    wav: Wav;
    wav_sr: number;
    emotion: null;
    lang: null;
  };

  export type Wav = {
    _type: string;
    data: string;
  };
}
