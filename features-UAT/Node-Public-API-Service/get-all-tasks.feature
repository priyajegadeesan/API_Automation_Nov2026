Feature: Get All Tasks
  As an API consumer
  I want to test the Get All Tasks endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @get @UAT-USER @uat
  Scenario: Get All Tasks API call
    When I send a GET request to "/api/v2/tasks"
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "data"
