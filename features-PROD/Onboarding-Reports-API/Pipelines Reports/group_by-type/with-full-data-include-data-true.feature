@prod @onboarding-reports @get
Feature: With full data -include_data-true-
  As an API user
  I want to get pipelines report with full data
  So that I can retrieve onboarding reports data

  Scenario: With full data -include_data-true-
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?period=last_30days&group_by=type&include_data=true"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
