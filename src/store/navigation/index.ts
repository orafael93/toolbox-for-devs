import { create } from "zustand";

import { FeatureRoute } from "@/types";

type NavigationStore = {
  currentRoute: FeatureRoute;
  setRoute: (route: FeatureRoute) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentRoute: "request-to-curl",
  setRoute: (route: FeatureRoute) => set({ currentRoute: route }),
}));
