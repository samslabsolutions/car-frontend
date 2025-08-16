"use client";

import React, { useState } from 'react';
import { Scale, ChevronRight, Calendar, MapPin, Mail, Phone, FileText, Download, Printer, Share2, BookOpen, Clock, AlertCircle, CheckCircle, Info, ExternalLink, Gavel, ShieldCheck, CreditCard, Users, Building } from 'lucide-react';

export default function TermsAndConditions() {
    const [activeSection, setActiveSection] = useState('');
    const [showTOC, setShowTOC] = useState(true);

    const sections = [
        {
            id: 'acceptance',
            title: 'Acceptance of Terms',
            required: true,
            content: {
                summary: 'By using our services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.',
                details: [
                    'These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and TechCorp Solutions ("Company," "we," "us," or "our").',
                    'By accessing, browsing, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.',
                    'If you do not agree with any part of these Terms, you must not use our services.',
                    'These Terms apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and contributors of content.',
                    'We reserve the right to refuse service to anyone for any reason at any time.'
                ]
            }
        },
        {
            id: 'definitions',
            title: 'Definitions',
            required: true,
            content: {
                summary: 'Key terms and definitions used throughout these Terms and Conditions.',
                subsections: [
                    {
                        title: 'Service-Related Terms',
                        items: [
                            '"Service" refers to all products, services, and features provided by TechCorp Solutions',
                            '"Platform" means our website, mobile applications, and any related services',
                            '"Content" includes all text, graphics, images, music, software, audio, video, and other materials',
                            '"Account" refers to your registered user profile and associated data'
                        ]
                    },
                    {
                        title: 'Legal Terms',
                        items: [
                            '"Agreement" means these Terms and Conditions and any additional terms that apply',
                            '"Intellectual Property" includes patents, copyrights, trademarks, and trade secrets',
                            '"Prohibited Use" means any use that violates these Terms or applicable law',
                            '"Termination" refers to the ending of your access to our services'
                        ]
                    }
                ]
            }
        },
        {
            id: 'eligibility',
            title: 'User Eligibility',
            required: true,
            content: {
                summary: 'Requirements and restrictions for using our services, including age and capacity limitations.',
                subsections: [
                    {
                        title: 'Age Requirements',
                        items: [
                            'You must be at least 18 years old to use our services',
                            'Users between 13-17 require parental consent and supervision',
                            'We may require age verification for certain services',
                            'Services are not available to children under 13 years of age'
                        ]
                    },
                    {
                        title: 'Legal Capacity',
                        items: [
                            'You must have the legal capacity to enter into binding contracts',
                            'You represent that you are not prohibited from using our services under applicable law',
                            'Corporate accounts require proper authorization from the organization',
                            'You must provide accurate and complete registration information'
                        ]
                    },
                    {
                        title: 'Geographic Restrictions',
                        items: [
                            'Services may not be available in all countries or regions',
                            'You must comply with local laws and regulations in your jurisdiction',
                            'Some features may be restricted based on your location',
                            'Export control laws may limit access to certain services'
                        ]
                    }
                ]
            }
        },
        {
            id: 'account-registration',
            title: 'Account Registration and Security',
            required: true,
            content: {
                summary: 'Requirements for creating and maintaining user accounts, including security responsibilities.',
                subsections: [
                    {
                        title: 'Account Creation',
                        items: [
                            'Provide accurate, current, and complete information during registration',
                            'Choose a unique username and secure password',
                            'Verify your email address and other contact information',
                            'Accept responsibility for all activity under your account'
                        ]
                    },
                    {
                        title: 'Account Security',
                        items: [
                            'Maintain the confidentiality of your login credentials',
                            'Notify us immediately of any unauthorized access or security breach',
                            'Use strong, unique passwords and enable two-factor authentication when available',
                            'Regularly review account activity and settings'
                        ]
                    },
                    {
                        title: 'Account Maintenance',
                        items: [
                            'Keep your account information current and accurate',
                            'Comply with our username and profile content policies',
                            'Respond promptly to verification requests',
                            'Follow proper procedures for account closure or deletion'
                        ]
                    }
                ]
            }
        },
        {
            id: 'acceptable-use',
            title: 'Acceptable Use Policy',
            required: true,
            content: {
                summary: 'Rules and restrictions governing how you may use our services and what activities are prohibited.',
                subsections: [
                    {
                        title: 'Permitted Uses',
                        items: [
                            'Use services for their intended commercial or personal purposes',
                            'Create, share, and collaborate on content within platform guidelines',
                            'Integrate with third-party services as explicitly permitted',
                            'Provide feedback and suggestions for service improvement'
                        ]
                    },
                    {
                        title: 'Prohibited Activities',
                        items: [
                            'Violate any applicable local, state, national, or international law',
                            'Transmit harmful, offensive, or illegal content',
                            'Infringe on intellectual property rights of others',
                            'Attempt to gain unauthorized access to our systems or other users\' accounts',
                            'Distribute malware, viruses, or other malicious code',
                            'Engage in spamming, phishing, or other fraudulent activities'
                        ]
                    },
                    {
                        title: 'Content Standards',
                        items: [
                            'Content must not contain hate speech, harassment, or discrimination',
                            'Respect privacy and confidentiality of other users',
                            'Do not share false, misleading, or deceptive information',
                            'Comply with copyright, trademark, and other intellectual property laws'
                        ]
                    }
                ]
            }
        },
        {
            id: 'payment-terms',
            title: 'Payment Terms and Billing',
            required: true,
            content: {
                summary: 'Pricing, payment methods, billing cycles, and refund policies for paid services.',
                subsections: [
                    {
                        title: 'Pricing and Fees',
                        items: [
                            'Current pricing is displayed on our website and is subject to change',
                            'All fees are exclusive of applicable taxes unless otherwise stated',
                            'Price changes will be communicated with advance notice',
                            'Promotional pricing may have specific terms and limitations'
                        ]
                    },
                    {
                        title: 'Payment Methods',
                        items: [
                            'We accept major credit cards, debit cards, and electronic payments',
                            'Payment information must be current, complete, and accurate',
                            'You authorize us to charge your selected payment method',
                            'Failed payments may result in service suspension or termination'
                        ]
                    },
                    {
                        title: 'Billing and Subscriptions',
                        items: [
                            'Subscription fees are billed in advance on a recurring basis',
                            'Billing cycles may be monthly, quarterly, or annually as selected',
                            'Auto-renewal can be disabled through your account settings',
                            'Pro-rated charges may apply for mid-cycle plan changes'
                        ]
                    },
                    {
                        title: 'Refunds and Cancellations',
                        items: [
                            'Refund eligibility depends on the specific service and circumstances',
                            'Subscription cancellations take effect at the end of the current billing period',
                            'No refunds for partial months or unused portions of services',
                            'Disputed charges should be reported within 30 days'
                        ]
                    }
                ]
            }
        },
        {
            id: 'intellectual-property',
            title: 'Intellectual Property Rights',
            required: true,
            content: {
                summary: 'Ownership of content, trademarks, copyrights, and licensing terms for our services and user-generated content.',
                subsections: [
                    {
                        title: 'Our Intellectual Property',
                        items: [
                            'We own all rights to our service, including software, designs, and trademarks',
                            'Our content is protected by copyright, trademark, and other intellectual property laws',
                            'You may not copy, modify, or distribute our proprietary materials without permission',
                            'Limited license is granted solely for authorized use of our services'
                        ]
                    },
                    {
                        title: 'User Content Rights',
                        items: [
                            'You retain ownership of content you create and upload to our platform',
                            'You grant us a license to use your content to provide and improve our services',
                            'You represent that you have rights to all content you submit',
                            'We may remove content that violates our policies or infringes on others\' rights'
                        ]
                    },
                    {
                        title: 'Third-Party Content',
                        items: [
                            'Third-party content is owned by respective rights holders',
                            'You must obtain proper licenses for any third-party content you use',
                            'We respond to valid copyright infringement notices under DMCA',
                            'Repeat infringers may have their accounts terminated'
                        ]
                    }
                ]
            }
        },
        {
            id: 'privacy-data',
            title: 'Privacy and Data Protection',
            required: true,
            content: {
                summary: 'How we handle your personal information and your privacy rights in connection with our services.',
                details: [
                    'Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.',
                    'By using our services, you consent to the data practices described in our Privacy Policy.',
                    'We implement appropriate technical and organizational measures to protect your personal information.',
                    'You have certain rights regarding your personal data, including access, correction, and deletion rights.',
                    'We comply with applicable data protection laws, including GDPR, CCPA, and other regional privacy regulations.'
                ]
            }
        },
        {
            id: 'service-availability',
            title: 'Service Availability and Modifications',
            required: true,
            content: {
                summary: 'Our commitments regarding service uptime, maintenance, and our right to modify or discontinue services.',
                subsections: [
                    {
                        title: 'Service Availability',
                        items: [
                            'We strive to provide reliable service but do not guarantee 100% uptime',
                            'Planned maintenance will be announced in advance when possible',
                            'Emergency maintenance may occur without prior notice',
                            'Service level agreements (SLAs) may apply to certain premium services'
                        ]
                    },
                    {
                        title: 'Service Modifications',
                        items: [
                            'We may modify, update, or discontinue services at any time',
                            'Material changes will be communicated through appropriate channels',
                            'New features may be added to enhance service functionality',
                            'Legacy features may be deprecated with reasonable notice'
                        ]
                    },
                    {
                        title: 'Third-Party Dependencies',
                        items: [
                            'Our services may rely on third-party providers and integrations',
                            'Availability may be affected by third-party service disruptions',
                            'We are not liable for third-party service failures or limitations',
                            'Alternative solutions may be provided when feasible'
                        ]
                    }
                ]
            }
        },
        {
            id: 'termination',
            title: 'Termination of Services',
            required: true,
            content: {
                summary: 'Circumstances under which services may be terminated and the effects of termination.',
                subsections: [
                    {
                        title: 'Termination by You',
                        items: [
                            'You may terminate your account at any time through account settings',
                            'Termination stops future billing but does not entitle you to refunds',
                            'You remain responsible for any outstanding charges',
                            'Data export options may be available before account closure'
                        ]
                    },
                    {
                        title: 'Termination by Us',
                        items: [
                            'We may suspend or terminate accounts for violation of these Terms',
                            'Termination may be immediate for serious violations or illegal activity',
                            'We may terminate services with notice for business reasons',
                            'Repeated policy violations may result in permanent account closure'
                        ]
                    },
                    {
                        title: 'Effects of Termination',
                        items: [
                            'Access to services will be discontinued immediately upon termination',
                            'Your data may be deleted after a reasonable retention period',
                            'Some provisions of these Terms survive termination',
                            'Outstanding obligations remain enforceable after termination'
                        ]
                    }
                ]
            }
        },
        {
            id: 'disclaimers',
            title: 'Disclaimers and Warranties',
            required: true,
            content: {
                summary: 'Legal disclaimers regarding service warranties, representations, and limitations.',
                details: [
                    'OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED.',
                    'WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
                    'WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.',
                    'YOU ACKNOWLEDGE THAT YOUR USE OF OUR SERVICES IS AT YOUR SOLE RISK.',
                    'SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES, SO SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.'
                ]
            }
        },
        {
            id: 'limitation-liability',
            title: 'Limitation of Liability',
            required: true,
            content: {
                summary: 'Limits on our liability for damages arising from your use of our services.',
                details: [
                    'TO THE FULLEST EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.',
                    'OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRIOR TO THE CLAIM.',
                    'WE ARE NOT LIABLE FOR DAMAGES CAUSED BY YOUR FAILURE TO KEEP YOUR ACCOUNT CREDENTIALS SECURE.',
                    'WE ARE NOT RESPONSIBLE FOR THIRD-PARTY CONTENT, SERVICES, OR ACTIONS.',
                    'THESE LIMITATIONS APPLY WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS.'
                ]
            }
        },
        {
            id: 'indemnification',
            title: 'Indemnification',
            required: true,
            content: {
                summary: 'Your agreement to defend and hold us harmless from certain claims and damages.',
                details: [
                    'You agree to indemnify, defend, and hold harmless TechCorp Solutions and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services.',
                    'This includes claims related to your violation of these Terms, infringement of third-party rights, or violation of applicable law.',
                    'You agree to cooperate fully in the defense of any such claims and to pay all associated costs and expenses.',
                    'We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you.',
                    'This indemnification obligation survives termination of these Terms and your use of our services.'
                ]
            }
        },
        {
            id: 'dispute-resolution',
            title: 'Dispute Resolution',
            required: true,
            content: {
                summary: 'Procedures for resolving disputes, including arbitration and governing law provisions.',
                subsections: [
                    {
                        title: 'Governing Law',
                        items: [
                            'These Terms are governed by the laws of the State of California',
                            'Disputes will be resolved in accordance with California state and federal law',
                            'International users may have additional rights under local law',
                            'Conflicts of law principles do not apply'
                        ]
                    },
                    {
                        title: 'Dispute Resolution Process',
                        items: [
                            'Initial disputes should be addressed through our customer support',
                            'Formal complaints can be submitted to our legal department',
                            'We encourage good faith negotiation to resolve disputes',
                            'Alternative dispute resolution may be available'
                        ]
                    },
                    {
                        title: 'Arbitration Agreement',
                        items: [
                            'Most disputes must be resolved through binding arbitration',
                            'Arbitration will be conducted under the rules of the American Arbitration Association',
                            'Small claims court actions are excluded from arbitration',
                            'Class action lawsuits are waived in favor of individual arbitration'
                        ]
                    },
                    {
                        title: 'Jurisdiction and Venue',
                        items: [
                            'Legal actions must be brought in San Francisco County, California',
                            'You consent to personal jurisdiction in California courts',
                            'Venue is proper in the Northern District of California',
                            'This applies to disputes not subject to arbitration'
                        ]
                    }
                ]
            }
        }
    ];

    const legalNotices = [
        { title: 'Binding Agreement', description: 'These terms create a legally binding contract between you and our company.' },
        { title: 'Modification Rights', description: 'We reserve the right to modify these terms with appropriate notice to users.' },
        { title: 'Severability', description: 'If any provision is found invalid, the remaining terms continue to be enforceable.' },
        { title: 'Entire Agreement', description: 'These terms constitute the complete agreement between you and our company.' }
    ];

    const handleExportTerms = () => {
        console.log('Export terms requested');
        // Add your export functionality here
    };

    const handlePrintTerms = () => {
        window.print();
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
        }
    };

    return (
        <div className="bg-white min-h-screen mt-25">
            {/* Header with Terms Metadata */}
            <header className="bg-gray-50 border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-gray-50/95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Scale className="w-6 h-6 text-blue-600" />
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Terms and Conditions</h1>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Effective Date: August 16, 2025
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Version 3.2
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleExportTerms}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </button>
                            <button
                                onClick={handlePrintTerms}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Printer className="w-4 h-4 mr-2" />
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Table of Contents - Sticky Sidebar */}
                    <aside className={`lg:col-span-1 ${showTOC ? 'block' : 'hidden lg:block'}`}>
                        <div className="sticky top-24 space-y-6">
                            {/* Quick Summary Card */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                                    <Info className="w-4 h-4 mr-2" />
                                    Quick Summary
                                </h3>
                                <p className="text-xs text-blue-800 leading-relaxed">
                                    These terms govern your use of our services, define our mutual rights and responsibilities, and include important legal provisions.
                                </p>
                            </div>

                            {/* Table of Contents */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Contents
                                </h3>
                                <nav className="space-y-1">
                                    {sections.map((section, index) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={`block w-full text-left px-2 py-1.5 text-xs rounded transition-colors ${activeSection === section.id
                                                ? 'bg-blue-100 text-blue-700 font-medium'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{index + 1}. {section.title}</span>
                                                {section.required && (
                                                    <span className="text-red-500 text-xs">*</span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Legal Notices */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Legal Provisions</h3>
                                <div className="space-y-2">
                                    {legalNotices.map((notice, index) => (
                                        <div key={index} className="text-xs">
                                            <div className="font-medium text-gray-900">{notice.title}</div>
                                            <div className="text-gray-600 mt-0.5">{notice.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        {/* Introduction */}
                        <div className="mb-12">
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                                <div className="flex items-start space-x-3">
                                    <Gavel className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h2 className="text-lg font-semibold text-amber-900 mb-2">Legal Agreement</h2>
                                        <p className="text-sm text-amber-800 leading-relaxed">
                                            These Terms and Conditions constitute a legally binding agreement between you and TechCorp Solutions.
                                            Please read them carefully before using our services. By accessing or using our services, you agree to be bound by these terms.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-sm max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    Welcome to TechCorp Solutions. These Terms and Conditions ("Terms") govern your access to and use of our website,
                                    mobile applications, and services (collectively, the "Service") operated by TechCorp Solutions ("we," "us," or "our").
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    These Terms are effective as of the date you first access or use the Service and will remain in effect until terminated.
                                    We may modify these Terms at any time, and such modifications will be effective immediately upon posting.
                                </p>
                            </div>
                        </div>

                        {/* Terms Sections */}
                        <div className="space-y-12">
                            {sections.map((section, index) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-24"
                                >
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                            {index + 1}
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {section.title}
                                            {section.required && <span className="text-red-500 ml-1">*</span>}
                                        </h2>
                                    </div>

                                    {/* Section Summary */}
                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                        <p className="text-sm font-medium text-gray-900 mb-1">Summary</p>
                                        <p className="text-sm text-gray-700">{section.content.summary}</p>
                                    </div>

                                    {/* Section Content */}
                                    <div className="space-y-6">
                                        {section.content.details && (
                                            <div className="prose prose-sm max-w-none">
                                                {section.content.details.map((detail, detailIndex) => (
                                                    <p key={detailIndex} className="text-gray-700 leading-relaxed">
                                                        {detail}
                                                    </p>
                                                ))}
                                            </div>
                                        )}

                                        {section.content.subsections && (
                                            <div className="space-y-6">
                                                {section.content.subsections.map((subsection, subIndex) => (
                                                    <div key={subIndex}>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                                            {subsection.title}
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {subsection.items.map((item, itemIndex) => (
                                                                <li key={itemIndex} className="flex items-start space-x-2">
                                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                                    <span className="text-sm text-gray-700">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Separator */}
                                    {index < sections.length - 1 && (
                                        <hr className="mt-12 border-gray-200" />
                                    )}
                                </section>
                            ))}
                        </div>

                        {/* Contact Information */}
                        <section className="mt-16 bg-gray-50 rounded-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Building className="w-6 h-6 mr-3 text-blue-600" />
                                Legal Contact Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Department</h3>
                                    <div className="space-y-3 text-sm text-gray-700">
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                            <a href="mailto:legal@techcorp-solutions.com" className="text-blue-600 hover:underline">
                                                legal@techcorp-solutions.com
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                            <span>+1 (555) 123-4567</span>
                                        </div>
                                        <div className="flex items-start">
                                            <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                                            <div>
                                                TechCorp Solutions<br />
                                                Legal Department<br />
                                                123 Legal Plaza<br />
                                                San Francisco, CA 94105
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dispute Resolution</h3>
                                    <div className="text-sm text-gray-700 mb-4">
                                        For disputes related to these Terms, please first contact our legal department.
                                        We are committed to resolving issues through good faith negotiation.
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                            <span>Response time: 5-7 business days</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Gavel className="w-4 h-4 mr-2 text-gray-400" />
                                            <span>Arbitration available for qualifying disputes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Areas</h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                    <div className="bg-white p-3 rounded border">
                                        <div className="font-medium text-gray-900">United States</div>
                                        <div className="text-gray-600">Primary jurisdiction</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <div className="font-medium text-gray-900">European Union</div>
                                        <div className="text-gray-600">GDPR compliance</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <div className="font-medium text-gray-900">Canada</div>
                                        <div className="text-gray-600">PIPEDA compliance</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <div className="font-medium text-gray-900">Australia</div>
                                        <div className="text-gray-600">Privacy Act compliance</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Amendment Process */}
                        <section className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-blue-900 mb-4">Changes to These Terms</h2>
                            <div className="text-sm text-blue-800 space-y-3">
                                <p>
                                    We reserve the right to modify these Terms at any time. When we make material changes,
                                    we will notify you through one or more of the following methods:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Email notification to your registered email address</li>
                                    <li>Prominent banner notice on our website</li>
                                    <li>In-app notification for mobile users</li>
                                    <li>Updated "Effective Date" at the top of these Terms</li>
                                </ul>
                                <p>
                                    Your continued use of our services after the effective date of any changes constitutes
                                    acceptance of the updated Terms. If you do not agree to the modified Terms,
                                    you must discontinue use of our services.
                                </p>
                            </div>
                        </section>

                        {/* Additional Legal Information */}
                        <section className="mt-12 space-y-8">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    Important Legal Disclaimers
                                </h3>
                                <div className="text-sm text-red-800 space-y-2">
                                    <p>
                                        <strong>No Legal Advice:</strong> Nothing in these Terms constitutes legal, financial,
                                        or professional advice. Consult qualified professionals for specific guidance.
                                    </p>
                                    <p>
                                        <strong>Risk Acknowledgment:</strong> Use of our services involves inherent risks.
                                        You acknowledge and accept these risks when using our platform.
                                    </p>
                                    <p>
                                        <strong>Third-Party Services:</strong> We are not responsible for third-party services,
                                        content, or policies that may be accessed through our platform.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                                    <ShieldCheck className="w-5 h-5 mr-2" />
                                    Your Rights and Protections
                                </h3>
                                <div className="text-sm text-green-800 space-y-2">
                                    <p>
                                        <strong>Consumer Protection:</strong> These Terms do not limit rights you may have
                                        under applicable consumer protection laws.
                                    </p>
                                    <p>
                                        <strong>Accessibility:</strong> We are committed to providing accessible services
                                        and accommodating users with disabilities.
                                    </p>
                                    <p>
                                        <strong>Privacy Rights:</strong> Your privacy rights are protected under our Privacy Policy
                                        and applicable data protection laws.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Effective Date and Version Information */}
                        <section className="mt-12 bg-gray-100 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Information</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <div className="font-medium text-gray-900 mb-1">Effective Date</div>
                                    <div className="text-gray-600">August 16, 2025</div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 mb-1">Version</div>
                                    <div className="text-gray-600">3.2</div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 mb-1">Last Review</div>
                                    <div className="text-gray-600">August 1, 2025</div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 mb-1">Next Review</div>
                                    <div className="text-gray-600">February 2026</div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 mb-1">Language</div>
                                    <div className="text-gray-600">English (Primary)</div>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 mb-1">Jurisdiction</div>
                                    <div className="text-gray-600">California, USA</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-300">
                                <p className="text-xs text-gray-600">
                                    These Terms and Conditions have been reviewed by qualified legal counsel and are designed
                                    to comply with applicable laws and regulations. For questions about specific legal implications,
                                    please consult your own legal advisor.
                                </p>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            {/* Footer */}
            {/* <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="text-sm font-semibold mb-3">Legal Documents</h4>
                            <ul className="space-y-2 text-xs text-gray-400">
                                <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                                <li><a href="#" className="hover:text-white">Acceptable Use Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-3">Support</h4>
                            <ul className="space-y-2 text-xs text-gray-400">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Contact Support</a></li>
                                <li><a href="#" className="hover:text-white">Report a Problem</a></li>
                                <li><a href="#" className="hover:text-white">Accessibility</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-3">Company</h4>
                            <ul className="space-y-2 text-xs text-gray-400">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Press</a></li>
                                <li><a href="#" className="hover:text-white">Investor Relations</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs text-gray-400">
                        <p>© 2025 TechCorp Solutions. All rights reserved.</p>
                        <p className="mt-2">
                            These Terms and Conditions are legally binding and govern your use of our services.
                            Please read them carefully and contact us with any questions.
                        </p>
                    </div>
                </div>
            </footer> */}
        </div>
    );
}