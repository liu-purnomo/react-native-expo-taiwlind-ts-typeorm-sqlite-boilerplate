import { instance } from "./instance";

export class Auth {
  static async login(data: DefaultFormValues): Promise<LoginResponse> {
    const response = await instance({
      method: "POST",
      url: "/api/auth/login",
      data: {
        email: data.email,
        password: data.password,
      },
    });
    return response.data;
  }

  static async register(data: DefaultFormValues): Promise<SuccessResponse> {
    const response = await instance({
      method: "POST",
      url: "/api/auth/register",
      data,
    });
    return response.data;
  }

  static async verification(data: DefaultFormValues): Promise<SuccessResponse> {
    const response = await instance({
      method: "POST",
      url: "/api/auth/activation",
      data,
    });
    return response.data;
  }

  static async forgotPassword(
    data: DefaultFormValues
  ): Promise<SuccessResponse> {
    try {
      const response = await instance({
        method: "POST",
        url: "/api/auth/forgot-password",
        data,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async resetPassword(
    data: DefaultFormValues
  ): Promise<SuccessResponse> {
    try {
      const response = await instance({
        method: "POST",
        url: "/api/auth/reset-password",
        data,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  static async changePassword(data: DefaultFormValues) {
    const response = await instance({
      method: "POST",
      url: "/api/auth/change-password",
      data,
    });

    return response.data;
  }
}
