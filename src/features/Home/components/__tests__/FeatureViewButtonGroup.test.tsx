import { render } from "@test/testUtils";
import { fireEvent, screen } from "@testing-library/react";
import { FeatureViewButtonGroup } from "../FeatureViewButtonGroup";

describe("FeatureViewButtonGroup component", () => {
  it("renders buttons for each view option", () => {
    const mockSetter = vi.fn();
    render(<FeatureViewButtonGroup value="consumer" setter={mockSetter} />);

    const consumerButton = screen.getByText("consumer");
    const businessButton = screen.getByText("business");

    expect(consumerButton).toBeInTheDocument();
    expect(businessButton).toBeInTheDocument();
  });

  it("calls the setter function when a button is clicked", () => {
    const mockSetter = vi.fn();
    render(<FeatureViewButtonGroup value="consumer" setter={mockSetter} />);

    const businessButton = screen.getByText("business");
    fireEvent.click(businessButton);

    expect(mockSetter).toHaveBeenCalledWith("business");
  });
});
