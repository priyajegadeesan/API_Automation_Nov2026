@prod @onboarding-reports @get
Feature: Last 30 days- no grouping
  As an API user
  I want to get pipelines report for last 30 days with no grouping
  So that I can retrieve onboarding reports data

  Scenario: Last 30 days- no grouping
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?period=last_30days&group_by=none"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
