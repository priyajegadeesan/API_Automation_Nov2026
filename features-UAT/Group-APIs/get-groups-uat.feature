Feature: Get Groups UAT
  As an API consumer
  I want to retrieve groups in UAT environment
  So that I can view group information

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @groups @UAT-USER @get @UAT-USER @uat
  Scenario: Get all groups successfully
    When I send a GET request to "/api/v2/usermanagement/groups"
    Then the response status code should be 200
    And the response should contain a list of groups