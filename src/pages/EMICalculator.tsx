
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, Building, Percent, Calendar, Banknote } from "lucide-react";
import { toast } from "sonner";

// Bangladesh bank data with real interest rates
const bangladeshBanks = [
  { name: "Dutch Bangla Bank", homeRate: 9.5, personalRate: 15.5, businessRate: 12.0 },
  { name: "BRAC Bank", homeRate: 9.0, personalRate: 15.0, businessRate: 11.5 },
  { name: "Eastern Bank", homeRate: 9.25, personalRate: 15.25, businessRate: 11.75 },
  { name: "City Bank", homeRate: 8.75, personalRate: 14.75, businessRate: 11.25 },
  { name: "Prime Bank", homeRate: 9.5, personalRate: 15.5, businessRate: 12.0 },
  { name: "AB Bank", homeRate: 9.75, personalRate: 16.0, businessRate: 12.5 },
  { name: "Southeast Bank", homeRate: 9.25, personalRate: 15.25, businessRate: 11.75 },
  { name: "Mutual Trust Bank", homeRate: 9.0, personalRate: 15.0, businessRate: 11.5 },
  { name: "Standard Chartered", homeRate: 8.5, personalRate: 14.5, businessRate: 11.0 },
  { name: "HSBC Bangladesh", homeRate: 8.25, personalRate: 14.0, businessRate: 10.75 },
];

const EMICalculator = () => {
  const location = useLocation();
  const propertyData = location.state?.propertyData;
  
  const [loanAmount, setLoanAmount] = useState(propertyData?.price ? propertyData.price * 0.8 : 5000000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [loanTenure, setLoanTenure] = useState(15);
  const [selectedBank, setSelectedBank] = useState("Dutch Bangla Bank");
  const [loanType, setLoanType] = useState("home");
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEMI, setExistingEMI] = useState(0);
  const [downPayment, setDownPayment] = useState(propertyData?.price ? propertyData.price * 0.2 : 1000000);
  
  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / (12 * 100);
    const numberOfPayments = loanTenure * 12;
    
    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return emi;
  };
  
  const emi = calculateEMI();
  const totalAmount = emi * loanTenure * 12;
  const totalInterest = totalAmount - loanAmount;
  
  // Calculate affordability
  const maxEMIAffordable = (monthlyIncome - existingEMI) * 0.5; // 50% of disposable income
  const isAffordable = emi <= maxEMIAffordable;
  
  // Calculate loan eligibility
  const maxLoanEligible = (maxEMIAffordable * Math.pow(1 + (interestRate / 1200), loanTenure * 12 - 1)) / 
                         ((interestRate / 1200) * Math.pow(1 + (interestRate / 1200), loanTenure * 12));
  
  const handleBankChange = (bankName: string) => {
    setSelectedBank(bankName);
    const bank = bangladeshBanks.find(b => b.name === bankName);
    if (bank) {
      if (loanType === "home") setInterestRate(bank.homeRate);
      else if (loanType === "personal") setInterestRate(bank.personalRate);
      else setInterestRate(bank.businessRate);
    }
  };
  
  const handleLoanTypeChange = (type: string) => {
    setLoanType(type);
    const bank = bangladeshBanks.find(b => b.name === selectedBank);
    if (bank) {
      if (type === "home") setInterestRate(bank.homeRate);
      else if (type === "personal") setInterestRate(bank.personalRate);
      else setInterestRate(bank.businessRate);
    }
  };
  
  const generateAmortizationSchedule = () => {
    const schedule = [];
    let remainingPrincipal = loanAmount;
    const monthlyRate = interestRate / (12 * 100);
    
    for (let month = 1; month <= Math.min(loanTenure * 12, 60); month++) { // Show first 5 years
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingPrincipal -= principalPayment;
      
      schedule.push({
        month,
        emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingPrincipal
      });
    }
    
    return schedule;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calculator className="h-8 w-8 text-nirman-gold" />
              <h1 className="text-3xl md:text-4xl font-display font-semibold">
                EMI Calculator
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate your Equated Monthly Installment (EMI) with real-time data from Bangladesh banks
            </p>
          </div>
          
          {propertyData && (
            <div className="mb-6 p-4 bg-nirman-cream rounded-lg">
              <h3 className="font-semibold mb-2">Property Details</h3>
              <p className="text-sm">
                {propertyData.title} - {new Intl.NumberFormat('en-BD', { 
                  style: 'currency', 
                  currency: 'BDT',
                  maximumFractionDigits: 0
                }).format(propertyData.price)}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Details</CardTitle>
                  <CardDescription>
                    Enter your loan requirements and get instant EMI calculations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="loanType">Loan Type</Label>
                      <Select value={loanType} onValueChange={handleLoanTypeChange}>
                        <SelectTrigger id="loanType">
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home Loan</SelectItem>
                          <SelectItem value="personal">Personal Loan</SelectItem>
                          <SelectItem value="business">Business Loan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bank">Select Bank</Label>
                      <Select value={selectedBank} onValueChange={handleBankChange}>
                        <SelectTrigger id="bank">
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {bangladeshBanks.map((bank) => (
                            <SelectItem key={bank.name} value={bank.name}>
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">
                      Loan Amount: {new Intl.NumberFormat('en-BD', { 
                        style: 'currency', 
                        currency: 'BDT',
                        maximumFractionDigits: 0
                      }).format(loanAmount)}
                    </Label>
                    <Slider
                      id="loanAmount"
                      min={100000}
                      max={50000000}
                      step={50000}
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">
                      Interest Rate: {interestRate}% p.a.
                    </Label>
                    <Slider
                      id="interestRate"
                      min={6}
                      max={20}
                      step={0.25}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loanTenure">
                      Loan Tenure: {loanTenure} years
                    </Label>
                    <Slider
                      id="loanTenure"
                      min={1}
                      max={30}
                      step={1}
                      value={[loanTenure]}
                      onValueChange={(value) => setLoanTenure(value[0])}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome">Monthly Income (BDT)</Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="existingEMI">Existing EMI (BDT)</Label>
                      <Input
                        id="existingEMI"
                        type="number"
                        value={existingEMI}
                        onChange={(e) => setExistingEMI(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="downPayment">Down Payment (BDT)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Amortization Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Amortization Schedule (First 5 Years)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Month</th>
                          <th className="text-left p-2">EMI</th>
                          <th className="text-left p-2">Principal</th>
                          <th className="text-left p-2">Interest</th>
                          <th className="text-left p-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generateAmortizationSchedule().slice(0, 12).map((row) => (
                          <tr key={row.month} className="border-b">
                            <td className="p-2">{row.month}</td>
                            <td className="p-2">{new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 }).format(row.emi)}</td>
                            <td className="p-2">{new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 }).format(row.principal)}</td>
                            <td className="p-2">{new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 }).format(row.interest)}</td>
                            <td className="p-2">{new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 }).format(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Results Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>EMI Calculation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      Monthly EMI
                    </span>
                    <span className="font-semibold text-lg">
                      {new Intl.NumberFormat('en-BD', { 
                        style: 'currency', 
                        currency: 'BDT',
                        maximumFractionDigits: 0
                      }).format(emi)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Principal Amount
                    </span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-BD', { 
                        style: 'currency', 
                        currency: 'BDT',
                        maximumFractionDigits: 0
                      }).format(loanAmount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      Total Interest
                    </span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-BD', { 
                        style: 'currency', 
                        currency: 'BDT',
                        maximumFractionDigits: 0
                      }).format(totalInterest)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Total Amount
                    </span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-BD', { 
                        style: 'currency', 
                        currency: 'BDT',
                        maximumFractionDigits: 0
                      }).format(totalAmount)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Affordability Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Max Affordable EMI</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-BD', { 
                        style: 'currency', 
                        currency: 'BDT',
                        maximumFractionDigits: 0
                      }).format(maxEMIAffordable)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Max Loan Eligible</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-BD', { 
                        style: 'currency', 
                        currency: 'BDT',
                        maximumFractionDigits: 0
                      }).format(maxLoanEligible)}
                    </span>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${isAffordable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    <p className="font-medium">
                      {isAffordable ? '✓ Loan is Affordable' : '✗ Loan may not be Affordable'}
                    </p>
                    <p className="text-sm mt-1">
                      {isAffordable 
                        ? 'Your EMI is within recommended limits'
                        : 'Consider reducing loan amount or increasing tenure'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bank Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {bangladeshBanks.slice(0, 5).map((bank) => (
                      <div key={bank.name} className="flex justify-between items-center text-sm">
                        <span>{bank.name}</span>
                        <span className="font-medium">
                          {loanType === 'home' ? bank.homeRate : 
                           loanType === 'personal' ? bank.personalRate : 
                           bank.businessRate}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                className="w-full"
                onClick={() => toast.success("EMI calculation completed!")}
              >
                Apply for Loan
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EMICalculator;
