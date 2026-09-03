'use client';

import './app.css'

import PageWrapper from "@/layout/page-wrapper/page-wrapper";
import Header from "@/layout/header/header";
import Menu from "@/layout/menu/menu";
import Footer from '@/layout/footer/footer';

export default function App() {
  return (
    <div className="app-wrapper">
      <Menu />
      <Header />
      <PageWrapper />
      <Footer />
    </div>
  );
}
