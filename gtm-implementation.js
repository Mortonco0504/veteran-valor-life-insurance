// Google Tag Manager Implementation
// Replace GTM-XXXXXXX with your actual Container ID

// GTM Head Code (add to <head> section)
const gtmHeadCode = `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
`;

// GTM Body Code (add immediately after <body> tag)
const gtmBodyCode = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
`;

// Updated tracking functions for GTM
function trackFormSubmission(formType = 'quote_request') {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'form_submit',
            'form_name': formType,
            'form_type': 'life_insurance',
            'user_type': 'veteran',
            'timestamp': new Date().toISOString()
        });
    }
}

function trackPhoneCall(phoneNumber = '1-800-VET-INSURANCE') {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'phone_call',
            'phone_number': phoneNumber,
            'call_type': 'quote_request',
            'user_type': 'veteran',
            'timestamp': new Date().toISOString()
        });
    }
}

function trackQuoteRequest(requestType = 'life_insurance') {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'quote_request',
            'request_type': requestType,
            'user_type': 'veteran',
            'timestamp': new Date().toISOString()
        });
    }
}

function trackPageView(pageName) {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'page_view',
            'page_name': pageName,
            'page_type': 'life_insurance',
            'timestamp': new Date().toISOString()
        });
    }
}

function trackButtonClick(buttonName, buttonType = 'cta') {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'button_click',
            'button_name': buttonName,
            'button_type': buttonType,
            'user_type': 'veteran',
            'timestamp': new Date().toISOString()
        });
    }
}

function trackScroll(depth) {
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'scroll_depth',
            'scroll_depth': depth,
            'page_name': window.location.pathname,
            'timestamp': new Date().toISOString()
        });
    }
}

// Enhanced form tracking
function setupFormTracking() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const formType = this.getAttribute('data-form-type') || 'quote_request';
            trackFormSubmission(formType);
        });
    });
}

// Enhanced phone call tracking
function setupPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            trackPhoneCall(phoneNumber);
        });
    });
}

// Enhanced button tracking
function setupButtonTracking() {
    const buttons = document.querySelectorAll('button, .btn, a[href="#quote"]');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonName = this.textContent.trim() || this.getAttribute('data-button-name') || 'unknown';
            const buttonType = this.getAttribute('data-button-type') || 'cta';
            trackButtonClick(buttonName, buttonType);
        });
    });
}

// Scroll depth tracking
function setupScrollTracking() {
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            trackScroll(scrollPercent);
        }
    });
}

// Initialize all tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupFormTracking();
    setupPhoneTracking();
    setupButtonTracking();
    setupScrollTracking();
    
    // Track initial page view
    trackPageView(window.location.pathname);
});

// Track page views on navigation
window.addEventListener('popstate', function() {
    trackPageView(window.location.pathname);
});

// Export functions for global use
window.trackFormSubmission = trackFormSubmission;
window.trackPhoneCall = trackPhoneCall;
window.trackQuoteRequest = trackQuoteRequest;
window.trackPageView = trackPageView;
window.trackButtonClick = trackButtonClick;
window.trackScroll = trackScroll; 