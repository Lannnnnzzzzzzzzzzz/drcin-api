# DramaBox API - Cloudflare Workers Deployment Script (PowerShell)

Write-Host "🚀 DramaBox API - Cloudflare Workers Deployment" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

function Show-Menu {
    Write-Host ""
    Write-Host "Select deployment option:" -ForegroundColor Yellow
    Write-Host "1) Deploy to Development (workers.dev)"
    Write-Host "2) Deploy to Production"
    Write-Host "3) View deployment logs"
    Write-Host "4) Run local development server"
    Write-Host "5) Run tests"
    Write-Host "6) Update dependencies"
    Write-Host "7) Exit"
    Write-Host ""
}

while ($true) {
    Show-Menu
    $choice = Read-Host "Enter your choice (1-7)"
    
    switch ($choice) {
        1 {
            Write-Host "📦 Deploying to Development environment..." -ForegroundColor Green
            npm run deploy
            Write-Host "✅ Deployed! Check the output above for your deployment URL" -ForegroundColor Green
        }
        2 {
            Write-Host "🏭 Deploying to Production environment..." -ForegroundColor Green
            npm run deploy:production
            Write-Host "✅ Deployed to production!" -ForegroundColor Green
        }
        3 {
            Write-Host "📊 Viewing deployment logs..." -ForegroundColor Blue
            npm run tail
        }
        4 {
            Write-Host "💻 Starting local development server..." -ForegroundColor Blue
            Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
            npm run dev
        }
        5 {
            Write-Host "🧪 Running API tests..." -ForegroundColor Magenta
            node test-workers-api.js
        }
        6 {
            Write-Host "📦 Updating dependencies..." -ForegroundColor Blue
            npm install
            Write-Host "✅ Dependencies updated!" -ForegroundColor Green
        }
        7 {
            Write-Host "👋 Goodbye!" -ForegroundColor Cyan
            exit
        }
        default {
            Write-Host "❌ Invalid option. Please select 1-7." -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Read-Host "Press Enter to continue"
}
