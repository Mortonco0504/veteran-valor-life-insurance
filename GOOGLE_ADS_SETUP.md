# Google Ads Conversion Tracking Setup Guide

## 🎯 Overview
This guide will help you set up Google Ads conversion tracking on your Veteran Valor Life Insurance website to track important user actions like form submissions and phone calls.

## 📋 Prerequisites
- Google Ads account
- Access to your Google Ads conversion tracking settings
- Your website domain: `veteranvalorlifeinsurance.com`

## 🔧 Step-by-Step Setup

### Step 1: Create Conversion Actions in Google Ads

1. **Log into Google Ads**
   - Go to https://ads.google.com
   - Sign in with your account

2. **Navigate to Conversion Actions**
   - Click on "Tools & Settings" (wrench icon)
   - Go to "Conversions" under "Measurement"

3. **Create Conversion Actions**
   Create the following conversion actions:

   **A. Form Submission Conversion**
   - Name: "Veteran Life Insurance Quote Form"
   - Category: "Submit lead form"
   - Value: "Use different values for each conversion"
   - Count: "One"
   - Click-through conversion window: "30 days"
   - View-through conversion window: "1 day"

   **B. Phone Call Conversion**
   - Name: "Veteran Life Insurance Phone Call"
   - Category: "Phone calls"
   - Value: "Use different values for each conversion"
   - Count: "One"
   - Click-through conversion window: "30 days"
   - View-through conversion window: "1 day"

   **C. Quote Request Conversion**
   - Name: "Veteran Life Insurance Quote Request"
   - Category: "Submit lead form"
   - Value: "Use different values for each conversion"
   - Count: "One"
   - Click-through conversion window: "30 days"
   - View-through conversion window: "1 day"

   **D. Appointment Booking Conversion**
   - Name: "Veteran Life Insurance Appointment"
   - Category: "Submit lead form"
   - Value: "Use different values for each conversion"
   - Count: "One"
   - Click-through conversion window: "30 days"
   - View-through conversion window: "1 day"

### Step 2: Get Your Conversion Tracking Code

1. **For each conversion action:**
   - Click on the conversion action name
   - Go to "Tag setup"
   - Choose "Use Google tag"
   - Copy the conversion ID and conversion label

2. **Record your tracking codes:**
   ```
   Conversion ID: [YOUR_CONVERSION_ID]
   
   Conversion Labels:
   - Form Submission: [FORM_SUBMISSION_LABEL]
   - Phone Call: [PHONE_CALL_LABEL]
   - Quote Request: [QUOTE_REQUEST_LABEL]
   - Appointment Booking: [APPOINTMENT_LABEL]
   ```

### Step 3: Update Your Website Code

1. **Replace the placeholder values in your HTML files:**
   - Open `index.html`, `mobile-index.html`, and `desktop-index.html`
   - Find the Google Ads tracking code section
   - Replace `AW-CONVERSION_ID` with your actual conversion ID
   - Replace the placeholder labels with your actual conversion labels

2. **Example of updated code:**
   ```javascript
   // Replace this:
   gtag('config', 'AW-CONVERSION_ID');
   
   // With this:
   gtag('config', 'AW-123456789');
   
   // And replace the function calls:
   function trackFormSubmission() {
       trackGoogleAdsConversion('123456789', 'ABC123DEF456', 1);
   }
   ```

### Step 4: Test Your Conversion Tracking

1. **Test Form Submissions:**
   - Fill out and submit the quote form
   - Check Google Ads conversion tracking in real-time
   - Verify the conversion appears in your Google Ads account

2. **Test Phone Calls:**
   - Click on phone number links
   - Verify phone call conversions are tracked

3. **Test Appointment Bookings:**
   - Click on appointment booking links
   - Verify appointment conversions are tracked

## 📊 Conversion Tracking Features

### ✅ What's Being Tracked:

1. **Form Submissions**
   - Quote form completions
   - Lead generation
   - Contact form submissions

2. **Phone Calls**
   - Header phone number clicks
   - Footer phone number clicks
   - Mobile phone number clicks

3. **Quote Requests**
   - "Get Free Quote" button clicks
   - "See If I Qualify" button clicks

4. **Appointment Bookings**
   - Calendar appointment links
   - Consultation booking clicks

### 🔍 Tracking Implementation:

- **Google Tag Manager** integration
- **Conversion value tracking** (configurable)
- **Cross-device tracking** (desktop and mobile)
- **Real-time conversion reporting**
- **Attribution modeling** support

## 🎯 Conversion Values (Recommended)

Set these values in Google Ads for better ROI tracking:

- **Form Submission**: $50-100 (estimated lead value)
- **Phone Call**: $75-150 (higher intent)
- **Quote Request**: $25-50 (initial interest)
- **Appointment Booking**: $100-200 (high intent)

## 🔧 Advanced Configuration

### Custom Conversion Values
You can modify the conversion values in the tracking functions:

```javascript
function trackFormSubmission() {
    trackGoogleAdsConversion('CONVERSION_ID', 'FORM_SUBMISSION_LABEL', 75); // $75 value
}
```

### Enhanced Ecommerce Tracking
For more detailed tracking, you can add:

```javascript
gtag('event', 'purchase', {
    'transaction_id': 'unique_id',
    'value': 75.00,
    'currency': 'USD',
    'items': [{
        'item_id': 'veteran_life_insurance_quote',
        'item_name': 'Veteran Life Insurance Quote',
        'price': 75.00,
        'quantity': 1
    }]
});
```

## 📈 Monitoring & Optimization

### Key Metrics to Monitor:
- **Conversion Rate**: Form submissions / Website visitors
- **Cost per Conversion**: Ad spend / Conversions
- **Conversion Value**: Total value of conversions
- **ROAS**: Return on ad spend

### Optimization Tips:
1. **A/B Test** different form layouts
2. **Optimize** for mobile conversions
3. **Retarget** users who didn't convert
4. **Use** conversion data to optimize ad targeting

## 🛠️ Troubleshooting

### Common Issues:

1. **Conversions not tracking:**
   - Check if conversion ID is correct
   - Verify Google tag is loading
   - Test in incognito mode

2. **Duplicate conversions:**
   - Check conversion counting settings
   - Verify form submission logic

3. **Missing phone call data:**
   - Verify onclick handlers are working
   - Check mobile vs desktop tracking

### Debug Mode:
Add this to test tracking:
```javascript
// Enable debug mode
gtag('config', 'AW-CONVERSION_ID', {
    'debug_mode': true
});
```

## 📞 Support

If you need help with:
- Google Ads account setup
- Conversion tracking configuration
- Technical implementation
- Performance optimization

Contact your Google Ads representative or refer to the [Google Ads Help Center](https://support.google.com/google-ads).

## ✅ Checklist

- [ ] Created conversion actions in Google Ads
- [ ] Updated conversion ID in website code
- [ ] Updated conversion labels in website code
- [ ] Tested form submission tracking
- [ ] Tested phone call tracking
- [ ] Verified conversions appear in Google Ads
- [ ] Set up conversion value tracking
- [ ] Configured attribution settings
- [ ] Set up conversion reporting

---

**Note**: Replace all placeholder values (`CONVERSION_ID`, `FORM_SUBMISSION_LABEL`, etc.) with your actual Google Ads conversion tracking codes before deploying to production. 