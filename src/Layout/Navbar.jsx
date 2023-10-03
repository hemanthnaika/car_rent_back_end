import React, { useContext } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FiHome, FiLogOut, FiMenu } from "react-icons/fi";

import { TbBrandBooking, TbBrandDenodo } from "react-icons/tb";
import {
  AiOutlineFileAdd,
  AiOutlineCar,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

import { Link } from "react-router-dom";

const LinkItems = [
  { name: "Dashboard", icon: FiHome, href: "/" },
  { name: "Bookings", icon: TbBrandBooking, href: "/booking" },
  {
    name: "Bookings History",
    icon: AiOutlineFileAdd,
    href: "/booking/History",
  },
  { name: "Car", icon: AiOutlineCar, href: "/view" },
  { name: "Brand", icon: TbBrandDenodo, href: "/brand" },
  { name: "Users", icon: AiOutlineUsergroupAdd, href: "/users" },
];

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" minH="100vh">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { dispatch } = useContext(AuthContext);
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={onClose}
          LInkHref={link.href}
        >
          {link.name}
        </NavItem>
      ))}
      <Box mt={10} mx={2}>
        <Button
          colorScheme="blue"
          width="100%"
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          <Icon as={FiLogOut} mr={5} />
          Logout
        </Button>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, LInkHref, ...rest }) => {
  return (
    <Link to={LInkHref}>
      <Box
        as="a"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="20"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const btnRef = React.useRef();
  return (
    <Flex
      position={"fixed"}
      w={"full"}
      zIndex={10}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        finalFocusRef={btnRef}
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
