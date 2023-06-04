import { NextFunction } from "express";
import UserController from "../../src/controllers/user.contoller";

const userController = new UserController();

const mockRequest = (body?: any): Request => {
  return {
    body,
  } as Request;
};

const mockResponse = (): Response => {
  const res: any = {};
  res.json = jest.fn((data) => res);
  res.status = jest.fn((code) => {
    res.statusCode = code;
    return res;
  });
  return res;
};

describe("User Controller", () => {
  // test("should return all users", async () => {
  //   const mockRequest: any = {} as Request;
  //   const mockResponse: any = {
  //     json: jest.fn(),
  //   } as unknown as Response;
  //   const nextFunction = jest.fn() as unknown as NextFunction;

  //   const mockGetAllUsers = jest.fn().mockReturnValue([
  //     { id: 1, name: "John Doe", email: "johndoe@example.com" },
  //     { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
  //   ]);

  //   // Mocking the getAllUsers method of the User controller
  //   userController.getUsers = mockGetAllUsers;

  //   await userController.getUsers(mockRequest, mockResponse, nextFunction);

  //   // console.log("res :>> ", res);

  //   expect(mockGetAllUsers).toHaveBeenCalled();
  //   expect(mockResponse.json).toHaveBeenCalledWith([
  //     { id: 1, name: "John Doe", email: "johndoe@example.com" },
  //     { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
  //   ]);
  // });

  it("should return a user", async () => {
    const req: any = mockRequest({
      name: "John Doe",
      email: "johndoe14@mailinator.com",
      password: "password",
    });
    const res: any = mockResponse();
    const next: any = jest.fn();

    await userController.registerUser(req, res, next);

    // expect(res.json).toBeCalledWith();
    const response = res.json.mock.calls[0][0];
    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("name", "John Doe");
    expect(response.data).toHaveProperty("email", "johndoe14@mailinator.com");
    expect(response.data).toHaveProperty("password");
    expect(response.data).toHaveProperty("createdAt");
    expect(response.data).toHaveProperty("updatedAt");
  });

  it("should handle errors", async () => {
    const req: any = mockRequest({
      name: "John Doe",
      email: "johndoe11@mailinator.com",
      password: "password",
    });
    const res: any = mockResponse();
    const next: any = jest.fn();

    await userController.registerUser(req, res, next);
    console.log("res.json.mock.calls[0][0] :>> ", res.json.mock.calls[0][0]);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: "User already exists",
    });
  });
});
