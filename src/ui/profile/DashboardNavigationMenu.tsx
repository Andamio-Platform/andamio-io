import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "~/components/ui/navigation-menu";

const Link = ({
  href,
  linkText,
  ...props
}: {
  href: string;
  linkText: string;
}) => {
  const router = useRouter();

  const isActive =
    (router.asPath.includes(href) && href !== "/dashboard") ||
    (router.asPath === href && href === "/dashboard");

  return (
    <NavigationMenuItem
      className={`rounded-none text-lg font-semibold tracking-widest transition-colors duration-300 hover:bg-accent hover:text-primary ${isActive ? "bg-accent text-primary" : "bg-primary"}`}
    >
      <NavigationMenuLink asChild active={isActive} className="mx-6 my-2">
        <NextLink href={href} className="" {...props}>
          {linkText}
        </NextLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default function DashboardNavigationMenu() {
  return (
    <NavigationMenu className="transition-colors">
      <NavigationMenuList className="mx-0 mb-3 w-full gap-10 rounded-none bg-primary font-beckman text-lg text-primary-foreground md:gap-24 lg:gap-36">
        <Link href="/dashboard" linkText="Dashboard Home" />
        <Link href="/dashboard/learner" linkText="Learner" />
        <Link href="/dashboard/teacher" linkText="Teacher" />
        <Link href="/dashboard/contributor" linkText="Contributor" />
        <Link href="/dashboard/goals" linkText="My Goals" />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
