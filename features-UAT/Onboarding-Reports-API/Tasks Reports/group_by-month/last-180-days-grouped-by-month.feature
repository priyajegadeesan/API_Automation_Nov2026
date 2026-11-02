@UAT-USER @uat @onboarding-reports @get
Feature: Last 180 days- grouped by month
  As an API user
  I want to retrieve last 180 days tasks grouped by month
  So that I can retrieve onboarding reports data

  Scenario: Last 180 days- grouped by month
    Given the API is available
    And I am authenticated with RBAC user token
    When I send a GET request to "/api/v2/reports/tasks/created?period=last_180days&group_by=month"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
