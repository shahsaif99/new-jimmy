
export default {
  // Endpoints
  // companyLoginEndpoint: route('login'),
  // employeeLoginEndpoint: route('login'),
  // registerEndpoint: route('register'),
  // refreshEndpoint: route('refresh-token'),
  // logoutEndpoint: route('logout'),

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageUserDataKeyName: 'userData',
  storageUserAbilityKeyName: 'abilities',
  storageRefreshTokenKeyName: 'refreshToken',
  //
  storageCustomerDataKeyName: 'customerData',
  storageCustomerTokenKeyName: 'customerAccessToken',

}
