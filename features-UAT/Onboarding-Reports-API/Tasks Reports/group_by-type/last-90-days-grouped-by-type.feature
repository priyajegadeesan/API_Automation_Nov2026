@uat @onboarding-reports @get
Feature: Last 90 days- grouped by type
  As an API user
  I want to retrieve last 90 days tasks grouped by type
  So that I can retrieve onboarding reports data

  Scenario: Last 90 days- grouped by type
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/tasks/created?period=last_90days&group_by=type"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
