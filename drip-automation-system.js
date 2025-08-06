// Drip Marketing Automation System
// Handles lead nurturing, email sequences, and automation rules

class DripAutomationSystem {
    constructor() {
        this.leads = [];
        this.campaigns = [];
        this.scheduledEmails = [];
        this.automationRules = {};
        this.init();
    }

    init() {
        this.loadLeads();
        this.loadCampaigns();
        this.setupAutomationRules();
        this.startAutomationEngine();
    }

    loadLeads() {
        // Load leads from localStorage or database
        const storedLeads = localStorage.getItem('veteran_valor_leads');
        if (storedLeads) {
            this.leads = JSON.parse(storedLeads);
        } else {
            this.leads = this.getSampleLeads();
        }
    }

    loadCampaigns() {
        this.campaigns = [
            {
                id: 'welcome-series',
                name: 'Welcome Series',
                status: 'active',
                emails: ['welcome-1', 'welcome-2', 'welcome-3'],
                delays: [0, 1, 3]
            },
            {
                id: 'nurture-series',
                name: 'Lead Nurture Series',
                status: 'active',
                emails: ['nurture-1', 'nurture-2'],
                delays: [14, 28]
            },
            {
                id: 'reengagement-series',
                name: 'Re-engagement Series',
                status: 'active',
                emails: ['reengage-1'],
                delays: [30]
            },
            {
                id: 'conversion-series',
                name: 'Conversion Series',
                status: 'active',
                emails: ['convert-1'],
                delays: [0]
            }
        ];
    }

    getSampleLeads() {
        return [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Smith',
                email: 'john.smith@email.com',
                phone: '(555) 123-4567',
                status: 'nurturing',
                campaign: 'welcome-series',
                signupDate: new Date('2024-01-15'),
                lastActivity: new Date('2024-01-17'),
                veteranStatus: 'veteran',
                serviceConnected: false,
                familyCoverage: true,
                coverageAmount: '$500,000',
                monthlyPremium: '$45',
                policyType: 'Term Life',
                discountAmount: '25'
            },
            {
                id: 2,
                firstName: 'Sarah',
                lastName: 'Johnson',
                email: 'sarah.johnson@email.com',
                phone: '(555) 234-5678',
                status: 'ready',
                campaign: 'nurture-series',
                signupDate: new Date('2024-01-10'),
                lastActivity: new Date('2024-01-20'),
                veteranStatus: 'veteran',
                serviceConnected: true,
                familyCoverage: false,
                coverageAmount: '$250,000',
                monthlyPremium: '$35',
                policyType: 'Guaranteed Issue',
                discountAmount: '30'
            }
        ];
    }

    setupAutomationRules() {
        this.automationRules = {
            triggers: {
                'form_submission': {
                    action: 'add_to_welcome_series',
                    conditions: ['new_lead'],
                    delay: 0
                },
                'quote_request': {
                    action: 'add_to_conversion_series',
                    conditions: ['has_quote'],
                    delay: 0
                },
                'email_opened': {
                    action: 'continue_sequence',
                    conditions: ['in_campaign'],
                    delay: 1
                },
                'email_clicked': {
                    action: 'accelerate_sequence',
                    conditions: ['in_campaign'],
                    delay: 0
                },
                'inactive_30_days': {
                    action: 'add_to_reengagement_series',
                    conditions: ['no_activity'],
                    delay: 30
                }
            },
            conditions: {
                'veteran_status': {
                    type: 'veteran',
                    action: 'apply_veteran_discount'
                },
                'service_connected': {
                    type: 'disability',
                    action: 'offer_guaranteed_issue'
                },
                'family_coverage': {
                    type: 'family',
                    action: 'add_family_options'
                }
            }
        };
    }

    startAutomationEngine() {
        // Check for scheduled emails every hour
        setInterval(() => {
            this.processScheduledEmails();
        }, 3600000); // 1 hour

        // Check for automation triggers every 15 minutes
        setInterval(() => {
            this.checkAutomationTriggers();
        }, 900000); // 15 minutes
    }

    addLead(leadData) {
        const newLead = {
            id: Date.now(),
            ...leadData,
            status: 'new',
            campaign: 'welcome-series',
            signupDate: new Date(),
            lastActivity: new Date(),
            emailsSent: [],
            emailsOpened: [],
            emailsClicked: []
        };

        this.leads.push(newLead);
        this.saveLeads();

        // Trigger welcome series
        this.triggerAutomation('form_submission', newLead);

        return newLead;
    }

    triggerAutomation(triggerType, lead) {
        const trigger = this.automationRules.triggers[triggerType];
        if (!trigger) return;

        // Check conditions
        if (this.checkConditions(trigger.conditions, lead)) {
            this.executeAction(trigger.action, lead, trigger.delay);
        }
    }

    checkConditions(conditions, lead) {
        for (let condition of conditions) {
            switch (condition) {
                case 'new_lead':
                    if (lead.status !== 'new') return false;
                    break;
                case 'in_campaign':
                    if (!lead.campaign) return false;
                    break;
                case 'no_activity':
                    const daysSinceActivity = (new Date() - lead.lastActivity) / (1000 * 60 * 60 * 24);
                    if (daysSinceActivity < 30) return false;
                    break;
                case 'has_quote':
                    if (!lead.quoteRequested) return false;
                    break;
            }
        }
        return true;
    }

    executeAction(action, lead, delay) {
        switch (action) {
            case 'add_to_welcome_series':
                this.addToCampaign(lead, 'welcome-series', delay);
                break;
            case 'add_to_conversion_series':
                this.addToCampaign(lead, 'conversion-series', delay);
                break;
            case 'add_to_reengagement_series':
                this.addToCampaign(lead, 'reengagement-series', delay);
                break;
            case 'continue_sequence':
                this.continueSequence(lead);
                break;
            case 'accelerate_sequence':
                this.accelerateSequence(lead);
                break;
        }
    }

    addToCampaign(lead, campaignId, delay) {
        const campaign = this.campaigns.find(c => c.id === campaignId);
        if (!campaign) return;

        lead.campaign = campaignId;
        lead.status = 'nurturing';

        // Schedule first email
        if (campaign.emails.length > 0) {
            this.scheduleEmail(lead.id, campaign.emails[0], delay);
        }

        this.saveLeads();
    }

    continueSequence(lead) {
        const campaign = this.campaigns.find(c => c.id === lead.campaign);
        if (!campaign) return;

        const nextEmailIndex = lead.emailsSent.length;
        if (nextEmailIndex < campaign.emails.length) {
            const delay = campaign.delays[nextEmailIndex] || 1;
            this.scheduleEmail(lead.id, campaign.emails[nextEmailIndex], delay);
        }
    }

    accelerateSequence(lead) {
        const campaign = this.campaigns.find(c => c.id === lead.campaign);
        if (!campaign) return;

        const nextEmailIndex = lead.emailsSent.length;
        if (nextEmailIndex < campaign.emails.length) {
            // Send immediately due to click
            this.scheduleEmail(lead.id, campaign.emails[nextEmailIndex], 0);
        }
    }

    scheduleEmail(leadId, templateId, delay) {
        const scheduledTime = new Date();
        scheduledTime.setDate(scheduledTime.getDate() + delay);

        const scheduledEmail = {
            id: Date.now(),
            leadId: leadId,
            templateId: templateId,
            scheduledTime: scheduledTime,
            status: 'scheduled'
        };

        this.scheduledEmails.push(scheduledEmail);
        this.saveScheduledEmails();

        console.log(`Email scheduled: ${templateId} for lead ${leadId} at ${scheduledTime}`);
    }

    processScheduledEmails() {
        const now = new Date();
        const emailsToSend = this.scheduledEmails.filter(email => 
            email.status === 'scheduled' && email.scheduledTime <= now
        );

        for (let email of emailsToSend) {
            this.sendEmail(email);
        }
    }

    sendEmail(scheduledEmail) {
        const lead = this.leads.find(l => l.id === scheduledEmail.leadId);
        if (!lead) return;

        // Get email template
        const emailTemplates = new DripEmailTemplates();
        const template = emailTemplates.getTemplate(scheduledEmail.templateId);
        if (!template) return;

        // Personalize template
        const personalizedContent = emailTemplates.personalizeTemplate(template.template, lead);

        // Send email (in real implementation, this would use an email service)
        this.sendEmailViaService(lead.email, template.subject, personalizedContent);

        // Update lead status
        lead.emailsSent.push(scheduledEmail.templateId);
        lead.lastActivity = new Date();
        scheduledEmail.status = 'sent';

        this.saveLeads();
        this.saveScheduledEmails();

        console.log(`Email sent: ${template.subject} to ${lead.email}`);
    }

    sendEmailViaService(to, subject, content) {
        // In real implementation, this would use an email service like SendGrid, Mailgun, etc.
        // For now, we'll simulate sending
        console.log(`Sending email to ${to}: ${subject}`);
        
        // You would integrate with your email service here
        // Example with Formspree:
        /*
        const formData = new FormData();
        formData.append('to', to);
        formData.append('subject', subject);
        formData.append('message', content);
        
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData
        });
        */
    }

    checkAutomationTriggers() {
        // Check for inactive leads
        const now = new Date();
        const inactiveLeads = this.leads.filter(lead => {
            const daysSinceActivity = (now - lead.lastActivity) / (1000 * 60 * 60 * 24);
            return daysSinceActivity >= 30 && lead.status !== 'converted';
        });

        for (let lead of inactiveLeads) {
            this.triggerAutomation('inactive_30_days', lead);
        }
    }

    trackEmailEvent(leadId, eventType, templateId) {
        const lead = this.leads.find(l => l.id === leadId);
        if (!lead) return;

        switch (eventType) {
            case 'opened':
                lead.emailsOpened.push(templateId);
                this.triggerAutomation('email_opened', lead);
                break;
            case 'clicked':
                lead.emailsClicked.push(templateId);
                this.triggerAutomation('email_clicked', lead);
                break;
        }

        lead.lastActivity = new Date();
        this.saveLeads();
    }

    updateLeadStatus(leadId, newStatus) {
        const lead = this.leads.find(l => l.id === leadId);
        if (!lead) return;

        lead.status = newStatus;
        lead.lastActivity = new Date();

        if (newStatus === 'converted') {
            // Remove from all campaigns
            lead.campaign = null;
        }

        this.saveLeads();
    }

    saveLeads() {
        localStorage.setItem('veteran_valor_leads', JSON.stringify(this.leads));
    }

    saveScheduledEmails() {
        localStorage.setItem('veteran_valor_scheduled_emails', JSON.stringify(this.scheduledEmails));
    }

    getLeadsByStatus(status) {
        return this.leads.filter(lead => lead.status === status);
    }

    getLeadsByCampaign(campaignId) {
        return this.leads.filter(lead => lead.campaign === campaignId);
    }

    getCampaignStats(campaignId) {
        const campaignLeads = this.getLeadsByCampaign(campaignId);
        const totalLeads = campaignLeads.length;
        const activeLeads = campaignLeads.filter(lead => lead.status === 'nurturing').length;
        const convertedLeads = campaignLeads.filter(lead => lead.status === 'converted').length;

        return {
            total: totalLeads,
            active: activeLeads,
            converted: convertedLeads,
            conversionRate: totalLeads > 0 ? (convertedLeads / totalLeads * 100).toFixed(1) : 0
        };
    }

    // Export functions for global use
    exportLeads() {
        const csvContent = [
            ['ID', 'Name', 'Email', 'Phone', 'Status', 'Campaign', 'Signup Date', 'Last Activity'],
            ...this.leads.map(lead => [
                lead.id,
                `${lead.firstName} ${lead.lastName}`,
                lead.email,
                lead.phone,
                lead.status,
                lead.campaign,
                lead.signupDate.toLocaleDateString(),
                lead.lastActivity.toLocaleDateString()
            ])
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `veteran-valor-leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize automation system
let automationSystem;
document.addEventListener('DOMContentLoaded', () => {
    automationSystem = new DripAutomationSystem();
});

// Export functions for global use
window.addLead = (leadData) => automationSystem?.addLead(leadData);
window.trackEmailEvent = (leadId, eventType, templateId) => automationSystem?.trackEmailEvent(leadId, eventType, templateId);
window.updateLeadStatus = (leadId, newStatus) => automationSystem?.updateLeadStatus(leadId, newStatus);
window.getLeadsByStatus = (status) => automationSystem?.getLeadsByStatus(status);
window.getCampaignStats = (campaignId) => automationSystem?.getCampaignStats(campaignId);
window.exportLeads = () => automationSystem?.exportLeads();

console.log('📧 Drip Marketing Automation System loaded'); 