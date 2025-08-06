// Drip Marketing Email Templates for Veteran Valor Life Insurance
// Complete automation system for lead nurturing

class DripEmailTemplates {
    constructor() {
        this.templates = {};
        this.automationRules = {};
        this.init();
    }

    init() {
        this.createWelcomeSeries();
        this.createNurtureSeries();
        this.createReengagementSeries();
        this.createConversionSeries();
        this.setupAutomationRules();
    }

    createWelcomeSeries() {
        this.templates.welcomeSeries = {
            name: 'Welcome Series',
            description: 'Onboarding sequence for new leads',
            emails: [
                {
                    id: 'welcome-1',
                    subject: 'Welcome to Veteran Valor Life Insurance',
                    timing: 'immediate',
                    delay: 0,
                    template: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
                                <h1 style="margin: 0;">🇺🇸 Welcome to Veteran Valor Life Insurance</h1>
                            </div>
                            
                            <div style="padding: 30px; background: white;">
                                <h2 style="color: #1e40af;">Thank you for your service!</h2>
                                
                                <p>Dear [FIRST_NAME],</p>
                                
                                <p>Welcome to Veteran Valor Life Insurance! We're honored to serve those who have served our country.</p>
                                
                                <p>As a veteran, you have access to exclusive life insurance benefits and rates that aren't available to the general public. Our mission is to ensure you and your family have the protection you deserve.</p>
                                
                                <h3 style="color: #059669;">What's Next?</h3>
                                <ul>
                                    <li>✅ Your personalized quote is being prepared</li>
                                    <li>✅ You'll receive it within 24 hours</li>
                                    <li>✅ No medical exam required for most veterans</li>
                                    <li>✅ Special rates for service members and families</li>
                                </ul>
                                
                                <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                    <h4 style="color: #1e40af; margin-top: 0;">Veteran Benefits You Qualify For:</h4>
                                    <ul style="margin: 0;">
                                        <li>Up to 40% lower rates than civilian insurance</li>
                                        <li>Guaranteed acceptance for service-connected disabilities</li>
                                        <li>No medical exam for coverage up to $500,000</li>
                                        <li>Family coverage at discounted rates</li>
                                    </ul>
                                </div>
                                
                                <p>If you have any questions, don't hesitate to call us at <strong>1-800-VET-INSURANCE</strong>.</p>
                                
                                <p>Thank you for your service,<br>
                                <strong>The Veteran Valor Team</strong></p>
                            </div>
                            
                            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                                <p>Veteran Valor Life Insurance<br>
                                1-800-VET-INSURANCE<br>
                                veteranvalorlifeinsurance.com</p>
                            </div>
                        </div>
                    `
                },
                {
                    id: 'welcome-2',
                    subject: 'Your Free Life Insurance Quote is Ready',
                    timing: '1 day',
                    delay: 1,
                    template: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #059669; color: white; padding: 20px; text-align: center;">
                                <h1 style="margin: 0;">📋 Your Personalized Quote is Ready</h1>
                            </div>
                            
                            <div style="padding: 30px; background: white;">
                                <h2 style="color: #1e40af;">Your Veteran Life Insurance Quote</h2>
                                
                                <p>Dear [FIRST_NAME],</p>
                                
                                <p>Great news! Your personalized life insurance quote is ready. Based on your veteran status and preferences, here's what we found for you:</p>
                                
                                <div style="background: #dcfce7; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                    <h3 style="color: #059669; margin-top: 0;">Your Recommended Coverage:</h3>
                                    <ul style="margin: 0;">
                                        <li><strong>Coverage Amount:</strong> $[COVERAGE_AMOUNT]</li>
                                        <li><strong>Monthly Premium:</strong> $[MONTHLY_PREMIUM]</li>
                                        <li><strong>Policy Type:</strong> [POLICY_TYPE]</li>
                                        <li><strong>Veteran Discount:</strong> [DISCOUNT_AMOUNT]%</li>
                                    </ul>
                                </div>
                                
                                <p>This quote includes your exclusive veteran benefits and is valid for 30 days.</p>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="[QUOTE_LINK]" style="background: #1e40af; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Your Complete Quote</a>
                                </div>
                                
                                <p>Ready to get started? Call us at <strong>1-800-VET-INSURANCE</strong> to speak with a veteran specialist.</p>
                                
                                <p>Best regards,<br>
                                <strong>The Veteran Valor Team</strong></p>
                            </div>
                        </div>
                    `
                },
                {
                    id: 'welcome-3',
                    subject: 'Veteran Life Insurance: 5 Things You Need to Know',
                    timing: '3 days',
                    delay: 3,
                    template: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
                                <h1 style="margin: 0;">📚 Veteran Life Insurance Guide</h1>
                            </div>
                            
                            <div style="padding: 30px; background: white;">
                                <h2 style="color: #1e40af;">5 Critical Things Every Veteran Should Know About Life Insurance</h2>
                                
                                <p>Dear [FIRST_NAME],</p>
                                
                                <p>As a veteran, you have unique life insurance options that most people don't know about. Here are the 5 most important things you need to know:</p>
                                
                                <h3 style="color: #059669;">1. VA Life Insurance vs. Private Insurance</h3>
                                <p>While VA life insurance is available, private insurance often offers better rates and more flexibility. Many veterans can save 20-40% with private coverage.</p>
                                
                                <h3 style="color: #059669;">2. No Medical Exam Options</h3>
                                <p>Veterans with service-connected disabilities can often get guaranteed acceptance life insurance with no medical exam required.</p>
                                
                                <h3 style="color: #059669;">3. Family Coverage Benefits</h3>
                                <p>Your veteran status can qualify your entire family for discounted rates, including spouses and children.</p>
                                
                                <h3 style="color: #059669;">4. Portability After Service</h3>
                                <p>Private life insurance stays with you after leaving the military, unlike some military-specific coverage.</p>
                                
                                <h3 style="color: #059669;">5. Tax Benefits</h3>
                                <p>Life insurance death benefits are typically tax-free, providing maximum protection for your family.</p>
                                
                                <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                    <h4 style="color: #1e40af; margin-top: 0;">Ready to Learn More?</h4>
                                    <p>Our veteran specialists are standing by to answer your questions and help you find the perfect coverage.</p>
                                    <p><strong>Call: 1-800-VET-INSURANCE</strong></p>
                                </div>
                                
                                <p>Thank you for your service,<br>
                                <strong>The Veteran Valor Team</strong></p>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    createNurtureSeries() {
        this.templates.nurtureSeries = {
            name: 'Lead Nurture Series',
            description: 'Educational content for lead nurturing',
            emails: [
                {
                    id: 'nurture-1',
                    subject: 'VA Life Insurance vs. Private Insurance: Which is Better?',
                    timing: '2 weeks',
                    delay: 14,
                    template: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #1e40af; color: white; padding: 20px; text-align: center;">
                                <h1 style="margin: 0;">⚖️ VA vs. Private Life Insurance</h1>
                            </div>
                            
                            <div style="padding: 30px; background: white;">
                                <h2 style="color: #1e40af;">The Complete Comparison Guide</h2>
                                
                                <p>Dear [FIRST_NAME],</p>
                                
                                <p>One of the most common questions we get from veterans is: "Should I stick with VA life insurance or go with private coverage?"</p>
                                
                                <p>Here's the honest comparison:</p>
                                
                                <h3 style="color: #059669;">VA Life Insurance Pros:</h3>
                                <ul>
                                    <li>Guaranteed acceptance for service-connected disabilities</li>
                                    <li>No medical exam for basic coverage</li>
                                    <li>Automatic coverage during active duty</li>
                                </ul>
                                
                                <h3 style="color: #dc2626;">VA Life Insurance Cons:</h3>
                                <ul>
                                    <li>Limited coverage amounts</li>
                                    <li>Higher premiums than private options</li>
                                    <li>Less flexibility in policy terms</li>
                                    <li>Limited family coverage options</li>
                                </ul>
                                
                                <h3 style="color: #059669;">Private Life Insurance Pros:</h3>
                                <ul>
                                    <li>Lower premiums (often 20-40% less)</li>
                                    <li>Higher coverage amounts available</li>
                                    <li>More policy options and flexibility</li>
                                    <li>Better family coverage options</li>
                                    <li>Portable after leaving service</li>
                                </ul>
                                
                                <div style="background: #dcfce7; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                    <h4 style="color: #059669; margin-top: 0;">The Bottom Line:</h4>
                                    <p>Most veterans can save significantly with private life insurance while getting better coverage. The key is finding the right policy for your specific situation.</p>
                                </div>
                                
                                <p>Want to see how much you could save? Call us at <strong>1-800-VET-INSURANCE</strong> for a personalized comparison.</p>
                                
                                <p>Best regards,<br>
                                <strong>The Veteran Valor Team</strong></p>
                            </div>
                        </div>
                    `
                },
                {
                    id: 'nurture-2',
                    subject: 'No Medical Exam Life Insurance for Veterans',
                    timing: '4 weeks',
                    delay: 28,
                    template: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #059669; color: white; padding: 20px; text-align: center;">
                                <h1 style="margin: 0;">🏥 No Medical Exam Life Insurance</h1>
                            </div>
                            
                            <div style="padding: 30px; background: white;">
                                <h2 style="color: #1e40af;">Fast Approval Life Insurance for Veterans</h2>
                                
                                <p>Dear [FIRST_NAME],</p>
                                
                                <p>Did you know that many veterans can get life insurance without a medical exam? This is especially valuable for veterans with service-connected disabilities or pre-existing conditions.</p>
                                
                                <h3 style="color: #059669;">Types of No-Exam Life Insurance:</h3>
                                
                                <h4 style="color: #1e40af;">1. Guaranteed Issue Life Insurance</h4>
                                <ul>
                                    <li>No medical questions asked</li>
                                    <li>Coverage up to $25,000</li>
                                    <li>Perfect for veterans with disabilities</li>
                                    <li>Immediate approval</li>
                                </ul>
                                
                                <h4 style="color: #1e40af;">2. Simplified Issue Life Insurance</h4>
                                <ul>
                                    <li>Few medical questions</li>
                                    <li>Coverage up to $500,000</li>
                                    <li>Faster approval than traditional</li>
                                    <li>Better rates than guaranteed issue</li>
                                </ul>
                                
                                <h4 style="color: #1e40af;">3. Accelerated Underwriting</h4>
                                <ul>
                                    <li>Uses data instead of medical exam</li>
                                    <li>Coverage up to $1,000,000</li>
                                    <li>Best rates available</li>
                                    <li>Approval in minutes</li>
                                </ul>
                                
                                <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                    <h4 style="color: #1e40af; margin-top: 0;">Veteran-Specific Benefits:</h4>
                                    <ul style="margin: 0;">
                                        <li>Special rates for service members</li>
                                        <li>Coverage for service-connected conditions</li>
                                        <li>Family coverage options</li>
                                        <li>Portable after leaving service</li>
                                    </ul>
                                </div>
                                
                                <p>Ready to see if you qualify? Call <strong>1-800-VET-INSURANCE</strong> for a quick assessment.</p>
                                
                                <p>Best regards,<br>
                                <strong>The Veteran Valor Team</strong></p>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    createReengagementSeries() {
        this.templates.reengagementSeries = {
            name: 'Re-engagement Series',
            description: 'Re-engage inactive leads',
            emails: [
                {
                    id: 'reengage-1',
                    subject: 'We Miss You! Special Veteran Life Insurance Offer',
                    timing: '30 days inactive',
                    delay: 30,
                    template: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
                                <h1 style="margin: 0;">🇺🇸 We Miss You!</h1>
                            </div>
                            
                            <div style="padding: 30px; background: white;">
                                <h2 style="color: #1e40af;">Special Offer for Veterans</h2>
                                
                                <p>Dear [FIRST_NAME],</p>
                                
                                <p>We noticed you haven't completed your life insurance application yet. As a veteran, you have access to exclusive benefits that are time-sensitive.</p>
                                
                                <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                    <h3 style="color: #d97706; margin-top: 0;">🎁 Special Veteran Offer:</h3>
                                    <ul style="margin: 0;">
                                        <li><strong>25% off</strong> your first year premium</li>
                                        <li><strong>No medical exam</strong> required</li>
                                        <li><strong>Guaranteed acceptance</strong> for veterans</li>
                                        <li><strong>Family coverage</strong> at discounted rates</li>
                                    </ul>
                                </div>
                                
                                <p>This offer expires in 7 days. Don't miss out on the protection your family deserves.</p>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="[SPECIAL_OFFER_LINK]" style="background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Claim Your Special Offer</a>
                                </div>
                                
                                <p>Or call us directly at <strong>1-800-VET-INSURANCE</strong> to speak with a veteran specialist.</p>
                                
                                <p>Thank you for your service,<br>
                                <strong>The Veteran Valor Team</strong></p>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    createConversionSeries() {
        this.templates.conversionSeries = {
            name: 'Conversion Series',
            description: 'Convert leads to customers',
            emails: [
                {
                    id: 'convert-1',
                    subject: 'Your Personalized Life Insurance Quote is Ready',
                    timing: 'when quote is ready',
                    delay: 0,
                    template: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #059669; color: white; padding: 20px; text-align: center;">
                                <h1 style="margin: 0;">📋 Your Quote is Ready!</h1>
                            </div>
                            
                            <div style="padding: 30px; background: white;">
                                <h2 style="color: #1e40af;">Your Personalized Veteran Life Insurance Quote</h2>
                                
                                <p>Dear [FIRST_NAME],</p>
                                
                                <p>Great news! Your personalized life insurance quote is ready. We've found the perfect coverage for your veteran status and needs.</p>
                                
                                <div style="background: #dcfce7; padding: 20px; border-radius: 10px; margin: 20px 0;">
                                    <h3 style="color: #059669; margin-top: 0;">Your Recommended Coverage:</h3>
                                    <ul style="margin: 0;">
                                        <li><strong>Coverage Amount:</strong> $[COVERAGE_AMOUNT]</li>
                                        <li><strong>Monthly Premium:</strong> $[MONTHLY_PREMIUM]</li>
                                        <li><strong>Policy Type:</strong> [POLICY_TYPE]</li>
                                        <li><strong>Veteran Discount:</strong> [DISCOUNT_AMOUNT]%</li>
                                        <li><strong>No Medical Exam:</strong> Required</li>
                                    </ul>
                                </div>
                                
                                <p>This quote is valid for 30 days and includes all your veteran benefits.</p>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="[QUOTE_LINK]" style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Your Complete Quote</a>
                                </div>
                                
                                <p>Ready to get started? Call us at <strong>1-800-VET-INSURANCE</strong> to speak with a veteran specialist.</p>
                                
                                <p>Best regards,<br>
                                <strong>The Veteran Valor Team</strong></p>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    setupAutomationRules() {
        this.automationRules = {
            triggers: {
                'form_submission': {
                    action: 'add_to_welcome_series',
                    delay: 0
                },
                'quote_request': {
                    action: 'add_to_conversion_series',
                    delay: 0
                },
                'inactive_30_days': {
                    action: 'add_to_reengagement_series',
                    delay: 30
                },
                'email_opened': {
                    action: 'continue_sequence',
                    delay: 1
                },
                'email_clicked': {
                    action: 'accelerate_sequence',
                    delay: 0
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

    // Get template by ID
    getTemplate(templateId) {
        for (let series in this.templates) {
            const email = this.templates[series].emails.find(e => e.id === templateId);
            if (email) return email;
        }
        return null;
    }

    // Get all templates for a series
    getSeriesTemplates(seriesName) {
        return this.templates[seriesName] || null;
    }

    // Personalize template with lead data
    personalizeTemplate(template, leadData) {
        let personalized = template;
        
        // Replace placeholders with actual data
        personalized = personalized.replace(/\[FIRST_NAME\]/g, leadData.firstName || 'Veteran');
        personalized = personalized.replace(/\[LAST_NAME\]/g, leadData.lastName || '');
        personalized = personalized.replace(/\[EMAIL\]/g, leadData.email || '');
        personalized = personalized.replace(/\[PHONE\]/g, leadData.phone || '');
        personalized = personalized.replace(/\[COVERAGE_AMOUNT\]/g, leadData.coverageAmount || '$500,000');
        personalized = personalized.replace(/\[MONTHLY_PREMIUM\]/g, leadData.monthlyPremium || '$45');
        personalized = personalized.replace(/\[POLICY_TYPE\]/g, leadData.policyType || 'Term Life');
        personalized = personalized.replace(/\[DISCOUNT_AMOUNT\]/g, leadData.discountAmount || '25');
        
        return personalized;
    }

    // Schedule email
    scheduleEmail(leadId, templateId, delay) {
        const email = this.getTemplate(templateId);
        if (!email) return false;
        
        const scheduledTime = new Date();
        scheduledTime.setDate(scheduledTime.getDate() + delay);
        
        return {
            leadId: leadId,
            templateId: templateId,
            scheduledTime: scheduledTime,
            status: 'scheduled'
        };
    }

    // Get automation rules
    getAutomationRules() {
        return this.automationRules;
    }
}

// Export for use in other files
window.DripEmailTemplates = DripEmailTemplates; 