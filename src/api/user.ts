import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IUser {
  id: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
}

const USER = Symbol("USER").toString();

export async function getUserInfo() {
  try {
    const value = await AsyncStorage.getItem(USER);
    if (!!value) {
      return JSON.parse(value) as IUser;
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error loading items", e);
  }
}
