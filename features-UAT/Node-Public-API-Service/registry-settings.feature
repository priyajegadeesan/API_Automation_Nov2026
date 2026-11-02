Feature: Registry settings
  As an API consumer
  I want to test the Registry settings endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @node-api @post @uat
  Scenario: Registry settings API call
    When I send a POST request to "/api/v2/settings/registry/configurations" with body:
      """
      {
        "action": "update-configurations",
        "targetRegistries": ["638acb6fee50c300137d62ab"],
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
