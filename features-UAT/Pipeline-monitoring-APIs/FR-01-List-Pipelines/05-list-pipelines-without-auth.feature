Feature: List Pipelines without Authentication
  As an API consumer
  I want to verify authentication is required for listing pipelines

  Background:
    Given the API is available

  @UAT-USER @pipeline @list @negative @UAT-USER @auth @UAT-USER @uat
  Scenario: List pipelines without authentication expects error
    When I send a GET request to "/api/v2/pipelines" without authentication
    Then the response status code should be 500
