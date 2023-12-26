export interface OnboardingItem {
  id: number;
  image: number;
  title: string;
}

export const onboarding: OnboardingItem[] = [
  {
    id: 0,
    image: require("../assets/images/onboard/1.png"),
    title: "Temukan berbagai tools bermanfaat bagi Remote Pilot",
  },
  {
    id: 1,
    image: require("../assets/images/onboard/2.png"),
    title: "Jadi bagian dari RPI",
  },
  {
    id: 2,
    image: require("../assets/images/logo/rpi-white.png"),
    title: "Remote Pilot Indonesia",
  },
];
