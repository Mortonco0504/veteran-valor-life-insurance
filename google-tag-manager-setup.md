# 🔧 Google Tag Manager Setup Guide

## **Current Issue:**
Your website is using Google Ads conversion tracking instead of Google Tag Manager, which is why Google Tag Manager isn't being detected.

## **Solution: Implement Proper Google Tag Manager**

### **Step 1: Create Google Tag Manager Container**

1. **Go to Google Tag Manager**: https://tagmanager.google.com/
2. **Create a new account** (if you don't have one):
   - Account name: "Veteran Valor Life Insurance"
   - Container name: "Veteran Valor Website"
   - Target platform: "Web"
3. **Get your Container ID** (format: GTM-XXXXXXX)

### **Step 2: Update Website Code**

Replace the current Google Ads tracking with proper Google Tag Manager implementation:

#### **In the `<head>` section (before closing `</head>`):**

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

#### **In the `<body>` section (immediately after opening `<body>`):**

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### **Step 3: Set Up Tags in Google Tag Manager**

#### **1. Google Analytics 4 Tag:**
- **Tag Type**: Google Analytics: GA4 Configuration
- **Measurement ID**: G-XXXXXXXXXX (your GA4 property ID)
- **Trigger**: All Pages

#### **2. Google Ads Conversion Tracking:**
- **Tag Type**: Google Ads: Conversion Tracking
- **Conversion ID**: AW-11492282990
- **Conversion Label**: (your conversion labels)
- **Trigger**: Custom events (form submissions, phone calls, etc.)

#### **3. Form Submission Tracking:**
- **Tag Type**: Google Analytics: GA4 Event
- **Event Name**: form_submit
- **Parameters**: 
  - form_name: "quote_request"
  - form_type: "life_insurance"
- **Trigger**: Custom Event - "form_submit"

#### **4. Phone Call Tracking:**
- **Tag Type**: Google Analytics: GA4 Event
- **Event Name**: phone_call
- **Parameters**:
  - phone_number: "1-800-VET-INSURANCE"
  - call_type: "quote_request"
- **Trigger**: Custom Event - "phone_call"

### **Step 4: Set Up Triggers**

#### **1. Form Submission Trigger:**
- **Trigger Type**: Custom Event
- **Event Name**: form_submit
- **This trigger fires on**: All Custom Events

#### **2. Phone Call Trigger:**
- **Trigger Type**: Custom Event
- **Event Name**: phone_call
- **This trigger fires on**: All Custom Events

#### **3. Page View Trigger:**
- **Trigger Type**: Page View
- **This trigger fires on**: All Pages

### **Step 5: Update JavaScript Functions**

Replace the current tracking functions with GTM-compatible ones:

```javascript
// Track form submissions
function trackFormSubmission() {
    dataLayer.push({
        'event': 'form_submit',
        'form_name': 'quote_request',
        'form_type': 'life_insurance'
    });
}

// Track phone calls
function trackPhoneCall() {
    dataLayer.push({
        'event': 'phone_call',
        'phone_number': '1-800-VET-INSURANCE',
        'call_type': 'quote_request'
    });
}

// Track quote requests
function trackQuoteRequest() {
    dataLayer.push({
        'event': 'quote_request',
        'request_type': 'life_insurance',
        'user_type': 'veteran'
    });
}
```

### **Step 6: Test Implementation**

#### **1. Use Google Tag Manager Preview Mode:**
- Go to GTM dashboard
- Click "Preview" button
- Enter your website URL
- Test form submissions and phone calls

#### **2. Check Google Analytics:**
- Verify events are firing in Real-Time reports
- Check conversion tracking in Google Ads

#### **3. Validate with Google Tag Assistant:**
- Install Google Tag Assistant Legacy
- Test your website
- Verify all tags are firing correctly

## **Expected Results:**

### **After Implementation:**
- ✅ Google Tag Manager will be detected
- ✅ All conversion tracking will work properly
- ✅ Better control over tracking implementation
- ✅ Easier to add new tracking without code changes
- ✅ Better debugging capabilities

### **Benefits of Google Tag Manager:**
- **No-code changes**: Add new tracking without developer
- **Better debugging**: Preview mode for testing
- **Version control**: Track changes and rollback if needed
- **Faster deployment**: Changes publish immediately
- **Better organization**: All tracking in one place

## **Next Steps:**

1. **Create GTM container** and get Container ID
2. **Update website code** with proper GTM implementation
3. **Set up tags and triggers** in GTM dashboard
4. **Test implementation** using preview mode
5. **Publish changes** and monitor performance

Would you like me to help you implement these changes on your website once you have your GTM Container ID? 