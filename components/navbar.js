import { Navbar, Button } from "flowbite-react";
import { Telephone } from 'react-bootstrap-icons';
import { useRouter } from "next/router";

export default function Nav() {
    const router = useRouter();
    return (
        <Navbar fluid={true} rounded={true} >
            <Navbar.Brand href="/">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    GERARDO
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2 gap-2">
                <Button href='tel:+1(512)200-3641'>
                    <Telephone className='mr-1' /> (512) 200-3641
                </Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {/* <Navbar.Link href="/" active={router.pathname == "/" ? "active" : ""} >
                    Home
                </Navbar.Link> */}
                {/* <Navbar.Link href="/about" active={router.pathname.startsWith("/about") ? "active" : ""}>
                    About
                </Navbar.Link> */}
                {/* <Navbar.Link href="#services">
                    Services
                </Navbar.Link>
                <Navbar.Link href="#book-time">
                    Projects
                </Navbar.Link>
                <Navbar.Link href="#contact">
                    Contact
                </Navbar.Link> */}
            </Navbar.Collapse>
        </Navbar>
    );
};