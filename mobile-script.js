// Mobile-optimized JavaScript for Veteran Valor Life Insurance

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Close mobile nav when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
});

// Mobile FAQ Functionality
function initMobileFAQ() {
    const mobileFaqItems = document.querySelectorAll('.mobile-faq-item');
    
    if (mobileFaqItems.length === 0) {
        console.error('No mobile FAQ items found!');
        return;
    }
    
    mobileFaqItems.forEach((item, index) => {
        const question = item.querySelector('.mobile-faq-question');
        const answer = item.querySelector('.mobile-faq-answer');
        
        if (question && answer) {
            // Set initial state
            answer.style.setProperty('display', 'none', 'important');
            
            question.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = item.classList.contains('active');
                
                // Close all other FAQ items
                mobileFaqItems.forEach((otherItem, otherIndex) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.mobile-faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.setProperty('display', 'none', 'important');
                        }
                        const otherIcon = otherItem.querySelector('.mobile-faq-question i');
                        if (otherIcon) otherIcon.className = 'fas fa-chevron-down';
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    item.classList.remove('active');
                    answer.style.setProperty('display', 'none', 'important');
                    const icon = question.querySelector('i');
                    if (icon) icon.className = 'fas fa-chevron-down';
                } else {
                    item.classList.add('active');
                    answer.style.setProperty('display', 'block', 'important');
                    const icon = question.querySelector('i');
                    if (icon) icon.className = 'fas fa-chevron-up';
                }
            });
        }
    });
}

// Mobile Contact Modal
function showMobileContactModal() {
    const modal = document.getElementById('mobile-contact-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileContactModal() {
    const modal = document.getElementById('mobile-contact-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Mobile Post-Submission Modal
function showMobilePostSubmissionOptions() {
    const modal = document.getElementById('mobile-post-submission-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobilePostSubmissionModal() {
    const modal = document.getElementById('mobile-post-submission-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Mobile Chatbot
class MobileVeteranValorChatbot {
    constructor() {
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.createMobileChatbotUI();
        this.bindMobileEvents();
        this.addMobileWelcomeMessage();
    }
    
    createMobileChatbotUI() {
        // Chatbot UI is already in HTML, just initialize
        this.messagesContainer = document.getElementById('mobile-chatbot-messages');
        this.input = document.getElementById('mobile-chatbot-input');
        this.sendButton = document.getElementById('mobile-chatbot-send');
        this.toggle = document.getElementById('mobile-chatbot-toggle');
        this.container = document.getElementById('mobile-chatbot-container');
    }
    
    bindMobileEvents() {
        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMobileMessage();
                }
            });
        }
        
        if (this.toggle) {
            this.toggle.addEventListener('click', () => {
                this.toggleMobileChatbot();
            });
        }
    }
    
    toggleMobileChatbot() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.container.classList.add('open');
            this.toggle.classList.add('active');
            this.input.focus();
        } else {
            this.container.classList.remove('open');
            this.toggle.classList.remove('active');
        }
    }
    
    closeMobileChatbot() {
        this.isOpen = false;
        this.container.classList.remove('open');
        this.toggle.classList.remove('active');
    }
    
    addMobileWelcomeMessage() {
        const welcomeMessage = {
            type: 'bot',
            content: `Hello! I'm your Veteran Valor assistant. I'm here to help you find the best life insurance coverage for veterans and their families. 

How can I assist you today?

• Get a free quote
• Learn about veteran rates
• Compare policy types
• Schedule a consultation
• Ask about coverage options`
        };
        
        this.addMobileMessage(welcomeMessage);
    }
    
    addMobileMessage(message) {
        if (!this.messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `mobile-chatbot-message mobile-${message.type}-message`;
        
        const contentElement = document.createElement('div');
        contentElement.className = 'mobile-message-content';
        contentElement.innerHTML = message.content;
        
        messageElement.appendChild(contentElement);
        this.messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    async sendMobileMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMobileMessage({
            type: 'user',
            content: message
        });
        
        // Clear input
        this.input.value = '';
        
        // Show typing indicator
        this.showMobileTypingIndicator();
        
        // Process message
        const response = await this.processMobileMessage(message);
        
        // Hide typing indicator
        this.hideMobileTypingIndicator();
        
        // Add bot response
        this.addMobileMessage({
            type: 'bot',
            content: response
        });
    }
    
    showMobileTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'mobile-chatbot-message mobile-bot-message';
        typingElement.id = 'mobile-typing-indicator';
        
        const contentElement = document.createElement('div');
        contentElement.className = 'mobile-message-content';
        contentElement.innerHTML = '<div class="mobile-typing-dots"><span></span><span></span><span></span></div>';
        
        typingElement.appendChild(contentElement);
        this.messagesContainer.appendChild(typingElement);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    hideMobileTypingIndicator() {
        const typingIndicator = document.getElementById('mobile-typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    async processMobileMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Quote request
        if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('rate')) {
            return this.handleMobileQuoteRequest(message);
        }
        
        // Policy types
        if (lowerMessage.includes('policy') || lowerMessage.includes('type') || lowerMessage.includes('term') || lowerMessage.includes('whole')) {
            return this.handleMobilePolicyTypeQuery(message);
        }
        
        // Veteran-specific
        if (lowerMessage.includes('veteran') || lowerMessage.includes('military') || lowerMessage.includes('service')) {
            return this.handleMobileVeteranQuery(message);
        }
        
        // Coverage amounts
        if (lowerMessage.includes('coverage') || lowerMessage.includes('amount') || lowerMessage.includes('how much')) {
            return this.handleMobileCoverageQuery(message);
        }
        
        // Application process
        if (lowerMessage.includes('apply') || lowerMessage.includes('application') || lowerMessage.includes('process')) {
            return this.handleMobileApplicationQuery(message);
        }
        
        // Appointment
        if (lowerMessage.includes('appointment') || lowerMessage.includes('consultation') || lowerMessage.includes('call')) {
            return this.handleMobileAppointmentRequest(message);
        }
        
        // Default response
        return this.getMobileDefaultResponse(message);
    }
    
    handleMobileQuoteRequest(message) {
        return `Great! I can help you get a free quote. Our rates start at just $30/month for veterans.

**Our Current Rates:**
• Term Life: Starting at $30/month
• Whole Life: Starting at $50/month  
• Universal Life: Starting at $100/month

**Veteran Benefits:**
• Up to 15% discount for veterans
• No medical exam options available
• Special rates for service-connected disabilities

Would you like to:
1. **Get a free quote now** - Fill out our quick form
2. **Schedule a consultation** - Speak with our veteran specialist
3. **Learn more about coverage options**

What would you prefer?`;
    }
    
    handleMobilePolicyTypeQuery(message) {
        return `Here are our main policy types designed specifically for veterans:

**Term Life Insurance**
• Starting at $30/month
• Coverage for 10, 20, or 30 years
• Best for temporary needs (mortgage, kids' education)
• Most affordable option

**Whole Life Insurance**
• Starting at $50/month
• Coverage for your entire life
• Builds cash value over time
• Premiums never increase

**Universal Life Insurance**
• Starting at $100/month
• Flexible premiums and coverage
• Can adjust as your needs change
• Combines protection with savings

**Veteran-Specific Features:**
• No medical exam options available
• Special consideration for service-connected disabilities
• Integration with VA benefits
• Combat veteran programs

Which type interests you most? I can provide more details or help you get a quote!`;
    }
    
    handleMobileVeteranQuery(message) {
        return `Thank you for your service! We specialize in life insurance for veterans and their families.

**Veteran-Specific Benefits:**
• **Special Rates:** Up to 15% discount for veterans
• **No Medical Exam Options:** Available for most policies
• **Service-Connected Disabilities:** Specialized programs available
• **VA Benefits Integration:** Coordinate with your existing coverage
• **Combat Veteran Programs:** Enhanced benefits for combat service

**Our Commitment to Veterans:**
• Licensed agents trained in veteran benefits
• Understanding of military service and its impact
• Help navigating VA benefits and life insurance
• Specialized programs for different service eras

**Quick Facts:**
• Coverage amounts: $10,000 to $2,000,000
• Approval times: Same day to 2 weeks
• No medical exam options available
• Rates starting at $30/month

Would you like to learn more about our veteran programs or get a personalized quote?`;
    }
    
    handleMobileCoverageQuery(message) {
        return `Great question! Here's how to determine your coverage needs:

**Coverage Calculation:**
• **Income Replacement:** 10-12 times your annual income
• **Debt Coverage:** Mortgage, car loans, credit cards
• **Education Costs:** College tuition for children
• **Final Expenses:** Funeral costs and medical bills
• **VA Benefits:** Consider your existing VA life insurance

**Veteran-Specific Considerations:**
• Factor in your military pension
• Consider VA disability benefits
• Include any existing SGLI coverage
• Plan for service-connected conditions

**Our Coverage Options:**
• $10,000 - $2,000,000 available
• Flexible amounts to fit your needs
• Can adjust as your situation changes

**Quick Estimate:**
Most veterans choose coverage between $250,000 and $1,000,000 depending on their family size and financial obligations.

Would you like me to help you calculate your specific needs or get a quote for different coverage amounts?`;
    }
    
    handleMobileApplicationQuery(message) {
        return `Our application process is designed to be simple and veteran-friendly:

**Application Options:**

**1. Quick Online Application (5 minutes)**
• Fill out basic information
• Get instant quote
• No medical exam required for most policies
• Coverage can start same day

**2. Phone Application**
• Speak with our veteran specialist
• Get personalized guidance
• Complete application over the phone
• Immediate temporary coverage

**3. In-Person Consultation**
• Meet with licensed agent
• Detailed needs analysis
• Help with complex situations
• Full service support

**What You'll Need:**
• Basic personal information
• Military service details (if applicable)
• Health information (for some policies)
• Payment method

**Veteran Advantages:**
• Streamlined process for veterans
• Special consideration for service-connected conditions
• Integration with VA benefits
• Faster approval times

Would you like to start an application now, or do you have questions about the process?`;
    }
    
    handleMobileAppointmentRequest(message) {
        return `Perfect! I'd be happy to help you schedule a consultation with our veteran specialist.

**Consultation Options:**

**📞 Phone Consultation**
• Free 15-minute initial call
• Available Mon-Fri 8AM-8PM EST
• Speak with licensed veteran specialist
• Get personalized quote

**📅 Video Consultation**
• Free 30-minute detailed review
• Screen sharing available
• Compare multiple policy options
• Help with complex situations

**🏢 In-Person Meeting**
• Available in select locations
• Full needs analysis
• Help with applications
• Ongoing support

**What to Expect:**
• No pressure or sales tactics
• Honest assessment of your needs
• Clear explanation of options
• Help choosing the right coverage

**Ready to Schedule?**
Click here to book your free consultation: [Schedule Now](https://calendly.com/veteranvalor/consultation)

Or call us directly: **1-800-VET-INSURANCE**

What works best for you?`;
    }
    
    getMobileDefaultResponse(message) {
        return `I'm here to help you find the best life insurance coverage for veterans and their families!

**How can I assist you?**

• **Get a free quote** - Compare rates from top companies
• **Learn about veteran rates** - Special discounts and programs
• **Compare policy types** - Term, whole, and universal life
• **Schedule a consultation** - Speak with our veteran specialist
• **Ask about coverage options** - Find the right amount for your needs

**Quick Facts:**
• Rates starting at $30/month for veterans
• No medical exam options available
• Coverage from $10,000 to $2,000,000
• Special programs for service-connected disabilities

What would you like to know more about?`;
    }
}

// Mobile Form Handling
function handleMobileFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form data
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        birthDate: formData.get('birthDate'),
        coverage: formData.get('coverage'),
        policyType: formData.get('policyType')
    };
    
    // Validate form
    if (!validateMobileForm(data)) {
        return;
    }
    
    // Show loading state
    addMobileLoadingState(form);
    
    // Simulate form submission
    setTimeout(() => {
        // Send notifications
        sendMobileLeadNotifications(data);
        
        // Show success message
        showMobileSuccessMessage();
        
        // Show post-submission options
        setTimeout(() => {
            showMobilePostSubmissionOptions();
        }, 1000);
        
        // Reset form
        form.reset();
    }, 2000);
}

function validateMobileForm(formData) {
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.birthDate || !formData.coverage || !formData.policyType) {
        showMobileErrorMessage('Please fill in all required fields.');
        return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMobileErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        showMobileErrorMessage('Please enter a valid phone number.');
        return false;
    }
    
    return true;
}

function addMobileLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    // Store original text to restore later
    submitButton.setAttribute('data-original-text', originalText);
}

function showMobileSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'mobile-lead-notification';
    notification.innerHTML = `
        <div class="mobile-notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Thank you! Your information has been submitted successfully.</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

function showMobileErrorMessage(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'mobile-lead-notification mobile-error';
    notification.innerHTML = `
        <div class="mobile-notification-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

function sendMobileLeadNotifications(formData) {
    // Send email notification
    sendMobileEmailNotification(formData);
    
    // Send SMS notification
    sendMobileSMSNotification(formData);
    
    // Add to Google Sheets
    addMobileToGoogleSheets(formData);
}

function sendMobileEmailNotification(formData) {
    const formDataToSend = new FormData();
    formDataToSend.append('_replyto', 'connormorton.ffl@gmail.com');
    formDataToSend.append('_subject', 'New Mobile Lead - Veteran Valor Life Insurance');
    formDataToSend.append('message', `
New Mobile Lead from Veteran Valor Life Insurance

A new lead submission has been received from mobile. Here are the details:

Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email}
Date of Birth: ${formData.birthDate}
Coverage Amount: ${formData.coverage}
Policy Type: ${formData.policyType}
Submitted At: ${new Date().toLocaleString()}

Website: veteranvalorlifeinsurance.com (Mobile)
    `);
    
    fetch('https://formspree.io/f/mqalpban', {
        method: 'POST',
        body: formDataToSend,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Mobile email notification sent successfully');
        } else {
            console.log('Mobile email notification failed');
        }
    })
    .catch(error => {
        console.log('Mobile email notification error:', error);
    });
}

function sendMobileSMSNotification(formData) {
    const smsFormData = new FormData();
    smsFormData.append('_replyto', '5419122048@messaging.sprintpcs.com');
    smsFormData.append('_subject', 'New Mobile Lead - Veteran Valor Life Insurance');
    smsFormData.append('message', `
New Mobile Lead from Veteran Valor Life Insurance

Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email}
Coverage: ${formData.coverage}
Policy: ${formData.policyType}
Submitted: ${new Date().toLocaleString()}

Website: veteranvalorlifeinsurance.com (Mobile)
    `);
    
    fetch('https://formspree.io/f/mqalpban', {
        method: 'POST',
        body: smsFormData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Mobile SMS notification sent successfully');
        } else {
            console.log('Mobile SMS notification failed');
        }
    })
    .catch(error => {
        console.log('Mobile SMS notification error:', error);
    });
}

function addMobileToGoogleSheets(formData) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyBIGI0I7MpHZcs9zVbWuyElpjyQUWhNxwMNLolRbc4yAva_yZ6el9vdv1pd0DOb27a/exec';
    const sheetsData = {
        'Submit time UTC': new Date().toISOString(),
        'Gclid': '',
        'Campaign Id': '',
        'Ad Group Id': '',
        'Creative Id': '',
        'EMAIL': formData.email,
        'PHONE_NUMBER': formData.phone,
        'FIRST_NAME': formData.firstName,
        'LAST_NAME': formData.lastName,
        'REGION': '',
        'Lead Stage': 'Raw lead - Mobile Website form - Submit',
        'Coverage Amount': formData.coverage,
        'Policy Type': formData.policyType,
        'Date of Birth': formData.birthDate,
        'Website': 'veteranvalorlifeinsurance.com (Mobile)'
    };
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetsData)
    })
    .then(response => {
        console.log('Mobile data added to Google Sheets successfully');
    })
    .catch(error => {
        console.log('Mobile Google Sheets error:', error);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile FAQ
    initMobileFAQ();
    
    // Initialize mobile chatbot
    const mobileChatbot = new MobileVeteranValorChatbot();
    
    // Mobile contact modal
    const mobileContactLink = document.getElementById('mobile-contact-link');
    if (mobileContactLink) {
        mobileContactLink.addEventListener('click', function(e) {
            e.preventDefault();
            showMobileContactModal();
        });
    }
    
    // Mobile form submission
    const mobileQuoteForm = document.getElementById('mobile-quote-form');
    if (mobileQuoteForm) {
        mobileQuoteForm.addEventListener('submit', handleMobileFormSubmission);
    }
    
    // Smooth scrolling for mobile navigation
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a[href^="#"]');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Global functions for HTML onclick handlers
function toggleMobileChatbot() {
    const chatbot = window.mobileChatbot;
    if (chatbot) {
        chatbot.toggleMobileChatbot();
    }
}

function closeMobileChatbot() {
    const chatbot = window.mobileChatbot;
    if (chatbot) {
        chatbot.closeMobileChatbot();
    }
}

function sendMobileMessage() {
    const chatbot = window.mobileChatbot;
    if (chatbot) {
        chatbot.sendMobileMessage();
    }
}

// Store chatbot instance globally
window.mobileChatbot = null;
document.addEventListener('DOMContentLoaded', function() {
    window.mobileChatbot = new MobileVeteranValorChatbot();
}); 