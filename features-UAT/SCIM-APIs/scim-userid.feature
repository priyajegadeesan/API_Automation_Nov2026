Feature: SCIM Get User By ID
  As a SCIM API consumer
  I want to retrieve a specific SCIM user by ID
  So that I can view user details

  Background:
    Given the API is available
    And I am authenticated with valid SCIM credentials

  @UAT-USER @smoke @scim @users @UAT-USER @get @UAT-USER @uat
  Scenario: Get SCIM user by ID
    When I send a GET request to "/api/v2/scim/v2/users/69aab692b086af128ca8e1ce"
    Then the response status code should be 200
    And the response should have property "schemas"
    And the response should have property "id"
    And the response should have property "userName"
