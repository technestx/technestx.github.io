
    /**
    * Updates all SEO-related tags dynamically:
    * - <title>, <meta description>, Open Graph, Twitter Cards
    * - <link rel="canonical">
        * - Schema.org (JSON-LD) structured data
        */
    const homePageUrl = "https://technestx.github.io/";
    const websiteName = "technestx";
    const publisherName = "technestx";
    const providerName = "technestx";
    const bannerUrl = homePageUrl+"images/full_logo.png";

        function updateMetaTags(page) {
        const metaData = {
            home: {
                title: "TechNestX | Learn Coding Online",
                description:
                    "Free coding tutorials for Java, Python, JavaScript, HTML, and Cybersecurity. Learn step-by-step with examples and projects.",
                url: homePageUrl,
                image: bannerUrl,
                schemaType: "WebSite",
                schemaData: {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": websiteName,
                    "url": homePageUrl,
                    "description": "Learn programming online with free tutorials for Java, Python, JavaScript, HTML, and Cybersecurity.",
                    "publisher": {
                        "@type": "Organization",
                        "name": publisherName
                    }
                }
            },
            java: {
                title: "Learn Java Programming | TechNestX",
                description:
                    "Step-by-step Java tutorials with examples, exercises, and real-world projects for beginners.",
                url: homePageUrl + "java/",
                image: bannerUrl,
                schemaType: "TechArticle",
                schemaData: {
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "name": "Java Programming for Beginners",
                    "description": "Learn Java programming step-by-step with examples and projects at CodeLearn Hub.",
                    "provider": {
                        "@type": "Organization",
                        "name": providerName,
                        "url": homePageUrl
                    }
                }
            },
            python: {
                title: "Learn Python | TechNestX",
                description:
                    "Simple and practical Python tutorials for beginners. Learn syntax, loops, functions, and more.",
                url: homePageUrl + "python/",
                image: bannerUrl,
                schemaType: "TechArticle",
                schemaData: {
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "name": "Python Programming for Beginners",
                    "description": "Learn Python step-by-step with examples, exercises, and projects.",
                    "provider": {
                        "@type": "Organization",
                        "name": "CodeLearn Hub",
                        "url": homePageUrl
                    }
                }
            },
            blog: {
                title: "TechNestX Blog — Programming Tips, Tutorials & Tech Insights",
                description:
                    "Simple and practical Python tutorials for beginners. Learn syntax, loops, functions, and more.",
                url: homePageUrl + "blog/",
                image: bannerUrl,
                schemaType: "TechArticle",
                schemaData: {
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "url": homePageUrl + "blog/",
                    "name": "CodeStydyZone Blog",
                    "description": "Programming tutorials, coding tips, and cybersecurity insights.",
                    "publisher": {
                        "@type": "Organization",
                        "name": publisherName,
                        "logo": {
                            "@type": "ImageObject",
                            "url": bannerUrl
                        }
                    }
                }
            },
            cpp: {
                title: "Learn C++ Programming — Beginner to Advanced | TechNestX",
                description:
                    "Master C++ programming with step-by-step tutorials from TechNestX. Learn syntax, OOP concepts, STL, and best practices for writing efficient C++ code.",
                url: homePageUrl + "cpp/",
                image: bannerUrl,
                schemaType: "TechArticle",
                schemaData: {
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "url": homePageUrl + "cpp/",
                    "name": websiteName,
                    "description": "Master C++ programming with structured tutorials and coding examples.",
                    "publisher": {
                        "@type": "Organization",
                        "name": publisherName,
                        "logo": {
                            "@type": "ImageObject",
                            "url": bannerUrl
                        }
                    }
                }
            },
            csharp: {
                title: "Learn C# Programming — Step-by-Step Guide | TechNestX",
                description:
                    "Learn C# programming with TechNestX’s easy-to-follow tutorials. Explore .NET, OOP, LINQ, and modern C# coding practices for beginners and professionals.",
                url: homePageUrl + "csharp/",
                image: bannerUrl,
                schemaType: "TechArticle",
                schemaData: {
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "url": homePageUrl + "csharp/",
                    "name": websiteName,
                    "description": "C# tutorials with examples, covering .NET, LINQ, and object-oriented programming.",
                    "publisher": {
                        "@type": "Organization",
                        "name": publisherName,
                        "logo": {
                            "@type": "ImageObject",
                            "url": bannerUrl
                        }
                    }
                }
            },
            kotlin: {
                title: "Learn Kotlin Programming — Android & JVM Development | TechNestX",
                description:
                    "Learn Kotlin programming from scratch with TechNestX. Master syntax, OOP, coroutines, and Android app development using Kotlin.",
                url: homePageUrl + "kotlin/",
                image: bannerUrl,
                schemaType: "TechArticle",
                schemaData: {
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "url": homePageUrl + "kotlin/",
                    "name": websiteName,
                    "description": "Kotlin tutorials for beginners covering Android development, syntax, OOP, and coroutines.",
                    "publisher": {
                        "@type": "Organization",
                        "name": publisherName,
                        "logo": {
                            "@type": "ImageObject",
                            "url": bannerUrl
                        }
                    }
                }
            }
        }

        const data = metaData[page] || metaData.home;

        // Title
        document.title = data.title;

        // Meta description & Open Graph & Twitter
        updateOrCreateMeta("name", "description", data.description);
        updateOrCreateMeta("property", "og:title", data.title);
        updateOrCreateMeta("property", "og:description", data.description);
        updateOrCreateMeta("property", "og:url", data.url);
        updateOrCreateMeta("property", "og:image", data.image);
        updateOrCreateMeta("name", "twitter:title", data.title);
        updateOrCreateMeta("name", "twitter:description", data.description);
        updateOrCreateMeta("name", "twitter:image", data.image);

        // Canonical URL
        let canonical = document.querySelector("link[rel='canonical']");
        if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
    }
        canonical.href = data.url;

        // Schema.org structured data
        let oldSchema = document.querySelector("script[type='application/ld+json']");
        if (oldSchema) oldSchema.remove(); // remove old schema if exists
        const schemaScript = document.createElement("script");
        schemaScript.type = "application/ld+json";
        schemaScript.textContent = JSON.stringify(data.schemaData, null, 2);
        document.head.appendChild(schemaScript);
    }

        /**
        * Helper: updates or creates meta tag dynamically
        */
        function updateOrCreateMeta(attr, key, value) {
        let meta = document.querySelector(`meta[${attr}='${key}']`);
        if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
    }
        meta.setAttribute("content", value);
    }

        // Automatically run on load based on path
    //     document.addEventListener("DOMContentLoaded", () => {
    //     const path = window.location.pathname.split("/")[1] || "home";
    //     updateMetaTags(path.toLowerCase());
    // });

