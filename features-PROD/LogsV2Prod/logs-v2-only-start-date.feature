@prod @logs-v2 @get
Feature: Logs v2 Only start date
  As an API user
  I want to retrieve audit logs from a specific start date
  So that I can view all activities since that date

  Scenario: Successfully retrieve logs with only start date filter
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/logs/audit/user?start_date=2026-01-01&user_email=qaadmin_uat@opsera.us"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
