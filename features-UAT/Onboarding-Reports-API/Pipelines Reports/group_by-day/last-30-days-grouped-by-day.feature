@uat @onboarding-reports @get
Feature: Last 30 days- grouped by day
  As an API user
  I want to retrieve last 30 days pipelines grouped by day with data
  So that I can retrieve onboarding reports data

  Scenario: Last 30 days- grouped by day
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?period=last_30days&group_by=day&include_data=true"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
