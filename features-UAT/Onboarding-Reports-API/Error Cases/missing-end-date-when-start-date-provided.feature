@uat @onboarding-reports @get @error-case
Feature: Missing end_date when start_date provided
  As an API user
  I want to test missing end_date when start_date provided
  So that I can verify error handling

  Scenario: Missing end_date when start_date provided
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?start_date=2024-10-01"
    Then the response status code should be 400
    And the response should be a valid JSON
