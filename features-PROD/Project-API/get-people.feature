Feature: Get All People
  As an API consumer
  I want to retrieve all people from the system

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @people @get @prod
  Scenario: Retrieve all people successfully
    When I send a GET request to "/api/v2/data/people"
    Then the response status code should be 200
