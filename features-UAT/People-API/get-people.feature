Feature: Get People
  As an API consumer
  I want to retrieve people records
  So that I can view all people in the system

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @people @get @prod
  Scenario: Get all people successfully
    When I send a GET request to "/api/v2/data/people"
    Then the response status code should be 200
    And the response should have property "count"
    And the response should have property "data"