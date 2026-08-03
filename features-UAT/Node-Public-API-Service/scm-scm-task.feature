Feature: SCM-SCM Task
  As an API consumer
  I want to test the SCM-SCM Task endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @uat
  Scenario: SCM-SCM Task API call
    When I send a POST request to "/api/v2/tasks/scmtoscm/csvupload?sourceGitToolId=67a5de17fe54ef0012d01e2a&sourceScmType=github&targetGitToolId=67a5de17fe54ef0012d01e2a&targetScmType=github&taskId=691ff1e8a32952ffad891465&skipFailed=false" with CSV data:
      """
      sourceRepoName,targetOrgName,targetRepoName
      test123/github-integrator,opsera-scm-migration,github-integrator-2111-3
      """
    Then the response status code should be 200
    And the response should have property "requestCorrelationId"
    And the response should have property "status"
    And the response should have property "data"
