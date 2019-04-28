import { RESTDataSource } from 'apollo-datasource-rest';

export default class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://surf-spot-check.herokuapp.com/v1alpha1/graphql';
  }
  async getData() {
    const response = await this.get('query');
    return Array.isArray(response)
      ? response
      : [];
  }
}
