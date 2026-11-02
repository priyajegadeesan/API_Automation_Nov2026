@prod @logs-v2 @get @admin
Feature: Logs v2 Start and End Date Range
  As an API user with admin access
  I want to retrieve audit logs within a specific date range
  So that I can analyze activities for a defined period

  Scenario: Successfully retrieve logs with start and end date range filters
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/logs/audit/user?start_date=2026-07-01&end_date=2026-07-02"
    Then the response status code should be 200
    And the response should be a valid JSON
