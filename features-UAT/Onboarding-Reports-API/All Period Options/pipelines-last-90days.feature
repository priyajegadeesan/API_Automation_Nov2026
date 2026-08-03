@uat @onboarding-reports @get
Feature: Pipelines - last_90days
  As an API user
  I want to retrieve pipelines - last_90days
  So that I can retrieve onboarding reports data

  Scenario: Pipelines - last_90days
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?period=last_90days&group_by=type"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
