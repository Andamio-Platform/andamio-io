import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";
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
      <NavigationMenuLink
        asChild
        active={isActive}
        className="mx-2 my-2 px-2 lg:mx-4 lg:px-4"
      >
        <NextLink href={href} className="" {...props}>
          {linkText}
        </NextLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default function DashboardNavigationMenu() {
  const { data: sessionData } = useSession();
  const { accessTokenAlias } = useAccessToken();
  const { creatorCoursePolicies } = useCreatorsCoursesPolicies(
    accessTokenAlias ?? "",
  );
  return (
    <NavigationMenu className="transition-colors">
      <NavigationMenuList className="mb-3 flex w-full gap-10 rounded-none bg-primary text-lg text-primary-foreground md:gap-24 lg:gap-32 lg:px-3">
        <Link href="/dashboard" linkText="MY NEXT STEPS" />
        <Link href="/dashboard/learner" linkText="My Courses" />

        {!!sessionData?.user.creatorId && creatorCoursePolicies && (
          <Link href="/dashboard/teacher" linkText="Teacher" />
        )}
        <Link href="/dashboard/contributor" linkText="My Contributions" />
        {/* <Link href="/dashboard/goals" linkText="My Goals" /> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
