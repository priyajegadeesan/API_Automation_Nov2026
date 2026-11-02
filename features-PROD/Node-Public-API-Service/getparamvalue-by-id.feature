Feature: GetParamValue by ID
  As an API consumer
  I want to test the GetParamValue by ID endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: GetParamValue by ID API call
    When I send a GET request to "/api/v2/parameters/699eb94b44b730fb74c3a434/value"
    Then the response status code should be 200
    And the response should be valid
