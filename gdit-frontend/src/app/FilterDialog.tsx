"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { Filter, Circle } from "lucide-react"

export function FilterDialog({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [filters, setFilters] = React.useState({
    from: false,
    to: false,
    cc: false,
    bcc: false,
    subject: false,
    includes: false,
    emailLength: false,
  });
  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return(
    <Dialog>
              <DialogTrigger asChild>
            <div className="relative inline-flex">
                  <Circle color = "#888888" size={38} strokeWidth={1.5} className="cursor-pointer ml-2 mb-2"></Circle>
                  <Filter color = "#888888" size={23} className="cursor-pointer absolute top-1/2 left-6.75 -translate-x-1/2 -translate-y-3.5" ></Filter>
            </div>
            </DialogTrigger>

            {/* Dialog content*/}
            <DialogContent className="bg-neutral-900 text-white border border-gray-700">
              <DialogHeader>
                <DialogTitle className="pb-5">Filters</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-3">
                <Checkbox id="from" className="data-[state=checked]:border-white" onCheckedChange={() => toggleFilter('from')}/>
                  <label htmlFor="from" >From</label>
                  <Input id={"from-input"} className="ml-20 px-2 py-1" placeholder="example@enron.com" disabled={!filters.from}/>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="to" className="data-[state=checked]:border-white" onCheckedChange={() => toggleFilter('to')}/>
                  <label htmlFor="to">To</label>
                  <Input id={"from-input"} className="ml-25 px-2 py-1" placeholder="example@enron.com" disabled={!filters.to}/>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="CC" className="data-[state=checked]:border-white" onCheckedChange={() => toggleFilter('cc')}/>
                  <label htmlFor="CC">CC</label>
                  <Input id={"from-input"} className="ml-23 px-2 py-1" placeholder="example@enron.com" disabled={!filters.cc}/>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="BCC" className="data-[state=checked]:border-white" onCheckedChange={() => toggleFilter('bcc')}/>
                  <label htmlFor="BCC">BCC</label>
                  <Input id={"from-input"} className="ml-21 px-2 py-1" placeholder="example@enron.com" disabled={!filters.bcc}/>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="subject" className="data-[state=checked]:border-white" onCheckedChange={() => toggleFilter('subject')}/>
                  <label htmlFor="subject">Subject</label>
                  <Input id={"from-input"} className="ml-15 px-2 py-1" placeholder="Meeting Tomorrow" disabled={!filters.subject}/>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="includes" className="data-[state=checked]:border-white" onCheckedChange={() => toggleFilter('includes')}/>
                  <label htmlFor="includes">Includes</label>
                  <Input id={"from-input"} className="ml-14 px-2 py-1" placeholder="keep quiet" disabled={!filters.includes}/>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="emailLength" className="data-[state=checked]:border-white" onCheckedChange={() => toggleFilter('emailLength')}/>
                  <label htmlFor="emailLength">Email Length</label>
                  <Input id={"from-input"} className="ml-15 px-2 py-1" placeholder="500 characters" disabled={!filters.emailLength}/>
              </div>

              {/* Utilizes date picker component*/}
              <div className="flex items-center space-x-3" >
                <Checkbox id="dateRange" className="data-[state=checked]:border-white"/>
                  <label htmlFor="dateRange">Date Range</label>
                  <DatePickerWithRange></DatePickerWithRange>
              </div>
            </DialogContent>
            </Dialog>
  );
}