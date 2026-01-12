"use client";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import {
    Code,
    Copy,
    Check,
    Palette,
    Moon,
    Sun,
    Terminal,
    FileCode,
    ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const cssVariables = `:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.669 0.199 38.581);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.387 0.134 250.505);
  --secondary-foreground: oklch(1 0 0);
  --muted: oklch(0.985 0.002 106.423);
  --muted-foreground: oklch(0.478 0.029 255.508);
  --accent: oklch(0.988 0.008 79.439);
  --accent-foreground: oklch(0.145 0 0);
  --destructive: oklch(0.608 0.227 27.325);
  --border: oklch(0.922 0.003 106.423);
  --input: oklch(0.922 0.003 106.423);
  --ring: oklch(0.669 0.199 38.581);
  --chart-1: oklch(0.719 0.140 38.581);
  --chart-2: oklch(0.605 0.155 250.505);
  --chart-3: oklch(0.627 0.106 181.764);
  --chart-4: oklch(0.669 0.199 38.581);
  --chart-5: oklch(0.387 0.134 250.505);
  --sidebar: oklch(0.988 0.008 79.439);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.669 0.199 38.581);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(1 0 0);
  --sidebar-accent-foreground: oklch(0.145 0 0);
  --sidebar-border: oklch(0.922 0.003 106.423);
  --sidebar-ring: oklch(0.669 0.199 38.581);
}

.dark {
  --background: oklch(0.188 0.013 257.128);
  --foreground: oklch(0.922 0.003 106.423);
  --card: oklch(0.241 0.018 257.128);
  --card-foreground: oklch(0.922 0.003 106.423);
  --popover: oklch(0.241 0.018 257.128);
  --popover-foreground: oklch(0.922 0.003 106.423);
  --primary: oklch(0.719 0.174 38.581);
  --primary-foreground: oklch(0.188 0.013 257.128);
  --secondary: oklch(0.605 0.155 250.505);
  --secondary-foreground: oklch(1 0 0);
  --muted: oklch(0.241 0.018 257.128);
  --muted-foreground: oklch(0.717 0.014 257.128);
  --accent: oklch(0.338 0.024 257.128);
  --accent-foreground: oklch(0.922 0.003 106.423);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(0.338 0.024 257.128);
  --input: oklch(0.338 0.024 257.128);
  --ring: oklch(0.719 0.174 38.581);
  --chart-1: oklch(0.719 0.140 38.581);
  --chart-2: oklch(0.605 0.155 250.505);
  --chart-3: oklch(0.696 0.090 181.764);
  --chart-4: oklch(0.719 0.174 38.581);
  --chart-5: oklch(0.605 0.155 250.505);
  --sidebar: oklch(0.241 0.018 257.128);
  --sidebar-foreground: oklch(0.922 0.003 106.423);
  --sidebar-primary: oklch(0.719 0.174 38.581);
  --sidebar-primary-foreground: oklch(0.188 0.013 257.128);
  --sidebar-accent: oklch(0.338 0.024 257.128);
  --sidebar-accent-foreground: oklch(0.922 0.003 106.423);
  --sidebar-border: oklch(0.338 0.024 257.128);
  --sidebar-ring: oklch(0.719 0.174 38.581);
}`;

const colorTokens = [
    { name: "--background", light: "oklch(1 0 0)", dark: "oklch(0.188 0.013 257.128)", usage: "Page backgrounds" },
    { name: "--foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.922 0.003 106.423)", usage: "Primary text" },
    { name: "--card", light: "oklch(1 0 0)", dark: "oklch(0.241 0.018 257.128)", usage: "Card backgrounds" },
    { name: "--card-foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.922 0.003 106.423)", usage: "Card text" },
    { name: "--primary", light: "oklch(0.669 0.199 38.581)", dark: "oklch(0.719 0.174 38.581)", usage: "CTAs, buttons" },
    { name: "--primary-foreground", light: "oklch(1 0 0)", dark: "oklch(0.188 0.013 257.128)", usage: "Primary text" },
    { name: "--secondary", light: "oklch(0.387 0.134 250.505)", dark: "oklch(0.605 0.155 250.505)", usage: "Headings, links" },
    { name: "--secondary-foreground", light: "oklch(1 0 0)", dark: "oklch(1 0 0)", usage: "Secondary text" },
    { name: "--muted", light: "oklch(0.985 0.002 106.423)", dark: "oklch(0.241 0.018 257.128)", usage: "Subtle backgrounds" },
    { name: "--muted-foreground", light: "oklch(0.478 0.029 255.508)", dark: "oklch(0.717 0.014 257.128)", usage: "Secondary text" },
    { name: "--accent", light: "oklch(0.988 0.008 79.439)", dark: "oklch(0.338 0.024 257.128)", usage: "Accent elements" },
    { name: "--accent-foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.922 0.003 106.423)", usage: "Accent text" },
    { name: "--destructive", light: "oklch(0.608 0.227 27.325)", dark: "oklch(0.704 0.191 22.216)", usage: "Error states" },
    { name: "--border", light: "oklch(0.922 0.003 106.423)", dark: "oklch(0.338 0.024 257.128)", usage: "Borders" },
    { name: "--input", light: "oklch(0.922 0.003 106.423)", dark: "oklch(0.338 0.024 257.128)", usage: "Input borders" },
    { name: "--ring", light: "oklch(0.669 0.199 38.581)", dark: "oklch(0.719 0.174 38.581)", usage: "Focus rings" },
];

const chartTokens = [
    { name: "--chart-1", light: "oklch(0.719 0.140 38.581)", dark: "oklch(0.719 0.140 38.581)" },
    { name: "--chart-2", light: "oklch(0.605 0.155 250.505)", dark: "oklch(0.605 0.155 250.505)" },
    { name: "--chart-3", light: "oklch(0.627 0.106 181.764)", dark: "oklch(0.696 0.090 181.764)" },
    { name: "--chart-4", light: "oklch(0.669 0.199 38.581)", dark: "oklch(0.719 0.174 38.581)" },
    { name: "--chart-5", light: "oklch(0.387 0.134 250.505)", dark: "oklch(0.605 0.155 250.505)" },
];

const sidebarTokens = [
    { name: "--sidebar", light: "oklch(0.988 0.008 79.439)", dark: "oklch(0.241 0.018 257.128)" },
    { name: "--sidebar-foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.922 0.003 106.423)" },
    { name: "--sidebar-primary", light: "oklch(0.669 0.199 38.581)", dark: "oklch(0.719 0.174 38.581)" },
    { name: "--sidebar-primary-foreground", light: "oklch(1 0 0)", dark: "oklch(0.188 0.013 257.128)" },
    { name: "--sidebar-accent", light: "oklch(1 0 0)", dark: "oklch(0.338 0.024 257.128)" },
    { name: "--sidebar-accent-foreground", light: "oklch(0.145 0 0)", dark: "oklch(0.922 0.003 106.423)" },
    { name: "--sidebar-border", light: "oklch(0.922 0.003 106.423)", dark: "oklch(0.338 0.024 257.128)" },
    { name: "--sidebar-ring", light: "oklch(0.669 0.199 38.581)", dark: "oklch(0.719 0.174 38.581)" },
];

export default function DevelopersPage() {
    const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);
    }, []);

    const toggleDark = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark(!isDark);
    };

    const copyCode = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedSnippet(id);
        setTimeout(() => setCopiedSnippet(null), 2000);
    };

    const TokenTable = ({ tokens, title }: { tokens: { name: string; light: string; dark: string; usage?: string }[]; title: string }) => (
        <div className="mb-10">
            <h3 className="text-lg font-bold mb-4 text-secondary">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 font-semibold">Token</th>
                            <th className="text-left py-2 px-3 font-semibold">
                                <span className="flex items-center gap-1"><Sun className="size-3" /> Light</span>
                            </th>
                            <th className="text-left py-2 px-3 font-semibold">
                                <span className="flex items-center gap-1"><Moon className="size-3" /> Dark</span>
                            </th>
                            {tokens[0]?.usage && <th className="text-left py-2 px-3 font-semibold">Usage</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {tokens.map((token) => (
                            <tr key={token.name} className="border-b border-border hover:bg-muted/50">
                                <td className="py-2 px-3">
                                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{token.name}</code>
                                </td>
                                <td className="py-2 px-3">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded border border-border shrink-0"
                                            style={{ backgroundColor: token.light }}
                                        />
                                        <code className="text-xs font-mono text-muted-foreground">{token.light}</code>
                                    </div>
                                </td>
                                <td className="py-2 px-3">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded border border-border shrink-0"
                                            style={{ backgroundColor: token.dark }}
                                        />
                                        <code className="text-xs font-mono text-muted-foreground">{token.dark}</code>
                                    </div>
                                </td>
                                {token.usage && <td className="py-2 px-3 text-muted-foreground text-xs">{token.usage}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Theme Toggle */}
            <Button
                size="icon"
                onClick={toggleDark}
                className="fixed top-6 right-6 z-50 bg-background/80 backdrop-blur-sm"
            >
                {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>

            {/* Hero */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-secondary via-secondary/90 to-primary/20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <Badge className="mb-6 bg-white/20 text-white border-white/30">
                        <Terminal className="size-3 mr-2" />
                        Developer Resources
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        CSS Variables Reference
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Complete reference of all design tokens used in Andamio. Copy-paste ready for your project.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
                {/* CSS Variables Code Block */}
                <section className="mb-20">
                    <div className="border-l-4 border-primary pl-6 mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <FileCode className="size-6 text-primary" />
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary">CSS Variables</h2>
                        </div>
                        <p className="text-muted-foreground">Add these to your globals.css or base stylesheet</p>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
                            <span className="text-sm font-medium">globals.css</span>
                            <Button
                                size="sm"
                                onClick={() => copyCode(cssVariables, "css")}
                                className="h-8"
                            >
                                {copiedSnippet === "css" ? (
                                    <Check className="size-4 text-green-500" />
                                ) : (
                                    <Copy className="size-4" />
                                )}
                                <span className="ml-2">{copiedSnippet === "css" ? "Copied!" : "Copy"}</span>
                            </Button>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 overflow-x-auto max-h-[500px] overflow-y-auto">
                            <pre className="text-sm text-gray-300 font-mono whitespace-pre">{cssVariables}</pre>
                        </div>
                    </Card>
                </section>

                <Separator className="mb-20" />

                {/* Color Tokens Reference */}
                <section className="mb-20">
                    <div className="border-l-4 border-primary pl-6 mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <Palette className="size-6 text-primary" />
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Color Tokens</h2>
                        </div>
                        <p className="text-muted-foreground">Quick reference for all design tokens</p>
                    </div>

                    <Card className="p-6">
                        <TokenTable tokens={colorTokens} title="Core Tokens" />
                        <TokenTable tokens={chartTokens} title="Chart Tokens" />
                        <TokenTable tokens={sidebarTokens} title="Sidebar Tokens" />
                    </Card>
                </section>

                <Separator className="mb-20" />

                {/* Best Practices */}
                <section className="mb-20">
                    <div className="border-l-4 border-primary pl-6 mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <Code className="size-6 text-primary" />
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Usage</h2>
                        </div>
                        <p className="text-muted-foreground">How to use these tokens in your code</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h4 className="font-bold text-lg mb-4 text-primary">Tailwind Classes</h4>
                            <div className="space-y-2 text-sm font-mono">
                                <p><code className="bg-muted px-2 py-1 rounded">bg-primary</code></p>
                                <p><code className="bg-muted px-2 py-1 rounded">text-primary-foreground</code></p>
                                <p><code className="bg-muted px-2 py-1 rounded">bg-secondary</code></p>
                                <p><code className="bg-muted px-2 py-1 rounded">bg-muted</code></p>
                                <p><code className="bg-muted px-2 py-1 rounded">text-muted-foreground</code></p>
                                <p><code className="bg-muted px-2 py-1 rounded">border-border</code></p>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <h4 className="font-bold text-lg mb-4 text-primary">CSS Usage</h4>
                            <div className="bg-[#1a1a1a] p-4 rounded-lg">
                                <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">{`.button {
  background: var(--primary);
  color: var(--primary-foreground);
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
}`}</pre>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Quick Links */}
                <section className="mb-10">
                    <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
                            <p className="text-muted-foreground mb-6">
                                Check out the full brand guidelines or go back to the hub.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <Button asChild>
                                    <a href="/brand/flyer" target="_blank">Brand Flyer</a>
                                </Button>
                                <Button asChild>
                                    <a href="/brand">Back to Hub</a>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Footer */}
                <div className="text-center text-muted-foreground text-sm py-10">
                    <p>Andamio Developer Resources • January 2026</p>
                </div>
            </div>
        </div>
    );
}
