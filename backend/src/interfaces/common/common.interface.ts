export interface apiFeatureQuerystringInterface {
  sort?: any;
  search?: any;
  page?: string;
  limit?: string;
}

export interface paginationInterface {
  itemCount?: number;
  count?: number;
  limit?: number;
  skip?: number;
  page?: number;
}
