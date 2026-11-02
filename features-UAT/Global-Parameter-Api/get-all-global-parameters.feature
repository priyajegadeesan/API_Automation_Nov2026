Feature: Get All Global Parameters
  As an API consumer
  I want to retrieve all global parameters
  So that I can view all system parameters

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @parameters @UAT-USER @get @UAT-USER @uat
  Scenario: Get all global parameters successfully
    When I send a GET request to "/api/v2/global-parameters/"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"
