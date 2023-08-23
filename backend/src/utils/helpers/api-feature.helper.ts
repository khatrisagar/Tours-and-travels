import { apiFeatureQuerystringInterface } from "@/interfaces";
export class APIFeature {
  query: any;
  queryString: apiFeatureQuerystringInterface;
  page: number;
  limit: number;
  skip: number;
  count: number;
  constructor(query: any, queryString: apiFeatureQuerystringInterface) {
    this.query = query;

    this.queryString = queryString;
    this.page = 1;
    this.limit = 5;
    this.skip = 0;
    this.count = 0;
  }

  sort() {
    this.query = this?.query?.sort(this.JSONParser(this?.queryString?.sort));

    return this;
  }

  filter(allowedSearchFields: Array<any>) {
    const searchValue = this?.queryString?.search;
    const filterSearchQuery: Array<object> = [];
    allowedSearchFields.forEach((element: { field: string; type: string }) => {
      if (!searchValue || searchValue !== "") {
        if (element.type === "string" && typeof searchValue === "string") {
          filterSearchQuery.push({
            [element.field]: { $regex: searchValue, $options: "i" },
          });
        }
        if (element.type === "number" && !isNaN(searchValue)) {
          filterSearchQuery.push({
            [element.field]: searchValue,
          });
        }
      }
    });

    if (filterSearchQuery.length) {
      this.query = this?.query?.where({
        $or: filterSearchQuery,
      });
    }
    // console.log(this.query.explain);

    return this;
  }
  pagination() {
    this.page = this?.queryString?.page
      ? parseInt(this.queryString.page)
      : this.page;
    this.limit = this?.queryString?.limit
      ? parseInt(this.queryString.limit)
      : this.limit;

    this.skip = (this.page - 1) * this.limit;

    this.query = this.query.skip(this.skip).limit(this.limit);
    return this;
  }
  JSONParser(queryStr: string) {
    try {
      return JSON.parse(queryStr);
    } catch {
      return null;
    }
  }
}
