Feature: New USer migration upload
  As an API consumer
  I want to test the New USer migration upload endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @get
  Scenario: New USer migration upload API call
    When I send a GET request to "https://api.opsera-test.opsera.io/api/v2/tasks/scmtoscm/csvupload?sourceGitToolId=6130e669b85633d739267470&sourceScmType=gitlab&targetGitToolId=66bed7663afe8800306101f7&targetScmType=github&taskId=6864f8accd68cd17e1b45615&skipFailed=true"
    Then the response status code should be 200
    And the response should be valid
