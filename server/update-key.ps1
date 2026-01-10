# Script to update OpenAI API Key
Write-Host "=== Update OpenAI API Key ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to: https://platform.openai.com/account/api-keys" -ForegroundColor Yellow
Write-Host "2. Create a NEW API key (or copy an existing one)" -ForegroundColor Yellow
Write-Host "3. Paste it below (it will be hidden)" -ForegroundColor Yellow
Write-Host ""

$newKey = Read-Host "Enter your OpenAI API key" -AsSecureString
$keyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($newKey))

if ($keyPlain -and $keyPlain.Length -gt 50) {
    $envContent = @"
OPENAI_API_KEY=$keyPlain
PORT=3001
"@
    $envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
    Write-Host ""
    Write-Host "✅ API key updated!" -ForegroundColor Green
    Write-Host "Key length: $($keyPlain.Length) characters" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Now restart the server with: npm start" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Invalid key! Key must be at least 50 characters." -ForegroundColor Red
}
