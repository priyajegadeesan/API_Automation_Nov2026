@uat @logs-v2 @get @admin
Feature: Logs v2 Only Start Date
  As an API user with admin access
  I want to retrieve audit logs from a specific start date
  So that I can view all activities since that date

  Scenario: Successfully retrieve logs with only start date filter
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/logs/audit/user?start_date=2026-07-01"
    Then the response status code should be 200
    And the response should be a valid JSON
