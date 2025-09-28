import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={href as string} {...rest}>{children}</a>
  ),
}));

// no-op mock av sonner (toasts)
vi.mock("sonner", () => ({
  toast: {
    success: () => {},
    warning: () => {},
    error: () => {},
  },
  Toaster: () => null,
}));

beforeEach(() => {
  localStorage.clear();
});