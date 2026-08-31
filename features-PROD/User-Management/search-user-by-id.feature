Feature: Search User by ID
  As an API consumer
  I want to search for a specific user by their ID

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @user @search @prod @get
  Scenario: Search user by ID successfully
    When I send a GET request to "/api/v2/usermanagement/users?_id=69a7c9e938e63d6398332743"
    Then the response status code should be 200
    And the response should be a valid JSON
