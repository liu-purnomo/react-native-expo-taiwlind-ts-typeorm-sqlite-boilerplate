import { source } from "../database";
import MediaController from "../media";
import { UserEntity } from "../models";
import { UserSchema } from "../schemas";

export class UserController {
  static async getUser(): Promise<UserSchema | null> {
    if (!source.isInitialized) await source.initialize();
    const users = await UserEntity.find({});
    const user = users?.length > 0 ? users[0] : null;
    return user;
  }

  static async createUser(payload: UserSchema) {
    if (!source.isInitialized) await source.initialize();

    let imagePath: string = "";

    if (payload.avatar) {
      const extension = payload.avatar.split(".").pop();
      const localMediaPath = await MediaController.downloadAndSaveMedia(
        payload.avatar,
        payload.id,
        extension as string
      );
      console.log("Local media path:", localMediaPath);
      imagePath = localMediaPath;
    }

    const user = new UserEntity();
    user.id = payload.id;
    user.avatar = imagePath;
    user.name = payload.name;
    user.username = payload.username;
    user.email = payload.email;
    user.status = payload.status;
    user.role = payload.role;
    user.token = payload.token;
    await user.save();
  }

  static async updateUser(
    userId: UserSchema["id"],
    payload: Partial<
      Pick<
        UserSchema,
        "status" | "avatar" | "email" | "name" | "role" | "token" | "username"
      >
    >
  ) {
    if (!source.isInitialized) await source.initialize();

    const user = await UserEntity.findOneByOrFail({ id: userId });
    user.username = payload.username ?? user.username;
    user.status = payload.status ?? user.status;
    user.avatar = payload.avatar ?? user.avatar;
    user.email = payload.email ?? user.email;
    user.name = payload.name ?? user.name;
    user.role = payload.role ?? user.role;
    user.token = payload.token ?? user.token;
    await user.save();
  }

  static async deleteUser(userId: UserSchema["id"]) {
    if (!source.isInitialized) await source.initialize();
    await UserEntity.delete(userId);
  }
}
