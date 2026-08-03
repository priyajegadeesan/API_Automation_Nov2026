@prod @onboarding-reports @get
Feature: Invalid period
  As an API user
  I want to invalid period
  So that I can retrieve onboarding reports data

  Scenario: Invalid period
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?period=last_45days"
    Then the response status code should be 400
    And the response should be a valid JSON
