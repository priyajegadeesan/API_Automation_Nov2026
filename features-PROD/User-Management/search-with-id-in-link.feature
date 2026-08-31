Feature: Search User with ID in Link
  As an API consumer
  I want to search for a user using ID directly in the URL path

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @user @search @prod
  Scenario: Search for user with ID in URL path
    When I send a GET request to "/api/v2/usermanagement/user/680fa718ab2f25ab5242048c"
    Then the response status code should be 200
    And the response should be a valid JSON
