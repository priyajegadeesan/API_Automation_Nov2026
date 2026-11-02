Feature: Get Pipeline Details with Non-existent ID
  As an API consumer
  I want to verify proper error handling for non-existent pipeline ID

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @details @negative @UAT-USER @prod @UAT-USER @get
  Scenario: Get pipeline details with non-existent pipeline ID
    When I send a GET request to "/api/v2/pipelines/69aa73893b3437d81ff70bee"
    Then the response status code should be 400
    And the response should have property "status"
    And the response should have property "metadata"
