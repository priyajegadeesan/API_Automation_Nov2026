Feature: Registry settings
  As an API consumer
  I want to test the Registry settings endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post
  Scenario: Registry settings API call
    When I send a POST request to "/api/v2/settings/registry/configurations" with body:
      """
      {
        "action": "update-configurations",
        "targetRegistries": ["680bc68c76cd900012b3c1e4"],
        "targetTools": ["jenkins"],
        "settings": {
          "url": "http://jenkins.example.com",
          "port": 8080,
          "userId": "admin-user"
        }
      }
      """
    Then the response status code should be 200
    And the response should be a valid JSON
    And the response should have property "status"
