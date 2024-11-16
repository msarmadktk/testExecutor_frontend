"use client"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CardsPaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem
              value="card"
              id="card"
              className="peer sr-only"
              aria-label="Card"
            />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
              aria-label="Paypal"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <path d="M21.4 2.5c-2.7-.5-8.7-.5-10.7.3-1.6.6-2.5 1.7-2.9 3.2-.5 2.2-.2 4.1.9 5.8 2.2 3.5 8.1 3.2 11.6 2.6 1.6-.3 3.1-.8 4.6-1.5.5-.2.8-.4 1.2-.7.4-.3.8-.8.8-1.4.2-.5.1-.9-.1-1.3-.2-.4-.4-.7-.7-.9s-.7-.3-1-.3c-.3 0-.6.1-.9.3-.4.2-.7.4-1 .5s-.6.2-.9.1c-.3-.1-.5-.4-.7-.6-.4-.3-.8-.6-1.2-.9-.6-.3-1.2-.4-1.8-.4h-1c-1.1 0-2 .4-2.6 1.1-.7.8-1.1 1.8-1.1 2.9v.3c0 .6.1 1.1.3 1.6.2.5.5.9.9 1.3.4.4.9.7 1.5.9.6.2 1.3.3 2 .3h5.8c.8 0 1.6-.3 2.2-.8.6-.5 1-.8 1.5-1.2.4-.3.9-.5 1.3-.8.3-.2.5-.5.5-.8V3.4c0-.5-.2-.9-.5-1.2-.3-.3-.7-.5-1.2-.5-.5 0-1 .2-1.3.5z" />
              </svg>

              Paypal
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="apple"
              id="apple"
              className="peer sr-only"
              aria-label="Apple"
            />
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <path d="M16.5 4.5c-.6.7-1.4 1.1-2.2 1.3-.4-.5-.8-1.1-1.3-1.5-.6-.4-1.3-.6-2.1-.6-1.1 0-2.1.4-2.8 1-.7.6-1.2 1.5-1.5 2.4-.3.9-.4 1.9-.1 2.8.3.8.8 1.6 1.4 2.3.7.7 1.4 1.3 2.2 1.8.8.5 1.6.9 2.5 1.2.9.3 1.8.5 2.8.3.8-.1 1.6-.3 2.3-.7s1.2-1 1.6-1.6c.3-.6.5-1.3.5-2.1 0-1.1-.4-2-1-2.8-.7-.9-1.6-1.5-2.7-1.8-.7-.2-1.4-.3-2.2-.1-.4-.4-.9-.8-1.4-1.1s-1-.4-1.5-.4c-.4 0-.8.1-1.1.2s-.7.3-1 .5z" />
              </svg>

              Apple
            </Label>
          </div>
        </RadioGroup>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="First Last" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Card number</Label>
          <Input id="number" placeholder="" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Expires</Label>
            <Select>
              <SelectTrigger id="month" aria-label="Month">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Select>
              <SelectTrigger id="year" aria-label="Year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="CVC" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  )
}