"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { VerticalId } from "@/types/intelligence";

interface SubscribeContextValue {
  isModalOpen: boolean;
  openSubscribeModal: (source?: string) => void;
  closeSubscribeModal: () => void;
  subscribeSource: string;
  activeVertical: VerticalId;
  setActiveVertical: (v: VerticalId) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const SubscribeContext = createContext<SubscribeContextValue | null>(null);

export function SubscribeProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribeSource, setSubscribeSource] = useState("header");
  const [activeVertical, setActiveVertical] =
    useState<VerticalId>("agriculture");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openSubscribeModal = useCallback((source = "header") => {
    setSubscribeSource(source);
    setIsModalOpen(true);
  }, []);

  const closeSubscribeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3400);
  }, []);

  return (
    <SubscribeContext.Provider
      value={{
        isModalOpen,
        openSubscribeModal,
        closeSubscribeModal,
        subscribeSource,
        activeVertical,
        setActiveVertical,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </SubscribeContext.Provider>
  );
}

export function useSubscribe() {
  const ctx = useContext(SubscribeContext);
  if (!ctx) {
    throw new Error("useSubscribe must be used inside SubscribeProvider");
  }
  return ctx;
}
