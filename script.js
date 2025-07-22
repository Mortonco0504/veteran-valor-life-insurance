// AI Chatbot Implementation
class VeteranValorChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.currentStep = 'welcome';
        this.userInfo = {};
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.bindEvents();
        this.addWelcomeMessage();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <div class="chatbot-header">
                    <div class="chatbot-title">
                        <i class="fas fa-shield-alt"></i>
                        <span>Veteran Valor Assistant</span>
                    </div>
                    <button class="chatbot-close" id="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chatbot-messages" id="chatbot-messages">
                    <!-- Messages will be inserted here -->
                </div>
                <div class="chatbot-input-container">
                    <input type="text" id="chatbot-input" placeholder="Ask about life insurance..." />
                    <button id="chatbot-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
            <div class="chatbot-toggle" id="chatbot-toggle">
                <i class="fas fa-comments"></i>
                <span class="chatbot-toggle-text">Need Help?</span>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const input = document.getElementById('chatbot-input');
        const send = document.getElementById('chatbot-send');

        toggle.addEventListener('click', () => this.toggleChatbot());
        close.addEventListener('click', () => this.closeChatbot());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChatbot() {
        const container = document.getElementById('chatbot-container');
        const toggle = document.getElementById('chatbot-toggle');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            container.classList.add('open');
            toggle.classList.add('active');
            document.getElementById('chatbot-input').focus();
        } else {
            container.classList.remove('open');
            toggle.classList.remove('active');
        }
    }

    closeChatbot() {
        const container = document.getElementById('chatbot-container');
        const toggle = document.getElementById('chatbot-toggle');
        
        this.isOpen = false;
        container.classList.remove('open');
        toggle.classList.remove('active');
    }

    addWelcomeMessage() {
        const welcomeMessage = {
            type: 'bot',
            content: `Hello! I'm your Veteran Valor assistant. I can help you with:
            
• Getting life insurance quotes
• Understanding different policy types
• Veteran-specific benefits
• Coverage recommendations
• Application process
• Scheduling consultations

How can I assist you today?`,
            timestamp: new Date()
        };
        
        this.addMessage(welcomeMessage);
    }

    addMessage(message) {
        this.messages.push(message);
        this.displayMessage(message);
    }

    displayMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${message.type}-message`;
        
        const time = message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-content">
                ${message.content}
            </div>
            <div class="message-time">${time}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage({
            type: 'user',
            content: message,
            timestamp: new Date()
        });
        
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and generate response
        const response = await this.processMessage(message);
        
        // Remove typing indicator and add bot response
        this.hideTypingIndicator();
        this.addMessage({
            type: 'bot',
            content: response,
            timestamp: new Date()
        });
        
        // Always offer appointment scheduling after responses (except for appointment responses themselves)
        if (!message.toLowerCase().includes('schedule') && !message.toLowerCase().includes('appointment') && !message.toLowerCase().includes('meet') && !message.toLowerCase().includes('consultation') && !message.toLowerCase().includes('call')) {
            setTimeout(() => {
                this.addMessage({
                    type: 'bot',
                    content: this.getAppointmentOffer(),
                    timestamp: new Date()
                });
            }, 1000); // Small delay to make it feel more natural
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Appointment scheduling queries
        if (lowerMessage.includes('schedule') || lowerMessage.includes('appointment') || lowerMessage.includes('meet') || lowerMessage.includes('consultation') || lowerMessage.includes('call')) {
            return this.handleAppointmentRequest(message);
        }
        
        // Quote-related queries
        if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return this.handleQuoteRequest(message);
        }
        
        // Policy type queries
        if (lowerMessage.includes('term') || lowerMessage.includes('whole') || lowerMessage.includes('universal')) {
            return this.handlePolicyTypeQuery(message);
        }
        
        // Veteran-specific queries
        if (lowerMessage.includes('veteran') || lowerMessage.includes('military') || lowerMessage.includes('service')) {
            return this.handleVeteranQuery(message);
        }
        
        // Coverage queries
        if (lowerMessage.includes('coverage') || lowerMessage.includes('amount') || lowerMessage.includes('benefit')) {
            return this.handleCoverageQuery(message);
        }
        
        // Application process
        if (lowerMessage.includes('apply') || lowerMessage.includes('application') || lowerMessage.includes('process')) {
            return this.handleApplicationQuery(message);
        }
        
        // General help
        if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            return this.getHelpMessage();
        }
        
        // Default response
        return this.getDefaultResponse(message);
    }

    handleQuoteRequest(message) {
        return `I'd be happy to help you get a quote! Here's what I need to know:

**Current Pricing:**
• Term Life: Starting at $30/month
• Whole Life: Starting at $50/month  
• Universal Life: Starting at $100/month

**To get your personalized quote:**
1. Visit our quote form at the top of the page
2. Fill in your basic information
3. Select your desired coverage amount
4. Choose your military service branch
5. Get instant quotes from top-rated companies

Would you like me to guide you through the quote process, or do you have questions about specific policy types?`;
    }

    handlePolicyTypeQuery(message) {
        if (message.toLowerCase().includes('term')) {
            return `**Term Life Insurance** - Starting at $30/month

**Key Features:**
• Coverage for 10-30 years
• Level premiums throughout the term
• Coverage amounts: $100K to $2M
• No medical exam options available
• Convertible to permanent coverage
• Most affordable option for temporary needs

**Best for:** Veterans who want maximum coverage at the lowest cost for a specific period.

Would you like to learn about other policy types or get a quote?`;
        } else if (message.toLowerCase().includes('whole')) {
            return `**Whole Life Insurance** - Starting at $50/month

**Key Features:**
• Lifetime coverage guaranteed
• Builds cash value over time
• Premiums never increase
• Tax-deferred growth
• Guaranteed death benefit
• Can borrow against cash value

**Best for:** Veterans who want permanent protection and cash value accumulation.

This is our most popular option for long-term financial planning.`;
        } else if (message.toLowerCase().includes('universal')) {
            return `**Universal Life Insurance** - Starting at $100/month

**Key Features:**
• Flexible premium payments
• Adjustable death benefit
• Cash value growth potential
• Tax advantages
• Estate planning benefits
• Premium flexibility

**Best for:** Veterans who want permanent coverage with payment flexibility.

Would you like to compare these options or get a personalized quote?`;
        }
        
        return `We offer three main types of life insurance:

1. **Term Life** ($30/month) - Temporary coverage
2. **Whole Life** ($50/month) - Permanent with cash value
3. **Universal Life** ($100/month) - Flexible permanent coverage

Which type interests you most?`;
    }

    handleVeteranQuery(message) {
        return `**Special Benefits for Veterans:**

✅ **Veteran-Specific Rates** - Many companies offer special pricing for veterans
✅ **No Medical Exam Options** - Available for qualified veterans
✅ **Service-Connected Disability Coverage** - Special programs available
✅ **Family Coverage** - Spouses and children eligible
✅ **Fast Approval** - Streamlined process for veterans
✅ **Multiple Carrier Options** - Shop 80+ A-rated companies

**Our Process:**
1. We understand military service and its unique challenges
2. Compare rates from veteran-friendly carriers
3. Help you find the best coverage for your family
4. Ongoing support throughout your policy

Would you like to learn about specific veteran benefits or get started with a quote?`;
    }

    handleCoverageQuery(message) {
        return `**Coverage Amount Recommendations:**

**General Guidelines:**
• 10-12 times your annual income
• Consider family needs and debts
• Factor in future expenses (college, mortgage)

**Our Coverage Options:**
• $100,000 - Basic protection
• $250,000 - Standard family coverage
• $500,000 - Comprehensive protection
• $1,000,000 - High-value coverage
• $2,000,000 - Maximum protection

**Veteran Considerations:**
• Service-connected disabilities may affect coverage
• Some carriers offer special veteran programs
• Family members may be eligible for coverage

Would you like help determining the right coverage amount for your situation?`;
    }

    handleApplicationQuery(message) {
        return `**Application Process:**

**Step 1: Get Your Quote**
• Fill out our online form (takes 2 minutes)
• No obligation or commitment required
• Get instant quotes from multiple carriers

**Step 2: Choose Your Policy**
• Compare rates and features
• Select the best option for your needs
• Our specialists can help you decide

**Step 3: Apply**
• Complete the application online
• Provide basic health information
• Submit required documents

**Step 4: Approval**
• No-exam policies: 24-48 hours
• Medical exam policies: 2-6 weeks
• Coverage begins immediately upon approval

**Veteran Benefits:**
• Streamlined process for veterans
• Special consideration for service-connected conditions
• Dedicated veteran support team

Ready to get started? Click "Get Your Free Quote" at the top of the page!`;
    }

    getHelpMessage() {
        return `I'm here to help you with all things life insurance! Here's what I can assist with:

**📋 Quote & Pricing**
• Get current rates and pricing
• Compare different policy types
• Calculate coverage needs

**🛡️ Policy Information**
• Term Life Insurance details
• Whole Life Insurance features
• Universal Life Insurance options

**🎖️ Veteran Benefits**
• Special veteran programs
• Service-connected disability coverage
• Military-specific considerations

**📝 Application Process**
• How to apply
• Required documents
• Timeline expectations

**📅 Appointment Scheduling**
• Schedule a consultation call
• Meet with our specialists
• Get personalized advice

**❓ General Questions**
• Coverage recommendations
• Policy comparisons
• Insurance terminology

Just ask me anything about life insurance or veteran benefits!`;
    }

    getDefaultResponse(message) {
        const responses = [
            "I understand you're asking about life insurance. Could you be more specific about what you'd like to know? I can help with quotes, policy types, veteran benefits, or the application process.",
            
            "That's a great question! To better assist you, could you tell me if you're looking for pricing information, policy details, veteran benefits, or help with the application process?",
            
            "I'd be happy to help! Are you interested in getting a quote, learning about different policy types, understanding veteran benefits, or something else related to life insurance?",
            
            "Thanks for your question! I can help you with quotes, policy information, veteran-specific programs, or guide you through the application process. What would be most helpful for you?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleAppointmentRequest(message) {
        const calendarUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2tb3Wkux3jJ0hIn5Yoyp-1wGik3O6V44FeiaCj-g-7mnEr6tu5ME5mzzlrqum3GxvqsDja07fQ?gv=true";
        
        return `**Schedule Your Consultation!** 📅

I'd be happy to help you schedule a consultation with our Veteran Valor specialists. Here's what you can expect:

**What We'll Cover:**
• Personalized life insurance recommendations
• Coverage amount analysis
• Policy type comparison
• Veteran-specific benefits
• Application guidance
• Any questions you have

**Consultation Details:**
• Free 30-minute consultation
• No obligation or pressure
• Available via phone or video call
• Flexible scheduling options

**Ready to Schedule?**
Click the button below to book your appointment:

<div style="text-align: center; margin: 15px 0;">
    <a href="${calendarUrl}" target="_blank" class="chatbot-appointment-btn">
        📅 Schedule Consultation
    </a>
</div>

**After Scheduling:**
• You'll receive a confirmation email
• We'll call you at your scheduled time
• Come prepared with any questions
• We'll help you find the best coverage for your family

Would you like me to help you prepare for your consultation or answer any other questions?`;
    }

    getAppointmentOffer() {
        const calendarUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2tb3Wkux3jJ0hIn5Yoyp-1wGik3O6V44FeiaCj-g-7mnEr6tu5ME5mzzlrqum3GxvqsDja07fQ?gv=true";
        
        const offers = [
            `**Ready to take the next step?** 📅

Would you like to schedule a free consultation with our Veteran Valor specialists? We can help you:

• Get personalized recommendations
• Compare policy options
• Answer all your questions
• Guide you through the application process

<div style="text-align: center; margin: 15px 0;">
    <a href="${calendarUrl}" target="_blank" class="chatbot-appointment-btn">
        📅 Schedule Free Consultation
    </a>
</div>

*No obligation • 30-minute call • Veteran-focused advice*`,

            `**Want personalized guidance?** 🎖️

I can connect you with our Veteran Valor specialists for a free consultation. They'll help you:

• Find the best coverage for your situation
• Understand veteran-specific benefits
• Get answers to all your questions
• Start your application process

<div style="text-align: center; margin: 15px 0;">
    <a href="${calendarUrl}" target="_blank" class="chatbot-appointment-btn">
        📅 Book Your Consultation
    </a>
</div>

*Free 30-minute call • No pressure • Veteran experts*`,

            `**Need expert advice?** 💬

Our Veteran Valor specialists are here to help! Schedule a free consultation to:

• Get personalized recommendations
• Understand your coverage options
• Learn about veteran benefits
• Start your application

<div style="text-align: center; margin: 15px 0;">
    <a href="${calendarUrl}" target="_blank" class="chatbot-appointment-btn">
        📅 Schedule Consultation
    </a>
</div>

*Free consultation • No obligation • Veteran-focused*`,

            `**Ready to get started?** 🛡️

Let our Veteran Valor specialists help you find the perfect life insurance coverage. Schedule a free consultation to:

• Get personalized recommendations
• Compare policy types
• Understand veteran benefits
• Begin your application

<div style="text-align: center; margin: 15px 0;">
    <a href="${calendarUrl}" target="_blank" class="chatbot-appointment-btn">
        📅 Book Free Call
    </a>
</div>

*30-minute consultation • No pressure • Expert guidance*`
        ];
        
        return offers[Math.floor(Math.random() * offers.length)];
    }
}

// Scroll-triggered Popup System
class ScrollPopup {
    constructor() {
        this.hasShown = false;
        this.scrollThreshold = 0.3; // Show after 30% scroll
        this.init();
    }

    init() {
        this.createPopup();
        this.bindEvents();
    }

    createPopup() {
        const popupHTML = `
            <div id="scroll-popup" class="scroll-popup">
                <div class="popup-overlay"></div>
                <div class="popup-content">
                    <button class="popup-close" id="popup-close">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="popup-header">
                        <div class="popup-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h3>Get Your Free Life Insurance Quote!</h3>
                        <p>Protect your family with affordable coverage designed for veterans</p>
                    </div>
                    
                    <div class="popup-benefits">
                        <div class="benefit-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Starting at $30/month</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-check-circle"></i>
                            <span>No medical exam required</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Veteran-specific rates</span>
                        </div>
                        <div class="benefit-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Coverage up to $2M</span>
                        </div>
                    </div>
                    
                    <div class="popup-actions">
                        <a href="#quote" class="btn btn-primary btn-large">
                            <i class="fas fa-shield-alt"></i>
                            Get Free Quote
                        </a>
                        <a href="tel:+15419122048" class="btn btn-outline btn-large">
                            <i class="fas fa-phone"></i>
                            Call 1-800-VET-INSURANCE
                        </a>
                    </div>
                    
                    <div class="popup-footer">
                        <p><i class="fas fa-lock"></i> Your information is secure and protected</p>
                        <p><i class="fas fa-clock"></i> Get quotes in under 2 minutes</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }

    bindEvents() {
        const closeBtn = document.getElementById('popup-close');
        const overlay = document.querySelector('.popup-overlay');
        
        closeBtn.addEventListener('click', () => this.hidePopup());
        overlay.addEventListener('click', () => this.hidePopup());
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hidePopup();
        });
    }

    showPopup() {
        if (this.hasShown) return;
        
        const popup = document.getElementById('scroll-popup');
        popup.classList.add('active');
        this.hasShown = true;
        
        // Prevent body scroll when popup is open
        document.body.style.overflow = 'hidden';
    }

    hidePopup() {
        const popup = document.getElementById('scroll-popup');
        popup.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    checkScroll() {
        if (this.hasShown) return;
        
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent >= this.scrollThreshold * 100) {
            this.showPopup();
        }
    }
}

// Initialize chatbot and popup when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing components...');
    
    // Initialize the chatbot
    const chatbot = new VeteranValorChatbot();

    // Initialize the scroll popup
    const scrollPopup = new ScrollPopup();

    // Initialize FAQ functionality
    console.log('Initializing FAQ...');
    initFAQ();
    
    // Test FAQ functionality after a short delay
    setTimeout(() => {
        console.log('Testing FAQ functionality...');
        const testFaqItem = document.querySelector('.faq-item');
        if (testFaqItem) {
            console.log('Found FAQ item:', testFaqItem);
            const testQuestion = testFaqItem.querySelector('.faq-question');
            const testAnswer = testFaqItem.querySelector('.faq-answer');
            console.log('Test question:', testQuestion);
            console.log('Test answer:', testAnswer);
            console.log('Answer display style:', testAnswer ? testAnswer.style.display : 'No answer found');
        } else {
            console.error('No FAQ items found for testing');
        }
    }, 1000);
    
    // Check scroll position
    window.addEventListener('scroll', () => {
        scrollPopup.checkScroll();
    });
    
    // Existing form submission handler
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData);
            
            // Send notifications
            sendLeadNotifications(data);
            
            // Show success message with action options
            showPostSubmissionOptions();
            
            // Reset form
            quoteForm.reset();
        });
    }
    

    
    // Contact modal functionality
    const contactLink = document.getElementById('contact-link');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            showContactModal();
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
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

// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.error('No FAQ items found!');
        return;
    }
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Set initial state
            answer.style.setProperty('display', 'none', 'important');
            
            question.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach((otherItem, otherIndex) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.setProperty('display', 'none', 'important');
                        }
                        const otherIcon = otherItem.querySelector('.faq-question i');
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



// Lead notification functions
function sendLeadNotifications(formData) {
    // Send email notification
    sendEmailNotification(formData);
    
    // Send SMS notification
    sendSMSNotification(formData);
    
    // Add to Google Sheets
    addToGoogleSheets(formData);
}

function sendEmailNotification(formData) {
    // Using Formspree for automatic email sending
    const formDataToSend = new FormData();
    formDataToSend.append('_replyto', 'connormorton.ffl@gmail.com');
    formDataToSend.append('_subject', 'New Lead - Veteran Valor Life Insurance');
    formDataToSend.append('message', `
New Lead from Veteran Valor Life Insurance

A new lead submission has been received. Here are the details:

Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email}
Date of Birth: ${formData.birthDate}
Coverage Amount: ${formData.coverage}
Policy Type: ${formData.policyType}
Submitted At: ${new Date().toLocaleString()}

Website: veteranvalorlifeinsurance.com
    `);
    
    // Send to Formspree endpoint
    fetch('https://formspree.io/f/mqalpban', {
        method: 'POST',
        body: formDataToSend,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Email notification sent successfully');
        } else {
            console.log('Email notification failed');
        }
    })
    .catch(error => {
        console.log('Email notification error:', error);
    });
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'lead-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function sendSMSNotification(formData) {
    // Using Formspree for SMS via email-to-SMS gateway
    const smsFormData = new FormData();
    smsFormData.append('_replyto', '5419122048@messaging.sprintpcs.com');
    smsFormData.append('_subject', 'New Lead - Veteran Valor Life Insurance');
    smsFormData.append('message', `
New Lead from Veteran Valor Life Insurance

Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email}
Coverage: ${formData.coverage}
Policy: ${formData.policyType}
Submitted: ${new Date().toLocaleString()}

Website: veteranvalorlifeinsurance.com
    `);
    
    // Send to Formspree endpoint for SMS
    fetch('https://formspree.io/f/mqalpban', {
        method: 'POST',
        body: smsFormData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('SMS notification sent successfully');
        } else {
            console.log('SMS notification failed');
        }
    })
    .catch(error => {
        console.log('SMS notification error:', error);
    });
}

// Google Sheets integration
function addToGoogleSheets(formData) {
    // Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyBIGI0I7MpHZcs9zVbWuyElpjyQUWhNxwMNLolRbc4yAva_yZ6el9vdv1pd0DOb27a/exec';
    
    // Prepare data for Google Sheets - matching your actual sheet structure
    const sheetsData = {
        'Submit time UTC': new Date().toISOString(),
        'Gclid': '', // Will be empty for direct website submissions
        'Campaign Id': '',
        'Ad Group Id': '',
        'Creative Id': '',
        'EMAIL': formData.email,
        'PHONE_NUMBER': formData.phone,
        'FIRST_NAME': formData.firstName,
        'LAST_NAME': formData.lastName,
        'REGION': '', // Could be added to form later
        'Lead Stage': 'Raw lead - Website form - Submit',
        'Coverage Amount': formData.coverage,
        'Policy Type': formData.policyType,
        'Date of Birth': formData.birthDate,
        'Website': 'veteranvalorlifeinsurance.com'
    };
    
    // Send to Google Apps Script
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetsData)
    })
    .then(response => {
        console.log('Data added to Google Sheets successfully');
    })
    .catch(error => {
        console.log('Google Sheets error:', error);
    });
}

// Contact modal function
function showContactModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>📞 Contact Veteran Valor Life Insurance</h3>
                <p>Choose how you'd like to get in touch with our veteran-focused specialists</p>
            </div>
            <div class="contact-grid">
                <div class="contact-box phone-box" onclick="window.location.href='tel:+15419122048'">
                    <div class="contact-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <h4>Call Now</h4>
                    <p class="contact-number">1-800-VET-INSURANCE</p>
                    <p class="contact-subtitle">Direct: (541) 912-2048</p>
                    <div class="contact-action">
                        <span>Click to Call</span>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
                
                <div class="contact-box appointment-box" onclick="window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2tb3Wkux3jJ0hIn5Yoyp-1wGik3O6V44FeiaCj-g-7mnEr6tu5ME5mzzlrqum3GxvqsDja07fQ?gv=true', '_blank')">
                    <div class="contact-icon">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <h4>Book Consultation</h4>
                    <p class="contact-number">Free 30-Minute Session</p>
                    <p class="contact-subtitle">Schedule your appointment</p>
                    <div class="contact-action">
                        <span>Book Now</span>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
                
                <div class="contact-box hours-box">
                    <div class="contact-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h4>Business Hours</h4>
                    <p class="contact-number">Mon-Fri: 8AM-6PM PST</p>
                    <p class="contact-subtitle">Sat: 9AM-2PM PST</p>
                    <div class="contact-action">
                        <span>Available Now</span>
                        <i class="fas fa-check"></i>
                    </div>
                </div>
                
                <div class="contact-box specialist-box">
                    <div class="contact-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h4>Your Specialist</h4>
                    <p class="contact-number">Connor Morton</p>
                    <p class="contact-subtitle">Veteran Life Insurance Specialist</p>
                    <div class="contact-action">
                        <span>Dedicated Support</span>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-outline close-contact-btn">
                    <i class="fas fa-times"></i>
                    Close
                </button>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-contact-btn');
    const overlay = modal.querySelector('.modal-overlay');
    const callBtn = modal.querySelector('.call-now-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    overlay.addEventListener('click', () => {
        modal.remove();
    });
    
    callBtn.addEventListener('click', () => {
        window.location.href = 'tel:+15419122048';
    });
    
    // Auto-remove after 60 seconds if not interacted with
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 60000);
}

// Post-submission options function
function showPostSubmissionOptions() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'post-submission-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎉 Thank You for Your Interest!</h3>
                <p>A Veteran Valor specialist will contact you within 24 hours to provide your personalized quote.</p>
            </div>
            <div class="modal-actions">
                <h4>What would you like to do next?</h4>
                <div class="action-buttons">
                    <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2tb3Wkux3jJ0hIn5Yoyp-1wGik3O6V44FeiaCj-g-7mnEr6tu5ME5mzzlrqum3GxvqsDja07fQ?gv=true" 
                       target="_blank" class="btn btn-primary appointment-btn">
                        <i class="fas fa-calendar-alt"></i>
                        Book Consultation Now
                    </a>
                    <a href="tel:+15419122048" class="btn btn-outline call-btn">
                        <i class="fas fa-phone"></i>
                        Call Directly: 1-800-VET-INSURANCE
                    </a>
                    <button class="btn btn-secondary close-modal-btn">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    overlay.addEventListener('click', () => {
        modal.remove();
    });
    
    // Auto-remove after 30 seconds if not interacted with
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 30000);
}

// Form validation function
function validateForm(formData) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'birthDate', 'coverage', 'service', 'health'];
    
    for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            showErrorMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        showErrorMessage('Please enter a valid phone number.');
        return false;
    }
    
    // Date validation
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 18 || age > 85) {
        showErrorMessage('Applicant must be between 18 and 85 years old.');
        return false;
    }
    
    return true;
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your quote request has been submitted successfully. One of our veteran specialists will contact you within 24 hours with your personalized quote.</p>
        </div>
    `;
    
    // Add styles
    successMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const successContent = successMessage.querySelector('.success-content');
    successContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 12px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
    `;
    
    successContent.querySelector('i').style.cssText = `
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 1rem;
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
    
    // Click to close
    successMessage.addEventListener('click', function() {
        this.remove();
    });
}

// Show error message
function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    // Add styles
    errorMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
    `;
    
    errorMessage.querySelector('i').style.cssText = `
        margin-right: 0.5rem;
        color: white;
    `;
    
    errorMessage.querySelector('.error-content').style.cssText = `
        display: flex;
        align-items: center;
    `;
    
    document.body.appendChild(errorMessage);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

// Add loading state to form submission
function addLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    // Reset after 2 seconds (simulating API call)
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Initialize counter animation when elements come into view
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe counter elements
document.addEventListener('DOMContentLoaded', function() {
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.benefit-card, .product-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('.form-group input, .form-group select');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}); 