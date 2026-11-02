Feature: v2 data people
  As an API consumer
  I want to test the v2 data people endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @UAT-USER @get
  Scenario: v2 data people API call
    When I send a GET request to "/api/v2/data/projects"
    Then the response status code should be 200
    And the response should be valid
