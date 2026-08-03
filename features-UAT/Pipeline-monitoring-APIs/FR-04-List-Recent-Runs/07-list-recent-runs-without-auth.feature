Feature: List Recent Runs without Authentication
  As an API consumer
  I want to verify authentication is required for listing recent runs

  Background:
    Given the API is available

  @pipeline @runs @list @negative @auth @prod @get
  Scenario: List recent runs without authentication expects 500 error
    When I send a GET request to "/api/v2/pipelines/69623b4825f0aea264fb192e/runs" without authentication
    Then the response status code should be 500
