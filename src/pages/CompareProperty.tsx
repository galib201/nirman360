
import React from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import CompareProperty from "@/components/CompareProperty";
import { Property } from "@/models";

const ComparePropertyPage = () => {
  const location = useLocation();
  const selectedProperty = location.state?.property as Property;

  return (
    <PageLayout 
      title="Compare Properties" 
      subtitle="Compare properties side by side to make the best decision"
    >
      <CompareProperty selectedProperty={selectedProperty} />
    </PageLayout>
  );
};

export default ComparePropertyPage;
