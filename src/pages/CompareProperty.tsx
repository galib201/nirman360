
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompareProperty from "@/components/CompareProperty";
import { Property } from "@/models";

const ComparePropertyPage = () => {
  const location = useLocation();
  const selectedProperty = location.state?.property as Property;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <CompareProperty selectedProperty={selectedProperty} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComparePropertyPage;
