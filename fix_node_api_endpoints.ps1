# PowerShell script to fix endpoints in Node Public API Service feature files

$featuresPath = "features\Node-Public-API-Service"

# Get all feature files
$featureFiles = Get-ChildItem -Path $featuresPath -Filter "*.feature"

foreach ($featureFile in $featureFiles) {
    $content = Get-Content $featureFile.FullName -Raw
    
    # Replace {{host}} with /api
    $content = $content -replace '\{\{host\}\}', '/api'
    
    # Write back
    Set-Content -Path $featureFile.FullName -Value $content -Encoding UTF8 -NoNewline
}

Write-Host "Fixed endpoints in $($featureFiles.Count) feature files"
