#!/bin/bash

# 🔒 Veteran Valor Life Insurance - Security Setup Script
# This script helps secure your website with HTTPS and security headers

echo "🔒 Setting up security for Veteran Valor Life Insurance website..."

# Check if running on supported system
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "✅ Linux system detected"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "✅ macOS system detected"
else
    echo "⚠️  This script is optimized for Linux/macOS"
fi

# Create security files
echo "📁 Creating security configuration files..."

# Create .htaccess if it doesn't exist
if [ ! -f ".htaccess" ]; then
    echo "Creating .htaccess file..."
    cat > .htaccess << 'EOF'
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security Headers
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"

# Prevent access to sensitive files
<Files ".htaccess">
    Order allow,deny
    Deny from all
</Files>

<Files "*.log">
    Order allow,deny
    Deny from all
</Files>

# Prevent directory browsing
Options -Indexes
EOF
    echo "✅ .htaccess file created"
else
    echo "✅ .htaccess file already exists"
fi

# Create robots.txt for security
if [ ! -f "robots.txt" ]; then
    echo "Creating robots.txt file..."
    cat > robots.txt << 'EOF'
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /.htaccess
Disallow: /logs/
Disallow: /backup/

Sitemap: https://veteranvalorlifeinsurance.com/sitemap.xml
EOF
    echo "✅ robots.txt file created"
else
    echo "✅ robots.txt file already exists"
fi

# Create security.txt file
if [ ! -f ".well-known/security.txt" ]; then
    echo "Creating security.txt file..."
    mkdir -p .well-known
    cat > .well-known/security.txt << 'EOF'
Contact: mailto:security@veteranvalorlifeinsurance.com
Expires: 2025-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: https://veteranvalorlifeinsurance.com/.well-known/security.txt
Policy: https://veteranvalorlifeinsurance.com/security-policy
EOF
    echo "✅ security.txt file created"
else
    echo "✅ security.txt file already exists"
fi

# Update HTML files with security headers
echo "🔧 Updating HTML files with security headers..."

# Function to add security headers to HTML files
add_security_headers() {
    local file="$1"
    if [ -f "$file" ]; then
        # Check if security headers already exist
        if ! grep -q "Content-Security-Policy" "$file"; then
            # Add security headers after charset
            sed -i.bak 's/<meta charset="UTF-8">/<meta charset="UTF-8">\n    \n    <!-- Security Headers -->\n    <meta http-equiv="Content-Security-Policy" content="default-src '\''self'\'' https: data: '\''unsafe-inline'\'' '\''unsafe-eval'\''; img-src '\''self'\'' https: data:; font-src '\''self'\'' https: data:;">\n    <meta http-equiv="X-Content-Type-Options" content="nosniff">\n    <meta http-equiv="X-Frame-Options" content="DENY">\n    <meta http-equiv="X-XSS-Protection" content="1; mode=block">\n    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">\n    <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">/' "$file"
            echo "✅ Updated $file with security headers"
        else
            echo "✅ $file already has security headers"
        fi
    fi
}

# Update all HTML files
for file in *.html; do
    if [ -f "$file" ]; then
        add_security_headers "$file"
    fi
done

# SSL Certificate Setup Instructions
echo ""
echo "🔐 SSL Certificate Setup Instructions:"
echo "======================================"
echo ""
echo "1. **Cloudflare (Recommended - Free):**"
echo "   - Go to https://cloudflare.com"
echo "   - Sign up and add your domain: veteranvalorlifeinsurance.com"
echo "   - Update your nameservers to Cloudflare"
echo "   - Enable 'Always Use HTTPS' in SSL/TLS settings"
echo "   - Enable 'HSTS' for additional security"
echo ""
echo "2. **Your Hosting Provider:**"
echo "   - Log into your hosting control panel (cPanel, etc.)"
echo "   - Look for 'SSL Certificates' or 'Security'"
echo "   - Enable SSL for your domain"
echo "   - Force HTTPS redirect"
echo ""
echo "3. **Let's Encrypt (Free):**"
echo "   - Install Certbot: sudo apt-get install certbot"
echo "   - Get certificate: sudo certbot --nginx -d veteranvalorlifeinsurance.com"
echo "   - Set up auto-renewal"
echo ""

# Security Testing Instructions
echo "🧪 Security Testing:"
echo "==================="
echo ""
echo "After implementing SSL, test your security:"
echo ""
echo "1. **SSL Labs Test:** https://www.ssllabs.com/ssltest/"
echo "2. **Security Headers:** https://securityheaders.com/"
echo "3. **Mozilla Observatory:** https://observatory.mozilla.org/"
echo "4. **Google Lighthouse:** Built into Chrome DevTools"
echo ""

# File permissions
echo "🔐 Setting secure file permissions..."
chmod 644 *.html
chmod 644 *.css
chmod 644 *.js
chmod 644 *.png
chmod 644 *.jpg
chmod 644 *.jpeg
chmod 644 *.webp
chmod 600 .htaccess
chmod 644 robots.txt
chmod 644 .well-known/security.txt

echo "✅ File permissions set securely"

# Final checklist
echo ""
echo "✅ Security Setup Complete!"
echo "=========================="
echo ""
echo "📋 Next Steps:"
echo "1. ✅ Security headers added to HTML files"
echo "2. ✅ .htaccess file created with security rules"
echo "3. ✅ robots.txt file created"
echo "4. ✅ security.txt file created"
echo "5. ✅ File permissions set securely"
echo ""
echo "🔐 Still Need to Do:"
echo "1. 🔒 Enable SSL certificate (see instructions above)"
echo "2. 🔒 Test security with tools listed above"
echo "3. 🔒 Monitor for security issues regularly"
echo "4. 🔒 Keep software updated"
echo "5. 🔒 Backup regularly"
echo ""
echo "🎯 Your website will show 'Secure' instead of 'Not Secure' once SSL is implemented!"
echo ""
echo "📞 Need help? Contact your hosting provider or use Cloudflare for free SSL." 