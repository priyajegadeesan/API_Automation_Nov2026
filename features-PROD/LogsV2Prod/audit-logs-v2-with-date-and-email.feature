@prod @logs-v2 @get @admin
Feature: Audit Logs v2 with Date and Email
  As an API user with admin access
  I want to retrieve audit logs filtered by date and user email
  So that I can track user activities for a specific date

  Scenario: Successfully retrieve audit logs with date and email filters
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/logs/audit/user?start_date=2026-07-01&user_email=qauser_uat@opsera.us"
    Then the response status code should be 200
    And the response should be a valid JSON
