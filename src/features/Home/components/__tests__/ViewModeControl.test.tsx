import { ViewModeContext } from "@/hooks/useViewMode";
import { render } from "@test/testUtils";
import { fireEvent, screen } from "@testing-library/react";
import { ViewModeControl } from "../ViewModeControl";

describe("ViewModeControl component", () => {
  it("renders buttons for each view option", () => {
    render(<ViewModeControl />);

    const consumerButton = screen.getByLabelText("Consumer");
    const businessButton = screen.getByLabelText("Business");

    expect(consumerButton).toBeInTheDocument();
    expect(businessButton).toBeInTheDocument();
  });

  it("calls the setter function when a button is clicked", () => {
    const mockSetter = vi.fn();
    render(
      <ViewModeContext.Provider value={{ setMode: mockSetter }}>
        <ViewModeControl />
      </ViewModeContext.Provider>,
    );

    const consumerButton = screen.getByLabelText("Consumer");
    const businessButton = screen.getByLabelText("Business");
    fireEvent.click(businessButton);
    expect(mockSetter).toHaveBeenLastCalledWith("business");
    fireEvent.click(consumerButton);
    expect(mockSetter).toHaveBeenLastCalledWith("consumer");
  });
});
