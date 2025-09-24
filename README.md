## New Features: Enhanced Birthday Celebration Page

This update introduces a new, interactive birthday celebration page with a focus on mobile-first design, accessibility, and performance.

### Implemented Features:

1.  **Birthday Header Component (`BirthdayHeader.tsx`)**
    *   Reusable component for main greeting, accepts `name` (string), `age` (number, optional), and `subtitle` (string, optional) props.
    *   Mobile-first responsive styling with large, readable headlines.
    *   Uses `motion` from `framer-motion` for subtle animations.

2.  **Confetti Animation (`ConfettiWrapper.tsx`)**
    *   A wrapper component that triggers a confetti burst.
    *   Lazy-loads `canvas-confetti` to keep the initial bundle size small.
    *   Respects `prefers-reduced-motion` accessibility settings.
    *   Includes a floating toggle button to enable/disable animations, with preference saved in `localStorage`.
    *   Particle count is capped for mobile devices for performance.

3.  **Suggestion List (`SuggestionsList.tsx`)**
    *   Component to display an array of interactive suggestions with images/emojis, titles, and captions.
    *   Responsive grid layout: 1 column on small screens, 2 on medium, 3 on large.
    *   Images use `loading="lazy"`, `width`, and `height` for optimization and to prevent layout shifts.

4.  **Playlist Embed (`PlaylistEmbed.tsx`)**
    *   Component to embed a Spotify playlist using an `iframe`.
    *   Provides a graceful fallback with an image and link if the `embedUrl` is not provided or if embedding is blocked.

### Installation Steps:

To use these new features, you'll need to install `react-router-dom` and `canvas-confetti`.

```bash
npm install react-router-dom canvas-confetti framer-motion lucide-react
# or
yarn add react-router-dom canvas-confetti framer-motion lucide-react
```

### Usage:

A demo page, `src/pages/celebrate.tsx`, has been created to showcase the integration of all new components.

You can access this page by navigating to `/celebrate` in your application.

Example usage within `src/pages/celebrate.tsx`:

```tsx
import React, { useState, useEffect, useMemo } from 'react';
import BirthdayHeader from '@/components/BirthdayHeader';
import ConfettiWrapper from '@/components/ConfettiWrapper';
import SuggestionsList from '@/components/SuggestionsList';
import PlaylistEmbed from '@/components/PlaylistEmbed';
import { motion } from 'framer-motion';

// Example Data for SuggestionsList
const suggestions = [
  {
    id: 'message',
    emoji: '✍️',
    title: 'Write a Wish',
    caption: 'Send your heartfelt birthday wishes to Sakshi!',
    url: '#wishes', // Link to a potential wishes section
  },
  {
    id: 'gallery',
    imageSrc: 'https://images.unsplash.com/photo-1522335765-bb4e6d3ce032?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJpcnRoZGF5JTIwcGFydHl8ZW58MHx8MHx8fDA%3D',
    title: 'View Photo Gallery',
    caption: 'Relive cherished memories and special moments.',
    url: '#gallery', // Link to a potential photo gallery section
  },
  {
    id: 'music',
    emoji: '🎶',
    title: 'Enjoy the Playlist',
    caption: 'Listen to Sakshi\'s favorite tunes for a celebratory mood.',
    url: '#music', // Link to a potential music section
  },
  {
    id: 'memories',
    imageSrc: 'https://images.unsplash.com/photo-1517409287515-58e6e5a0046b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmlydGhkYXklMjBtZW1vcnllc3xlbnwwfHwwfHw%3D',
    title: 'Share a Memory',
    caption: 'Recall a fond memory you shared with Sakshi.',
    url: '#testimonials', // Link to a potential testimonials section
  },
];

const CelebratePage: React.FC = () => {
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti after a short delay on mount
    const timer = setTimeout(() => {
      setTriggerConfetti(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const spotifyEmbedUrl = useMemo(() => {
    return "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"; 
  }, []);

  const spotifyFallbackImageUrl = useMemo(() => {
    return "https://i.scdn.co/image/ab67706c0000bebb4d2843d8c1c0c6e8e8e8e8e8"; 
  }, []);

  const spotifyFallbackLinkUrl = useMemo(() => {
    return "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M";
  }, []);

  return (
    <ConfettiWrapper trigger={triggerConfetti} triggerOnMount={true} particleCount={300} durationMs={7000}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative">
        <main>
          <BirthdayHeader 
            name="Sakshi"
            age={25} // Optional age
            subtitle="A universe of love, just for you! ✨"
          />

          <motion.section 
            id="things-to-do"
            className="py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <SuggestionsList items={suggestions} />
          </motion.section>

          <motion.section 
            id="birthday-playlist"
            className="py-16 bg-gray-100 dark:bg-gray-800"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <PlaylistEmbed 
              title="Sakshi's Celebration Mix"
              description="Groove to the tunes curated just for Sakshi's special day!"
              embedUrl={spotifyEmbedUrl}
              fallbackImageUrl={spotifyFallbackImageUrl}
              fallbackLinkUrl={spotifyFallbackLinkUrl}
            />
          </motion.section>
        </main>
        {/* Footer and other global elements */}
      </div>
    </ConfettiWrapper>
  );
};

export default CelebratePage;
```

### Deployment on Vercel:

Your project is already configured for Vercel deployment (based on `vercel.json` and `vite.config.ts`).
To deploy these changes:

1.  **Commit your changes** to your Git repository (which you've already done for the code modifications).
2.  **Push your changes** to the `main` branch (or the branch connected to Vercel).
3.  Vercel will automatically detect the new commit and trigger a new deployment. You can monitor the deployment status on your Vercel dashboard.

### Acceptance Checklist (Manual QA):

Please verify the following manually after deployment:

*   **Header Displays Properly:**
    *   Check layout and readability on various mobile widths: 360px, 375px, 412px, 768px.
    *   Long names in `BirthdayHeader` should wrap gracefully.
*   **Confetti Functionality:**
    *   Confetti triggers once on mount when `triggerOnMount` is `true`.
    *   The floating "Sparkles" button appears at the bottom right.
    *   Clicking the "Sparkles" button reveals the "Animations" toggle.
    *   Toggling "Animations" off should immediately stop confetti and prevent future bursts.
    *   Ensure confetti performance is acceptable on mid-range mobile devices (e.g., iPhone 8 equivalent).
    *   Verify that if `prefers-reduced-motion` is set in your OS settings, animations are automatically disabled.
*   **Suggestion List:**
    *   Images in `SuggestionsList` should lazy-load.
    *   Images should be responsive and maintain their aspect ratio.
    *   The grid layout should correctly collapse to 1 column on very small screens, 2 on small, and 3 on medium+.
    *   Ensure all interactive elements (buttons/links) have sufficient tap area (minimum 44px).
*   **Playlist Embed:**
    *   The Spotify iframe should load and function correctly if `embedUrl` is provided.
    *   If `embedUrl` is `null` or empty, the fallback image and link should display correctly and be clickable.
*   **Accessibility:**
    *   Check keyboard navigability for all interactive controls (e.g., the confetti toggle, suggestion links).
    *   Screen reader announcements for buttons and links should be appropriate (e.g., using `aria-label`).
*   **Performance:**
    *   Observe initial page load time, especially on mobile. `canvas-confetti` should be lazy-loaded.
