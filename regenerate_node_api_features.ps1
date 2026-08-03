# PowerShell script to regenerate Node Public API Service feature files from Bruno collection

$brunoPath = "C:\Users\priya\Downloads\bruno_collection (3)\bruno_collection\Node Public API Service"
$featuresPath = "features\Node-Public-API-Service"

# Exclude environment and collection files
$excludeFiles = @("collection.bru", "PowerUser.bru", "Prod env.bru", "Test env.bru", "UAT env.bru")

# Get all .bru files
$bruFiles = Get-ChildItem -Path $brunoPath -Filter "*.bru" | Where-Object { $excludeFiles -notcontains $_.Name }

Write-Host "Found $($bruFiles.Count) .bru files to process"
Write-Host ""

foreach ($bruFile in $bruFiles) {
    $content = Get-Content $bruFile.FullName -Raw
    
    # Extract method and URL
    $method = "GET"
    $url = ""
    
    if ($content -match 'meta\s*\{[^}]*method:\s*(\w+)') {
        $method = $matches[1]
    }
    
    if ($content -match 'get\s*\{[^}]*url:\s*([^\r\n]+)') {
        $url = $matches[1].Trim()
    } elseif ($content -match 'post\s*\{[^}]*url:\s*([^\r\n]+)') {
        $url = $matches[1].Trim()
    } elseif ($content -match 'put\s*\{[^}]*url:\s*([^\r\n]+)') {
        $url = $matches[1].Trim()
    } elseif ($content -match 'patch\s*\{[^}]*url:\s*([^\r\n]+)') {
        $url = $matches[1].Trim()
    } elseif ($content -match 'delete\s*\{[^}]*url:\s*([^\r\n]+)') {
        $url = $matches[1].Trim()
    } elseif ($content -match 'options\s*\{[^}]*url:\s*([^\r\n]+)') {
        $url = $matches[1].Trim()
    }
    
    # Clean up filename for feature file
    $featureName = $bruFile.BaseName -replace '[^a-zA-Z0-9-]', '-' -replace '--+', '-' -replace '^-|-$', ''
    $featureName = $featureName.ToLower()
    $featureFile = Join-Path $featuresPath "$featureName.feature"
    
    # Create feature title from filename
    $featureTitle = $bruFile.BaseName
    
    # Determine tag based on method
    $tags = "@smoke @node-api"
    switch ($method.ToUpper()) {
        "GET" { $tags += " @get" }
        "POST" { $tags += " @post" }
        "PUT" { $tags += " @put" }
        "PATCH" { $tags += " @patch" }
        "DELETE" { $tags += " @delete" }
        "OPTIONS" { $tags += " @options" }
    }
    
    # Create feature content
    $featureContent = @"
Feature: $featureTitle
  As an API consumer
  I want to test the $featureTitle endpoint
  So that I can verify the API functionality

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  $tags
  Scenario: $featureTitle API call
    When I send a $method request to "$url"
    Then the response status code should be 200
    And the response should be valid
"@
    
    # Write feature file
    Set-Content -Path $featureFile -Value $featureContent -Encoding UTF8
    Write-Host "Created: $featureFile"
}

Write-Host ""
Write-Host "Feature file generation complete!"
Write-Host "Total files created: $($bruFiles.Count)"
