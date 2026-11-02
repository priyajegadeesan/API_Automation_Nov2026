Feature: UpdateParam
  As an API consumer
  I want to test the UpdateParam endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @UAT-USER @smoke @UAT-USER @node-api @UAT-USER @get
  Scenario: UpdateParam API call
    When I send a GET request to "/api/v2/parameters/689dd1661e33298d318af550"
    Then the response status code should be 200
    And the response should be valid
