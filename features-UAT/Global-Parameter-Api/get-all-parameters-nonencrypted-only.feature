Feature: Get All Parameters (nonencrypted only)
  As an API consumer
  I want to retrieve only non-encrypted global parameters
  So that I can view non-secure parameters

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @parameters @get @nonencrypted @uat
  Scenario: Get all non-encrypted parameters successfully
    When I send a GET request to "/api/v2/global-parameters/?encrypted=false"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
