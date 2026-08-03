@uat @onboarding-reports @get
Feature: Last 60 days- grouped by week
  As an API user
  I want to retrieve last 60 days tasks grouped by week with data
  So that I can retrieve onboarding reports data

  Scenario: Last 60 days- grouped by week
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/tasks/created?period=last_60days&group_by=week&include_data=true"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
