@prod @logs-v2 @get
Feature: Logs v2 Start and end date Range
  As an API user
  I want to retrieve audit logs within a specific date and time range
  So that I can analyze activities for a defined period

  Scenario: Successfully retrieve logs with start and end date range filters
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/logs/audit/user?start_date=2025-11-30&start_time=09:10:10&end_date=2025-12-31&end_time=11:15:10&type=code-scan,compliance-sec,container-scan,security-gate"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
