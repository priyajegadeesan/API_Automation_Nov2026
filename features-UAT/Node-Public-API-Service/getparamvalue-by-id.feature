Feature: GetParamValue by ID
  As an API consumer
  I want to test the GetParamValue by ID endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @get @UAT-USER @uat
  Scenario: GetParamValue by ID API call
    When I send a GET request to "/api/v2/parameters/6a4fa8983647ef62547ec3a0/value"
    Then the response status code should be 200
    And the response should be valid
