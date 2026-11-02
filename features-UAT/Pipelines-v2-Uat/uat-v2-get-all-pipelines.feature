Feature: Prod v2 Get All Pipelines
  As an API consumer
  I want to retrieve all pipelines using v2 API in PROD environment

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @pipeline @UAT-USER @get @UAT-USER @prod
  Scenario: Retrieve all pipelines in production
    When I send a GET request to "/api/v2/pipelines"
    Then the response status code should be 200
