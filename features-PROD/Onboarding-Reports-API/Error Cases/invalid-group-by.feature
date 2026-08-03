@prod @onboarding-reports @get
Feature: Invalid group_by
  As an API user
  I want to invalid group_by
  So that I can retrieve onboarding reports data

  Scenario: Invalid group_by
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?group_by=year"
    Then the response status code should be 400
    And the response should be a valid JSON
