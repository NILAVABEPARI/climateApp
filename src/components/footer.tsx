// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon for social media icons
// import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"; // Import specific brand icons

import { Github, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 grid">
            <div className='container flex justify-between mx-auto px-4 py-5 text-center text-grey-200'>

                <div className="text-center sm:text-left">
                    <h1 className="font-bold text-3xl mb-2">ClimateApp</h1>

                    <p className="text-sm font-light mb-2">
                        A product by{" "}
                        <span className="text-blue-500 font-medium">
                            <a
                                href="https://www.linkedin.com/in/nilava-bepari/"
                                className="hover:underline"
                            >
                                Nilava Bepari
                            </a>
                        </span>
                    </p>

                    {/* Social media icons */}
                    <div className="flex justify-normal mt-2 space-x-6">
                        <a
                            href="https://www.linkedin.com/in/nilava-bepari/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin className="h-6 w-6 text-blue-500 hover:text-blue-800 transition" />
                        </a>
                        <a
                            href="https://github.com/NILAVABEPARI"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="h-6 w-6 text-blue-500 hover:text-blue-800 transition" />
                        </a>
                    </div>
                </div>

                <div className="text-center sm:text-right">
                    <p className="text-lg font-bold mb-1">Stay prepared, rain or shine! </p>
                    <p className="text-sm text-muted-foreground">
                        🌤️ Explore, plan, and save your favorite weather spots with us.
                    </p>
                    <p className="text-sm mt-2">
                        {/* Display current year */}
                        &copy; {new Date().getFullYear()} ClimateApp. All rights reserved.{" "}
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;