Feature: GetParam by ID
  As an API consumer
  I want to test the GetParam by ID endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: GetParam by ID API call
    When I send a GET request to "/api/v2/parameters/67ab362671c8840012f20788"
    Then the response status code should be 200
    And the response should be valid
