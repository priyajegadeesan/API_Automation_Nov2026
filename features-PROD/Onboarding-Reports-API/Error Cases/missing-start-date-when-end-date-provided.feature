@prod @onboarding-reports @get
Feature: Missing start_date when end_date provided
  As an API user
  I want to missing start_date when end_date provided
  So that I can retrieve onboarding reports data

  Scenario: Missing start_date when end_date provided
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/reports/pipelines/created?end_date=2025-12-15"
    Then the response status code should be 400
    And the response should be a valid JSON
