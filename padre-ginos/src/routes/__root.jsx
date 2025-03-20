import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PizzaOfTheDay from "../PizzaOfTheDay";
import Header from "../Header";
import { CartProvider } from "../contexts";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <CartProvider>
        <div>
          <Header />
          <Outlet />
          <PizzaOfTheDay />
        </div>
      </CartProvider>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
