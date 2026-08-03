@prod @logs-v2 @get
Feature: Logs v2 hour Range
  As an API user
  I want to retrieve audit logs for a specific hour range and job type
  So that I can view recent activities within the last hour

  Scenario: Successfully retrieve logs with 1 hour range filter
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/logs/audit/user?range=1h&jobType=CODE SCAN"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
