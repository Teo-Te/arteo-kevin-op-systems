"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export const Logo = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={36}
      height={36}
      color={"#006FEE"}
      fill={"none"}
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <path
        d="M17.458 9.08015L17.1669 8.56619C16.9468 8.17749 16.8367 7.98314 16.6494 7.90564C16.4622 7.82814 16.2503 7.8893 15.8267 8.0116L15.1071 8.21782C14.8366 8.28127 14.5529 8.24528 14.3059 8.11619L14.1072 7.99956C13.8955 7.86157 13.7326 7.65811 13.6424 7.41896L13.4455 6.82053C13.316 6.42452 13.2512 6.22651 13.0971 6.11325C12.943 6 12.7382 6 12.3287 6H11.6713C11.2618 6 11.057 6 10.9029 6.11325C10.7488 6.22651 10.684 6.42452 10.5545 6.82053L10.3576 7.41896C10.2674 7.65811 10.1045 7.86157 9.89276 7.99956L9.69409 8.11619C9.44713 8.24528 9.16338 8.28127 8.89292 8.21782L8.17329 8.0116C7.74966 7.8893 7.53785 7.82814 7.35056 7.90564C7.16327 7.98314 7.0532 8.17749 6.83305 8.56619L6.54196 9.08015C6.3356 9.4445 6.23243 9.62667 6.25245 9.82061C6.27248 10.0145 6.4106 10.1708 6.68686 10.4834L7.29491 11.175C7.44352 11.3664 7.54903 11.7 7.54903 11.9999C7.54903 12.3 7.44355 12.6335 7.29492 12.8249L6.68686 13.5166L6.68686 13.5166C6.4106 13.8291 6.27248 13.9854 6.25245 14.1793C6.23243 14.3733 6.33561 14.5555 6.54196 14.9198L6.83304 15.4337C7.05319 15.8224 7.16327 16.0168 7.35056 16.0943C7.53785 16.1718 7.74967 16.1106 8.17331 15.9883L8.89289 15.7821C9.1634 15.7186 9.44721 15.7547 9.69419 15.8838L9.89284 16.0004C10.1046 16.1384 10.2674 16.3419 10.3576 16.581L10.5545 17.1795C10.684 17.5755 10.7488 17.7735 10.9029 17.8867C11.057 18 11.2618 18 11.6713 18H12.3287C12.7382 18 12.943 18 13.0971 17.8867C13.2512 17.7735 13.316 17.5755 13.4455 17.1795L13.6424 16.581C13.7326 16.3419 13.8954 16.1384 14.1072 16.0004L14.3058 15.8838C14.5528 15.7547 14.8366 15.7186 15.1071 15.7821L15.8267 15.9883C16.2503 16.1106 16.4621 16.1718 16.6494 16.0943C16.8367 16.0168 16.9468 15.8224 17.167 15.4338L17.167 15.4337L17.458 14.9198C17.6644 14.5555 17.7676 14.3733 17.7475 14.1793C17.7275 13.9854 17.5894 13.8291 17.3131 13.5166L16.7051 12.8249C16.5564 12.6335 16.451 12.3 16.451 11.9999C16.451 11.7 16.5565 11.3664 16.7051 11.175L17.3131 10.4834C17.5894 10.1708 17.7275 10.0145 17.7475 9.82061C17.7676 9.62667 17.6644 9.4445 17.458 9.08015Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="12"
        r="1.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19 2V4.85857C17.1962 3.09032 14.7255 2 12 2C6.47715 2 2 6.47715 2 12C2 13.4222 2.29689 14.7751 2.83209 16M5 22V19.1414C6.80375 20.9097 9.27455 22 12 22C17.5228 22 22 17.5228 22 12C22 10.5778 21.7031 9.22492 21.1679 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

const NavBar = () => {
  const pathname = usePathname();
  return (
    <Navbar>
      <NavbarBrand>
        <Logo />
        <p className="font-bold pl-2 text-inherit">Opearting Systems</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="https://cit.edu.al/" target="_blank">
            CIT
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/"}>
          <Link aria-current={pathname === "/" ? "page" : undefined} href="/">
            Algorithms
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/about"}>
          <Link
            aria-current={pathname === "/about" ? "page" : undefined}
            href="/about"
          >
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="primary"
            variant="ghost"
            onPress={() => window.location.reload()}
          >
            Reset
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;