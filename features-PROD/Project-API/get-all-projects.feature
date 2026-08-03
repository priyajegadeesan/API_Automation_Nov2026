Feature: Get All Projects
  As an API consumer
  I want to retrieve all projects from the system

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @project @get @prod
  Scenario: Retrieve all projects successfully
    When I send a GET request to "/api/v2/data/projects"
    Then the response status code should be 200
