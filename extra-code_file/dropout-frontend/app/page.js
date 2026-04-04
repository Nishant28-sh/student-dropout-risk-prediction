'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import ModelArchitecture from '@/components/sections/ModelArchitecture';
import PredictionForm from '@/components/sections/PredictionForm';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero result={result} />
      <ModelArchitecture />
      <PredictionForm onResult={setResult} />
      <Footer />
    </main>
  );
}
