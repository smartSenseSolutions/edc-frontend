export interface AssetList {
  createdAt: string;
  properties: any;
  id: string;
}

export interface AddAssetData {
  asset: {
    id: string;
    properties: any;
  };
  dataAddress: {
    properties: {
      type: string;
      baseUrl: string;
      method: string;
      proxyBody: boolean;
      proxyMethod: boolean;
      name?: string;
      mediaType: string;
    };
  };
}
