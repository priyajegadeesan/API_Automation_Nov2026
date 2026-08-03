Feature: Get a Specific Person
  As an API consumer
  I want to retrieve a specific person by their email

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @people @get @prod
  Scenario: Get a specific person by email
    When I send a GET request to "/api/v2/data/people/{email}"
    Then the response status code should be 200
