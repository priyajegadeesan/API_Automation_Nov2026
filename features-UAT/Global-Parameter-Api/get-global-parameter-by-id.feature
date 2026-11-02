Feature: Get Global Parameter By ID
  As an API consumer
  I want to retrieve a specific global parameter by ID
  So that I can view parameter details

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @parameters @get @UAT-USER @id @UAT-USER @prod
  Scenario: Get parameter by ID successfully
    When I send a GET request to "/api/v2/global-parameters/692f09ba3819720ffa8571ae"
    Then the response status code should be 200
    And the response should have property "data"
