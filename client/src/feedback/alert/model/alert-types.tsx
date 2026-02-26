import type { IconType } from "react-icons";
import { IoMdCheckmarkCircle, IoMdCloseCircle, IoMdInformationCircle, IoMdWarning } from "react-icons/io";

export enum AlertVariant {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export const AlertTypeIcons: Record<AlertVariant, IconType> = {
  success: IoMdCheckmarkCircle,
  error: IoMdCloseCircle,
  warning: IoMdWarning,
  info: IoMdInformationCircle,
};

export type AlertItem = {
  id: string;
  message: string;
  variant: AlertVariant;
};
