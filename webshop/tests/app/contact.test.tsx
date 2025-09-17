import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactPage from "@/app/contact/page";

describe("Contact form validation", () => {
  it("viser feilmeldinger for ugyldige felt", async () => {
    render(<ContactPage />);
    await userEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByText(/full name must be at least 3/i)).toBeInTheDocument();
    expect(screen.getByText(/subject must be at least 3/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/message must be at least 10/i)).toBeInTheDocument();
  });
});
