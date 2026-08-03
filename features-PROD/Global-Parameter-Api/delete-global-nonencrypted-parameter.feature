Feature: Delete Global nonencrypted Parameter
  As an API consumer
  I want to delete a non-encrypted global parameter
  So that I can remove unused parameters

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @parameters @delete @nonencrypted @uat
  Scenario: Delete non-encrypted parameter successfully
    When I send a DELETE request to "/api/v2/global-parameters/6980401698ef6ff3e44d222c"
    Then the response status code should be 200
    And the response should have property "message"
