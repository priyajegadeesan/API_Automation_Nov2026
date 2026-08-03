Feature: SCIM Users
  As a SCIM API consumer
  I want to list and filter SCIM users
  So that I can manage user provisioning

  Background:
    Given the API is available
    And I am authenticated with valid SCIM credentials

  @smoke @scim @users @list @uat @get
  Scenario: Get all SCIM users
    When I send a GET request to "/api/v2/scim/v2/users"
    Then the response status code should be 200
    And the response should contain SCIM ListResponse schema
    And the response should contain list of users
