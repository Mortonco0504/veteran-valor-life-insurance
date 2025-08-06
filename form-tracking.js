// Form Tracking System for Veteran Valor Life Insurance
// This script tracks all form submissions with names, phone numbers, and details

class FormTrackingSystem {
    constructor() {
        this.submissions = [];
        this.storageKey = 'veteran_valor_form_submissions';
        this.init();
    }

    init() {
        this.loadStoredSubmissions();
        this.setupFormTracking();
        this.setupRealTimeTracking();
        console.log('📝 Form tracking system initialized');
    }

    loadStoredSubmissions() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.submissions = JSON.parse(stored);
                console.log(`📊 Loaded ${this.submissions.length} stored submissions`);
            }
        } catch (error) {
            console.error('Error loading stored submissions:', error);
        }
    }

    saveSubmissions() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.submissions));
        } catch (error) {
            console.error('Error saving submissions:', error);
        }
    }

    setupFormTracking() {
        // Track all forms on the page
        const forms = document.querySelectorAll('form');
        forms.forEach((form, index) => {
            const formId = form.id || `form_${index}`;
            
            // Track form interactions
            this.trackFormInteractions(form, formId);
            
            // Track form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form, formId);
            });
        });

        // Track phone call links
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handlePhoneCall(link);
            });
        });
    }

    trackFormInteractions(form, formId) {
        const fields = form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            // Track field focus
            field.addEventListener('focus', () => {
                this.trackEvent('form_field_focus', {
                    form_id: formId,
                    field_name: field.name || field.id || 'unknown',
                    field_type: field.type || 'text'
                });
            });

            // Track field changes
            field.addEventListener('change', () => {
                this.trackEvent('form_field_change', {
                    form_id: formId,
                    field_name: field.name || field.id || 'unknown',
                    field_type: field.type || 'text'
                });
            });
        });
    }

    handleFormSubmission(form, formId) {
        const formData = this.getFormData(form);
        const submission = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            form_id: formId,
            source: 'website_form',
            status: 'new',
            ...formData
        };

        // Add to submissions array
        this.submissions.unshift(submission);
        
        // Keep only last 1000 submissions
        if (this.submissions.length > 1000) {
            this.submissions = this.submissions.slice(0, 1000);
        }

        // Save to localStorage
        this.saveSubmissions();

        // Track analytics
        this.trackEvent('form_submission', {
            form_id: formId,
            form_data: formData
        });

        // Track Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'engagement',
                'event_label': formId,
                'form_type': 'life_insurance',
                'user_type': 'veteran',
                'form_data': formData
            });
        }

        console.log('📝 Form submission tracked:', submission);
        
        // Show success message
        this.showSuccessMessage(form);
        
        // Simulate form processing
        setTimeout(() => {
            this.processFormSubmission(submission);
        }, 1000);
    }

    handlePhoneCall(link) {
        const phoneNumber = link.getAttribute('href').replace('tel:', '');
        const linkText = link.textContent.trim();
        
        const submission = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            form_id: 'phone_call',
            source: 'phone_call',
            status: 'new',
            phone: phoneNumber,
            name: 'Phone Call',
            notes: `Phone call initiated via: ${linkText}`
        };

        // Add to submissions
        this.submissions.unshift(submission);
        this.saveSubmissions();

        // Track analytics
        this.trackEvent('phone_call', {
            phone_number: phoneNumber,
            link_text: linkText
        });

        console.log('📞 Phone call tracked:', submission);
    }

    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Extract common fields
        return {
            name: data.name || data.full_name || data.first_name || 'Unknown',
            phone: data.phone || data.phone_number || data.tel || 'Unknown',
            email: data.email || data.email_address || '',
            age: data.age || data.birth_year || '',
            coverage_type: data.coverage_type || data.insurance_type || 'Life Insurance',
            coverage_amount: data.coverage_amount || data.amount || '',
            zip_code: data.zip || data.zip_code || data.postal_code || '',
            state: data.state || '',
            notes: data.notes || data.message || data.comments || ''
        };
    }

    trackEvent(eventName, parameters = {}) {
        // Store event locally
        const event = {
            timestamp: new Date().toISOString(),
            event: eventName,
            parameters: parameters
        };

        // Track with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                'event_category': 'form_tracking',
                'event_label': JSON.stringify(parameters),
                ...parameters
            });
        }

        console.log(`📊 Event tracked: ${eventName}`, parameters);
    }

    showSuccessMessage(form) {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #059669;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
        `;
        successDiv.innerHTML = `
            ✅ Form submitted successfully!<br>
            <small>We'll contact you within 24 hours.</small>
        `;

        document.body.appendChild(successDiv);

        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    processFormSubmission(submission) {
        // Simulate processing
        console.log('🔄 Processing submission:', submission.id);
        
        // Update status after processing
        setTimeout(() => {
            submission.status = 'contacted';
            this.saveSubmissions();
            console.log('✅ Submission processed:', submission.id);
        }, 2000);
    }

    setupRealTimeTracking() {
        // Track real-time form analytics
        setInterval(() => {
            this.updateRealTimeStats();
        }, 30000); // Every 30 seconds
    }

    updateRealTimeStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todaySubmissions = this.submissions.filter(s => 
            new Date(s.timestamp) >= today
        );

        console.log(`📊 Real-time stats: ${todaySubmissions.length} submissions today`);
    }

    // Get all submissions
    getAllSubmissions() {
        return this.submissions;
    }

    // Get submissions by date range
    getSubmissionsByDateRange(startDate, endDate) {
        return this.submissions.filter(submission => {
            const submissionDate = new Date(submission.timestamp);
            return submissionDate >= startDate && submissionDate <= endDate;
        });
    }

    // Get submissions by status
    getSubmissionsByStatus(status) {
        return this.submissions.filter(submission => submission.status === status);
    }

    // Search submissions
    searchSubmissions(query) {
        const searchTerm = query.toLowerCase();
        return this.submissions.filter(submission => 
            submission.name.toLowerCase().includes(searchTerm) ||
            submission.phone.includes(searchTerm) ||
            submission.email.toLowerCase().includes(searchTerm)
        );
    }

    // Export submissions as CSV
    exportSubmissionsCSV(submissions = this.submissions) {
        const headers = [
            'Date & Time',
            'Name',
            'Phone Number',
            'Email',
            'Age',
            'Coverage Type',
            'Coverage Amount',
            'Status',
            'Source',
            'Notes'
        ];

        const csvContent = [
            headers.join(','),
            ...submissions.map(submission => [
                new Date(submission.timestamp).toLocaleString(),
                submission.name,
                submission.phone,
                submission.email,
                submission.age,
                submission.coverage_type,
                submission.coverage_amount,
                submission.status,
                submission.source,
                submission.notes
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `form-submissions-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Get statistics
    getStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        return {
            total: this.submissions.length,
            today: this.submissions.filter(s => new Date(s.timestamp) >= today).length,
            thisWeek: this.submissions.filter(s => new Date(s.timestamp) >= weekAgo).length,
            thisMonth: this.submissions.filter(s => new Date(s.timestamp) >= monthAgo).length,
            byStatus: {
                new: this.submissions.filter(s => s.status === 'new').length,
                contacted: this.submissions.filter(s => s.status === 'contacted').length,
                quoted: this.submissions.filter(s => s.status === 'quoted').length,
                converted: this.submissions.filter(s => s.status === 'converted').length
            },
            bySource: {
                website_form: this.submissions.filter(s => s.source === 'website_form').length,
                phone_call: this.submissions.filter(s => s.source === 'phone_call').length
            }
        };
    }
}

// Initialize form tracking system
let formTracker;
document.addEventListener('DOMContentLoaded', () => {
    formTracker = new FormTrackingSystem();
});

// Export functions for global use
window.getFormSubmissions = () => formTracker?.getAllSubmissions();
window.getFormStats = () => formTracker?.getStats();
window.exportFormSubmissions = () => formTracker?.exportSubmissionsCSV();
window.searchFormSubmissions = (query) => formTracker?.searchSubmissions(query);

console.log('📝 Form tracking system loaded'); 