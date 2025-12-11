"use client";

// React
import { createContext, useContext, useState, useEffect } from "react";

const SavedDesignsContext = createContext(null);

const STORAGE_KEY = "savedDesigns";

export const SavedDesignsProvider = ({ children }) => {
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved designs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedDesigns(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing saved designs:", e);
        setSavedDesigns([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever savedDesigns changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedDesigns));
    }
  }, [savedDesigns, isLoaded]);

  // Check if a design is saved
  const isDesignSaved = (designId) => {
    return savedDesigns.some((design) => design._id === designId);
  };

  // Toggle save/unsave a design
  const toggleSaveDesign = (design) => {
    if (!design || !design._id) return;

    setSavedDesigns((prev) => {
      const exists = prev.some((d) => d._id === design._id);
      if (exists) {
        return prev.filter((d) => d._id !== design._id);
      } else {
        return [...prev, design];
      }
    });
  };

  // Remove a design from saved
  const removeDesign = (designId) => {
    setSavedDesigns((prev) => prev.filter((d) => d._id !== designId));
  };

  // Get saved designs count
  const savedCount = savedDesigns.length;

  return (
    <SavedDesignsContext.Provider
      value={{
        savedDesigns,
        savedCount,
        isLoaded,
        isDesignSaved,
        toggleSaveDesign,
        removeDesign,
      }}
    >
      {children}
    </SavedDesignsContext.Provider>
  );
};

export const useSavedDesigns = () => {
  const context = useContext(SavedDesignsContext);
  if (!context) {
    throw new Error(
      "useSavedDesigns must be used within a SavedDesignsProvider"
    );
  }
  return context;
};

export default SavedDesignsContext;
