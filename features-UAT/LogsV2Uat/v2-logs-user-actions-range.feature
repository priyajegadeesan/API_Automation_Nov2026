@prod @logs-v2 @get
Feature: v2 Logs User Actions Range
  As an API user
  I want to retrieve user action logs from a start date filtered by type
  So that I can track authentication activities

  Scenario: Successfully retrieve user action logs with start date and type filter
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/logs/audit/user?start_date=2026-01-01&type=authentication"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
