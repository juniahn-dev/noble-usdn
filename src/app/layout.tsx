import { SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";
import { StoreProvider } from "./StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
