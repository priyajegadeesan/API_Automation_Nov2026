Feature: Delete User
  As an API consumer
  I want to delete a user from the system

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @user @delete @uat
  Scenario: Delete an existing user
    When I send a DELETE request to "/api/v2/usermanagement/user/{userId}"
    Then the response status code should be 200
