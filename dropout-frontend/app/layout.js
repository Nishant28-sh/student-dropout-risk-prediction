import { DM_Serif_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fontDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const fontBody = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'DropoutAI | Student Risk Prediction Dashboard',
  description: 'AI-powered early warning system · XGBoost',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fontBody.variable} ${fontDisplay.variable} ${fontMono.variable} font-sans antialiased bg-[var(--bg)] text-[var(--text)]`}>
        <div className="fixed inset-0 bg-noise z-0 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
