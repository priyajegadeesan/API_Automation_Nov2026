@prod @onboarding-reports @get
Feature: Last year- grouped by month
  As an API user
  I want to get tasks report for last year grouped by month
  So that I can retrieve onboarding reports data

  Scenario: Last year- grouped by month
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/tasks/created?period=last_365days&group_by=month"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
