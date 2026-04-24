// Prisma types and enums - centralized for consistency
// This file provides type-safe access to Prisma enums and types

// Enums from Prisma schema
export type ConsumptionMethod = "TAKEAWAY" | "DINE_IN";
export type OrderStatus = "PENDING" | "IN_PREPARATION" | "FINISHED";

// Re-export Prisma client types for convenience
export type { PrismaClient } from "@prisma/client";

// Helper functions for enum validation
export const isValidConsumptionMethod = (value: string): value is ConsumptionMethod => {
  return ["TAKEAWAY", "DINE_IN"].includes(value as ConsumptionMethod);
};

export const isValidOrderStatus = (value: string): value is OrderStatus => {
  return ["PENDING", "IN_PREPARATION", "FINISHED"].includes(value as OrderStatus);
};

// Constants for enum values
export const CONSUMPTION_METHODS = {
  TAKEAWAY: "TAKEAWAY" as const,
  DINE_IN: "DINE_IN" as const,
} as const;

export const ORDER_STATUSES = {
  PENDING: "PENDING" as const,
  IN_PREPARATION: "IN_PREPARATION" as const,
  FINISHED: "FINISHED" as const,
} as const;