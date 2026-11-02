@UAT-USER @uat @onboarding-reports @get
Feature: Custom date range- grouped by month
  As an API user
  I want to retrieve custom date range pipelines grouped by month
  So that I can retrieve onboarding reports data

  Scenario: Custom date range- grouped by month
    Given the API is available
    And I am authenticated with RBAC user token
    When I send a GET request to "/api/v2/reports/pipelines/created?start_date=2024-01-01&end_date=2024-12-31&group_by=month"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
