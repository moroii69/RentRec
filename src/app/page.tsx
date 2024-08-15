"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { TypographyH2 } from '../components/ui/TypographyH2';
import { TypographyMuted } from '../components/ui/TypographyMuted';
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function Home() {
  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (userPrefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <TypographyH2 />
      <div className="mt-1 mb-4">
        <TypographyMuted />
      </div>

      <AlertDialogDemo />
    </main>
  );
}

export function AlertDialogDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Hardcoded credentials for testing
    const validEmail = 'ufraan@gmail.com';
    const validPassword = 'ufraan123';

    if (email === validEmail && password === validPassword) {
      // Simulate a successful login
      localStorage.setItem('token', 'dummyToken'); // Store a dummy token for testing
      setIsLoggedIn(true);
      setFadeOut(true);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 300); // Adjust the timeout to match the fade-out duration
    } else {
      setErrorMessage('Invalid email or password');
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={`mt-4 transition-opacity duration-300 ${fadeOut ? 'opacity-0 pointer-events-none' : ''}`}>
          <Mail className="mr-2 h-4 w-4" /> Login with Email
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black text-white p-6">
        {!isLoggedIn ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Login</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                Enter your email and password to log in.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <p className="text-red-500">{errorMessage}</p>
              )}
              <AlertDialogFooter className="flex justify-between items-center mt-4">
                <AlertDialogCancel className="text-white">Cancel</AlertDialogCancel>
                <Button type="submit" disabled={isSubmitting} className="ml-4">
                  {isSubmitting ? 'Submitting...' : 'Login'}
                </Button>
              </AlertDialogFooter>
            </form>
          </>
        ) : (
          <div className="transition-transform duration-500 ease-in-out transform -translate-y-10">
            <h2 className="text-2xl mb-4">RentRec: Secure Rent Receipts</h2>
            <form className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tenantName" className="text-white">Tenant Name</Label>
                <Input id="tenantName" placeholder="Enter tenant's name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amountPaid" className="text-white">Amount Paid</Label>
                <Input id="amountPaid" type="number" placeholder="Enter amount paid" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ownerSignature" className="text-white">Owner's Signature</Label>
                <Button className="w-full">Add Signature</Button>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="paymentMode" className="text-white">Payment Mode</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Generate Receipt</Button>
            </form>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  // For this case, we will simply show the selected date
  return (
    <div className="flex flex-col space-y-1.5">
      <Button
        variant="outline"
        className={cn(
          "w-[280px] justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
        onClick={() => {
          // Placeholder for interaction or additional functionality
        }}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>
    </div>
  );
}
