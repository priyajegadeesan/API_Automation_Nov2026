@prod @onboarding-reports @get
Feature: Current month- grouped by day
  As an API user
  I want to get pipelines report for current month grouped by day
  So that I can retrieve onboarding reports data

  Scenario: Current month- grouped by day
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?period=current_month&group_by=day"
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "data"
