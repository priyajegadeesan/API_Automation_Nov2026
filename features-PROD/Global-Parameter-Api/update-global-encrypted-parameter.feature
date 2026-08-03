Feature: Update Global encrypted Parameter
  As an API consumer
  I want to update an encrypted global parameter
  So that I can modify secure parameter values

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @parameters @update @encrypted @prod @post
  Scenario: Update encrypted parameter successfully
    When I send a POST request to "/api/v2/global-parameters/6985925e7e8e7a172ccda7ca/update" with body:
      """
      {
        "value": "updated-parameter-Prod"
      }
      """
    Then the response status code should be 200
    And the response should have property "data"
