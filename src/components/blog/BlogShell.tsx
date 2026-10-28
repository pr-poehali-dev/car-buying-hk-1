import {useState, type ReactNode} from 'react';
import Header from '@/components/index/Header';
import Footer from '@/components/Footer';
import {trackGoal} from '@/lib/analytics';
import '@/blog.css';

export default function BlogShell({children}: {children: ReactNode}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}
        handlePhoneClick={() => trackGoal('phone_click')}/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
}
