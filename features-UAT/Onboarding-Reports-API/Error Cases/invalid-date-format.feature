@uat @onboarding-reports @get @error-case
Feature: Invalid date format
  As an API user
  I want to test invalid date format
  So that I can verify error handling

  Scenario: Invalid date format
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?start_date=2024/10/01&end_date=2024-10-31"
    Then the response status code should be 400
    And the response should be a valid JSON
