@UAT-USER @uat @onboarding-reports @get
Feature: Pipelines - current_month
  As an API user
  I want to retrieve pipelines - current_month
  So that I can retrieve onboarding reports data

  Scenario: Pipelines - current_month
    Given the API is available
    And I am authenticated with RBAC user token
    When I send a GET request to "/api/v2/reports/pipelines/created?period=current_month&group_by=type"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
