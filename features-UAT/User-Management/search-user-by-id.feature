Feature: Search User by ID
  As an API consumer
  I want to search for a specific user by their ID

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @user @search @UAT-USER @uat @UAT-USER @get
  Scenario: Search user by ID successfully
    When I send a GET request to "/api/v2/usermanagement/users?id=6548d78415c5da00166ae67e"
    Then the response status code should be 200
    And the response should be a valid JSON
