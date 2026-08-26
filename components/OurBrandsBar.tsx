"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getBrandsData } from "@/services/api";

interface Brand {
    id: number;
    name: string;
    slug: string;
    logo?: string;
}

export default function OurBrandsBar() {
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        getBrandsData().then((data: Brand[]) => {
            if (Array.isArray(data)) setBrands(data);
        });
    }, []);

    if (brands.length === 0) return null;

    return (
        <section className="our-brands-bar">
            <div className="our-brands-inner">
                <h2 className="our-brands-title">Our Brands</h2>
                <div className="our-brands-grid">
                    {brands.map((brand) => (
                        <div className="our-brands-item" key={brand.id}>
                            <Link href={`/${brand.slug}`} title={brand.name}>
                                {brand.logo ? (
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="our-brands-logo"
                                    />
                                ) : (
                                    <span className="our-brands-name">{brand.name}</span>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
