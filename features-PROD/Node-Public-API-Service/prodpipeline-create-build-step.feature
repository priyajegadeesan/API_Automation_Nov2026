Feature: ProdPipeline create build step
  As an API consumer
  I want to test the ProdPipeline create build step endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @node-api @post @uat
  Scenario: ProdPipeline create build step API call
    When I send a POST request to "/api/v1/pipeline/create" with body:
      """
      {
        "workflow": {
          "source": {
            "secondary_branches": [],
            "name": "",
            "service": "",
            "repository": "",
            "branch": "",
            "key": "",
            "trigger_active": false
          },
          "schedule": {
            "start_date": null,
            "end_date": null,
            "frequency": ""
          },
          "plan": [
            {
              "trigger": [],
              "type": ["build"],
              "notification": [],
              "name": "Docker Build",
              "description": "",
              "active": true,
              "tags": [{"type": "pipeline", "value": "API"}],
              "updatedAt": "",
              "orchestration_type": "standard",
              "tool": {
                "tool_identifier": "jenkins",
                "configuration": {
                  "jobType": "BUILD",
                  "toolConfigId": "650ca087dbaa4500111e1618",
                  "jenkinsUrl": "https://jenkins-jekbts21.prodqa-private.opsera.io",
                  "jenkinsPort": "",
                  "jUserId": "admin",
                  "jAuthToken": "",
                  "jobName": "Docker build",
                  "toolJobId": "650ee7ccb615ee0012dffae1",
                  "toolJobType": ["BUILD"],
                  "rollbackBranchName": "",
                  "stepIdXML": "",
                  "sfdcDestToolId": "",
                  "destAccountUsername": "",
                  "sfdcToolId": "",
                  "accountUsername": "",
                  "projectId": "Opsera-QA/spring-boot-hello-world-example-1",
                  "defaultBranch": "main",
                  "dockerName": "backend-app",
                  "useDockerDynamicName": false,
                  "dockerDynamicName": "",
                  "dockerTagName": "latest",
                  "buildType": "docker",
                  "gitToolId": "67ba051ee10837001219b82c",
                  "repoId": "Opsera-QA/spring-boot-hello-world-example-1",
                  "gitUrl": "https://github.com/Opsera-QA/spring-boot-hello-world-example-1",
                  "sshUrl": "git@github.com:Opsera-QA/spring-boot-hello-world-example-1.git",
                  "service": "github",
                  "gitCredential": "KeerthiGitHub",
                  "gitUserName": "keerthiga@opsera.io",
                  "repository": "spring-boot-hello-world-example-1",
                  "branch": "main",
                  "isOrgToOrg": false,
                  "isFullBackup": false,
                  "sfdcUnitTestType": "",
                  "workspace": "",
                  "agentLabels": "",
                  "isNewBranch": false,
                  "isManualRollBackBranch": false,
                  "hasUpstreamBranch": false,
                  "workspaceDeleteFlag": false,
                  "gitBranch": "main",
                  "customParameters": [],
                  "terraformStepId": "",
                  "useTerraformOutput": false,
                  "job_type": "opsera-job",
                  "dynamicTag": false,
                  "dockerTagType": [],
                  "dockerDynamicTagName": "",
                  "specifyCommitIdChar": false,
                  "commitIdCharDirection": "prefix",
                  "commitIdCharLimit": null,
                  "runtimeArguments": "",
                  "dependencies": {"java": "java-11", "maven": "maven-3.6.3"},
                  "dependencyType": [
                    {"name": "Java openJDK Version 11", "dependencyType": "java", "version": "11"},
                    {"name": "Maven Version 3.6.3", "dependencyType": "maven", "version": "3.6.3"}
                  ],
                  "ruleIds": [],
                  "useBuildStepResource": false,
                  "buildStepId": "",
                  "commands": "",
                  "environmentVariables": [],
                  "enableQuickDeploy": false,
                  "ignoreWarning": false,
                  "filePath": "",
                  "schemeName": "",
                  "projectWorkspace": "",
                  "configurationType": "",
                  "scriptType": "opsera",
                  "developerTeamId": "",
                  "autoScaleEnable": true,
                  "workspaceName": "",
                  "jobDescription": "",
                  "buildToolVersion": "6.3",
                  "gradleTask": "",
                  "mavenTask": "",
                  "buildTool": "docker",
                  "commandLineArgs": "",
                  "dockerSecrets": [],
                  "gitCommitId": ""
                },
                "threshold": {"type": "", "value": ""},
                "job_type": "opsera-job"
              }
            },
            {
              "trigger": [],
              "type": ["publish"],
              "notification": [],
              "name": "ECR Push",
              "description": "",
              "active": true,
              "dependencies": ["Docker Build"],
              "tags": [{"type": "pipeline", "value": "ecr-push_642e5edec66bc7007a5a9383"}],
              "orchestration_type": "standard",
              "tool": {
                "tool_identifier": "docker-push",
                "configuration": {
                  "type": "",
                  "jobType": "DOCKER PUSH",
                  "toolConfigId": "62c58ab3203fb90012ff98b4",
                  "toolName": "Aws Cred_DO NOT DELETE",
                  "jobName": "",
                  "toolJobId": "",
                  "buildType": "docker",
                  "awsToolConfigId": "62c58ab3203fb90012ff98b4",
                  "agentLabels": "generic-linux",
                  "autoScaleEnable": true,
                  "newRepo": false,
                  "ecrRepoName": "ecr-new-repo",
                  "dependencyType": "",
                  "buildStepId": "Docker Build",
                  "toolJobName": "Docker Push",
                  "gitToolId": "",
                  "gitUrl": "",
                  "sshUrl": "",
                  "gitCredential": "",
                  "repository": "",
                  "gitBranch": "",
                  "workspace": ""
                },
                "job_type": "docker push"
              }
            }
          ]
        },
        "tags": [],
        "type": [],
        "owner": "5f75953446564c10379902bb",
        "roles": [
          {
            "role": "admininstrator",
            "user": "keerthigathulasi@protonmail.com",
            "group": "",
            "site_role": ""
          }
        ],
        "organizationName": "protonmail.com",
        "account": "org109-acc",
        "name": "Creating pipeline via API-${timestamp}",
        "templateIdentifier": "",
        "description": "Create a new template from scratch.",
        "project": {
          "name": "",
          "project_id": ""
        },
        "active": true,
        "__v": 0,
        "owner_name": "Keerthiga Thulasiram"
      }
      """
    Then the response status code should be 200
    And the response should have property "status"
    And the response should have property "newPipelineId"
    And the response should have property "newPipeline"
