Feature: Get All Tasks v2 UAT
  As an API consumer
  I want to retrieve all tasks in UAT using v2 API
  So that I can view all UAT tasks

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @tasks @UAT-USER @get @UAT-USER @uat
  Scenario: Get all UAT tasks successfully
    When I send a GET request to "/api/v2/tasks"
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "data"
