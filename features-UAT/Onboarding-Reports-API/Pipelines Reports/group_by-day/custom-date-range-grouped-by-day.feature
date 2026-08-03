@uat @onboarding-reports @get
Feature: Custom date range- grouped by day
  As an API user
  I want to retrieve custom date range pipelines grouped by day
  So that I can retrieve onboarding reports data

  Scenario: Custom date range- grouped by day
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?start_date=2026-03-04&end_date=2026-03-05&group_by=day"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
