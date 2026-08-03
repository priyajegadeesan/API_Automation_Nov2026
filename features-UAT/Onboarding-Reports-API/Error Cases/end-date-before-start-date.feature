@uat @onboarding-reports @get @error-case
Feature: End date before start date
  As an API user
  I want to test end date before start date
  So that I can verify error handling

  Scenario: End date before start date
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?start_date=2024-10-31&end_date=2024-10-01"
    Then the response status code should be 400
    And the response should be a valid JSON
