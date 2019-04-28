import { RESTDataSource } from 'apollo-datasource-rest';

class LaunchAPI extends RESTDataSource {
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

export default LaunchAPI;
