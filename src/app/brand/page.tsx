"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
    Download,
    Moon,
    Sun,
    Palette,
    Type,
    ImageIcon,
    ArrowDown,
    Copy,
    Check,
    BookOpen,
    Code,
    ArrowRight,
    Megaphone,
    Heart,
    Zap,
    Shield,
    Search,
    Users,
    Sparkles,
    CheckCircle2,
    X,
} from "lucide-react";
import Link from "next/link";

const brandColors = [
    {
        name: "Scaffold Orange",
        lightHex: "#FF6B35",
        darkHex: "#FF7A52",
        lightRgb: "255, 107, 53",
        darkRgb: "255, 122, 82",
        usage: "Primary brand color, CTAs, highlights, and key interactive elements",
        label: "Primary",
    },
    {
        name: "Foundation Blue",
        lightHex: "#004E89",
        darkHex: "#3B82F6",
        lightRgb: "0, 78, 137",
        darkRgb: "59, 130, 246",
        usage: "Headings, trust indicators, structural elements, and depth",
        label: "Secondary",
    },
    {
        name: "Background",
        lightHex: "#FFFFFF",
        darkHex: "#0F1419",
        lightRgb: "255, 255, 255",
        darkRgb: "15, 20, 25",
        usage: "Primary backgrounds for light and dark modes",
        label: "Background",
    },
];


const logos = [
    {
        baseName: "logo-with-typography",
        src: "/logo-with-typography.png",
        alt: "Andamio Logo Horizontal Light",
        label: "Horizontal • Light Background",
        bgClass: "bg-[#ffffff]",
        isDark: false,
    },
    {
        baseName: "logo-with-typography-dark",
        src: "/logo-with-typography-dark.png",
        alt: "Andamio Logo Horizontal Dark",
        label: "Horizontal • Dark Background",
        bgClass: "dark bg-background",
        isDark: true,
    },
    {
        baseName: "logo-with-typography-for-orange-bg",
        src: "/logo-with-typography-for-orange-bg.svg",
        alt: "Andamio Logo Horizontal Orange",
        label: "Horizontal • Orange Background",
        bgClass: "bg-[#FF6B35]",
        isDark: true,
        customButtonClass: "bg-white text-[#FF6B35] hover:bg-white/90 border-transparent shadow-sm",
    },
    {
        baseName: "logo-with-typography-stacked",
        src: "/logo-with-typography-stacked.png",
        alt: "Andamio Logo Stacked Light",
        label: "Stacked • Light Background",
        bgClass: "bg-[#ffffff]",
        isDark: false,
    },
    {
        baseName: "logo-with-typography-stacked-dark",
        src: "/logo-with-typography-stacked-dark.png",
        alt: "Andamio Logo Stacked Dark",
        label: "Stacked • Dark Background",
        bgClass: "dark bg-background",
        isDark: true,
    },
    {
        baseName: "logo-with-typography-stacked-for-orange-bg",
        src: "/logo-with-typography-stacked-for-orange-bg.svg",
        alt: "Andamio Logo Stacked Orange",
        label: "Stacked • Orange Background",
        bgClass: "bg-[#FF6B35]",
        isDark: true,
        customButtonClass: "bg-white text-[#FF6B35] hover:bg-white/90 border-transparent shadow-sm",
    },
];

const weights = [
    { weight: 300, label: "Light" },
    { weight: 400, label: "Regular" },
    { weight: 500, label: "Medium" },
    { weight: 600, label: "Semibold" },
    { weight: 700, label: "Bold" },
    { weight: 800, label: "ExtraBold" },
];

export default function BrandHub() {
    const [isDark, setIsDark] = useState(false);
    const [copiedHex, setCopiedHex] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(saved === "dark" || (!saved && prefersDark));
    }, []);

    useEffect(() => {
        if (mounted) {
            document.documentElement.classList.toggle("dark", isDark);
            localStorage.setItem("theme", isDark ? "dark" : "light");
        }
    }, [isDark, mounted]);

    const copyToClipboard = async (hex: string) => {
        await navigator.clipboard.writeText(hex);
        setCopiedHex(hex);
        setTimeout(() => setCopiedHex(null), 2000);
    };

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/logo-with-typography-dark.png"
                            alt="Andamio"
                            width={160}
                            height={40}
                            className="h-10 w-auto dark:block hidden"
                        />
                        <Image
                            src="/logo-with-typography.png"
                            alt="Andamio"
                            width={160}
                            height={40}
                            className="h-10 w-auto dark:hidden block"
                        />
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-6">
                            {["logos", "colors", "typography"].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className="text-foreground/80 hover:text-primary transition-colors capitalize text-sm font-medium"
                                >
                                    {section}
                                </button>
                            ))}
                        </div>
                        <Button
                            size="icon"
                            onClick={() => setIsDark(!isDark)}
                            className="bg-accent hover:bg-accent/80 text-accent-foreground"
                        >
                            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-card via-muted to-secondary">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-secondary rounded-full blur-[150px] animate-pulse delay-1000" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight">
                        The Framework for <span className="text-primary">Trusted Collaboration</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        Visual assets and guidelines that scaffold the Andamio commitment to transparency and shared growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            onClick={() => scrollToSection("logos")}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/40 transition-all hover:shadow-xl hover:shadow-primary/50 py-2 px-5"
                        >
                            <Download className="mr-2" />
                            Download Assets
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => scrollToSection("colors")}
                            className="border-border text-foreground hover:bg-accent hover:border-border bg-transparent py-2 px-5"
                        >
                            Explore Guidelines
                            <ArrowDown className="ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            <div className="px-20">
                {/* Brand Story Section */}
                <section id="story" className="py-24 md:py-32 bg-background">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                                    <BookOpen className="mr-2 size-4" />
                                    Our Story
                                </Badge>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">Why "Andamio"?</h2>
                                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                    <p>
                                        <span className="text-primary font-semibold">Andamio</span> means "Scaffold" in Spanish. We chose this name because it perfectly embodies our mission: to provide the support structure for individuals and collaborators alike to learn, grow, and build meaningful things.
                                    </p>
                                    <p>
                                        Just as a scaffold enables the construction of something greater than itself, our platform supports learners and builders as they scale new heights in the decentralized world.
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-6">
                                <Card className="bg-primary/5 border-primary/20">
                                    <CardContent className="p-6 flex gap-4">
                                        <div className="shrink-0 w-12 h-12 rounded-lg bg-[#FF6B35] flex items-center justify-center text-white">
                                            <Zap className="size-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Scaffold Orange</h3>
                                            <p className="text-muted-foreground">
                                                Represents action, energy, and the "under construction" nature of continuous learning. It's vibrant, visible, and dynamic.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-secondary/5 border-secondary/20">
                                    <CardContent className="p-6 flex gap-4">
                                        <div className="shrink-0 w-12 h-12 rounded-lg bg-[#004E89] flex items-center justify-center text-white">
                                            <Shield className="size-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Foundation Blue</h3>
                                            <p className="text-muted-foreground">
                                                Represents the solid foundation, trust, and stability of the protocol. It provides the grounding that makes growth possible.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Logos Section */}
                <section id="logos" className="py-24 md:py-32">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                                <ImageIcon className="mr-2 size-4" />
                                Identity
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">A Symbol of Trust</h2>
                            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                                Our logo represents the collective effort of individuals coming together. Use it to signal reliability and shared purpose.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {logos.map((logo) => (
                                <Card
                                    key={logo.src}
                                    className={`overflow-hidden group hover:shadow-xl transition-all duration-300 ${logo.bgClass}`}
                                >
                                    <CardContent className="p-8 flex flex-col items-center justify-center min-h-[280px]">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            width={400}
                                            height={120}
                                            className={`w-auto mb-6 group-hover:scale-105 transition-transform duration-300 ${logo.baseName.includes('stacked') ? 'max-h-60' : 'max-h-28'}`}

                                        />
                                        <Badge
                                            variant="secondary"
                                            className={logo.isDark ? "bg-secondary text-secondary-foreground" : ""}
                                        >
                                            {logo.label}
                                        </Badge>
                                        <div className="flex items-center gap-2 mt-6">
                                            <a href={`/${logo.baseName}.png`} download className="inline-flex">
                                                <Button size="sm" className={logo.customButtonClass || (logo.isDark ? "border-white/20 text-white hover:bg-white/10" : "border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f3f4f6] bg-white")}>
                                                    <Download className="size-3 mr-1" />
                                                    PNG
                                                </Button>
                                            </a>
                                            <a href={`/${logo.baseName}.jpg`} download className="inline-flex">
                                                <Button size="sm" className={logo.customButtonClass || (logo.isDark ? "border-white/20 text-white hover:bg-white/10" : "border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f3f4f6] bg-white")}>
                                                    <Download className="size-3 mr-1" />
                                                    JPG
                                                </Button>
                                            </a>
                                            <a href={`/${logo.baseName}.svg`} download className="inline-flex">
                                                <Button size="sm" className={logo.customButtonClass || (logo.isDark ? "border-white/20 text-white hover:bg-white/10" : "border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f3f4f6] bg-white")}>
                                                    <Download className="size-3 mr-1" />
                                                    SVG
                                                </Button>
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <Separator />

                {/* Colors Section */}
                <section id="colors" className="py-24 md:py-32 bg-muted/50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                                <Palette className="mr-2 size-4" />
                                Foundation
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Energy Meets Stability</h2>
                            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                                A palette that balances the dynamic energy of human collaboration (Orange) with the unwavering stability of trust (Blue).
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {brandColors.map((color) => (
                                <Card key={color.name} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                    <div className="flex h-44">
                                        <div
                                            className="flex-1 flex items-end p-4 relative"
                                            style={{ backgroundColor: color.lightHex }}
                                        >
                                            <Badge className="text-xs font-semibold bg-background/95 text-foreground">
                                                Light
                                            </Badge>
                                        </div>
                                        <div
                                            className="flex-1 flex items-end p-4 relative"
                                            style={{ backgroundColor: color.darkHex }}
                                        >
                                            <Badge className="text-xs font-semibold bg-white/15 text-white">
                                                Dark
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-bold">{color.name}</h3>
                                            <Badge variant="outline" className="text-xs">{color.label}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                            {color.usage}
                                        </p>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => copyToClipboard(isDark ? color.darkHex : color.lightHex)}
                                                className="w-full flex items-center justify-between p-2.5 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors group"
                                            >
                                                <span className="font-semibold text-muted-foreground">HEX</span>
                                                <span className="font-mono font-semibold flex items-center gap-2">
                                                    {color.lightHex} → {color.darkHex}
                                                    {(copiedHex === color.lightHex || copiedHex === color.darkHex) ? (
                                                        <Check className="size-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    )}
                                                </span>
                                            </button>
                                            <div className="flex items-center justify-between p-2.5 bg-muted rounded-lg text-sm">
                                                <span className="font-semibold text-muted-foreground">RGB</span>
                                                <span className="font-mono font-semibold text-xs">
                                                    {color.lightRgb} → {color.darkRgb}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Typography Section */}
                <section id="typography" className="py-24 md:py-32 bg-card text-card-foreground">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/10">
                                <Type className="mr-2 size-4" />
                                Clarity
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Inter: Designed for Transparency</h2>
                            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                                A typeface chosen for its clarity and openness, ensuring every message is understood without ambiguity.
                            </p>
                        </div>

                        <div className="text-center mb-16">
                            <div className="text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent mb-4">
                                Aa Bb Cc
                            </div>
                            <p className="text-2xl font-light text-muted-foreground">Inter</p>
                            <p className="text-muted-foreground/70">Designed for computer screens</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                            {weights.map((w) => (
                                <div key={w.weight} className="text-center">
                                    <div className="text-5xl mb-3 text-foreground" style={{ fontWeight: w.weight }}>
                                        Aa
                                    </div>
                                    <p className="text-primary font-semibold text-sm uppercase tracking-wider">
                                        {w.label} {w.weight}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Voice & Tone Section */}
                <section id="voice" className="py-24 md:py-32 bg-background border-t border-border">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                                <Megaphone className="mr-2 size-4" />
                                Voice & Tone
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Voice</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                The Andamio brand voice is supportive, clear, bold, curious, and human. We balance approachability with technical credibility.
                            </p>
                        </div>

                        {/* Voice Characteristics */}
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-24">
                            <Card className="hover:border-primary/50 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <Heart className="size-8 text-primary mx-auto mb-4" />
                                    <h3 className="font-bold mb-2">Supportive</h3>
                                    <p className="text-sm text-muted-foreground">We guide, never lecture. We help people grow with confidence.</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:border-primary/50 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <Zap className="size-8 text-primary mx-auto mb-4" />
                                    <h3 className="font-bold mb-2">Clear</h3>
                                    <p className="text-sm text-muted-foreground">No jargon walls. We say complex things simply and directly.</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:border-primary/50 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <Shield className="size-8 text-primary mx-auto mb-4" />
                                    <h3 className="font-bold mb-2">Bold</h3>
                                    <p className="text-sm text-muted-foreground">We believe in our mission and speak with conviction.</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:border-primary/50 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <Search className="size-8 text-primary mx-auto mb-4" />
                                    <h3 className="font-bold mb-2">Curious</h3>
                                    <p className="text-sm text-muted-foreground">We ask questions, challenge assumptions, and invite others to.</p>
                                </CardContent>
                            </Card>
                            <Card className="hover:border-primary/50 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <Users className="size-8 text-primary mx-auto mb-4" />
                                    <h3 className="font-bold mb-2">Human</h3>
                                    <p className="text-sm text-muted-foreground">Not a faceless platform. We are builders helping builders.</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Tone by Context */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Sparkles className="size-5 text-primary" />
                                    Tone by Context
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { ctx: "Marketing", tone: "Inspiring, visionary", ex: "The future of work starts here." },
                                        { ctx: "Platform UI", tone: "Clear, action-oriented", ex: "Complete this task to unlock credential." },
                                        { ctx: "Docs", tone: "Precise, helpful", ex: "Not sure where to start? Here’s an overview." },
                                        { ctx: "Social", tone: "Conversational, playful", ex: "Web3 builders — it’s time to level up." },
                                        { ctx: "Community", tone: "Warm, inclusive", ex: "Welcome! Feel free to introduce yourself." },
                                    ].map((item) => (
                                        <div key={item.ctx} className="p-4 bg-muted/30 rounded-lg border border-border">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-semibold text-sm uppercase text-primary tracking-wide">{item.ctx}</span>
                                                <span className="text-xs text-muted-foreground font-medium">{item.tone}</span>
                                            </div>
                                            <p className="font-medium italic text-foreground/90">"{item.ex}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dos & Donts */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="size-5 text-primary" />
                                    Messaging Guidelines
                                </h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400 font-bold text-sm uppercase">
                                                <Check className="size-4" /> Do
                                            </div>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-green-500 shrink-0" /> Use "you" more than "we"</li>
                                                <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-green-500 shrink-0" /> Focus on outcomes</li>
                                                <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-green-500 shrink-0" /> Short, active sentences</li>
                                                <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-green-500 shrink-0" /> Translate technical terms</li>
                                            </ul>
                                        </div>
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400 font-bold text-sm uppercase">
                                                <X className="size-4" /> Don't
                                            </div>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-red-500 shrink-0" /> Talk only about ourselves</li>
                                                <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-red-500 shrink-0" /> Overpromise or hype</li>
                                                <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-red-500 shrink-0" /> Passive, formal phrases</li>
                                                <li className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-red-500 shrink-0" /> Assume prior knowledge</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Example Messages */}
                                    <div className="mt-8">
                                        <h4 className="font-bold mb-4">Core Messages</h4>
                                        <div className="grid gap-3">
                                            <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
                                                <span className="text-xs font-semibold text-muted-foreground uppercase">Tagline</span>
                                                <p className="text-lg font-medium text-primary mt-1">“Scaffold your skills. Contribute with confidence.”</p>
                                            </div>
                                            <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
                                                <span className="text-xs font-semibold text-muted-foreground uppercase">Mission</span>
                                                <p className="text-lg font-medium text-foreground mt-1">“Helping people learn, earn, and build in Web3.”</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Resources Section */}
                <section className="py-24 md:py-32">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                                <Users className="mr-2 size-4" />
                                Community
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Resources for the Community</h2>
                            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                                Access the guides and assets that help us maintain a consistent and trustworthy voice.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <a href="/brand/flyer" target="_blank" className="group">
                                <Card className="h-full overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                                    <CardContent className="p-8">
                                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                            <Download className="size-7 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">Download Visual Guide</h3>
                                        <p className="text-muted-foreground mb-6">
                                            A concise, printable one-pager reference for core colors, rules, and typography.
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                                            View & Print Flyer <ArrowRight className="size-4" />
                                        </span>
                                    </CardContent>
                                </Card>
                            </a>

                            <a href="/brand/developers" className="group">
                                <Card className="h-full overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                                    <CardContent className="p-8">
                                        <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                                            <Code className="size-7 text-secondary" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">Developer Resources</h3>
                                        <p className="text-muted-foreground mb-6">
                                            CSS variables reference, color tokens, Tailwind classes, and implementation examples.
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
                                            View Developer Guide <ArrowRight className="size-4" />
                                        </span>
                                    </CardContent>
                                </Card>
                            </a>
                        </div>
                    </div>
                </section>

            </div>

            <footer className="bg-card py-16 text-center border-t border-border">
                <Image
                    src="/logo-with-typography-dark.png"
                    alt="Andamio"
                    width={200}
                    height={48}
                    className="h-12 w-auto mx-auto mb-6 dark:block hidden"
                />
                <Image
                    src="/logo-with-typography.png"
                    alt="Andamio"
                    width={200}
                    height={48}
                    className="h-12 w-auto mx-auto mb-6 dark:hidden block"
                />
                <p className="text-muted-foreground text-sm">
                    © 2025 Andamio. Brand Hub v1.0
                    <br />
                    <a href="https://andamio.io" className="text-primary hover:underline">
                        andamio.io
                    </a>
                </p>
            </footer>
        </div>
    );
}
