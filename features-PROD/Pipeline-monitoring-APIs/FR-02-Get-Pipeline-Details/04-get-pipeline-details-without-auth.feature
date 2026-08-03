Feature: Get Pipeline Details without Authentication
  As an API consumer
  I want to verify authentication is required for getting pipeline details

  Background:
    Given the API is available

  @pipeline @details @negative @auth @prod @get
  Scenario: Get pipeline details without authentication expects error
    When I send a GET request to "/api/v2/pipelines/62faf0762b38950044d5dd64" without authentication
    Then the response status code should be 500
