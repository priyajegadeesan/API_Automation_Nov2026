Feature: SCIM Get Group
  As a SCIM API consumer
  I want to retrieve SCIM groups
  So that I can view group information

  Background:
    Given the API is available
    And I am authenticated with valid SCIM credentials

  @smoke @scim @groups @get @uat
  Scenario: Get SCIM group by ID
    When I send a GET request to "/api/v2/scim/v2/groups/6a18721a4557a4c76f9452ce"
    Then the response status code should be 200
    And the response should have property "schemas"
    And the response should have property "id"
    And the response should have property "displayName"
