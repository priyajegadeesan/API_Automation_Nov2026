Feature: Delete Param
  As an API consumer
  I want to test the Delete Param endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @delete @uat
  Scenario: Delete Param API call
    When I send a DELETE request to "/api/v2/parameters/67ab362671c8840012f20788"
    Then the response status code should be 200
