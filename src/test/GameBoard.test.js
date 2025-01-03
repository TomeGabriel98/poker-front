import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameBoard from "../components/GameBoard";

jest.mock("@rails/actioncable", () => ({
  createConsumer: jest.fn(() => ({
    subscriptions: {
      create: jest.fn(() => ({
        unsubscribe: jest.fn(),
        received: jest.fn(),
      })),
    },
  })),
}));

jest.mock("../services/api", () => ({
  start: jest.fn(),
  action: jest.fn(),
}));

describe("GameBoard Component", () => {
  const roomId = "1";
  const playerId = "123";

  beforeEach(() => {
    jest.clearAllMocks();

    const mockSubscription = {
      received: jest.fn(),
      unsubscribe: jest.fn(),
    };
  
    const mockCreate = jest.fn(() => mockSubscription);
    require('@rails/actioncable').createConsumer.mockReturnValue({
      subscriptions: {
        create: mockCreate,
      },
    });
  });

  it('should handle received data', () => {
    const mockSubscription = {
      received: jest.fn(),
      unsubscribe: jest.fn(),
    };
  
    const mockCreate = jest.fn(() => mockSubscription);
    require('@rails/actioncable').createConsumer.mockReturnValue({
      subscriptions: {
        create: mockCreate,
      },
    });
  
    render(<GameBoard roomId={1} playerId={2} />);
  
    const data = { type: 'updatePlayers', players: [{ id: 1, name: 'John' }] };
    mockSubscription.received(data);
  
    expect(mockCreate).toHaveBeenCalledWith(
      { channel: 'RoomChannel', room_id: 1 },
      expect.any(Object)
    );
  });

  test("renders component correctly", () => {
    render(<GameBoard roomId={roomId} playerId={playerId} />);
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("Start Game")).toBeInTheDocument();
  });

  test("starts game when clicking in 'Start Game'", () => {
    const { start } = require("../services/api");
    render(<GameBoard roomId={roomId} playerId={playerId} />);

    const startButton = screen.getByText("Start Game");
    fireEvent.click(startButton);

    expect(start).toHaveBeenCalledWith(roomId);
  });
});
