import { chainId } from "@/consts/appInfo";
import { setAccount } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/reduxHook";
import { checkKeplr } from "@/utils/checkKeplr";
import { useEffect } from "react";
import Header from "../Header";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const keplrInit = async () => {
      const keplr = checkKeplr();

      if (keplr) {
        await keplr.enable(chainId);
        const key = await keplr.getKey(chainId);
        dispatch(setAccount({ name: key.name, address: key.bech32Address }));
      }
    };

    keplrInit();
  }, [dispatch]);

  return (
    <div className="flex w-full min-h-screen m-auto">
      <Header />
      <div className="w-full mt-10 mx-10">{children}</div>
    </div>
  );
};

export default Wrapper;
