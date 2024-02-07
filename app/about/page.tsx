import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import React from "react";

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen flex-col bg-background" data-testid="aboutpage">
            <Navigation />
            <main className="flex-1">
                about
            </main>
            <Footer />
        </div>
    );
}