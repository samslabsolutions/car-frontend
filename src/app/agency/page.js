// src/app/agency/page.js
"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Content from '@/components/Content';

export default function Agency() {
    const [activeSection, setActiveSection] = useState('Dashboard');

    return (
        <>
            <Head>
                <title>Agency Dashboard</title>
            </Head>
            <div className="flex h-screen bg-gray-50">
                <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header activeSection={activeSection} />
                    <Content activeSection={activeSection} />
                </div>
            </div>
        </>
    );
}