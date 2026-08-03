@uat @logs-v2 @get
Feature: Audit Logs v2 with Date and email
  As an API user
  I want to retrieve audit logs filtered by date and user email
  So that I can track user activities for a specific date

  Scenario: Successfully retrieve audit logs with date and email filters
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/v2/logs/audit/user/?date=<2026-02-20>&user_email=priyadarsini.p@opsera.us"
    Then the response status code should be 200
    And the response should be a valid JSON
