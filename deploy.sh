#!/bin/bash

# DramaBox API - Cloudflare Workers Deployment Script

echo "🚀 DramaBox API - Cloudflare Workers Deployment"
echo "================================================"

# Function to show menu
show_menu() {
    echo ""
    echo "Select deployment option:"
    echo "1) Deploy to Development (workers.dev)"
    echo "2) Deploy to Production"
    echo "3) View deployment logs"
    echo "4) Run local development server"
    echo "5) Run tests"
    echo "6) Exit"
    echo ""
}

# Main loop
while true; do
    show_menu
    read -p "Enter your choice (1-6): " choice
    
    case $choice in
        1)
            echo "📦 Deploying to Development environment..."
            npm run deploy
            echo "✅ Deployed to: https://dramabox-api.<your-subdomain>.workers.dev"
            ;;
        2)
            echo "🏭 Deploying to Production environment..."
            npm run deploy:production
            echo "✅ Deployed to production!"
            ;;
        3)
            echo "📊 Viewing deployment logs..."
            npm run tail
            ;;
        4)
            echo "💻 Starting local development server..."
            npm run dev
            ;;
        5)
            echo "🧪 Running API tests..."
            node test-workers-api.js
            ;;
        6)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please select 1-6."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done
