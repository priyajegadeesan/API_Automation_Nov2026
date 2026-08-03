Feature: Search with Multiple User IDs
  As an API consumer
  I want to search for multiple users using their IDs

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @user @search @bulk @uat
  Scenario: Search users with multiple IDs
    When I send a GET request to "/api/v2/usermanagement/users" with multiple user ID parameters
    Then the response status code should be 200
    And the response should be a valid array
