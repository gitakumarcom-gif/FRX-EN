/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Staff from './components/Staff';
import Rules from './components/Rules';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { ToastMessage } from './types';
import { soundFx } from './utils/audio';

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Initialize sound preferences from localStorage
  useEffect(() => {
    const savedSound = localStorage.getItem('frx_sound_enabled');
    if (savedSound === 'true') {
      setSoundEnabled(true);
      soundFx.enabled = true;
    }

    // Global keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      } else if (e.key === 'd' || e.key === 'D') {
        addToast('Redirecting to official FRX EN Discord server...', 'info');
        window.open('https://discord.gg/TfHCtNkeDd', '_blank', 'noopener,noreferrer');
      } else if (e.key === 'c' || e.key === 'C') {
        navigator.clipboard.writeText('https://discord.gg/TfHCtNkeDd');
        soundFx.playSuccess();
        addToast('Discord invite link copied to clipboard!');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFx.enabled = nextState;
    localStorage.setItem('frx_sound_enabled', String(nextState));
    if (nextState) {
      soundFx.playTacticalBeep();
      addToast('Tactical audio feedback enabled', 'info');
    } else {
      addToast('Tactical audio muted', 'info');
    }
  };

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    const newToast: ToastMessage = { id, message, type };
    setToasts((prev) => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCopyInvite = () => {
    addToast('Discord invite link copied to clipboard!');
  };

  const handleCopyStaffText = (text: string, label: string) => {
    addToast(`Copied ${label}: ${text}`);
  };

  const handleCopyRule = (ruleText: string) => {
    addToast(`Copied: ${ruleText}`);
  };

  const handleJoinDiscordClick = () => {
    addToast('Opening official FRX EN Discord server...', 'info');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] relative selection:bg-red-600/30 selection:text-white">
      {/* Subtle background grid pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Ambient top red bloom */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-600/[0.04] blur-[150px] pointer-events-none" />

      {/* Sticky Navigation Bar */}
      <Navbar
        onJoinDiscord={handleJoinDiscordClick}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* HOME SECTION */}
        <Hero
          onCopyInvite={handleCopyInvite}
          onJoinDiscord={handleJoinDiscordClick}
          onCopyText={handleCopyStaffText}
        />

        {/* ABOUT SECTION */}
        <About />

        {/* STAFF SECTION */}
        <Staff onCopyText={handleCopyStaffText} />

        {/* RULES SECTION */}
        <Rules onCopyRule={handleCopyRule} />

        {/* CONTACT SECTION */}
        <Contact
          onCopyContact={(text) => handleCopyStaffText(text, 'Discord username')}
          onJoinDiscord={handleJoinDiscordClick}
        />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* TOAST SYSTEM */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
