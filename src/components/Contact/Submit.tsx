import React from "react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, onClick }) => (
  <Button
    type="button"
    disabled={isSubmitting}
    onClick={onClick}
    aria-label="send message"
    className="w-full py-[0.6rem] px-[0.5rem] text-[0.9rem] rounded-[0.3rem] bg-gradient-to-r from-[#483d73] to-[#6a5acd] text-white font-medium hover:from-[#6a5acd] hover:to-[#483d73] transition-all duration-300 shadow-md hover:shadow-lg"
  >
    {isSubmitting ? "Submitting..." : "Send Message"}
  </Button>
);

export default SubmitButton;

