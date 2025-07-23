// Blog Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const blogCards = document.querySelectorAll('.blog-card');
    const blogPopup = document.getElementById('blogPopup');
    const blogPopupBody = document.getElementById('blogPopupBody');
    const blogPopupClose = document.getElementById('blogPopupClose');

    // Blog content data
    const blogContent = {
        1: {
            title: "Complete Guide to Life Insurance for Veterans",
            date: "January 20, 2025",
            readTime: "5 min read",
            content: `
                <div class="blog-popup-header">
                    <h2>Complete Guide to Life Insurance for Veterans</h2>
                    <div class="blog-popup-meta">
                        <span>${new Date().toLocaleDateString()}</span>
                        <span>5 min read</span>
                    </div>
                </div>
                
                <h3>Understanding Veteran Life Insurance Options</h3>
                <p>As a veteran, you have access to unique life insurance options that can provide comprehensive protection for your family. This guide covers everything from VA benefits to private insurance options, helping you make informed decisions about your coverage.</p>
                
                <h4>VA Life Insurance Programs</h4>
                <p>The Department of Veterans Affairs offers several life insurance programs specifically designed for veterans:</p>
                <ul>
                    <li><strong>Servicemembers' Group Life Insurance (SGLI):</strong> Available to active duty service members</li>
                    <li><strong>Veterans' Group Life Insurance (VGLI):</strong> Available after separation from service</li>
                    <li><strong>Family Servicemembers' Group Life Insurance (FSGLI):</strong> Coverage for spouses and children</li>
                </ul>
                
                <div class="highlight-box">
                    <h4>Key Benefits for Veterans</h4>
                    <p>Veterans often qualify for special rates and coverage options not available to the general public. These benefits can include reduced premiums, no medical exam options, and guaranteed acceptance programs.</p>
                </div>
                
                <h4>Private Life Insurance Options</h4>
                <p>In addition to VA programs, veterans can access private life insurance options that may offer:</p>
                <ul>
                    <li>Higher coverage amounts</li>
                    <li>More flexible terms</li>
                    <li>Additional riders and benefits</li>
                    <li>Competitive rates for veterans</li>
                </ul>
                
                <div class="cta-box">
                    <h4>Get Your Free Veteran Life Insurance Quote</h4>
                    <p>Compare rates from top military-friendly insurance providers and find the best coverage for your needs.</p>
                    <a href="#quote" class="btn">Get Free Quote</a>
                </div>
            `
        },
        2: {
            title: "VA Life Insurance vs. Private Life Insurance",
            date: "January 21, 2025",
            readTime: "4 min read",
            content: `
                <div class="blog-popup-header">
                    <h2>VA Life Insurance vs. Private Life Insurance</h2>
                    <div class="blog-popup-meta">
                        <span>${new Date().toLocaleDateString()}</span>
                        <span>4 min read</span>
                    </div>
                </div>
                
                <h3>Comparing Your Options</h3>
                <p>Understanding the differences between VA and private life insurance can help you choose the best coverage for your situation. Each option has unique benefits and considerations.</p>
                
                <h4>VA Life Insurance Advantages</h4>
                <ul>
                    <li><strong>Guaranteed acceptance</strong> for qualified veterans</li>
                    <li><strong>No medical exam</strong> required for some programs</li>
                    <li><strong>Portable coverage</strong> that follows you after service</li>
                    <li><strong>Competitive rates</strong> for veterans</li>
                </ul>
                
                <h4>Private Life Insurance Advantages</h4>
                <ul>
                    <li><strong>Higher coverage amounts</strong> available</li>
                    <li><strong>More flexible terms</strong> and conditions</li>
                    <li><strong>Additional riders</strong> and benefits</li>
                    <li><strong>Cash value options</strong> with whole life policies</li>
                </ul>
                
                <div class="highlight-box">
                    <h4>Making the Right Choice</h4>
                    <p>The best option depends on your individual circumstances, including your health, coverage needs, and budget. Many veterans choose to combine both VA and private coverage for comprehensive protection.</p>
                </div>
                
                <div class="cta-box">
                    <h4>Compare Your Options Today</h4>
                    <p>Get personalized quotes from both VA and private insurance providers to find the best combination for your needs.</p>
                    <a href="#quote" class="btn">Compare Quotes</a>
                </div>
            `
        },
        3: {
            title: "Veteran Life Insurance: No Medical Exam Options",
            date: "January 22, 2025",
            readTime: "6 min read",
            content: `
                <div class="blog-popup-header">
                    <h2>Veteran Life Insurance: No Medical Exam Options</h2>
                    <div class="blog-popup-meta">
                        <span>${new Date().toLocaleDateString()}</span>
                        <span>6 min read</span>
                    </div>
                </div>
                
                <h3>No Medical Exam Life Insurance for Veterans</h3>
                <p>Many veterans qualify for life insurance coverage without undergoing a medical exam. These options provide quick approval and coverage, making them ideal for veterans who want immediate protection.</p>
                
                <h4>Types of No Medical Exam Coverage</h4>
                <ul>
                    <li><strong>Guaranteed Issue:</strong> No health questions asked</li>
                    <li><strong>Simplified Issue:</strong> Limited health questions</li>
                    <li><strong>Accelerated Underwriting:</strong> Quick approval based on available data</li>
                </ul>
                
                <h4>Qualification Requirements</h4>
                <p>To qualify for no medical exam life insurance as a veteran, you typically need to:</p>
                <ul>
                    <li>Be within the eligible age range (usually 18-80)</li>
                    <li>Meet basic service requirements</li>
                    <li>Complete a simple application</li>
                    <li>Provide basic personal information</li>
                </ul>
                
                <div class="highlight-box">
                    <h4>Coverage Amounts</h4>
                    <p>No medical exam policies typically offer coverage amounts from $10,000 to $500,000, depending on your age and the specific program. These amounts are often sufficient for final expenses and basic family protection.</p>
                </div>
                
                <div class="cta-box">
                    <h4>Get Quick Coverage Today</h4>
                    <p>Apply for no medical exam life insurance and get coverage in as little as 24 hours.</p>
                    <a href="#quote" class="btn">Apply Now</a>
                </div>
            `
        },
        4: {
            title: "Military Life Insurance: What Happens After Service?",
            date: "January 23, 2025",
            readTime: "5 min read",
            content: `
                <div class="blog-popup-header">
                    <h2>Military Life Insurance: What Happens After Service?</h2>
                    <div class="blog-popup-meta">
                        <span>${new Date().toLocaleDateString()}</span>
                        <span>5 min read</span>
                    </div>
                </div>
                
                <h3>Life Insurance Options After Military Service</h3>
                <p>When you separate from military service, your life insurance options change. Understanding these changes and your available options is crucial for maintaining adequate protection for your family.</p>
                
                <h4>Transitioning from SGLI to VGLI</h4>
                <p>When you leave active duty, your Servicemembers' Group Life Insurance (SGLI) coverage ends. However, you have the option to convert to Veterans' Group Life Insurance (VGLI):</p>
                <ul>
                    <li><strong>120-day window</strong> to apply for VGLI</li>
                    <li><strong>Same coverage amount</strong> as your SGLI</li>
                    <li><strong>No medical exam</strong> required</li>
                    <li><strong>Portable coverage</strong> that follows you</li>
                </ul>
                
                <h4>Private Insurance Options</h4>
                <p>After separation, you can also explore private life insurance options that may offer:</p>
                <ul>
                    <li>More competitive rates</li>
                    <li>Higher coverage amounts</li>
                    <li>Additional benefits and riders</li>
                    <li>Cash value accumulation</li>
                </ul>
                
                <div class="highlight-box">
                    <h4>Planning Your Transition</h4>
                    <p>Start planning your life insurance transition before you separate from service. This ensures continuous coverage and prevents any gaps in protection for your family.</p>
                </div>
                
                <div class="cta-box">
                    <h4>Plan Your Transition</h4>
                    <p>Get expert guidance on transitioning your life insurance coverage after military service.</p>
                    <a href="#quote" class="btn">Get Guidance</a>
                </div>
            `
        },
        5: {
            title: "Top 10 Life Insurance Companies for Veterans",
            date: "January 24, 2025",
            readTime: "7 min read",
            content: `
                <div class="blog-popup-header">
                    <h2>Top 10 Life Insurance Companies for Veterans</h2>
                    <div class="blog-popup-meta">
                        <span>${new Date().toLocaleDateString()}</span>
                        <span>7 min read</span>
                    </div>
                </div>
                
                <h3>Best Life Insurance Companies for Veterans</h3>
                <p>Choosing the right life insurance company is crucial for veterans. The best companies offer competitive rates, excellent customer service, and understand the unique needs of military personnel.</p>
                
                <h4>Our Top Picks</h4>
                <ol>
                    <li><strong>USAA:</strong> Military-focused with excellent veteran benefits</li>
                    <li><strong>Navy Mutual:</strong> Specialized in military life insurance</li>
                    <li><strong>Armed Forces Benefit Association:</strong> Competitive rates for veterans</li>
                    <li><strong>American Armed Forces Mutual Aid Association:</strong> Veteran-friendly policies</li>
                    <li><strong>Veterans of Foreign Wars:</strong> Specialized veteran coverage</li>
                    <li><strong>American Legion:</strong> Comprehensive veteran benefits</li>
                    <li><strong>Military Officers Association of America:</strong> Officer-focused coverage</li>
                    <li><strong>Veterans Advantage:</strong> Discount programs for veterans</li>
                    <li><strong>Veterans of Foreign Wars Insurance:</strong> VFW member benefits</li>
                    <li><strong>American Veterans:</strong> AMVETS insurance programs</li>
                </ol>
                
                <h4>What to Look For</h4>
                <ul>
                    <li>Competitive rates for veterans</li>
                    <li>No medical exam options</li>
                    <li>Excellent customer service</li>
                    <li>Understanding of military service</li>
                    <li>Flexible coverage options</li>
                </ul>
                
                <div class="highlight-box">
                    <h4>Getting the Best Rates</h4>
                    <p>Compare quotes from multiple companies to ensure you're getting the best rates and coverage for your specific situation.</p>
                </div>
                
                <div class="cta-box">
                    <h4>Compare Top Companies</h4>
                    <p>Get quotes from the top life insurance companies for veterans and find the best coverage for your needs.</p>
                    <a href="#quote" class="btn">Compare Companies</a>
                </div>
            `
        },
        6: {
            title: "Veteran Life Insurance Rates Comparison",
            date: "January 25, 2025",
            readTime: "3 min read",
            content: `
                <div class="blog-popup-header">
                    <h2>Veteran Life Insurance Rates Comparison</h2>
                    <div class="blog-popup-meta">
                        <span>${new Date().toLocaleDateString()}</span>
                        <span>3 min read</span>
                    </div>
                </div>
                
                <h3>Understanding Veteran Life Insurance Rates</h3>
                <p>Veteran life insurance rates can vary significantly between companies and policies. Understanding the factors that affect your rates can help you find the most affordable coverage.</p>
                
                <h4>Factors Affecting Rates</h4>
                <ul>
                    <li><strong>Age:</strong> Younger veterans typically pay lower rates</li>
                    <li><strong>Health:</strong> Better health often means lower premiums</li>
                    <li><strong>Coverage amount:</strong> Higher coverage means higher premiums</li>
                    <li><strong>Policy type:</strong> Term vs. whole life affects rates</li>
                    <li><strong>Military service:</strong> Some companies offer veteran discounts</li>
                </ul>
                
                <h4>Average Rates by Age</h4>
                <p>Here are typical monthly rates for $250,000 term life insurance:</p>
                <ul>
                    <li><strong>Age 30:</strong> $15-25 per month</li>
                    <li><strong>Age 40:</strong> $20-35 per month</li>
                    <li><strong>Age 50:</strong> $40-70 per month</li>
                    <li><strong>Age 60:</strong> $80-150 per month</li>
                </ul>
                
                <div class="highlight-box">
                    <h4>Veteran Discounts</h4>
                    <p>Many insurance companies offer special discounts for veterans, which can reduce your premiums by 10-30% compared to standard rates.</p>
                </div>
                
                <div class="cta-box">
                    <h4>Get Your Personalized Quote</h4>
                    <p>Compare rates from top companies and find the most affordable veteran life insurance coverage.</p>
                    <a href="#quote" class="btn">Get Quote</a>
                </div>
            `
        }
    };

    // Open blog popup
    blogCards.forEach(card => {
        card.addEventListener('click', function() {
            const blogId = this.getAttribute('data-blog');
            const blogData = blogContent[blogId];
            
            if (blogData) {
                blogPopupBody.innerHTML = blogData.content;
                blogPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close blog popup
    blogPopupClose.addEventListener('click', function() {
        blogPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close popup when clicking overlay
    blogPopup.addEventListener('click', function(e) {
        if (e.target === this) {
            blogPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && blogPopup.classList.contains('active')) {
            blogPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}); 