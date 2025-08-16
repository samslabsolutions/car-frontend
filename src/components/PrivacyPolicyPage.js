"use client";

import React, { useState } from 'react';
import { Shield, ChevronRight, Calendar, MapPin, Mail, Phone, FileText, Download, Printer, Share2, BookOpen, Clock, AlertCircle, CheckCircle, Info, ExternalLink } from 'lucide-react';

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('');
    const [showTOC, setShowTOC] = useState(true);

    const sections = [
        {
            id: 'overview',
            title: 'Overview',
            required: true,
            content: {
                summary: 'This Privacy Policy describes how we collect, use, and share your personal information.',
                details: [
                    'We are committed to protecting your privacy and being transparent about our data practices.',
                    'This policy applies to all services offered by TechCorp Solutions and our affiliated companies.',
                    'By using our services, you acknowledge that you have read and understand this Privacy Policy.'
                ]
            }
        },
        {
            id: 'information-collected',
            title: 'Information We Collect',
            required: true,
            content: {
                summary: 'We collect information you provide directly, automatically through your use of our services, and from third parties.',
                subsections: [
                    {
                        title: 'Information You Provide',
                        items: [
                            'Account information (name, email, phone number)',
                            'Profile information and preferences',
                            'Payment and billing information',
                            'Communications with customer support',
                            'Survey responses and feedback'
                        ]
                    },
                    {
                        title: 'Information Collected Automatically',
                        items: [
                            'Device information (IP address, browser type, operating system)',
                            'Usage data (pages visited, time spent, click patterns)',
                            'Location data (with your permission)',
                            'Cookies and similar tracking technologies'
                        ]
                    },
                    {
                        title: 'Information from Third Parties',
                        items: [
                            'Social media platforms (when you connect your accounts)',
                            'Marketing partners and advertising networks',
                            'Public databases and data aggregators',
                            'Business partners and service providers'
                        ]
                    }
                ]
            }
        },
        {
            id: 'use-of-information',
            title: 'How We Use Information',
            required: true,
            content: {
                summary: 'We use your information to provide services, improve user experience, communicate with you, and comply with legal obligations.',
                subsections: [
                    {
                        title: 'Service Operations',
                        items: [
                            'Provide, maintain, and improve our services',
                            'Process transactions and manage accounts',
                            'Authenticate users and prevent fraud',
                            'Provide customer support and technical assistance'
                        ]
                    },
                    {
                        title: 'Communications',
                        items: [
                            'Send service-related notifications',
                            'Respond to inquiries and requests',
                            'Send marketing communications (with consent)',
                            'Conduct surveys and market research'
                        ]
                    },
                    {
                        title: 'Legal and Business Purposes',
                        items: [
                            'Comply with legal obligations and regulations',
                            'Enforce our terms of service and policies',
                            'Protect our rights and prevent misuse',
                            'Support business transactions and due diligence'
                        ]
                    }
                ]
            }
        },
        {
            id: 'information-sharing',
            title: 'Information Sharing',
            required: true,
            content: {
                summary: 'We may share your information with service providers, business partners, and in certain legal circumstances.',
                subsections: [
                    {
                        title: 'Service Providers and Partners',
                        items: [
                            'Third-party vendors who provide services on our behalf',
                            'Payment processors and financial institutions',
                            'Cloud storage and hosting providers',
                            'Analytics and advertising partners (with consent)'
                        ]
                    },
                    {
                        title: 'Legal and Regulatory Requirements',
                        items: [
                            'Law enforcement agencies (when legally required)',
                            'Courts and government authorities',
                            'Regulatory bodies and compliance agencies',
                            'Legal counsel and professional advisors'
                        ]
                    },
                    {
                        title: 'Business Transfers',
                        items: [
                            'Mergers, acquisitions, or asset sales',
                            'Corporate restructuring or reorganization',
                            'Bankruptcy or insolvency proceedings',
                            'Due diligence processes'
                        ]
                    }
                ]
            }
        },
        {
            id: 'data-security',
            title: 'Data Security',
            required: true,
            content: {
                summary: 'We implement comprehensive security measures to protect your personal information.',
                details: [
                    'We use industry-standard encryption (AES-256) for data at rest and TLS 1.3 for data in transit.',
                    'Access to personal information is restricted to authorized personnel on a need-to-know basis.',
                    'Regular security assessments and penetration testing are conducted by independent third parties.',
                    'We maintain incident response procedures and will notify you of any data breaches as required by law.',
                    'Our security practices are audited annually and comply with ISO 27001 standards.'
                ]
            }
        },
        {
            id: 'data-retention',
            title: 'Data Retention',
            required: true,
            content: {
                summary: 'We retain your information only as long as necessary for legitimate business purposes and legal compliance.',
                subsections: [
                    {
                        title: 'Retention Periods',
                        items: [
                            'Account information: Retained while your account is active',
                            'Transaction records: 7 years for tax and audit purposes',
                            'Marketing data: Until you opt-out or withdraw consent',
                            'Support communications: 3 years after case closure',
                            'Legal compliance data: As required by applicable laws'
                        ]
                    },
                    {
                        title: 'Data Deletion',
                        items: [
                            'Automated deletion processes for expired data',
                            'Secure data destruction methods (NIST 800-88)',
                            'Certificate of destruction for sensitive data',
                            'Regular audits of data retention compliance'
                        ]
                    }
                ]
            }
        },
        {
            id: 'user-rights',
            title: 'Your Rights and Choices',
            required: true,
            content: {
                summary: 'You have various rights regarding your personal information, including access, correction, and deletion rights.',
                subsections: [
                    {
                        title: 'Access and Portability Rights',
                        items: [
                            'Request a copy of your personal information',
                            'Download your data in a portable format',
                            'Review how your information is being used',
                            'Verify the accuracy of your information'
                        ]
                    },
                    {
                        title: 'Control and Correction Rights',
                        items: [
                            'Update or correct inaccurate information',
                            'Request deletion of your personal information',
                            'Opt-out of marketing communications',
                            'Withdraw consent for data processing'
                        ]
                    },
                    {
                        title: 'Privacy Controls',
                        items: [
                            'Manage cookie preferences and tracking',
                            'Control data sharing with third parties',
                            'Set communication preferences',
                            'Request restrictions on data processing'
                        ]
                    }
                ]
            }
        },
        {
            id: 'international-transfers',
            title: 'International Data Transfers',
            required: false,
            content: {
                summary: 'Your information may be transferred to and processed in countries other than your own.',
                details: [
                    'We may transfer your personal information to servers located in the United States, European Union, and other countries.',
                    'All international transfers are protected by appropriate safeguards, including Standard Contractual Clauses approved by the European Commission.',
                    'We ensure that adequate levels of data protection are maintained regardless of where your information is processed.',
                    'You have the right to request information about the safeguards we use for international transfers.'
                ]
            }
        },
        {
            id: 'cookies-tracking',
            title: 'Cookies and Tracking Technologies',
            required: false,
            content: {
                summary: 'We use cookies and similar technologies to enhance your experience and analyze usage patterns.',
                subsections: [
                    {
                        title: 'Types of Cookies We Use',
                        items: [
                            'Essential cookies: Required for basic functionality',
                            'Performance cookies: Help us improve our services',
                            'Functionality cookies: Remember your preferences',
                            'Advertising cookies: Deliver relevant advertisements'
                        ]
                    },
                    {
                        title: 'Managing Cookie Preferences',
                        items: [
                            'Browser settings to block or delete cookies',
                            'Our cookie preference center',
                            'Third-party opt-out mechanisms',
                            'Do Not Track browser signals'
                        ]
                    }
                ]
            }
        },
        {
            id: 'childrens-privacy',
            title: "Children's Privacy",
            required: false,
            content: {
                summary: 'Our services are not intended for children under 13, and we do not knowingly collect information from children.',
                details: [
                    'We do not knowingly collect personal information from children under 13 years of age.',
                    'If we become aware that we have collected information from a child under 13, we will delete it promptly.',
                    'Parents or guardians who believe we may have collected information from their child should contact us immediately.',
                    'We comply with the Children\'s Online Privacy Protection Act (COPPA) and similar regulations.'
                ]
            }
        }
    ];

    const legalBases = [
        { title: 'Consent', description: 'You have given clear consent for processing your personal data for specific purposes.' },
        { title: 'Contract', description: 'Processing is necessary for the performance of a contract with you.' },
        { title: 'Legal Obligation', description: 'Processing is necessary for compliance with legal obligations.' },
        { title: 'Legitimate Interest', description: 'Processing is necessary for legitimate interests pursued by us or third parties.' }
    ];

    const handleExportData = () => {
        console.log('Export data requested');
        // Add your export functionality here
    };

    const handlePrintPolicy = () => {
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
            {/* Header with Policy Metadata */}
            <header className="bg-gray-50 border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-gray-50/95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Shield className="w-6 h-6 text-blue-600" />
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Privacy Policy</h1>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Last Updated: August 16, 2025
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Version 2.1
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleExportData}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </button>
                            <button
                                onClick={handlePrintPolicy}
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
                                    We collect personal information to provide our services, share it only when necessary, and give you control over your data.
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

                            {/* Legal Bases */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Legal Bases for Processing</h3>
                                <div className="space-y-2">
                                    {legalBases.map((basis, index) => (
                                        <div key={index} className="text-xs">
                                            <div className="font-medium text-gray-900">{basis.title}</div>
                                            <div className="text-gray-600 mt-0.5">{basis.description}</div>
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
                                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h2 className="text-lg font-semibold text-amber-900 mb-2">Important Information</h2>
                                        <p className="text-sm text-amber-800 leading-relaxed">
                                            This Privacy Policy is effective as of the date listed above and applies to TechCorp Solutions and all affiliated companies.
                                            We are committed to protecting your privacy and complying with applicable data protection laws, including GDPR, CCPA, and other regional privacy regulations.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-sm max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    At TechCorp Solutions ("Company," "we," "us," or "our"), we recognize that privacy is important to you.
                                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services,
                                    visit our website, or interact with us in other ways.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read,
                                    understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
                                </p>
                            </div>
                        </div>

                        {/* Policy Sections */}
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
                                <Mail className="w-6 h-6 mr-3 text-blue-600" />
                                Contact Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Protection Officer</h3>
                                    <div className="space-y-3 text-sm text-gray-700">
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                            <a href="mailto:dpo@techcorp-solutions.com" className="text-blue-600 hover:underline">
                                                dpo@techcorp-solutions.com
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
                                                Data Protection Office<br />
                                                123 Privacy Street<br />
                                                San Francisco, CA 94105
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Supervisory Authority</h3>
                                    <div className="text-sm text-gray-700 mb-4">
                                        If you are located in the European Union, you have the right to lodge a complaint with your local supervisory authority.
                                    </div>
                                    <a
                                        href="https://edpb.europa.eu/about-edpb/board/members_en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:underline text-sm"
                                    >
                                        Find your supervisory authority
                                        <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Times</h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                    <div className="bg-white p-3 rounded border">
                                        <div className="font-medium text-gray-900">Privacy Requests</div>
                                        <div className="text-gray-600">Within 30 days</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <div className="font-medium text-gray-900">Data Breaches</div>
                                        <div className="text-gray-600">Within 72 hours</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <div className="font-medium text-gray-900">General Inquiries</div>
                                        <div className="text-gray-600">Within 5 business days</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                        <div className="font-medium text-gray-900">Account Deletion</div>
                                        <div className="text-gray-600">Within 90 days</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Policy Changes */}
                        <section className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-blue-900 mb-4">Changes to This Privacy Policy</h2>
                            <div className="text-sm text-blue-800 space-y-3">
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                                    legal requirements, or other factors. Material changes will be communicated through:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Email notification to registered users</li>
                                    <li>Prominent notice on our website</li>
                                    <li>In-app notifications</li>
                                    <li>Updated "Last Modified" date</li>
                                </ul>
                                <p>
                                    We encourage you to review this Privacy Policy periodically. Your continued use of our services
                                    after any changes indicates your acceptance of the updated Privacy Policy.
                                </p>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            {/* Footer
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm">
                        <p>© 2025 TechCorp Solutions. All rights reserved.</p>
                        <p className="mt-2 text-gray-400">
                            This Privacy Policy is designed to help you understand our commitment to protecting your personal information
                            and complying with applicable privacy laws.
                        </p>
                    </div>
                </div>
            </footer> */}
        </div>
    );
}