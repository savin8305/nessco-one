"use client";

import { useState, useMemo } from "react";
import { Search, Menu } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FaqItem } from "./types/constant";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "../ui/ScrollArea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordian";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  faqData: FaqItem;
}

const FAQ: React.FC<MainLayoutProps> = ({ faqData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = faqData.faq[0].searchbox.categories;

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((cat) => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const filteredCategories = useMemo(
    () =>
      categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [categories, searchQuery]
  );

  const filteredFAQs = useMemo(
    () =>
      categories.filter(
        (cat) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(cat.name)
      ),
    [categories, selectedCategories]
  );

  return (
    <div className="flex flex-col lg:py-28 lg:px-10 lg:flex-row min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <Button
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Left Sidebar */}
      <aside
        className={cn(
          "w-full lg:w-[280px] bg-white rounded-xl lg:min-h-screen flex-shrink-0 lg:mr-6 transition-all duration-300 ease-in-out",
          "fixed inset-y-0 left-0 z-40 lg:relative",
          "transform lg:transform-none",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="M3 7H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6 12H18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 17H14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-md border-gray-200"
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)] lg:h-[calc(100vh-240px)]">
            <div className="space-y-2">
              {filteredCategories.map((category) => (
                <label
                  key={category.name}
                  className="flex items-center space-x-2 cursor-pointer py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span
                    className={cn(
                      "text-sm",
                      selectedCategories.includes(category.name)
                        ? "text-gray-900 font-medium"
                        : "text-gray-600"
                    )}
                  >
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-4 lg:p-0 mt-16 lg:mt-0">
        <ScrollArea className="h-[calc(100vh-80px)] lg:h-[calc(100vh-10px)]">
          <div className="space-y-6">
            {filteredFAQs.map((category) => (
              <Card
                className="bg-white p-4 lg:p-8 lg:h-[30rem] rounded-xl"
                key={category.name}
              >
                <CardHeader>
                  <CardTitle>
                    <h1 className="text-2xl text-gray-600">
                      Questions Related to{" "}
                      <span className="text-red-700 font-bold">
                        {category?.name}
                      </span>
                    </h1>
                    <div className="lg:border-t-[0.2rem] border-t-2 border-solid border-red-700 lg:w-[8vw] w-[18vw] mt-[0.6rem]"></div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-4"
                  >
                    {category.faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.name}-item-${index}`}
                        className="border-b border-gray-200 last:border-0"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4 text-gray-900">
                          {faq.que}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-4">
                          {faq.ans}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default FAQ;
