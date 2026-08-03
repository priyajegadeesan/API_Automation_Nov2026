Feature: Get A Specific Person
  As an API consumer
  I want to retrieve a specific person by ID
  So that I can view detailed person information

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @people @get @prod
  Scenario: Get person by email successfully
    When I send a GET request to "/api/v2/data/people/Testingpeoplecreate@protomail.com"
    Then the response status code should be 200