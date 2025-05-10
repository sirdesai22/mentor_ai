'use client';

import Head from 'next/head';
import {
  Brain,
  Zap,
  Gamepad2,
  BarChart3,
  Users,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Target,
  Puzzle,
  Award,
  PlayCircle,
  Lightbulb,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import Navbar from './components/landing_page/Navbar';
import HeroSection from './components/landing_page/Hero';
import HowItWorksSection from './components/landing_page/HowItWorks';
import FeaturesSection from './components/landing_page/Features';
import ShowcaseSection from './components/landing_page/Showcase';
import CallToActionSection from './components/landing_page/CallToAction';
import Footer from './components/landing_page/Footer';

// Main Page Component
export default function MentorAILandingPage() {
  return (
    <>
      <div className="font-inter bg-gray-900 text-white min-h-screen flex flex-col antialiased overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <HowItWorksSection />
          <FeaturesSection />
          <ShowcaseSection />
          <CallToActionSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
