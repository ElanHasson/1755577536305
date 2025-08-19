import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pickleball Explained: Why Everyone’s Playing',
  description: 'Pickleball has exploded in popularity, becoming the fastest-growing sport in America—but what actually makes it so fun and addictive? In this webinar, we’ll cover the basics of the game, how it blends elements of tennis, ping-pong, and badminton, and why it’s easy for anyone to pick up. We’ll also explore its surprising rise in culture, from neighborhood courts to professional leagues. Whether you’re a curious beginner or just wondering what the hype is about, this session will get you in the game.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}