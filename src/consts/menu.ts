import {
  ArrowLeftRight,
  CircleDollarSign,
  HandCoins,
  Home,
} from "lucide-react";

export const menuList = [
  {
    id: "home",
    label: "Home",
    path: "/",
    icon: Home,
    subMenu: [
      {
        id: "overview",
        label: "Overview",
        path: "/overview",
      },
      {
        id: "balance",
        label: "Balance",
        path: "/balance",
      },
    ],
  },
  {
    id: "usdn",
    label: "USDN",
    path: "/usdn",
    icon: CircleDollarSign,
  },
  {
    id: "points",
    label: "Points",
    path: "/points",
    icon: HandCoins,
  },
  {
    id: "swap",
    label: "Swap",
    path: "/swap",
    icon: ArrowLeftRight,
  },
];
