import { render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("Contact", () => {
  test("can submit contact form", async () => {
    fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
    const screen = render(
      <QueryClientProvider client={queryClient}>
        <Route.options.component />
      </QueryClientProvider>,
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const msgTextArea = screen.getByPlaceholderText("Message");

    const testData = {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "This is a test message",
    };

    nameInput.value = testData.name;
    emailInput.value = testData.email;
    msgTextArea.value = testData.message;

    const btn = screen.getByRole("button");
    btn.click();

    const h3 = await screen.findByRole("heading", { level: 3 });
    expect(h3.innerText).toContain("Submitted");

    const requests = fetchMocker.requests();
    expect(requests).toHaveLength(1);
    expect(requests[0].url).toEqual("/api/contact");
    expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
      body: JSON.stringify(testData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});
