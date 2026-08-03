Feature: Create Dashboard
  As an API consumer
  I want to test the Create Dashboard endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: Create Dashboard API call
    When I send a GET request to "https://api.opsera-test.opsera.io/api/v2/insights/dashboards"
    Then the response status code should be 200
    And the response should be valid
