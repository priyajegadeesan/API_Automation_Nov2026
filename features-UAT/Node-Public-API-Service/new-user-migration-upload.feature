@ignore
Feature: New USer migration upload
  As an API consumer
  I want to test the New USer migration upload endpoint
  So that I can verify the API functionality
  
  # Note: This test requires file upload functionality (multipart/form-data)
  # The endpoint expects POST with CSV file, but framework doesn't support file upload yet
  # Verified working in Bruno with POST + file upload

  Background:
    Given the API is available
    And I am authenticated with RBAC user token

  @UAT-USER @smoke @node-api @post @uat @file-upload
  Scenario: New USer migration upload API call
    # TODO: Implement file upload step
    # Should be: POST with multipart/form-data and CSV file
    When I send a GET request to "https://api.opsera-uat.opsera.io/api/v2/tasks/scmtoscm/csvupload?sourceGitToolId=66e31a857a14e200128b6e55&sourceScmType=gitlab&targetGitToolId=695e488f74c09ededae3b088&targetScmType=github&taskId=667e6fa52200f5001222ba3a&skipFailed=true"
    Then the response status code should be 200
    And the response should be a valid JSON
