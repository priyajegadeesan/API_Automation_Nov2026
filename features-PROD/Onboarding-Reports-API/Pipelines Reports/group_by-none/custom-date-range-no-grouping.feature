@prod @onboarding-reports @get
Feature: Custom date range- no grouping
  As an API user
  I want to get pipelines report for custom date range with no grouping
  So that I can retrieve onboarding reports data

  Scenario: Custom date range- no grouping
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?start_date=2024-10-01&end_date=2024-10-31&group_by=none"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
