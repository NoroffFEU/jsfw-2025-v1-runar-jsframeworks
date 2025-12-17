import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

type NextLinkProps = React.PropsWithChildren<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string | URL;
  }
>;

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: NextLinkProps) => (
    <a href={href.toString()} {...rest}>
      {children}
    </a>
  ),
}));

// no-op mock av sonner (toasts)
vi.mock("sonner", () => ({
  toast: {
    success: () => undefined,
    warning: () => undefined,
    error: () => undefined,
  },
  Toaster: () => null,
}));

beforeEach(() => {
  localStorage.clear();
});