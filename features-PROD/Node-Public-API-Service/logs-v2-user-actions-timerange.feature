Feature: Logs_v2_User Actions_TimeRange
  As an API consumer
  I want to test the Logs_v2_User Actions_TimeRange endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: Logs_v2_User Actions_TimeRange API call
    When I send a GET request to "/api/v2/logs/audit/user/?start_date=2025-10-01"
    Then the response status code should be 200
    And the response should be valid
