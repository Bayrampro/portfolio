"use client";

import { useEffect, useRef, useState } from "react";
import { observeActiveSection } from "@/lib/observe-active-section";

export function useActiveSection(): [string, React.RefObject<string>, React.RefObject<Set<string>>] {
  const [section, setSection] = useState("hero");
  const sectionRef = useRef("hero");
  const highlightsRef = useRef(new Set<string>());

  useEffect(() => observeActiveSection(({ id, highlights }) => {
    highlightsRef.current = new Set(highlights);
    if (sectionRef.current !== id) {
      sectionRef.current = id;
      setSection(id);
    }
  }), []);

  return [section, sectionRef, highlightsRef];
}
