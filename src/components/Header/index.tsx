import { getBalance } from "@/app/actions/balance";
import HeaderLogo from "@/assets/Header/HeaderLogo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { chainId } from "@/consts/appInfo";
import { menuList } from "@/consts/menu";
import { setBalances } from "@/lib/features/balancesSlice";
import { selectAccount, setAccount } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHook";
import { reduceString } from "@/lib/utils";
import { checkKeplr } from "@/utils/checkKeplr";
import Link from "next/link";
import { useEffect } from "react";
import ImgComponent from "../Image";
import { Button } from "../ui/button";

const Header = () => {
  const dispatch = useAppDispatch();

  const account = useAppSelector(selectAccount);

  const connect = async () => {
    try {
      const keplr = checkKeplr();

      if (keplr) {
        await keplr.enable(chainId);
        const key = await keplr.getKey(chainId);
        dispatch(setAccount({ name: key.name, address: key.bech32Address }));
      }
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  const disconnect = async () => {
    try {
      const keplr = checkKeplr();

      if (keplr) {
        await keplr.disable();
        dispatch(setAccount(null));
        dispatch(setBalances(null));
      }
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  useEffect(() => {
    if (account) {
      const init = async () => {
        const balance = await getBalance(account.address);
        dispatch(setBalances(balance));
      };

      init();
    }
  }, [account, dispatch]);

  return (
    <Sidebar collapsible="none" className="w-[15rem] h-screen">
      <SidebarContent>
        <SidebarGroup className="py-4">
          <SidebarGroupLabel className="h-auto">
            <ImgComponent imgSrc={HeaderLogo} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {menuList.map((menu) => (
                <SidebarMenuItem key={menu.id}>
                  <SidebarMenuButton asChild>
                    <Link href={menu.path} className="text-grey-700">
                      <menu.icon />
                      {menu.label}
                    </Link>
                  </SidebarMenuButton>
                  {menu.subMenu && (
                    <SidebarMenuSub className="gap-3">
                      {menu.subMenu.map((sub) => {
                        return (
                          <SidebarMenuSubItem key={sub.id}>
                            <Link href={sub.path} className="text-grey-700">
                              {sub.label}
                            </Link>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {account ? (
          <Button onClick={disconnect}>
            {reduceString(account.address, 6, 4)}
          </Button>
        ) : (
          <Button onClick={connect}>Connect</Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default Header;
