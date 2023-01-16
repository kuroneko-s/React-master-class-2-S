import { Link } from "gatsby";
import React from "react";

interface ILayoutProps {
  children: any;
  title?: string;
}

export default function Layout({ children, title }: ILayoutProps) {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1>{title}</h1>
        {children}
      </main>
    </div>
  );
}
