# 🔒 Website Security Guide - Veteran Valor Life Insurance

## 🚨 Current Issue: "Not Secure" Warning

Your website is currently showing "Not Secure" because it's not using HTTPS. Here's how to fix this and implement comprehensive security measures.

## ✅ **Immediate Steps to Secure Your Website**

### 1. **Enable HTTPS/SSL Certificate**

#### **Option A: Free SSL with Let's Encrypt**
```bash
# Install Certbot (Let's Encrypt client)
sudo apt-get update
sudo apt-get install certbot

# Get SSL certificate for your domain
sudo certbot --nginx -d veteranvalorlifeinsurance.com

# Auto-renewal setup
sudo crontab -e
# Add this line: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### **Option B: Hosting Provider SSL**
- **GoDaddy**: Enable SSL in cPanel
- **Bluehost**: Enable SSL in hosting dashboard
- **HostGator**: Enable SSL in cPanel
- **SiteGround**: SSL is usually included

#### **Option C: Cloudflare (Recommended)**
1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Add your domain: `veteranvalorlifeinsurance.com`
3. Update nameservers to Cloudflare
4. Enable "Always Use HTTPS" in SSL/TLS settings
5. Enable "HSTS" for additional security

### 2. **Update Your Website Files**

#### **Add Security Headers to HTML**
Add these meta tags to the `<head>` section of all HTML files:

```html
<!-- Security Headers -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">
```

#### **Update All URLs to HTTPS**
Replace all `http://` with `https://` in your HTML files:

```html
<!-- Update these URLs -->
<link rel="canonical" href="https://veteranvalorlifeinsurance.com">
<meta property="og:url" content="https://veteranvalorlifeinsurance.com">
<meta property="og:image" content="https://veteranvalorlifeinsurance.com/logo-optimized.png">
```

### 3. **Server Security Configuration**

#### **Apache (.htaccess)**
Create or update your `.htaccess` file:

```apache
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
```

#### **Nginx Configuration**
Add to your nginx.conf or site configuration:

```nginx
# Force HTTPS
server {
    listen 80;
    server_name veteranvalorlifeinsurance.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name veteranvalorlifeinsurance.com;
    
    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
}
```

### 4. **Content Security Policy (CSP)**

#### **Create CSP Configuration**
Add this to your HTML files:

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';
    script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-inline' 'unsafe-eval';
    style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com 'unsafe-inline';
    font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:;
    img-src 'self' https: data:;
    connect-src 'self' https://www.google-analytics.com;
    frame-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
">
```

### 5. **Form Security**

#### **Add CSRF Protection**
Add to your forms:

```html
<input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">
```

#### **Implement Server-Side Validation**
```php
<?php
// Example PHP validation
function validateForm($data) {
    $errors = [];
    
    // Sanitize inputs
    $data = array_map('htmlspecialchars', $data);
    
    // Validate email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email address';
    }
    
    // Validate phone
    if (!preg_match('/^[\d\s\-\+\(\)]+$/', $data['phone'])) {
        $errors[] = 'Invalid phone number';
    }
    
    return $errors;
}
?>
```

### 6. **File Security**

#### **Protect Sensitive Files**
Create `.htaccess` in your root directory:

```apache
# Protect configuration files
<Files "*.env">
    Order allow,deny
    Deny from all
</Files>

<Files "*.log">
    Order allow,deny
    Deny from all
</Files>

# Prevent directory browsing
Options -Indexes

# Protect against common attacks
RewriteEngine On
RewriteCond %{QUERY_STRING} (\<|%3C).*script.*(\>|%3E) [NC,OR]
RewriteCond %{QUERY_STRING} GLOBALS(=|\[|\%[0-9A-Z]{0,2}) [OR]
RewriteCond %{QUERY_STRING} _REQUEST(=|\[|\%[0-9A-Z]{0,2}) [OR]
RewriteCond %{QUERY_STRING} proc/self/environ [OR]
RewriteCond %{QUERY_STRING} mosConfig [OR]
RewriteCond %{QUERY_STRING} base64_(en|de)code[^(]*\([^)]*\) [OR]
RewriteCond %{QUERY_STRING} (<|%3C)([^s]*s)+cript.*(>|%3E) [NC,OR]
RewriteCond %{QUERY_STRING} (\<|%3C).*iframe.*(\>|%3E) [NC]
RewriteRule .* - [F]
```

### 7. **Database Security (if applicable)**

#### **Use Prepared Statements**
```php
<?php
// Use prepared statements to prevent SQL injection
$stmt = $pdo->prepare("INSERT INTO leads (name, email, phone) VALUES (?, ?, ?)");
$stmt->execute([$name, $email, $phone]);
?>
```

### 8. **Monitoring and Maintenance**

#### **Set Up Security Monitoring**
1. **Google Search Console**: Monitor for security issues
2. **SSL Labs**: Test SSL configuration
3. **Security Headers**: Check security headers
4. **Regular Backups**: Backup your website regularly

#### **Security Checklist**
- [ ] SSL certificate installed and working
- [ ] All URLs updated to HTTPS
- [ ] Security headers implemented
- [ ] Forms have CSRF protection
- [ ] Input validation implemented
- [ ] Sensitive files protected
- [ ] Regular security updates
- [ ] Monitoring tools installed

### 9. **Testing Your Security**

#### **Security Testing Tools**
1. **SSL Labs**: https://www.ssllabs.com/ssltest/
2. **Security Headers**: https://securityheaders.com/
3. **Mozilla Observatory**: https://observatory.mozilla.org/
4. **Google Lighthouse**: Built into Chrome DevTools

### 10. **Quick Fix for Immediate Security**

#### **If you can't implement SSL immediately:**
1. **Use Cloudflare** (free SSL)
2. **Contact your hosting provider** for SSL setup
3. **Use a CDN** with SSL included

## 🎯 **Priority Actions**

### **High Priority (Do First):**
1. ✅ Enable HTTPS/SSL certificate
2. ✅ Update all URLs to HTTPS
3. ✅ Add security headers
4. ✅ Implement form validation

### **Medium Priority:**
1. ✅ Set up monitoring
2. ✅ Regular security audits
3. ✅ Backup procedures

### **Low Priority:**
1. ✅ Advanced security features
2. ✅ Performance optimizations

## 📞 **Need Help?**

### **Hosting Provider Support:**
- **GoDaddy**: 1-866-938-1119
- **Bluehost**: 1-888-401-4678
- **HostGator**: 1-866-96-GATOR
- **SiteGround**: Available in hosting dashboard

### **SSL Certificate Providers:**
- **Let's Encrypt**: Free SSL certificates
- **Cloudflare**: Free SSL with CDN
- **Your hosting provider**: Usually included

## 🔒 **After Implementation**

Once you've implemented these security measures:

1. **Test your website** with security tools
2. **Monitor for issues** regularly
3. **Keep software updated**
4. **Backup regularly**
5. **Train your team** on security best practices

Your website will show a green padlock and "Secure" instead of "Not Secure" once HTTPS is properly implemented! 